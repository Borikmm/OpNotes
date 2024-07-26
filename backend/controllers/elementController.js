const Element = require('../models/Element');

exports.createElement = async (req, res) => {
    try {
        const { type, content, position, boardId } = req.body;
        const element = new Element({ type, content, position, board: boardId });
        await element.save();
        res.status(201).json(element);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getElements = async (req, res) => {
    try {
        const { boardId } = req.params;
        const elements = await Element.find({ board: boardId });
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

