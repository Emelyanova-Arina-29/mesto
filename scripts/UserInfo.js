export default class UserInfo {
  constructor({selectorName, selectorDescription}) {
    this._profileName = document.querySelector(selectorName);
    this._profileDescription = document.querySelector(selectorDescription);
  }

  getUserInfo() {
     return { selectorName: this._profileName.textContent, selectorDescription: this._profileDescription.textContent }
  }


  setUserInfo(selectorName, selectorDescription) {
    this._profileName.textContent = selectorName.value;
    this._profileDescription.textContent = selectorDescription.value;
  }
}
