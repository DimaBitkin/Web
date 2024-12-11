const express = require('express'); // Подключаем Express.
const router = express.Router(); // Создаём новый роутер.
const imageService = require('../services/imageService'); // Подключаем сервис изображений.

// Получить все изображения.
router.get('/', (req, res) => {
    res.json(imageService.getAllImages()); // Возвращаем JSON с изображениями.
});

// Добавить изображение.
router.post('/', (req, res) => {
    const { path } = req.body; // Получаем путь к изображению из тела запроса.
    try {
        const newImage = imageService.createImage(path); // Создаём изображение.
        res.status(201).json(newImage); // Возвращаем созданное изображение.
    } catch (error) {
        res.status(400).json({ error: error.message }); // Обрабатываем ошибку.
    }
});

// Поставить лайк/дизлайк.
router.post('/:id/:action', (req, res) => {
    const { id, action } = req.params; // Получаем ID и действие (like/dislike).
    const isLike = action === 'like'; // Определяем, это лайк или дизлайк.
    try {
        imageService.likeImage(parseInt(id), isLike); // Обновляем данные.
        res.status(200).json({ message: `${action} added` }); // Возвращаем успех.
    } catch (error) {
        res.status(404).json({ error: error.message }); // Обрабатываем ошибку.
    }
});

// Удалить изображение.
router.delete('/:id', (req, res) => {
    const { id } = req.params; // Получаем ID изображения.
    try {
        imageService.removeImage(parseInt(id)); // Удаляем изображение.
        res.status(200).json({ message: 'Image deleted' }); // Возвращаем успех.
    } catch (error) {
        res.status(404).json({ error: error.message }); // Обрабатываем ошибку.
    }
});

module.exports = router; // Экспортируем маршруты.
