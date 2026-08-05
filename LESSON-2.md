# LESSON-2 — Оптимизация производительности

Ветка: lesson-2

## Запуск

npm ci && npm run dev
npm run build

## Чеклист

- Вынесение логики работы с tasks в метод useTasks из TaskList
- Оптимизация TaskCard через React.memo, Происходит корректный ререндер при изменении props и без его изменения - 3 балла
- мемоизация useMemo в хуке useTasks - 3 балла
- мемоизация функций useCallback useTasks - 3 балла
- Анализ профайлера
