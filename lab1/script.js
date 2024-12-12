function calculateAbs() {
    // Получаем значение введенное пользователем
    let x = document.getElementById("inputNumber").value;
    // Преобразуем его в число
    x = parseFloat(x);
    // Проверяем корректность введенного значения
    if (isNaN(x)) {
        document.getElementById("result").innerHTML = "Пожалуйста, введите корректное число.";
    } else {
        // Вычисляем абсолютное значение
        let result = Math.abs(x);
        // Выводим результат на страницу
        document.getElementById("result").innerHTML = "Абсолютное значение: " + result;
    } вроде нормально
}
