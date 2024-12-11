const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const imageRoutes = require('./routes/images');
const { sequelize } = require('./models'); // Инициализация Sequelize

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/images', imageRoutes);  // Маршруты для изображений

// Статические файлы
app.use(express.static('public'));

// Запуск сервера
const PORT = 3000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate(); // Проверка соединения с БД
        console.log('Database connected!');
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
