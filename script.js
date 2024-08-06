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
    });
});
