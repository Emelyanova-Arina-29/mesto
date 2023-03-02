export class Section {
  constructor({ renderer }, containerId) {
    this._renderer = renderer;
    this._container = document.querySelector(containerId);
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemStart(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    data.forEach((element) => {
      this._renderer(element);
    });
  }
}
