// Обработчик добавления изображения
document.getElementById('addForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Отключаем стандартное поведение формы

    const path = document.getElementById('path').value; // Получаем значение пути к изображению
    if (!path) {
        alert('Пожалуйста, введите путь к изображению.');
        return;
    }

    try {
        // Отправляем запрос на сервер для добавления изображения
        const response = await fetch('/api/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path }),
        });

        const result = await response.json(); // Парсим ответ от сервера
        if (response.ok) {
            alert(`Изображение добавлено с ID: ${result.id}`);
            document.getElementById('path').value = ''; // Очищаем поле ввода
        } else {
            alert(`Ошибка: ${result.error}`); // Показываем ошибку, если она есть
        }
    } catch (error) {
        console.error('Ошибка при добавлении изображения:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
});

// Обработчик удаления изображения
document.getElementById('deleteForm')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Отключаем стандартное поведение формы

    const id = document.getElementById('id').value; // Получаем ID изображения
    if (!id) {
        alert('Пожалуйста, введите ID изображения.');
        return;
    }

    try {
        // Отправляем запрос на сервер для удаления изображения
        const response = await fetch(`/api/images/${id}`, {
            method: 'DELETE',
        });

        const result = await response.json(); // Парсим ответ от сервера
        if (response.ok) {
            alert(result.message); // Показываем сообщение об успешном удалении
            document.getElementById('id').value = ''; // Очищаем поле ввода
        } else {
            alert(`Ошибка: ${result.error}`); // Показываем ошибку, если она есть
        }
    } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
});

async function likeImage(id) {
    try {
        const response = await fetch(`/api/images/${id}/like`, { method: 'POST' });
        if (!response.ok) {
            const result = await response.json();
            alert(`Ошибка: ${result.error}`);
            return;
        }
        loadGallery(); // Обновляем галерею после успешного лайка
    } catch (error) {
        console.error('Ошибка при добавлении лайка:', error);
        alert('Не удалось поставить лайк. Попробуйте снова.');
    }
}

async function dislikeImage(id) {
    try {
        const response = await fetch(`/api/images/${id}/dislike`, { method: 'POST' });
        if (!response.ok) {
            const result = await response.json();
            alert(`Ошибка: ${result.error}`);
            return;
        }
        loadGallery(); // Обновляем галерею после успешного дизлайка
    } catch (error) {
        console.error('Ошибка при добавлении дизлайка:', error);
        alert('Не удалось поставить дизлайк. Попробуйте снова.');
    }
}

