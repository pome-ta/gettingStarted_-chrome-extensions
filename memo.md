# 作業時のメモ

# 📝 2022/03/12


## Service Worker

[# Inspect the background script](https://developer.chrome.com/docs/extensions/mv3/getstarted/#inspect-background)


- `"permissions": ["storage"]` して、[拡張機能画面](chrome://extensions/)からコンソール確認
    - 「ビューを検証 Service Worker」 のハイパーリンクをクリックするとDevツールが起動し、Console で確認できる
        - 設定前にエラー出てた、読み込み問題なくてもエラーが出続けてた
            - 事前内容がエラーだった
        - 一度削除して、再度読み込んだらエラー消えた
    - リロードボタンを押すと毎回log が出る


