const { NODE_ENV } = process.env;

module.exports.linkRegexp = /^(https?):\/\/(w{3}\.)?[^#~!@$%^&*)(\s]+\.\w+\/?([^#~!@$%^&*)(\s]+)?[#]?$/i;

module.exports.JWT_DEV = 'dick-cunt-pan';

module.exports.PORT = NODE_ENV === 'production' ? 3000 : 4000;

module.exports.serverErrMsg = 'На сервере произошла ошибка';
module.exports.emailExistMsg = 'Email уже зарегистрирован!';
module.exports.validationErrorMsg = 'Введены некорректные данные!';
module.exports.wrongPassOrEmailMsg = 'Неправильные почта или пароль';
module.exports.articleIsDeleteMsg = { message: 'Статья удалена!' };
module.exports.noSavedArticlesMsg = 'Нет сохраненных статей!';
module.exports.notDeleteNotHimselfArticleMsg = 'Нельзя удалять чужие статьи!';
module.exports.notFoundArticleMsg = 'Статья не найдена!';
module.exports.notFoundPageMsg = 'Запрашиваемый ресурс не найден!';
module.exports.wrongTokenMsg = 'С токеном что-то не так!';
module.exports.needAuthMsg = 'Необходима авторизация!';
module.exports.tooManyRequestsMsg = 'Превышено количество запросов!';
module.exports.wrongUrlMsg = 'некорректный URL!';
