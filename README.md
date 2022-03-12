# gettingStarted_chrome-extensions


chrome-extensions を「完全に理解した」する。

参照ページの機械翻訳も同時に行う



## Repository

[chrome-extensions-samples/tutorials/getting-started/](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/getting-started)

## Chrome Developers

[Getting started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)



# Getting started

> Published on Friday, February 28, 2014 • Updated on Thursday, July 22, 2021


拡張機能は、異なるがまとまりのあるコンポーネントで構成されています。 コンポーネントには、[`background scripts`](https://developer.chrome.com/docs/extensions/mv3/service_workers/)、[`content scripts`](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)、[`options page`](https://developer.chrome.com/docs/extensions/mv3/options/)、[`UI elements`](https://developer.chrome.com/docs/extensions/mv3/user_interface/)、およびさまざまなロジックファイルを含めることができます。 拡張コンポーネントは、HTML、CSS、JavaScriptなどのWeb開発テクノロジを使用して作成されます。 拡張機能のコンポーネントはその機能に依存し、すべてのオプションを必要としない場合があります。


このチュートリアルでは、ユーザーが現在フォーカスされているページの背景色を変更できる拡張機能を構築します。 拡張プラットフォームのコンポーネントの多くを使用して、それらの関係の概要を示します。


まず、拡張子のファイルを保持する新しいディレクトリを作成します。


完成した拡張機能は [ここ](https://storage.googleapis.com/web-dev-uploads/file/WlD8wC6g8khYWPJUsQceQkhXSlv1/SVxMBoc5P3f6YV3O7Xbu.zip) からダウンロードできます。



## Create the manifest

拡張機能は[マニフェスト](https://developer.chrome.com/docs/extensions/mv3/manifest/)から始まります。 `manifest.json`というファイルを作成し、次のコードを含めます。

``` manifest.json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3
}
```
