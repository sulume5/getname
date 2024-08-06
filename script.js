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
        //const rect = overlay.getBoundingClientRect();
        //canvas.width = rect.width;
        //canvas.height = rect.height;
        video.videoWidth = canvas.width;
        video.videoHeight = canvas.height;
        context.drawImage(video, 0, 0, 30, 180, 0, 0, 30, 180);

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
