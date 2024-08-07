document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const captureButton = document.getElementById('capture');
    const overlay = document.querySelector('.overlay');

    // カメラのストリームを取得
    navigator.mediaDevices.getUserMedia({ video:{ facingMode: 'environment' }})
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(error) {
            console.error('カメラのアクセスに失敗しました:', error);
        });

    captureButton.addEventListener('click', function() {
        const overlayRect = overlay.getBoundingClientRect();
        const videoRect = video.getBoundingClientRect();

         // カメラ映像から指定された範囲をキャンバスに描画
         canvas.width = overlayRect.width;
         canvas.height = overlayRect.height;

         context.drawImage(video,
         (overlayRect.left - videoRect.left) * video.videoWidth / videoRect.width,
      　  (overlayRect.top - videoRect.top) * video.videoHeight / videoRect.height,
      　  overlayRect.width * video.videoWidth / videoRect.width,
      　  overlayRect.height * video.videoHeight / videoRect.height,
                    0, 0, overlayRect.width, overlayRect.height
                );

        // 画像を表示または保存する処理をここに追加
        const img = canvas.toDataURL('image/png');
        console.log(img); // Base64の画像データURLをログに表示

        // ダウンロードリンクを作成して画像をダウンロードする
        const link = document.createElement('a');
        link.href = img;
        link.download = 'photo.png';
        link.click();
        fetch('/upload', { // 画像をサーバーに送信
            /**JavaScriptのfetch APIを使って、指定されたURL（ここでは/upload）にリクエストを送信します。fetchは、ネットワークリクエストを行うためのモダンな方法です。
            効果: 指定したURLに対してリクエストが送信されます。 */
            method: 'POST',
            /**意味: HTTPメソッドとしてPOSTを指定しています。POSTメソッドは、リソースを作成するためにサーバーにデータを送信する場合に使用されます。
            効果: サーバーにデータを送信し、新しいリソースを作成するリクエストを行います。 */
            headers: {
                'Content-Type': 'application/json',
            },
            /**意味: リクエストヘッダーを設定します。ここでは、Content-Typeヘッダーをapplication/jsonに設定しています。これは、リクエストボディのデータ形式がJSONであることを示します。
            効果: サーバーがリクエストボディのデータ形式を正しく解釈できるようになります。 */
            body: JSON.stringify({ image: imgData })
            /**意味: リクエストボディに送信するデータを指定します。ここでは、JavaScriptオブジェクト { image: imgData } をJSON文字列に変換して送信します。
            効果: imgDataという名前のフィールドに画像データ（Base64エンコードされた画像データURL）を含むJSONオブジェクトが送信されます。 */
        })
        .then(response => response.json())
        /**意味: リクエストが成功した場合、サーバーからのレスポンスをJSON形式にパースします。
        効果: サーバーから返されたレスポンスボディがJSON形式である場合、それをJavaScriptオブジェクトに変換します。 */
        .then(data => {
            /**意味: 前の.thenでパースされたJSONデータを使って次の処理を行います。
            効果: サーバーからのレスポンスデータを使用して、ウェブページ上の結果を表示します。 */
            // サーバーからのメッセージを表示
            resultDiv.innerHTML = `<p>${data.message}</p>`;
            /**意味: サーバーからのレスポンスデータ内のmessageフィールドをウェブページ上のresultDiv要素に表示します。
            効果: サーバーからのメッセージがユーザーに表示されます。 */
        })
        .catch(error => console.error('Error:', error));
        /**意味: リクエストが失敗した場合にエラーハンドリングを行います。
        効果: コンソールにエラーメッセージを表示します。 */
    });
});
