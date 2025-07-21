export async function extractTextWithOCRSpace(imageFile) {
  const OCR_API_KEY = "K88532637488957"; // cheia ta gratuită OCR.space

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("language", "eng");
  formData.append("isOverlayRequired", "false");

  const response = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    headers: {
      apikey: OCR_API_KEY,
    },
    body: formData,
  });

  const data = await response.json();

  if (data.IsErroredOnProcessing) {
    throw new Error(data.ErrorMessage[0]);
  }

  return data.ParsedResults[0].ParsedText;
}
