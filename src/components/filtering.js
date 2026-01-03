export function initFiltering(elements) {
  
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        })
      );
    });
  };

    /**
     * Строит query-параметры для серверной фильтрации
     * @param {Object} query - исходный query (например, с пагинацией)
     * @param {Object} state - объект фильтров (внутреннее состояние)
     * @param {HTMLElement} [action] - кнопка действия
     * @returns {Object} новый query
     */

  const applyFiltering = (query, state, action) => {
    // @todo: #4.2 — обработать очистку поля
        // если нажата кнопка очистки поля фильтра
    if (action && action.name === "clear") {
      const container = action.closest(".table-column");
      const input = container.querySelector("input");
      input.value = "";
      state[action.dataset.field] = "";
    }
    // @todo: #4.5 — отфильтровать данные используя компаратор
        // создаём объект фильтра на основе значений input/select в фильтрах
    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          // ищем поля ввода в фильтре с непустыми данными
          filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
        }
      }
    });
        // если фильтр заполнен — добавляем его к query
    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query; // если в фильтре что-то добавилось, применим к запросу
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
