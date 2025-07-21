export async function classifyTextWithOpenAI(text) {
  const OPENAI_API_KEY = "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"; // 🔐

  const prompt = `
Text extras de pe bon:
${text}

Vreau să identifici doar produsele cumpărate de pe bon și să le încadrezi în una din următoarele categorii: food, clothes, bills, transport, entertainment. Nu include alte informații de pe bon.

Returnează răspunsul în acest format JSON:
{
  "food": [],
  "clothes": [],
  "bills": [],
  "transport": [],
  "entertainment": []
}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
 // sau gpt-3.5-turbo dacă nu ai acces
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Răspuns invalid de la OpenAI:", data);
      return null;
    }

    const rawContent = data.choices[0].message.content;
    const parsed = JSON.parse(rawContent);
    return parsed;
  } catch (err) {
    console.error("Eroare OpenAI:", err);
    return null;
  }
}