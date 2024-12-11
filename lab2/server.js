const express = require('express'); // Подключаем фреймворк Express для создания сервера.
const bodyParser = require('body-parser'); // Подключаем middleware для обработки JSON-запросов.
const swaggerUi = require('swagger-ui-express'); // Подключаем Swagger UI для документирования API.
const swaggerDocument = require('./swagger/swagger.json'); // Загружаем Swagger-документацию.
const imageRoutes = require('./routes/images'); // Подключаем маршруты для работы с изображениями.

const app = express(); // Создаём экземпляр Express-приложения.
app.use(bodyParser.json()); // Добавляем middleware для обработки входящих JSON-запросов.

// Подключаем Swagger UI по маршруту /api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Подключаем маршруты для работы с API изображений.
app.use('/api/images', imageRoutes);

// Указываем папку public для раздачи статических файлов (HTML, CSS, JS).
app.use(express.static('public'));

// Настраиваем сервер для прослушивания на порту 3000.
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); // Выводим сообщение, что сервер запущен.
    console.log(`Swagger available at http://localhost:${PORT}/api-docs`); // Выводим ссылку на Swagger UI.
});
