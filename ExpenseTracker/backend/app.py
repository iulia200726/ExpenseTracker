from flask import Flask, request, jsonify
from flask_cors import CORS
from mindee import Client, product

app = Flask(__name__)
CORS(app)

# Inițializează clientul Mindee cu cheia ta API
mindee_client = Client(api_key="7a1e1e070bdb51afd059d9a20712f4ab")

@app.route('/analyze-receipt', methods=['POST'])
def analyze_receipt():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    # Citește fișierul încărcat în memorie (bytes)
    file_bytes = file.read()

    # Creează inputul pentru Mindee din bytes
    input_doc = mindee_client.source_from_bytes(file_bytes)

    try:
        # Procesează imaginea cu Mindee ReceiptV5
        result = mindee_client.parse(
            product.ReceiptV5,
            input_doc,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Returnează răspunsul complet în JSON (raw_dict conține tot ce vine)
    return jsonify(result.document.raw_dict())

if __name__ == '__main__':
    app.run(debug=True)
