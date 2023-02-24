export default class UserInfo {
  constructor({selectorName, selectorDescription}) {
    this._profileName = document.querySelector(selectorName);
    this._profileDescription = document.querySelector(selectorDescription);
  }

  getUserInfo() {
     const data = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
     }

     return data;
  }


  setUserInfo(data) {

    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.description;

  }
}
