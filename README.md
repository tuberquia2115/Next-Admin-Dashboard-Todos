# Development
pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Crear una copia de .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` yarn install ```
5. Ejecutar el comando ``` yarn run dev ```
6. EJecutar estos comandos de prisma

```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

# Nota: Usuario por defecto
__usuario:__ test1@gmail.com
__password:__ 123456

# Prisma commands

```
 npx prisma init
 npx prisma migrate dev
 npx prisma generate
```

# Prod

Pendiente

# Stage

Pendiente

# App Admin Dashboard Todos
Desarrollada moviendo las manitas, con amor ♥, gracias a Fernando Herrera por el gran aprendizaje.