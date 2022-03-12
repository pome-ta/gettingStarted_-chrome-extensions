# gettingStarted_chrome-extensions


chrome-extensions を「完全に理解した」する。

参照ページの機械翻訳も同時に行う



## Repository

[chrome-extensions-samples/tutorials/getting-started/](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/getting-started)

## Chrome Developers

[Getting started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)



# Getting started | 入門

> Published on Friday, February 28, 2014 • Updated on Thursday, July 22, 2021


拡張機能は、異なるがまとまりのあるコンポーネントで構成されています。 コンポーネントには、[`background scripts`](https://developer.chrome.com/docs/extensions/mv3/service_workers/)、[`content scripts`](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)、[`options page`](https://developer.chrome.com/docs/extensions/mv3/options/)、[`UI elements`](https://developer.chrome.com/docs/extensions/mv3/user_interface/)、およびさまざまなロジックファイルを含めることができます。 拡張コンポーネントは、HTML、CSS、JavaScriptなどのWeb開発テクノロジを使用して作成されます。 拡張機能のコンポーネントはその機能に依存し、すべてのオプションを必要としない場合があります。


このチュートリアルでは、ユーザーが現在フォーカスされているページの背景色を変更できる拡張機能を構築します。 拡張プラットフォームのコンポーネントの多くを使用して、それらの関係の概要を示します。


まず、拡張子のファイルを保持する新しいディレクトリを作成します。


完成した拡張機能は [ここ](https://storage.googleapis.com/web-dev-uploads/file/WlD8wC6g8khYWPJUsQceQkhXSlv1/SVxMBoc5P3f6YV3O7Xbu.zip) からダウンロードできます。



## Create the manifest | マニフェストを作成する

拡張機能は[マニフェスト](https://developer.chrome.com/docs/extensions/mv3/manifest/)から始まります。 `manifest.json`というファイルを作成し、次のコードを含めます。

``` manifest.json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3
}
```

## Load an unpacked extension | 解凍された拡張機能をロードする

マニフェストファイルを保持するディレクトリは、現在の状態の開発者モードで拡張機能として追加できます。 解凍した拡張機能を開発者モードでロードするには、次の手順に従います。

1. `chrome：//extensions` に移動して[拡張機能の管理]ページを開きます。
    - または、[拡張機能]メニューボタンをクリックし、メニューの下部にある[拡張機能の管理]を選択して、このページを開きます。
    - または、Chromeメニューをクリックし、[その他のツール]にカーソルを合わせて[拡張機能]を選択して、このページを開きます。
1. 開発者モードの横にあるトグルスイッチをクリックして、開発者モードを有効にします。
1. [解凍したものをロード]ボタンをクリックして、拡張ディレクトリを選択します。


Ta-da! 拡張機能は正常にインストールされました。 マニフェストにはアイコンが含まれていなかったため、拡張機能の汎用アイコンが作成されます。



## Add functionality | 機能を追加する


拡張機能がインストールされましたが、何をすべきか、いつ実行するかを指示していないため、現在は何も実行されていません。 背景色の値を保存するコードを追加して、これを修正しましょう。


### Register the background script in the manifest | マニフェストにバックグラウンドスクリプトを登録する


他の多くの重要なコンポーネントと同様に、バックグラウンドスクリプトはマニフェストに登録する必要があります。 マニフェストにバックグラウンドスクリプトを登録すると、参照するファイルとそのファイルの動作が拡張機能に通知されます。


``` manifest.json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  }
}
```



Chromeは、拡張機能にServiceWorkerが含まれていることを認識します。 拡張機能をリロードすると、Chromeは指定されたファイルをスキャンして、リッスンする必要のある重要なイベントなどの追加の手順を探します。

### Create the background script | background script を作成する



