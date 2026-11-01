/**
 * Quiet background for the home page hero: a slowly rotating cloud of faint
 * monospace glyphs, stretched to fill the whole block, rendered as WebGL2 point sprites from a glyph atlas.
 * Motion comes from procedural noise in the vertex shader, so it never loops.
 * Without WebGL2 a single still frame is drawn with canvas 2D.
 */

/**
 * ASCII punctuation, operators and a few digits, ordered from light to dense.
 * No letters (they read as text) and no box-drawing or other special Unicode
 * symbols, which system monospace fonts render inconsistently.
 */
// biome-ignore format: one line per atlas row
export const GLYPHS = [
  '·', '.', ':', ';', '-', '_', '~', '^',
  '+', '=', '*', '/', '\\', '|', '!', '?',
  '<', '>', '(', ')', '[', ']', '{', '}',
  '0', '1', '7', '$', '#', '%', '@', '&',
] as const;
/** Glyph indices drawn mostly in the faint outer field and in the dense core. */
export const LIGHT = [0, 1, 2, 3, 4, 5, 6, 7];
export const DENSE = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
/** Atlas grid; must hold every glyph. */
export const COLS = 8;
export const ROWS = 4;
const CELL = 64;
const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export interface Cloud {
  /** Object-space positions, xyz per glyph, radius about 1. */
  pos: Float32Array;
  /** seed, glyph index, kind (0 body, 1 stream), position along the stream. */
  data: Float32Array;
  count: number;
}

type Vec3 = [number, number, number];

function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Builds a deterministic cloud: dense core, irregular rim, stray glyphs and a few outgoing streams. */
export function buildCloud(count: number, seed = 0x3f9a21): Cloud {
  const rand = createRandom(seed);
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());
  const unit = (): Vec3 => {
    const z = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - z * z);
    return [s * Math.cos(a), s * Math.sin(a), z];
  };
  // Low-frequency boundary modulation keeps the silhouette from being a perfect circle.
  const lumpy = (d: Vec3) =>
    1 +
    0.13 * Math.sin(d[0] * 2.1 + d[1] * 1.3 + 0.7) +
    0.09 * Math.sin(d[1] * 3.3 - d[2] * 2.2 + 1.9) +
    0.06 * Math.sin(d[2] * 4.7 + d[0] * 3.1);
  const scaled = (d: Vec3, r: number): Vec3 => [d[0] * r, d[1] * r, d[2] * r];

  const streams = Array.from({ length: 6 }, () => {
    const s = unit();
    const t = unit();
    const c: Vec3 = [s[1] * t[2] - s[2] * t[1], s[2] * t[0] - s[0] * t[2], s[0] * t[1] - s[1] * t[0]];
    const l = Math.hypot(...c) || 1;
    return { s, c: scaled(c, 1 / l), reach: 0.5 + rand() * 0.6, bend: 0.2 + rand() * 0.35 };
  });

  const pos = new Float32Array(count * 3);
  const data = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    const k = rand();
    let p: Vec3;
    let r: number;
    let kind = 0;
    let along = 0;
    if (k < 0.72) {
      const d = unit();
      r = rand() ** 0.45 * lumpy(d) * 0.98;
      p = scaled(d, r);
    } else if (k < 0.88) {
      const d = unit();
      r = lumpy(d) * (0.93 + gauss() * 0.07);
      p = scaled(d, r);
    } else if (k < 0.945) {
      const d = unit();
      r = lumpy(d) * (1.08 + Math.abs(gauss()) * 0.32);
      p = scaled(d, r);
    } else {
      const stream = streams[Math.floor(rand() * streams.length)] ?? streams[0];
      if (!stream) throw new Error('no streams');
      along = rand();
      kind = 1;
      const out = 0.92 + along * stream.reach;
      const sway = Math.sin(along * Math.PI) * stream.bend;
      const jitter = 0.018 * (1 + along * 2);
      p = [0, 1, 2].map((j) => (stream.s[j] ?? 0) * out + (stream.c[j] ?? 0) * sway + gauss() * jitter) as Vec3;
      r = Math.hypot(...p);
    }
    pos.set(p, i * 3);
    // Weighted pools give the core more structure; most glyphs still come from the whole set.
    const pool = r < 0.6 ? (rand() < 0.6 ? DENSE : null) : rand() < 0.22 ? LIGHT : null;
    const glyph = pool ? (pool[Math.floor(rand() * pool.length)] ?? 0) : Math.floor(rand() * GLYPHS.length);
    data.set([rand(), glyph, kind, along], i * 4);
  }
  return { pos, data, count };
}

/** Glyph budget from the drawing area in CSS pixels, reduced on low-core devices. */
export function glyphBudget(width: number, height: number, cores: number): number {
  const base = Math.min(2400, Math.max(800, Math.round((width * height) / 160 / 100) * 100));
  return cores <= 4 ? Math.round(base * 0.7) : base;
}

function buildAtlas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = COLS * CELL;
  canvas.height = ROWS * CELL;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `500 ${Math.round(CELL * 0.78)}px ${MONO}`;
  GLYPHS.forEach((g, i) => {
    ctx.fillText(g, (i % COLS) * CELL + CELL / 2, Math.floor(i / COLS) * CELL + CELL / 2 + 2);
  });
  return canvas;
}

const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = `#version 300 es
precision highp float;
in vec3 aPos;
in vec4 aData;
uniform float uTime;
uniform float uFlick;
uniform float uMotion;
uniform vec2 uScale;
uniform float uPx;
uniform vec2 uRot;
out float vAlpha;
out float vGlyph;
${NOISE}
mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s, 0.,1.,0., s,0.,c);}
mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0., 0.,c,s, 0.,-s,c);}
void main(){
  float seed = aData.x;
  float kind = aData.z;
  float t = uTime;
  float r0 = length(aPos);

  // slow drift through a noise field and a gentle breath
  vec3 q = aPos * 1.2 + vec3(0.0, 0.0, t * 0.03);
  vec3 drift = vec3(snoise(q), snoise(q + vec3(17.1, 3.7, 0.0)), snoise(q + vec3(5.3, 29.4, 11.0)));
  vec3 p = aPos * (1.0 + 0.025 * sin(t * 0.1) * uMotion);
  p += drift * (0.05 + 0.04 * smoothstep(0.7, 1.3, r0)) * mix(0.25, 1.0, uMotion);

  vec3 w = rotX(0.22 + 0.15 * sin(t * 0.015) + uRot.y) * (rotY(t * 0.035 + uRot.x) * p);
  w.x *= 1.12;
  w.y *= 0.94;
  float persp = 3.1 / (3.1 - w.z);
  // stretched to the block, so the cloud fills its whole width and height
  vec2 ndc = w.xy * persp * uScale;

  float depth = clamp((w.z + 1.25) / 2.5, 0.0, 1.0);
  float edge = 1.0 - smoothstep(0.6, 1.5, r0);
  float a = mix(0.1, 0.28, depth) * mix(0.6, 1.0, edge);
  a *= mix(1.0, 0.7 * (1.0 - aData.w), kind);
  a *= mix(1.0, 0.75 + 0.25 * sin(uFlick * (0.25 + seed * 1.2) + seed * 61.0), mix(0.4, 1.0, uMotion));
  a *= smoothstep(-0.65, -0.2, snoise(aPos * 1.6 + vec3(t * 0.02, -t * 0.014, 3.0)));
  // one slow, faint wave so the field reads as alive
  a += smoothstep(0.94, 1.0, sin(dot(aPos, vec3(0.62, 0.74, 0.26)) * 5.0 - t * 0.4)) * 0.05 * edge * uMotion;

  float g = aData.y;
  // about 30% of glyphs change shape now and then
  if (seed > 0.7) {
    float hop = floor(uFlick * (0.08 + (seed - 0.7) * 0.5) + seed * 31.0);
    g = mod(g + hop * 7.0, ${GLYPHS.length}.0);
  }

  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = uPx * persp * mix(0.85, 1.1, depth) * (0.92 + 0.16 * fract(seed * 13.7));
  vAlpha = a;
  vGlyph = g;
}`;

const FRAG = `#version 300 es
precision highp float;
uniform sampler2D uAtlas;
uniform vec3 uInk;
uniform float uGain;
in float vAlpha;
in float vGlyph;
out vec4 outColor;
void main(){
  vec2 cell = vec2(mod(vGlyph, ${COLS}.0), floor(vGlyph / ${COLS}.0));
  float a = texture(uAtlas, (cell + gl_PointCoord) / vec2(${COLS}.0, ${ROWS}.0)).a * vAlpha * uGain;
  outColor = vec4(uInk * a, a);
}`;

const UNIFORMS = ['uTime', 'uFlick', 'uMotion', 'uScale', 'uPx', 'uRot', 'uAtlas', 'uInk', 'uGain'] as const;
type UniformName = (typeof UNIFORMS)[number];

export interface FieldElements {
  canvas: HTMLCanvasElement;
}

/** Glyph color and strength per site theme; kept faint so the hero text stays primary. */
const THEMES = {
  // Dark ink on paper reads stronger than light ink on black at the same opacity,
  // so light mode uses a mid grey (dense overlaps stay grey, not black) and less gain.
  light: { ink: [0.38, 0.38, 0.4], gain: 0.5, still: 'rgba(97,97,102,' },
  dark: { ink: [0.86, 0.87, 0.89], gain: 0.62, still: 'rgba(219,222,227,' },
} as const;
const darkScheme = () => window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Clip-space scale: the cloud's body (radius about 1, widened by 1.12 and
 * flattened by 0.94 in the shader) reaches the block's edges on both axes;
 * stray glyphs continue into the corners.
 */
const FILL: readonly [number, number] = [0.86, 1.0];

function program(gl: WebGL2RenderingContext): WebGLProgram {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('createShader failed');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader compile failed');
    return shader;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'program link failed');
  return prog;
}

function drawStill(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(canvas.clientWidth * dpr);
  canvas.height = Math.round(canvas.clientHeight * dpr);
  const cloud = buildCloud(1800);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const rx = (canvas.width / 2) * FILL[0] * 1.12;
  const ry = (canvas.height / 2) * FILL[1] * 0.94;
  const theme = THEMES[darkScheme().matches ? 'dark' : 'light'];
  ctx.font = `${11 * dpr}px ${MONO}`;
  ctx.textAlign = 'center';
  for (let i = 0; i < cloud.count; i++) {
    const x = cloud.pos[i * 3] ?? 0;
    const y = cloud.pos[i * 3 + 1] ?? 0;
    const z = cloud.pos[i * 3 + 2] ?? 0;
    const r = Math.hypot(x, y, z);
    const alpha = (0.05 + (0.15 * (z + 1)) / 2) * Math.max(0.55, 1 - Math.max(0, r - 0.6) / 0.9) * theme.gain;
    ctx.fillStyle = `${theme.still}${alpha.toFixed(3)})`;
    ctx.fillText(GLYPHS[cloud.data[i * 4 + 1] ?? 0] ?? '.', cx + x * rx, cy - y * ry);
  }
  canvas.dataset.state = 'still';
}

/** Starts the field. Returns a function that stops it. */
export function initAsciiField({ canvas }: FieldElements): () => void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true });
  let prog: WebGLProgram;
  try {
    if (!gl) throw new Error('WebGL2 unavailable');
    prog = program(gl);
  } catch (error) {
    if (gl) console.error(error);
    drawStill(canvas);
    return () => {};
  }

  gl.useProgram(prog);
  const u = Object.fromEntries(UNIFORMS.map((name) => [name, gl.getUniformLocation(prog, name)])) as Record<
    UniformName,
    WebGLUniformLocation | null
  >;
  const vao = gl.createVertexArray();
  const posBuffer = gl.createBuffer();
  const dataBuffer = gl.createBuffer();
  const aPos = gl.getAttribLocation(prog, 'aPos');
  const aData = gl.getAttribLocation(prog, 'aData');
  let count = 0;

  const upload = (cloud: Cloud) => {
    count = cloud.count;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cloud.pos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cloud.data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aData);
    gl.vertexAttribPointer(aData, 4, gl.FLOAT, false, 0, 0);
  };

  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildAtlas());
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(u.uAtlas, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied "over" in both themes
  const scheme = darkScheme();

  let px = 10;
  let budget = 0;
  const resize = () => {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.75 : 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    px = Math.max(15, Math.min(20, height / 28)) * dpr;
    const next = glyphBudget(width, height, navigator.hardwareConcurrency || 8);
    if (next !== budget) {
      budget = next;
      upload(buildCloud(budget));
    }
  };

  // The pointer only nudges the rotation a little, with inertia.
  const pointer = { tx: 0, ty: 0, x: 0, y: 0 };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = -((event.clientY / window.innerHeight) * 2 - 1);
  };

  const start = performance.now();
  let last = start;
  let geometryTime = 37;
  let frame = 0;
  let visible = true;

  const render = (now: number) => {
    frame = 0;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const reduced = reduceMotion.matches;
    geometryTime += reduced ? 0 : dt;
    const flick = ((now - start) / 1000) * (reduced ? 0.1 : 1) + 11;

    const ease = 1 - Math.exp(-dt * 1.2);
    const active = !reduced && !coarse ? 1 : 0;
    pointer.x += (pointer.tx * active - pointer.x) * ease;
    pointer.y += (pointer.ty * active - pointer.y) * ease;

    const theme = THEMES[scheme.matches ? 'dark' : 'light'];
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindVertexArray(vao);
    gl.uniform1f(u.uTime, geometryTime);
    gl.uniform1f(u.uFlick, flick);
    gl.uniform1f(u.uMotion, reduced ? 0 : 1);
    gl.uniform2fv(u.uScale, FILL);
    gl.uniform1f(u.uPx, px);
    gl.uniform2f(u.uRot, pointer.x * 0.12, pointer.y * 0.08);
    gl.uniform3fv(u.uInk, theme.ink);
    gl.uniform1f(u.uGain, theme.gain);
    gl.drawArrays(gl.POINTS, 0, count);

    if (visible) frame = requestAnimationFrame(render);
  };

  // Stop drawing while the hero is scrolled out of view.
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible && frame === 0) {
      last = performance.now();
      frame = requestAnimationFrame(render);
    }
  });

  resize();
  canvas.dataset.state = 'webgl';
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointer, { passive: true });
  observer.observe(canvas);
  frame = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointer);
  };
}
