class Image {
    constructor(id, path) {
        this.id = id; // Уникальный идентификатор изображения.
        this.path = path; // Путь к изображению (например, '/images/sample.jpg').
        this.likes = 0; // Количество лайков.
        this.dislikes = 0; // Количество дизлайков.
    }
}

module.exports = Image; // Экспортируем класс, чтобы использовать его в других файлах.
