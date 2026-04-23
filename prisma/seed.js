const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const { parse } = require("csv-parse");

const prisma = new PrismaClient();

async function main() {
  const records = [];

  const parser = fs
    .createReadStream("./prisma/results.csv")
    .pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const record of parser) {
    const homeScore = parseInt(record.home_score);
    const awayScore = parseInt(record.away_score);

    if (isNaN(homeScore) || isNaN(awayScore)) continue;

    records.push({
      date: new Date(record.date),
      homeTeam: record.home_team,
      awayTeam: record.away_team,
      homeScore,
      awayScore,
      tournament: record.tournament,
      country: record.country,
      city: record.city,
      neutral: record.neutral === "TRUE",
    });
  }

  console.log(`Inserting ${records.length} matches...`);

  await prisma.match.createMany({
    data: records,
    skipDuplicates: true,
  });

  console.log("Successfully inserted records");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
