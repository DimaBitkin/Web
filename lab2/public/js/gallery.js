document.addEventListener('DOMContentLoaded', async () => {
    const sliderImage = document.getElementById('sliderImage');
    const imageId = document.getElementById('imageId');
    const likes = document.getElementById('likes');
    const dislikes = document.getElementById('dislikes');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const likeButton = document.getElementById('likeButton');
    const dislikeButton = document.getElementById('dislikeButton');

    let images = [];
    let currentIndex = 0;

    // Загружаем изображения с сервера
    try {
        const response = await fetch('/api/images');
        images = await response.json();
        if (images.length === 0) {
            sliderImage.src = '';
            imageId.innerText = 'Галерея пуста';
            likes.innerText = '0';
            dislikes.innerText = '0';
            return;
        }
        showImage(0);
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
    }

    // Функция для отображения текущего изображения
    function showImage(index) {
        if (images.length === 0) return;
        const image = images[index];
        sliderImage.src = image.path;
        imageId.innerText = image.id;
        likes.innerText = image.likes;
        dislikes.innerText = image.dislikes;
    }

    // Перелистывание влево
    prevButton.addEventListener('click', () => {
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Кольцевой переход
        showImage(currentIndex);
    });

    // Перелистывание вправо
    nextButton.addEventListener('click', () => {
        if (images.length === 0) return;
        currentIndex = (currentIndex + 1) % images.length; // Кольцевой переход
        showImage(currentIndex);
    });

    // Добавление лайка
    likeButton.addEventListener('click', async () => {
        const image = images[currentIndex];
        await fetch(`/api/images/${image.id}/like`, { method: 'POST' });
        image.likes += 1;
        showImage(currentIndex);
    });

    // Добавление дизлайка
    dislikeButton.addEventListener('click', async () => {
        const image = images[currentIndex];
        await fetch(`/api/images/${image.id}/dislike`, { method: 'POST' });
        image.dislikes += 1;
        showImage(currentIndex);
    });
});
