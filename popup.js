// Initialize button with user's preferred color
// ユーザーの好みの色でボタンを初期化する
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', ({ color }) => {
    changeColor.style.backgroundColor = color;
});
