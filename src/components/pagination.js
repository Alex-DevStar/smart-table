import { getPages } from "../lib/utils.js";

export const initPagination = (
  { pages, fromRow, toRow, totalRows },
  createPage
) => {
  // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер

    const pageTemplate = pages.firstElementChild.cloneNode(true); // в качестве шаблона берём первый элемент из контейнера со страницами
    pages.firstElementChild.remove();
  // и удаляем его (предполагаем, что там больше ничего, как вариант, можно и всё удалить из pages)
    return (data, state, action) => {
    // @todo: #2.1 — посчитать количество страниц, объявить переменные и константы
    const rowsPerPage = state.rowsPerPage; // будем часто обращаться, чтобы короче записывать
    const pageCount = Math.ceil(data.length / rowsPerPage); // число страниц округляем в большую сторону
    let page = state.page; // страница переменной, потому что она может меняться при обработке действий позже
    // @todo: #2.6 — обработать действия

    // @todo: #2.4 — получить список видимых страниц и вывести их

    // @todo: #2.5 — обновить статус пагинации

    // @todo: #2.2 — посчитать сколько строк нужно пропустить и получить срез данных
    const skip = (page - 1) * rowsPerPage; // сколько строк нужно пропустить
    return data.slice(skip, skip + rowsPerPage); // получаем нужную часть строк (заменяем имеющийся return)
  };
};
