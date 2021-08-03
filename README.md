# newsexplorer-api

### Обратиться к серверу можно по адресу

##### https://api.newsexplorer.site

### Список эндпоинтов:

##### Возвращает информацию о пользователе (email и имя)
* GET /users/me

##### Возвращает все сохранённые пользователем статьи
* GET /articles

##### Создаёт статью с переданными в теле
##### keyword, title, text, date, source, link и image
* POST /articles

##### Удаляет сохранённую статью  по _id
* DELETE /articles/articleId

### Используемые технологии
* Node.js;
* Express.js;
* MongoDB;
* Mongoose;
* Nginx;

###
##### Сергей Машин [VK](https://vk.com/vanilla64)
