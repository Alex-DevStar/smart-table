## 🧩 Как работает `root[subName] = cloneTemplate(subName)` в `initTable`

### 🔹 Исходный вызов

```js
const sampleTable = initTable({
  tableTemplate: 'table',
  rowTemplate: 'row',
  before: ['some'],
  after: []
}, render);



🧠 Что делает before.forEach(subName => …):
	1.	Берёт 'some' из массива before
	2.	Вызывает cloneTemplate('some')
	3.	Сохраняет результат в объект root как root.some
	4.	Добавляет .container в начало root.container

📦 Что в итоге находится в root
root = {
  container: <div class="table">...</div>,//весь основнойшаблон таблицы
  elements: {
    rows: <div data-name="rows">...</div>,//элементы изосновногошаблона
    total: <div data-name="total">...</div>
  },
     some: { // подшаблон, добавленный через before/after
    container: <div class="some-class">...</div>//клонированныйэлемент шаблона 'some'
    elements: {
      foo: <div data-name="foo">...</div>//внутренние элементы сdata-name
      bar: <div data-name="bar">...</div>
    }
  },
    }


🔹 Зачем нужно root[subName] = cloneTemplate(subName); добавляет ключ в сам root

Чтобы ты потом мог удобно обращаться:
	•	root.some.container — вставить строку
	•	root.some.elements.customer — вставить значение в ячейку
	•	root.container.prepend(...) — обновить структуру таблицы

  root.container.prepend(...) или .append(...) — добавляет в саму разметку на странице.
