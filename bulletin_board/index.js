// https://db.tatsunohs.com/LiMe/bulletin/にPOST通信で掲示板データのリクエストを送信する
// レスポンスはJSON形式で返ってくる
// このファイルは、そのレスポンスを受け取り、掲示板のデータを表示する

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
            // data = [{title: 'タイトル', content: '内容', files: [{name: 'ファイル名', url: 'ファイルのURL'}], date: '日付'}, ...]
            let bulletin_board = document.getElementById('bulletin_board');
            let bulletin_board_data = data['bulletin_board_data'];
            for (let i = 0; i < bulletin_board_data.length; i++) {
                let bulletin_board_data_element = document.createElement('div');
                bulletin_board_data_element.className = 'bulletin_board_data';
                bulletin_board_data_element.innerHTML = '<div class="bulletin_board_data_title">' + bulletin_board_data[i]['title'] + '</div><div class="bulletin_board_data_content">' + bulletin_board_data[i]['content'] + '</div>';
                bulletin_board.appendChild(bulletin_board_data_element);
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

// ページが読み込まれたら、掲示板のデータを表示する
window.onload = function () {
    // getBulletinBoardData();
}