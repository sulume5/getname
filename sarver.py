from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

@app.route('/upload', methods=['POST'])
def upload_file():
    data = request.get_json()
    image_data = data.get('image')
    if not image_data:
        return jsonify({'message': 'No image data provided'}), 400

    # 画像データURLから画像データを抽出
    header, encoded = image_data.split(',', 1)
    image_bytes = base64.b64decode(encoded)
    
    # 画像をPILで開く
    image = Image.open(io.BytesIO(image_bytes))

    # 保存先のファイルパス
    processed_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'drivers_license_photo.png')

    # 画像を保存
    image.save(processed_image_path)

    # 処理結果のメッセージを生成
    result_text = f"Image uploaded successfully. Processed image saved as: {processed_image_path}"

    # メッセージを返す
    return jsonify({'message': result_text})

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)