import React, { useState } from 'react';
import { uploadReceipt } from '../api';

const UploadReceipt = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const data = await uploadReceipt(file);
      setResult(data);
    } catch (error) {
      alert('Eroare la OCR: ' + error.message);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Trimite la OCR</button>

      {result && (
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxHeight: 400, overflowY: 'auto', background: '#eee', padding: 10 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default UploadReceipt;
