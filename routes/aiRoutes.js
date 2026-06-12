import express from "express";

const router = express.Router();

router.post("/ats-score", async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        error: "Resume text is empty or too short",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "Groq API key is missing",
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are an ATS resume evaluator. Return only valid JSON. Do not add explanation.",
            },
            {
              role: "user",
              content: `
Analyze this resume and give only an ATS score from 0 to 100.

Return only this JSON:
{"score": 75}

Check:
- Contact information
- Education
- Skills
- Experience
- Projects
- ATS keyword quality
- Formatting clarity
- Measurable achievements

Resume text:
${resumeText}
`,
            },
          ],
          temperature: 0.2,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Groq API error",
      });
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({
        error: "No response from Groq",
      });
    }

    const parsed = JSON.parse(content);

    return res.json({
      score: parsed.score,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to analyze resume",
    });
  }
});

export default router;