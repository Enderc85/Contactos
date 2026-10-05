# Como iniciar el proyecyo -

## Pasos a seguir EN ORDEN

- Instalar node.js
- Dentro del IDE: run command "npm install dotenv"
- Generar el .env y configurarlo con esta plantilla:

  ### Plantilla del archivo .env
```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=
DB_NAME=contactos
DB_PORT=5432

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/contactos?schema=public"
```
-Añadir el ORM prism.


## Teconologias en uso para este proyecto

    Node.js
    Express
    PostgreSQL
    Prisma ORM
    dotenv


## Solución de problemas

Prisma Client no existe

Ejecuta:

npx prisma generate



# Buenas prácticas

    No subir el archivo .env al repositorio.
    Añadir .env al .gitignore.
    Utilizar migraciones para cualquier cambio en la base de datos.
    Mantener separadas las rutas, controladores y servicios.
    Centralizar la configuración en variables de entorno.

# Autor

Proyecto hecho por **Xavirocab**
