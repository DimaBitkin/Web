const storage = require('../storage/memoryStorage'); // Подключаем хранилище.
const Image = require('../models/image'); // Подключаем модель Image.

// Создать изображение.
const createImage = (path) => {
    const id = storage.getImages().length + 1; // Генерируем новый ID.
    const newImage = new Image(id, path); // Создаём новый объект изображения.
    if (!storage.addImage(newImage)) { // Пытаемся добавить изображение в хранилище.
        throw new Error('Storage limit reached'); // Если не удалось, выбрасываем ошибку.
    }
    return newImage; // Возвращаем созданное изображение.
};

// Получить все изображения.
const getAllImages = () => storage.getImages();

// Поставить лайк/дизлайк изображению.
const likeImage = (id, isLike) => {
    if (!storage.updateLikes(id, isLike)) { // Если обновить лайки не удалось.
        throw new Error('Image not found'); // Выбрасываем ошибку.
    }
};

// Удалить изображение.
const removeImage = (id) => {
    if (!storage.deleteImage(id)) { // Если удалить изображение не удалось.
        throw new Error('Image not found'); // Выбрасываем ошибку.
    }
};

module.exports = {
    createImage,
    getAllImages,
    likeImage,
    removeImage,
};
