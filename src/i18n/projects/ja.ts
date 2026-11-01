import type { ProjectTexts } from './types.ts';

export const ja: ProjectTexts = {
  spacemosaic: {
    task: 'フォルダー内で何が容量を使っているかをサイズマップで確認。何も削除・変更しません。',
    environment: 'デスクトップアプリ、Android 8.0 以降の APK。iOS は独自の署名が必要',
    tagline: 'フォルダーごとの読み取り専用ストレージマップ。',
    primary: 'SpaceMosaic をダウンロード',
    downloadNote:
      'iOS ビルドは開発者向けにのみ公開しています。実機用ビルドは Xcode で署名が必要で、シミュレーター用ビルドは iPhone では動作しません。',
  },
  'cambridge-dictionary-audio': {
    task: '英単語のアメリカ英語とイギリス英語の発音を MP3 で保存。IPA、定義、Anki への書き出しにも対応。',
    environment: 'デスクトップアプリ、ターミナルアプリ、Chrome/Firefox 拡張機能、Python CLI',
    tagline: '単語カードとリスニング練習のための発音音声。',
    primary: 'デスクトップアプリをダウンロード',
    secondary: [{ label: 'PyPI から CLI をインストール' }],
    forkNote:
      '大幅に独自開発を加えた独立フォーク。デスクトップ・ターミナル・モバイルアプリ、ブラウザー拡張機能、Anki への書き出しはここで追加されました。',
    downloadNote:
      'Android と iOS のビルドはテストと開発用にのみ公開しています。Android の APK はデバッグ版と署名なし版で、iOS のアーカイブは独自の署名が必要です。ここでは通常のインストールとして案内していません。',
  },
  margincarry: {
    task: 'Zotero のハイライトと下線を同じ PDF の新しい版へ移す。書き込む前に 1 件ずつ確認できます。',
    environment: 'Zotero 10.0.5 以降の 10.0.x（デスクトップ版）',
    tagline: '論文が改訂されても読書メモを失わない。',
    primary: 'Zotero プラグインをダウンロード',
  },
  batterybridge: {
    task: 'ハードウェアが許す範囲でノートパソコンの充電上限とバッテリー管理のスケジュールを設定し、端末が対応する機能を確認できます。',
    environment: '充電制御に対応したノートパソコン。サービスのインストールには管理者権限が必要',
    tagline: 'ハードウェアの範囲内で、思いどおりの充電上限を。',
    primary: 'BatteryBridge をダウンロード',
  },
  'form-forge': {
    task: '自前のフォームサービスを運用。バージョン管理したフォームを公開し、回答を PostgreSQL に保存して署名付き Webhook に送ります。',
    environment: 'セルフホスト：Node.js、PostgreSQL、Inngest。Docker Compose または Netlify',
    tagline: '配信の経過を確認できるセルフホスト型フォームプラットフォーム。',
    primary: '始める',
    secondary: [
      {
        label: '公開インスタンスを開く',
        note: 'GitHub、Google、GitLab でのサインインが必要です。サービスレベルは公表していません。',
      },
    ],
  },
  dbreduce: {
    task: '失敗するテストを再現できる最小限の行とテーブルまで PostgreSQL データベースを縮小します。',
    environment: 'Python 3.10–3.15、PostgreSQL 13–18 と同じバージョンの pg_dump・pg_restore・psql',
    tagline: '本番規模のダンプから、添付できるバグ報告へ。',
    primary: '始める',
  },
  lanpair: {
    task: '同じネットワークの 2 台の端末が互いに見えない原因を、両側で集めたデータから調べます。',
    environment: '両方の端末で実行。デスクトップ版は署名なし、Android はテスト版のみ、iOS はソースから',
  },
  cineclue: {
    task: '毎日の映画推理ゲーム。共通する人物、場所、スタジオから映画を当てます。',
    environment: 'Web ブラウザー',
  },
  harmonia: {
    task: 'Spotify、YouTube Music、Yandex Music のプレイリストを取り込み、カタログ間で曲を照合し、自分のサーバーでルールに基づくプレイリストを作成します。',
    environment: 'セルフホスト：Python 3.10–3.15、PostgreSQL、Redis',
  },
  printwitness: {
    task: 'HTML から PDF への書き出しで、必要なテキスト、表の行、リンクが失われていないか確認します。',
    environment: '単体で動くデスクトップアプリ（Chromium 同梱）。署名なし',
  },
  txnstage: {
    task: '複数の接続で実際の SQLite トランザクションを 1 ステップずつ実行し、どこでブロックやデータ消失が起きるかを確認します。',
    environment: 'ローカル Web UI 付きの単一実行ファイル。macOS 版は署名なし',
  },
  collationdelta: {
    task: 'ICU、Python、Node.js を更新する前に、文字列の並び順と等価判定の変化を検出します。',
    environment: 'Python CLI。Python または Node.js の比較関数から記録',
  },
  parquetscope: {
    task: 'DuckDB が HTTP 経由で Parquet ファイルのどのバイト範囲を読むか、ファイル構造でそれがどう変わるかを確認します。',
    environment: 'Python 3.10 以降。GitHub Releases の wheel',
  },
  'gha-cache-audit': {
    task: '互換性のないファイルを再利用しかねない GitHub Actions のキャッシュキーと復元プレフィックスを見つけます。',
    environment: 'Python 3.11 以降の CLI。静的解析のみ',
  },
  samebyte: {
    task: 'GitHub Actions のワークフローが、テスト・スキャン・デプロイで同じバイト列のコンテナーイメージを使っているか確認します。',
    environment: 'Node.js 22 以降の CLI。リリースのアーカイブからインストール',
  },
  lockcone: {
    task: 'pnpm のロックファイルの変更のうち、実際に変更した依存関係から生じたものを説明します。',
    environment: 'Node.js 22.12 以降の CLI。リリースのアーカイブからインストール',
  },
  cursorproof: {
    task: 'REST API のカーソルページネーションで、抜け・重複・順序の乱れがないかテストします。',
    environment: 'Python CLI',
  },
  cancellens: {
    task: 'asyncio のキャンセルに起因するバグを、リソースの解放を確認する再実行可能なテストに変えます。',
    environment: 'Python ライブラリと pytest プラグイン',
  },
  crondelta: {
    task: '移行前に、2 つの Python cron ライブラリやバージョンでスケジュールがいつ実行されるかを比較します。',
    environment: 'Python CLI',
  },
  stalefill: {
    task: '更新後に古いデータが Redis や Valkey に再び現れる cache-aside の競合状態を再現します。',
    environment: 'CLI バイナリ。使い捨ての Redis または Valkey が必要',
  },
  exitscope: {
    task: 'ラッパーやタスクランナーが子プロセスやパイプを残さず正しく終了するか確認します。',
    environment: 'Linux 専用。Cargo でビルド',
  },
  unpackproof: {
    task: '使い捨ての Docker コンテナーで TAR 展開コマンドの回帰テストを行います。',
    environment: 'Go の CLI。Docker が必要',
  },
  bindwitness: {
    task: 'Linux でネイティブシンボルを実際に提供している共有ライブラリを確認します。',
    environment: 'glibc 搭載の Linux。amd64 と arm64 のバイナリ',
  },
  protocarry: {
    task: '古いアプリケーションがメッセージの読み書きで新しい Protobuf フィールドを保持するか確認します。',
    environment: 'macOS arm64 と Linux arm64 向け CLI バイナリ。Go のソース',
  },
  idbshift: {
    task: 'アプリの更新、ロールバック、再更新を経ても IndexedDB のデータが保たれるかテストします。',
    environment: 'Node.js と Playwright Chromium。ソースから実行',
  },
  watchconverge: {
    task: 'アトミック保存、名前変更、削除の後も、ファイル監視やインデックスがディスクと一致しているか確認します。',
    environment: 'Node.js 22.18 以降。ソースから実行',
  },
  overflowlens: {
    task: 'OpenTelemetry がリクエスト属性をオーバーフロー系列にまとめたときに、あり得るエラー率を求めます。',
    environment: 'ローカルで配信する静的ブラウザーアプリ。ファイルは手元のコンピューターから出ません',
  },
  agentkcal: {
    task: 'AI コーディングエージェントの利用履歴を手元に非公開で記録し、エネルギー消費の推定も確認できます。',
    environment: 'Node.js 24.12 以降の CLI',
  },
  'ultimate-geography': {
    name: 'Ultimate Geography（RU/EN フォーク）',
    task: 'Anki で世界の地理を学習。7 言語のデッキ、出典付きの修正、発音ガイド付き。',
    environment: 'Anki デッキパッケージ',
    forkNote: 'コミュニティデッキ Ultimate Geography のフォーク。各言語版と修正を追加しています。',
  },
  'breathly-app': {
    name: 'Breathly（フォーク）',
    task: 'Android の呼吸エクササイズ。このフォークでプリセット、開始の待ち時間、Health Connect への書き出しを追加。',
    environment: 'React Native アプリ。このフォークのリリースはなし',
    forkNote: '機能を追加したフォーク。ここではビルドを公開していません。',
  },
};
