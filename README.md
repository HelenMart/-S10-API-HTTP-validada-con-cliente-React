
# Sistema de Inventario - NestJS + React

## Descripción

Este proyecto consiste en un sistema de gestión de inventario
desarrollado con NestJS para el backend y React con TypeScript
para el frontend.

El objetivo es implementar una API REST con validaciones,
manejo de errores HTTP y documentación OpenAPI, además de
una interfaz que permita administrar los productos.

## Tecnologías utilizadas

- Node.js
- NestJS
- React
- TypeScript
- Vite
- Swagger / OpenAPI
- class-validator
- class-transformer

## Estructura del proyecto

InventarioD/
- backend/ - API REST desarrollada con NestJS
- frontend/ - Interfaz desarrollada con React
- README.md - Documentación del proyecto

## Requisitos

- Node.js 22
- npm
- Visual Studio Code (recomendado)

## Instalación y ejecución

1. Clonar el repositorio:

   git clone URL_DEL_REPOSITORIO

2. Ingresar al backend:

   cd InventarioD/backend
   npm install
   npm run start:dev

3. En otra terminal, ingresar al frontend:

   cd InventarioD/frontend
   npm install
   npm run dev

## Direcciones locales

Backend:
http://localhost:3000

Frontend:
http://localhost:5173

Swagger:
http://localhost:3000/api

Nota: El frontend debe ejecutarse en el origen
http://localhost:5173, autorizado en la configuración CORS.
Si Vite utiliza otro puerto, será necesario ajustar CORS.

## Rutas disponibles

| Método | Ruta | Descripción | Éxito |
|--------|------|-------------|-------|
| GET | /productos | Listar productos | 200 |
| GET | /productos/:id | Consultar producto | 200 |
| POST | /productos | Registrar producto | 201 |
| PATCH | /productos/:id | Actualizar producto | 200 |
| DELETE | /productos/:id | Eliminar producto | 204 |

## Códigos HTTP implementados

- 200 OK: Consulta o actualización exitosa.
- 201 Created: Producto registrado correctamente.
- 204 No Content: Producto eliminado correctamente.
- 400 Bad Request: Datos incorrectos o propiedades desconocidas.
- 404 Not Found: El producto solicitado no existe.
- 409 Conflict: Ya existe un producto con el mismo nombre.

## Validaciones

Los productos tienen los siguientes campos:

- nombre: texto obligatorio, entre 3 y 80 caracteres.
- categoria: texto obligatorio, entre 3 y 50 caracteres.
- precio: número mayor o igual que 0.01.
- stock: número entero mayor o igual que 0.

La API utiliza ValidationPipe con:

- whitelist: true
- forbidNonWhitelisted: true
- transform: true

## Funcionalidades

- Mostrar productos registrados.
- Registrar nuevos productos.
- Actualizar información de productos.
- Eliminar productos.
- Mostrar estados de carga.
- Mostrar mensajes de éxito y error.
- Consumir la API mediante solicitudes HTTP.
- Documentar los endpoints con Swagger.

## Almacenamiento

Los datos se almacenan temporalmente en memoria
mediante un arreglo dentro del servicio de NestJS.

No se utiliza ninguna base de datos.

Los productos se pierden al reiniciar el backend.

## Arquitectura

Backend:
- Module: organiza la funcionalidad.
- Controller: recibe las solicitudes HTTP.
- Service: implementa la lógica del inventario.
- DTO: define y valida los datos recibidos.

Frontend:
- Components: formulario de productos.
- Services: comunicación con la API.
- Types: definición de tipos TypeScript.
- App: interfaz principal y manejo de estados.

## Verificación

Para comprobar el frontend:

npm run lint
npm run build

Estos comandos deben ejecutarse dentro de frontend.

## Demostración

La aplicación permite demostrar operaciones CRUD,
validaciones, manejo de errores HTTP, documentación
OpenAPI y solicitudes desde React mediante Network.


