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




















// import express from "express";

// const router = express.Router();

// router.post("/ats-score", async (req, res) => {
//   try {
//     const { resumeText, jobDescription } = req.body;

//     if (!resumeText || resumeText.trim().length < 50) {
//       return res.status(400).json({
//         error: "Resume text is empty or too short",
//       });
//     }

//     if (!process.env.GROQ_API_KEY) {
//       return res.status(500).json({
//         error: "Groq API key is missing",
//       });
//     }

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           // model: "llama-3.1-8b-instant",
//           model: "llama-3.3-70b-versatile",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are an expert ATS resume evaluator, technical recruiter, and resume writer. Return only valid JSON. Do not add explanation.",
//             },
//             {
//               role: "user",
//               content: `
// Analyze the following resume against the provided job description (if any). Be strict, realistic, and constructive.

// Return ONLY this JSON format:
// {
//   "atsScore": 75,
//   "jobMatchScore": 60,
//   "scoreBreakdown": {
//     "Keywords": 70,
//     "Skills": 80,
//     "Experience": 75,
//     "Education": 90,
//     "Formatting": 85
//   },
//   "heatMap": {
//     "Contact Info": 90,
//     "Summary": 80,
//     "Skills": 85,
//     "Experience": 70,
//     "Education": 95,
//     "Projects": 75
//   },
//   "detectedSkills": ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
//   "missingSkills": ["TypeScript", "AWS", "Docker"],
//   "missingJobKeywords": ["microservices", "CI/CD", "Docker"],
//   "suggestions": [
//     "Add more quantifiable metrics to your experience section.",
//     "Include missing technical keywords from the job description.",
//     "Improve project descriptions by focusing on impact."
//   ],
//   "rewriteSuggestions": [
//     "before: Worked on building the backend API with Node.js., after: Architected and implemented high-performance RESTful APIs using Node.js, reducing query response times by 30% through caching."
//   ],
//   "readingTimeMessage": "Recruiter can understand your resume in 35 seconds."
// }

// Rules for scoring and fields:
// - atsScore (0-100): Measure overall resume quality, organization, and completeness.
// - jobMatchScore (0-100): Measure matching relevance of the resume to the job description. If job description is empty or not provided, set jobMatchScore to 0.
// - scoreBreakdown: Section scores out of 100 for Keywords, Skills, Experience, Education, Formatting.
// - heatMap: Section scores out of 100 for Contact Info, Summary, Skills, Experience, Education, Projects. (Scores: 75-100 strong, 45-74 average, 0-44 weak).
// - detectedSkills: List of skills found in the resume.
// - missingSkills: List of key skills from the job description that are missing in the resume. If job description is empty, set to [].
// - missingJobKeywords: List of keywords/industry terms from the job description missing in the resume. If job description is empty, set to [].
// - suggestions: Actionable, specific tips to improve the resume.
// - rewriteSuggestions: A list of string rewrite recommendations. Each string must be formatted exactly as: "before: [original text], after: [rewritten text]" where [original text] and [rewritten text] are actual sections of the resume modified to be stronger.
// - readingTimeMessage: A short, friendly message stating the estimated reading time (e.g., "Recruiter can understand your resume in 45 seconds.").

// Job Description:
// ${jobDescription || "No job description provided."}

// Resume text:
// ${resumeText}
// `,
//             },
//           ],
//           temperature: 0.2,
//         }),
//       },
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return res.status(response.status).json({
//         error: data.error?.message || "Groq API error",
//       });
//     }

//     const content = data.choices?.[0]?.message?.content;

//     if (!content) {
//       return res.status(500).json({
//         error: "No response from Groq",
//       });
//     }

//     // Clean JSON content if it has markdown formatting wrapper
//     // let jsonText = content.trim();
//     // if (jsonText.startsWith("```")) {
//     //   jsonText = jsonText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
//     // }
//     // const start = jsonText.indexOf("{");
//     // const end = jsonText.lastIndexOf("}");
//     // if (start >= 0 && end > start) {
//     //   jsonText = jsonText.substring(start, end + 1);
//     // }

//     let jsonText = content.trim();

// jsonText = jsonText.replace(/```json/gi, "");
// jsonText = jsonText.replace(/```/g, "");
// jsonText = jsonText.trim();

// const start = jsonText.indexOf("{");
// const end = jsonText.lastIndexOf("}");

// if (start !== -1 && end !== -1) {
//   jsonText = jsonText.substring(start, end + 1);
// }

//     const parsed = JSON.parse(jsonText);

//     return res.json({
//       atsScore: parsed.atsScore ?? parsed.score ?? 0,
//       score: parsed.atsScore ?? parsed.score ?? 0,
//       jobMatchScore: parsed.jobMatchScore ?? 0,
//       scoreBreakdown: parsed.scoreBreakdown || {
//         "Keywords": 0,
//         "Skills": 0,
//         "Experience": 0,
//         "Education": 0,
//         "Formatting": 0,
//       },
//       heatMap: parsed.heatMap || {
//         "Contact Info": 0,
//         "Summary": 0,
//         "Skills": 0,
//         "Experience": 0,
//         "Education": 0,
//         "Projects": 0,
//       },
//       suggestions: parsed.suggestions || [],
//       detectedSkills: parsed.detectedSkills || [],
//       missingSkills: parsed.missingSkills || [],
//       missingJobKeywords: parsed.missingJobKeywords || parsed.missingKeywords || [],
//       rewriteSuggestions: parsed.rewriteSuggestions || [],
//       readingTimeMessage: parsed.readingTimeMessage || parsed.readingTime || "",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: "Failed to analyze resume",
//     });
//   }
// });

// export default router;