# IT Inno Hack 2024

## Запуск проекта

Для начала необходимо заполнить файл окружения `.env` на основе `.env.example`.

Проект полностью базируется на контейнерной инфраструктуре, для которой **требуется Docker**:

```bash
docker compose up -d
```

## Работа с базой данных

Для работы с базой данных, необходимо **запустить миграции Prisma ORM** внутри контейнера с приложением:

```bash
docker exec -it itinnohack-next sh -c "npx prisma migrate dev"
```

## Другое

Разработано командой «Rush» в рамках **IT Inno Hack 2024**.
