function compileMarkdown(text, element) {
    // 法外なタグを削除する
    text = text.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quto;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;');
    // マークダウンをHTMLに変換する
    let lines = text.split('\n');
    let html = '';
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // 見出し
        if (line.startsWith('# ')) {
            html += '<h1>' + line.slice(2) + '</h1>';
        } else if (line.startsWith('## ')) {
            html += '<h2>' + line.slice(3) + '</h2>';
        } else if (line.startsWith('### ')) {
            html += '<h3>' + line.slice(4) + '</h3>';
        }
        // 強調
        else if (line.startsWith('**')) {
            html += '<strong>' + line.slice(2) + '</strong>';
        } else if (line.startsWith('*')) {
            html += '<em>' + line.slice(1) + '</em>';
        }
        // リスト
        else if (line.startsWith('- ')) {
            html += '<li>' + line.slice(2) + '</li>';
        }
        // リンク
        else if (line.startsWith('[')) {
            let link = line.slice(1).split('](');
            html += '<a href="' + link[1].slice(0, -1) + '">' + link[0] + '</a>';
        }
        // 画像
        else if (line.startsWith('![')) {
            let image = line.slice(2).split('](');
            html += '<img src="' + image[1].slice(0, -1) + '" alt="' + image[0] + '">';
        }
        // その他
        else {
            html += '<p>' + line + '</p>';
        }
    }
    element.innerHTML = html;
}

let loadedPanelsId = [];// 表示済みのパネルのIDを格納する配列
// https://db.tatsunohs.com/LiMe/bulletin/にPOST通信で掲示板データのリクエストを送信する
// レスポンスはJSON形式で返ってくる
// そのレスポンスを受け取り、掲示板のデータを表示する
function getBulletinBoardData() {
    // fetch APIを使って、掲示板データを取得する
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_name: 'LiMe',
            product_version: '1.0.0',
            type: 'bulletin_board',
            request: 'get'
        })
    };
    fetch('https://db.tatsunohs.com/', options)// 掲示板のデータを取得する
        .then(response => response.json())
        .then(data => {
            // data = [{content: '内容', date: '日付', id: '103f'}, ...]
            let board = document.getElementById('board');
            let boardData = data['bulletin_board_data'];
            for (let i = 0; i < board_data.length; i++) {
                // すでに表示済みのパネルは表示しない
                if (loadedPanelsId.includes(boardData[i]['id'])) {
                    continue;
                }
                let bullPanel = document.createElement('div');
                bullPanel.className = 'bullPanel';
                let bullContent = document.createElement('div');
                bullContent.className = 'bullContent';
                compileMarkdown(boardData[i]['content'], bullContent);
                let bullDate = document.createElement('p');
                bullDate.innerHTML = boardData[i]['date'];
                bullPanel.appendChild(bullContent);
                bullPanel.appendChild(bullDate);
                board.appendChild(bullPanel);
                // 表示済みのパネルのIDを格納する
                loadedPanelsId.push(boardData[i]['id']);
            }
        })
        .catch(error => {
            // データを取得できなかったら、エラーを表示する
            alert('掲示板のデータを取得できませんでした。ページを更新してください。\nそれでも解決しない場合は、管理者にお問い合わせください。');
            fetch('https://db.tatsunohs.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_name: 'LiMe',
                    product_version: '1.0.0',
                    type: 'bulletin_board',
                    request: 'error',
                    error: error
                })
            });
        });
    // 1分ごとに掲示板のデータを更新する
    setTimeout(getBulletinBoardData, 60000);
}
// 掲示板パネルをスクロールで回転させながら表示する
function rotateBulletinPanel() {
    let heights = [];
    let scrollH = window.scrollY;// スクロールされた高さ(windowのページ全体に対する位置)
    let windowH = window.innerHeight;// ウィンドウの高さ
    let panels = document.getElementsByClassName('bullPanel');
    Array.from(panels).forEach(panel => {
        let panelH = panel.getBoundingClientRect().top;// 要素のwindowに対する高さ(左上の座標)
        if (windowH * 0.6 < panelH && windowH > panelH) {
            // 要素がウィンドウの下から0~40%の位置にある場合
            let rotate = -225 / windowH * panelH + 135;
            panel.style.transform = 'rotateX(' + rotate + 'deg)';
        }
    });
}

// ページが読み込まれたら、掲示板のデータを表示する
window.onload = function () {
    // getBulletinBoardData();
    rotateBulletinPanel();
}

// スクロールされたらイベントを発火させる
window.onscroll = function () {
    rotateBulletinPanel();
}