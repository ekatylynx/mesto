// Класс UserInfo отвечает за управление отображением 
// информации о пользователе на странице. 

class UserInfo {
    constructor({ nameSelector, aboutSelector }) { // popup
        this._nameSelector = document.querySelector(nameSelector);
        this._aboutSelector = document.querySelector(aboutSelector);
    }

    // возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

    getUserInfo() {
        return {
            name: this._nameSelector.textContent,
            about: this._aboutSelector.textContent,
        };
    }

    // принимает новые данные пользователя и добавляет их на страницу.

    setUserInfo(name, about) {
        this._nameSelector.textContent = name;
        this._aboutSelector.textContent = about;
    }
}

export default UserInfo;