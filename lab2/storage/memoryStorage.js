const images = []; // Список для хранения всех изображений в памяти.
const MAX_IMAGES = 50; // Максимальное количество изображений в хранилище.

// Добавить изображение.
const addImage = (image) => {
    if (images.length < MAX_IMAGES) { // Если хранилище не заполнено.
        images.push(image); // Добавляем изображение в список.
        return true; // Возвращаем успех.
    }
    return false; // Если хранилище заполнено, возвращаем ошибку.
};

// Получить все изображения.
const getImages = () => images;

// Найти изображение по ID.
const getImageById = (id) => images.find((img) => img.id === id);

// Удалить изображение по ID.
const deleteImage = (id) => {
    const index = images.findIndex((img) => img.id === id); // Ищем индекс изображения.
    if (index !== -1) { // Если изображение найдено.
        images.splice(index, 1); // Удаляем его из списка.
        return true;
    }
    return false; // Если изображение не найдено, возвращаем ошибку.
};

// Обновить количество лайков/дизлайков.
const updateLikes = (id, isLike) => {
    const image = getImageById(id); // Находим изображение по ID.
    if (image) {
        isLike ? image.likes++ : image.dislikes++; // Увеличиваем лайки или дизлайки.
        return true;
    }
    return false; // Если изображение не найдено, возвращаем ошибку.
};

module.exports = {
    addImage,
    getImages,
    getImageById,
    deleteImage,
    updateLikes,
};
