export class Section {
  constructor({ items, renderer }, containerId) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerId);
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemStart(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
