export async function uploadReceipt(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5000/analyze-receipt", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error("OCR failed: " + error);
  }

  return await response.json();
}
