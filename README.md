# gettingStarted_chrome-extensions


chrome-extensions を「完全に理解した」する。

参照ページの機械翻訳も同時に行う



## Repository

[chrome-extensions-samples/tutorials/getting-started/](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials/getting-started)

## Chrome Developers

[Getting started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)



# Getting started | 入門

> Published on Friday, February 28, 2014 • Updated on Thursday, July 22, 2021


拡張機能は、異なるがまとまりのあるコンポーネントで構成されています。 コンポーネントには、[background scripts](https://developer.chrome.com/docs/extensions/mv3/service_workers/)、[content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)、[options page](https://developer.chrome.com/docs/extensions/mv3/options/)、[UI elements](https://developer.chrome.com/docs/extensions/mv3/user_interface/)、およびさまざまなロジックファイルを含めることができます。 拡張コンポーネントは、HTML、CSS、JavaScriptなどのWeb開発テクノロジを使用して作成されます。 拡張機能のコンポーネントはその機能に依存し、すべてのオプションを必要としない場合があります。


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
+  "background": {
+    "service_worker": "background.js"
+  }
}
```



Chromeは、拡張機能にServiceWorkerが含まれていることを認識します。 拡張機能をリロードすると、Chromeは指定されたファイルをスキャンして、リッスンする必要のある重要なイベントなどの追加の手順を探します。

### Create the background script | background script を作成する


この拡張機能は、インストールされるとすぐに永続変数からの情報を必要とします。 まず、[`runtime.onInstalled`](https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled)のリスニングイベントをバックグラウンドスクリプトに含めます。 `onInstalled` リスナー内で、拡張機能はストレージAPIを使用して値を設定します。 これにより、複数の拡張コンポーネントがその値にアクセスして更新できるようになります。 拡張機能のディレクトリ内に`background.js` という名前のファイルを作成し、次のコードを追加します。



``` background.js
// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
```

### Add the storage permission | ストレージ権限を追加します

[storage](https://developer.chrome.com/docs/extensions/reference/storage/)APIを含むほとんどのAPIは、拡張機能がそれらを使用するために、マニフェストの「`permissions`」フィールドに登録する必要があります。


``` manifest.json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"]
}
```


### Inspect the background script | バックグラウンドスクリプトを検査します


拡張機能管理ページに戻り、[再読み込み]リンクをクリックします。 新しいフィールドである[ビューの検査]が、青いリンクのサービスワーカーで利用できるようになります。


リンクをクリックして、背景スクリプトのコンソールログ「`Default background color set to green`」を表示します


## Introduce a user interface

拡張機能には、さまざまな形式の[user interface](https://developer.chrome.com/docs/extensions/mv3/user_interface/)を含めることができます。 これは[popup](https://developer.chrome.com/docs/extensions/mv3/user_interface/#popup)を使用します。  `popup.html` という名前のファイルを作成し、拡張機能のディレクトリに追加します。 この拡張機能は、ボタンを使用して背景色を変更します。


``` popup.html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="button.css">
  </head>
  <body>
    <button id="changeColor"></button>
  </body>
</html>
```



バックグラウンドスクリプトと同様に、Chromeが拡張機能のポップアップに表示するには、このファイルをマニフェストで宣言する必要があります。 これを行うには、マニフェストに[`action`]()を追加し、`popup.html`をアクションの`default_popup`として設定します。


``` manifest.json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html"
  }
}
```



このポップアップのHTMLは、`button.css`という名前の外部CSSファイルを参照します。 拡張機能のディレクトリに別のファイルを追加し、適切な名前を付けて、次のコードを追加します。



``` button.css
button {
  height: 30px;
  width: 30px;
  outline: none;
  margin: 10px;
  border: none;
  border-radius: 2px;
}

button.current {
  box-shadow: 0 0 0 2px white,
              0 0 0 4px black;
}
```


ツールバーアイコンの指定も、`default_icons`フィールドの`action`に含まれています。 [ここ](https://storage.googleapis.com/web-dev-uploads/file/WlD8wC6g8khYWPJUsQceQkhXSlv1/wy3lvPQdeJn4iqHmI0Rp.zip)から画像フォルダをダウンロードして解凍し、拡張機能のディレクトリに配置します。 マニフェストを更新して、拡張機能が画像の使用方法を認識できるようにします。



``` manifest.json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "/images/get_started16.png",
      "32": "/images/get_started32.png",
      "48": "/images/get_started48.png",
      "128": "/images/get_started128.png"
    }
  }
}
```


拡張機能は、拡張機能の管理ページ、権限の警告、ファビコンにも画像を表示します。 これらの画像は、マニフェストの[`icons`]()の下に示されています。



``` manifest.json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "/images/get_started16.png",
      "32": "/images/get_started32.png",
      "48": "/images/get_started48.png",
      "128": "/images/get_started128.png"
    }
  },
  "icons": {
    "16": "/images/get_started16.png",
    "32": "/images/get_started32.png",
    "48": "/images/get_started48.png",
    "128": "/images/get_started128.png"
  }
}
```


デフォルトでは、拡張機能は拡張機能メニュー（パズルのピース）に表示されます。 拡張機能を固定すると、ツールバーにアイコンが表示されます。


この段階で拡張機能を再ロードすると、デフォルトのプレースホルダーではなく、提供されたアイコンが含まれます。アクションをクリックすると、デフォルトの色を示すボタンを表示するポップアップが開きます。


ポップアップUIの最後のステップは、ボタンに色を追加することです。 次のコードを含む`popup.js`という名前のファイルを作成し、拡張機能のディレクトリに追加します。


``` popup.js
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});
```


このコードは、`popup.html`からボタンを取得し、ストレージから色の値を要求します。 次に、ボタンの背景として色を適用します。 `popup.html`の`popup.js`にスクリプトタグを含めます。


``` popup.html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="button.css">
  </head>
  <body>
    <button id="changeColor"></button>
    <script src="popup.js"></script>
  </body>
</html>
```



拡張機能をリロードして、緑色のボタンを表示します。



