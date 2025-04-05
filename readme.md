## Структура проекта

### markup

В директории находится вёрстка проекта: примеры страниц, ui-kit и карта сайта (`sitemap.html`). Начинать знакомство с проектом лучше с карты.

### frontend

Директория для фронтенда проекта.

#### public

Директория для размещения статичных ресурсов (шрифты, стили, изображения и так далее).

#### src

В директории размещается исходный код проекта: компоненты, файлы с тестами, модули и так далее. Структура директории `src` может быть произвольной.

## Алгоритм работы над фронтендом

1. Перейдите в диретокрию `frontend`.

2. Установите зависимости, выполнив команду `npm install`.

3. Проверьте работу приложения, выполнив команду `npm start`.

4. Перейдите по адресу, указанному в терминале (скорее всего, это будет `http://localhost:5173/`). Если сборка прошла успешно, то на странице вашего приложения вы увидите `Hello, world!`.

5. Запрограммируйте фронтенд.




### Описание работы с проектом
## Backend - Node.JS


### Запуск для генерации данных
  npm run mock:server

### CLI интерфейс

        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных


1) npm run ts ./src/main.cli.ts -- --help  

2) npm run ts ./src/main.cli.ts -- --version

3) npm run ts ./src/main.cli.ts -- --generate 
параметры [
  count - количество генерируемых записей, 
  type- тип данных (users,trainings,reviews,orders),
  filepath - имя файла для данных,
  url - корневой ресурс сервера
  ]
Примеры:
npm run ts ./src/main.cli.ts -- --generate 25 users ./mock/users-data.tsv http://localhost:3123
npm run ts ./src/main.cli.ts -- --generate 25 trainings ./mock/trainings-data.tsv http://localhost:3123

4) npm run ts ./src/main.cli.ts -- --import
параметры [
  type- тип данных (users,trainings,reviews,orders),
  filepath - имя файла для данных,
  ]
Примеры:
npm run ts ./src/main.cli.ts -- --import users ./mocks/users-data.tsv
npm run ts ./src/main.cli.ts -- --import orders ./mocks/orders-data.tsv
