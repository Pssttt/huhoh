import db from "../src/lib/db.ts";

async function main() {
  const slangTerms = [
    {
      term: "GOAT",
      meaning: "Greatest Of All Time",
      example: "Messi is the GOAT.",
      protected: true,
    },
    {
      term: "Sus",
      meaning: "Suspicious",
      example: "He’s acting kinda sus.",
      protected: true,
    },
    {
      term: "Cap",
      meaning: "Lie or false",
      example: "That’s cap!",
      protected: true,
    },
    {
      term: "Rizz",
      meaning: "Charisma or charm, especially in dating",
      example: "He’s got serious rizz.",
      protected: true,
    },
    {
      term: "Glow up",
      meaning: "A transformation for the better",
      example: "She had a major glow up after high school.",
      protected: true,
    },
    {
      term: "Simp",
      meaning: "Someone who does too much for someone they like",
      example: "He’s such a simp for her.",
      protected: true,
    },
    {
      term: "Slay",
      meaning: "To do something exceptionally well",
      example: "She slayed that performance!",
      protected: true,
    },
    {
      term: "Mid",
      meaning: "Average or mediocre",
      example: "That movie was mid.",
      protected: true,
    },
    {
      term: "Bet",
      meaning: "Agreement or confirmation",
      example: "You’ll be there? Bet.",
      protected: true,
    },
    {
      term: "FOMO",
      meaning: "Fear Of Missing Out",
      example: "I have serious FOMO about that party.",
      protected: true,
    },
    {
      term: "Bussin'",
      meaning: "Really good (usually food)",
      example: "This pizza is bussin’!",
      protected: true,
    },
    {
      term: "No cap",
      meaning: "No lie, for real",
      example: "No cap, that was the best concert ever.",
      protected: true,
    },
    {
      term: "Based",
      meaning: "Confident and unapologetically yourself",
      example: "His opinion is so based.",
      protected: true,
    },
    {
      term: "W",
      meaning: "Win (opposite of 'L' for loss)",
      example: "Getting that job was a huge W.",
      protected: true,
    },
    {
      term: "Yeet",
      meaning: "To throw forcefully or express excitement",
      example: "He yeeted the ball across the field!",
      protected: true,
    },
    {
      term: "Touch grass",
      meaning: "Telling someone to go outside and stop being online too much",
      example: "You need to touch grass, bro.",
      protected: true,
    },
    {
      term: "Delulu",
      meaning: "Delusional (often humorous or self-aware)",
      example: "I’m delulu if I think I’ll win the lottery.",
      protected: true,
    },
    {
      term: "Skrrt",
      meaning: "Onomatopoeia for a car drifting or leaving quickly",
      example: "He sped off—skrrt!",
      protected: true,
    },
    {
      term: "Stan",
      meaning: "An obsessive fan (from Eminem’s song 'Stan')",
      example: "She’s a total Swiftie—a hardcore Taylor Swift stan.",
      protected: true,
    },
    {
      term: "Clout",
      meaning: "Influence or fame (especially online)",
      example: "He’s just doing it for clout.",
      protected: true,
    },
  ];

  for (const slang of slangTerms) {
    await db.slangTerm.upsert({
      where: { term: slang.term },
      update: {},
      create: slang,
    });
  }

  console.log("Seeded slang terms");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
