export default class UserInfo {
  constructor({selectorName, selectorDescription, selectorAvatar}) {
    this._profileName = document.querySelector(selectorName);
    this._profileDescription = document.querySelector(selectorDescription);
    this._profileAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
     const data = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src
    }

     return data;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
    this._profileAvatar.src = data.avatar
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar
  }
}
