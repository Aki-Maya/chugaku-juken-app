# 中学受験対策アプリ

Google Sheetsと連携した中学受験対策の知識定着アプリです。

## 機能

- 科目選択（社会・理科・国語）
- 10問1セットの学習セッション
- 4択問題の表示と解答
- 即座の正誤判定と解説表示
- 学習履歴の保存

## 技術スタック

- Next.js 14 + TypeScript
- Tailwind CSS
- Google Sheets API v4
- LocalStorage

## セットアップ

1. 依存関係のインストール:
   npm install

2. 環境変数の設定:
   .env.local.example を .env.local にコピーして設定

3. 開発サーバーの起動:
   npm run dev

## Google Sheets API設定

1. Google Cloud Consoleでプロジェクト作成
2. Sheets API v4を有効化
3. APIキーを作成
4. .env.localに設定

## データ構造

スプレッドシートID: 1ZoV6Xv0z_uQdWFzpfpdLr2wTwCoFFP_u5bcupJx6vYo

各シート（社会・理科・国語）の構造:
- A列: 問題番号
- B列: 問題文
- C-F列: 選択肢1-4
- G列: 正解番号(1-4)
- H列: 解説

## ライセンス

MIT License
