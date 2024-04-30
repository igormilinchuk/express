const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Читання про нас з файлу about.json
const aboutData = JSON.parse(fs.readFileSync('about.json', 'utf8'));

// Читання списку статей з файлу articles.json
const articlesData = JSON.parse(fs.readFileSync('articles.json', 'utf8'));

// Роут для головної сторінки
app.get('/', (req, res) => {
  res.send('Привіт, це головна сторінка! <a href="/about">Про нас</a> | <a href="/blog">Блог</a> | <a href="/contact">Контакти</a>');
});

// Роут для сторінки про нас
app.get('/about', (req, res) => {
  res.json(aboutData);
});

// Роут для сторінки блогу (список статей)
app.get('/blog', (req, res) => {
  res.json(articlesData.map(article => ({ id: article.id, title: article.title })));
});

// Роут для сторінки статті (за ідентифікатором)
app.get('/blog/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  const article = articlesData.find(article => article.id === parseInt(articleId));
  if (!article) {
    res.status(404).send('Стаття не знайдена');
  } else {
    res.json(article);
  }
});

// Роут для сторінки контактів
app.get('/contact', (req, res) => {
  res.send(`
    <form action="/contact" method="POST">
      <label for="name">Ім'я:</label>
      <input type="text" id="name" name="name" required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br>
      <label for="message">Повідомлення:</label><br>
      <textarea id="message" name="message" required></textarea><br>
      <button type="submit">Відправити</button>
    </form>
    <a href="/">На головну</a>
  `);
});

// Обробник форми зв'язку
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Отримані дані можна обробити або відправити на сервер
  res.send(`Дякуємо, ${name}! Ваше повідомлення було успішно надіслано.`);
});

app.listen(PORT, () => {
  console.log(`Сервер працює на порті ${PORT}`);
});
