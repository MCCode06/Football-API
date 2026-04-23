const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMatches = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const { team, tournament, year } = req.query;

    // dynamic where obj for prisma
    const where = {};

    if (tournament) {
      where.tournament = { contains: tournament, mode: "insensitive" };
    }

    if (year) {
      where.date = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      };
    }

    if (team) {
      where.OR = [
        { homeTeam: { contains: team, mode: "insensitive" } },
        { awayTeam: { contains: team, mode: "insensitive" } },
      ];
    }

    const [matches, total] = await Promise.all([
      prisma.match.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
      }),
      prisma.match.count({ where }),
    ]);

    return res.json({
      data: matches,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getMatchById = async (req, res) => {
  try {
    const match = await prisma.match.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!match) return res.status(404).json({ error: "No matches found" });
    return res.json(match);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createMatch = async (req, res) => {
  try {
    const match = await prisma.match.create({
      data: { ...req.body, date: new Date(req.body.date) },
    });
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    const id = req.params.id;
    const match = await prisma.match.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.match.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
