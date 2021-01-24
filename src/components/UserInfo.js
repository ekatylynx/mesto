// Класс UserInfo отвечает за управление отображением 
// информации о пользователе на странице. 

class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) { // popup
        this._nameSelector = document.querySelector(nameSelector);
        this._aboutSelector = document.querySelector(aboutSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    // возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

    getUserInfo() {
        return {
            id: this._id,
            name: this._nameSelector.textContent,
            about: this._aboutSelector.textContent,
            avatar: this._avatarSelector.src,
        };
    }

    // принимает новые данные пользователя и добавляет их на страницу.

    setUserInfo(id, name, about, avatar) {
        this._id = id;
        this._nameSelector.textContent = name;
        this._aboutSelector.textContent = about;
        this._avatarSelector.src = avatar;
    }
}

export default UserInfo;