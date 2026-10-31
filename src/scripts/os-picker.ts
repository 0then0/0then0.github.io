/**
 * Progressive enhancement for the download section: show one OS at a time.
 * Without JavaScript every OS panel stays visible. The detected OS is only a
 * preselection; architecture is never guessed.
 */

type NavigatorWithUaData = Navigator & { userAgentData?: { platform?: string } };

export function detectOs(nav: NavigatorWithUaData = navigator): string | null {
  const source = `${nav.userAgentData?.platform ?? ''} ${nav.userAgent}`.toLowerCase();
  if (/android/.test(source)) return 'android';
  if (/iphone|ipad|ipod/.test(source)) return 'ios';
  if (/win/.test(source)) return 'windows';
  if (/mac/.test(source)) return 'macos';
  if (/linux|x11|cros/.test(source)) return 'linux';
  return null;
}

export function initOsPicker(root: ParentNode = document): void {
  const picker = root.querySelector<HTMLElement>('[data-os-picker]');
  if (!picker) return;
  const buttons = [...picker.querySelectorAll<HTMLButtonElement>('button[data-os]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-os-panel]')];
  if (buttons.length === 0) return;

  const select = (os: string) => {
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.os === os));
    for (const panel of panels) panel.hidden = panel.dataset.osPanel !== os;
  };

  for (const button of buttons) {
    button.addEventListener('click', () => select(button.dataset.os ?? ''));
  }

  const detected = detectOs();
  const initial = buttons.find((b) => b.dataset.os === detected) ?? buttons[0];
  picker.hidden = false;
  select(initial?.dataset.os ?? '');
}
