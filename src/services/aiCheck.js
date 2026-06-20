// const Anthropic = require("@anthropic-ai/sdk");

// const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// async function runVisibilityCheck({ businessName, location, category }) {
//   const query = `best ${category} in ${location}`;

//   const systemPrompt = `You are an AI visibility auditor. A user asks you: "${query}".
// Answer exactly as a consumer AI assistant would — list the top shops/businesses you would recommend.
// Then, on a new line starting with "---AUDIT---", analyse whether "${businessName}" appeared in your answer.
// Format the audit section as JSON:
// {
//   "isVisible": true | false,
//   "competitorsMentioned": ["name1", "name2"],
//   "fixes": ["fix suggestion 1", "fix suggestion 2"]
// }
// The fixes array should contain 3-5 actionable steps the business owner can take to improve their AI visibility.`;

//   const response = await client.messages.create({
//     model: "claude-opus-4-8",
//     max_tokens: 1024,
//     messages: [{ role: "user", content: query }],
//     system: systemPrompt,
//   });

//   const fullText = response.content
//     .filter((b) => b.type === "text")
//     .map((b) => b.text)
//     .join("");

//   const [aiResponse, auditRaw] = fullText.split("---AUDIT---");

//   let audit = { isVisible: false, competitorsMentioned: [], fixes: [] };
//   try {
//     audit = JSON.parse(auditRaw.trim());
//   } catch {
//     audit.isVisible = aiResponse
//       .toLowerCase()
//       .includes(businessName.toLowerCase());
//     audit.fixes = [
//       "Complete your Google Business Profile with accurate name, address, and phone number.",
//       "Accumulate more genuine customer reviews (aim for 50+ with 4.5★ average).",
//       "Respond to all reviews, especially negative ones.",
//       "Add detailed business description, photos, and operating hours.",
//       "Ensure your business is listed on JustDial, IndiaMART, and other local directories.",
//     ];
//   }

//   return {
//     isVisible: audit.isVisible,
//     aiResponse: aiResponse.trim(),
//     competitorsMentioned: audit.competitorsMentioned || [],
//     fixes: audit.fixes || [],
//   };
// }

// module.exports = { runVisibilityCheck };


async function runVisibilityCheck({ businessName, location, category }) {
  const isVisible = Math.random() > 0.5;
  return {
    isVisible,
    aiResponse: `Here are the best ${category}s in ${location}: Some Shop, Another Store, Big Traders.`,
    competitorsMentioned: ["Some Shop", "Another Store", "Big Traders"],
    fixes: [
      "Complete your Google Business Profile with accurate name, address, and phone number.",
      "Accumulate more genuine customer reviews (aim for 50+ with 4.5★ average).",
      "Respond to all reviews, especially negative ones.",
      "Add detailed business description, photos, and operating hours.",
      "Ensure your business is listed on JustDial, IndiaMART, and other local directories.",
    ],
  };
}

module.exports = { runVisibilityCheck };