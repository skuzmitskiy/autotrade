# autotrade

Сайт по продаже автоуслуг и автотрейд-ина.

## Деплой через Docker Compose

### Требования
- Docker
- Docker Compose (плагин `docker compose`)

### Запуск
```bash
docker compose up -d --build
```

После запуска сайт доступен по адресу:

```text
http://localhost:8080
```

### Остановка
```bash
docker compose down
```

### Просмотр логов
```bash
docker compose logs -f web
```
