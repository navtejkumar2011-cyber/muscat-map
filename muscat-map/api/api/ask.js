// Serverless function (Vercel). Keeps your AI key secret on the server.
// Set GEMINI_API_KEY (and optionally GEMINI_MODEL) in Vercel -> Settings -> Environment Variables.
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { name = "", facts = "", question = "", lang = "en" } = req.body || {};
  if (!question.trim()) return res.status(400).json({ error: "No question" });

  const names = { en: "English", hi: "Hindi", fr: "French" };
  const prompt =
    "You are a friendly local guide inside a map app for Muscat, Oman.\n" +
    "The user selected this place: " + String(name).slice(0, 200) + "\n" +
    "Known facts: " + String(facts).slice(0, 2500) + "\n\n" +
    "Rules: Answer in the same language the question is written in (English, Hindi or French); " +
    "if unclear use " + (names[lang] || "English") + ". Use the known facts plus well-established general " +
    "knowledge. If you are not sure, say so briefly instead of guessing. Maximum 3 short sentences. " +
    "Plain text only, no markdown.\n\nQuestion: " + String(question).slice(0, 500);

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash"; // check Google AI Studio for the current free model name
  try {
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY || "" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const j = await r.json();
    const answer = j && j.candidates && j.candidates[0] && j.candidates[0].content &&
      j.candidates[0].content.parts && j.candidates[0].content.parts[0].text;
    if (!answer) return res.status(502).json({ error: (j.error && j.error.message) || "No answer" });
    res.status(200).json({ answer });
  } catch (e) {
    res.status(500).json({ error: "Request failed" });
  }
};
