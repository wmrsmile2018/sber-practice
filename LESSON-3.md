# LESSON-3 — Advanced Redux и асинхронность

Ветка: lesson-3

## Запуск

npm ci && npm run dev
npm run build

## Чек лист

- API корректно описан и экспортирует хук useGetTasksQuery — 1 балл.
- Загрузка задач происходит без ошибок — 1 балл.
- Используется transformResponse для получения массива — 1 балл.
- Реализован хук useTasks, в котором данные загружаются через useGetTasksQuery — 1 балл.
- Задачи отображаются в интерфейсе — 1 балл.
- Код структурирован и соответствует FSD — 1 балл.
- Использован useEffect для загрузки данных в useState — 1 балл.
- Реализована функция removeTask — 1 балл.
- После удаления задача исчезает из UI — 1 балл.
- baseApi создан и экспортирован из shared/api/baseApi.ts (или shares/...), tagTypes включает Tasks — 1 балл.
- tasksApi использует injectEndpoints от baseApi; getTasks корректно возвращает Task[] — 1 балл.
- в store подключены baseApi.reducer и baseApi.middleware один раз — 1 балл.
