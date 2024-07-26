 const Board = require('../models/Board');

exports.createBoard = async (req, res) => {
    try {
        const { title } = req.body;
        const board = new Board({ title, user: req.user.id });
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBoards = async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user.id });
        res.json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
