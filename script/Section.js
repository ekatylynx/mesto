class Section {
    constructor({ items, renderer }, containerSelector) {
            // Массив данных, которые нужно добавить на страницу
        this._renderedItems = items;
        
            //Отрисовка каждого отдельного элемента
        this._renderer = renderer;

            // Селектор контейнера, куда добавляем элементы
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    addItem(element) {
        if (element)
            this._container.append(element);
    }
}

export default Section;