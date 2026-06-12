export const analyzeResume = async (req, res) => {

  try {

    const { resumeText } = req.body;

    const text =
      (resumeText || "").toLowerCase();

    const atsKeywords = [

      "flutter",
      "firebase",
      "dart",
      "rest api",
      "node.js",
      "react",
      "mongodb",
      "mysql",
      "docker",
      "aws",
      "git",
      "github",
      "ci/cd",
    ];

    const foundKeywords = [];

    const missingKeywords = [];

    for (const keyword of atsKeywords) {

      if (text.includes(keyword)) {

        foundKeywords.push(keyword);

      } else {

        missingKeywords.push(keyword);
      }
    }

    let score = Math.round(

      (foundKeywords.length /
          atsKeywords.length) *
          100,
    );

    if (score < 20) {
      score = 20;
    }

    const grammarMistakes = [];

    if (
      text.includes(
        "develop application",
      )
    ) {

      grammarMistakes.push(
        "Develop application → Developed application",
      );
    }

    if (
      text.includes(
        "build app",
      )
    ) {

      grammarMistakes.push(
        "Build app → Built application",
      );
    }

    const suggestions = [];

    if (
      missingKeywords.includes(
        "docker",
      )
    ) {

      suggestions.push(
        "Add Docker experience",
      );
    }

    if (
      missingKeywords.includes(
        "aws",
      )
    ) {

      suggestions.push(
        "Add AWS cloud skills",
      );
    }

    if (
      missingKeywords.includes(
        "ci/cd",
      )
    ) {

      suggestions.push(
        "Mention CI/CD pipeline knowledge",
      );
    }

    if (
      !text.includes(
        "github",
      )
    ) {

      suggestions.push(
        "Add GitHub profile link",
      );
    }

    if (
      !text.includes(
        "achievement",
      )
    ) {

      suggestions.push(
        "Add measurable achievements",
      );
    }

    res.status(200).json({

      success: true,

      score,

      foundKeywords,

      missingKeywords,

      grammarMistakes,

      suggestions,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

