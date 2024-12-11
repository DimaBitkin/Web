const express = require('express');
const router = express.Router();
const { Image } = require('../models');

// Получить все изображения
router.get('/', async (req, res) => {
    try {
        const images = await Image.findAll();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить изображение
router.post('/', async (req, res) => {
    const { path } = req.body;
    if (!path || typeof path !== 'string') {
        return res.status(400).json({ error: 'Неверные данные' });
    }

    try {
        const image = await Image.create({ path });
        res.status(201).json(image);
    } catch (error) {
        res.status(400).json({ error: 'Ошибка при добавлении изображения' });
    }
});

// Лайк/дизлайк
router.post('/:id/:action', async (req, res) => {
    const { id, action } = req.params;
    const isLike = action === 'like';
    try {
        const image = await Image.findByPk(id);
        if (!image) throw new Error('Изображение не найдено');

        isLike ? image.likes++ : image.dislikes++;
        await image.save();

        res.status(200).json({ message: `${action} added` });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Удалить изображение
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const image = await Image.findByPk(id);
        if (!image) throw new Error('Изображение не найдено');

        await image.destroy();
        res.status(200).json({ message: 'Image deleted' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
