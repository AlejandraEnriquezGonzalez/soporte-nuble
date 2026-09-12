<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="centelank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Sistema de Gestión de Solicitudes de Soporte TI

Backend en NestJS y MySQL para la centralización y seguimiento de solicitudes de soporte técnico en la Región de Ñuble.

## Requisitos Previos

- Node.js (v18 o superior)
- MySQL Server(utilice MySQL Command Line Client)

## Configuración de Variables de Entorno (.env)

Creacion de un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=123456
DB_DATABASE=soporte_nuble_db
PORT=3000
```


### Etapa 1: Arquitectura Inicial

* Inicialización del proyecto utilizando NestJS.
* Estructura modular base creada (`SolicitudesModule`).
* Implementación inicial de `SolicitudesController` y `SolicitudService`.

### Etapa 2: Persistencia y Validación

* Configuración de la conexión a MySQL con TypeORM y lectura de variables de entorno mediante `@nestjs/config`.
* Mapeo de la entidad `Solicitud` (`src/solicitudes/entities/solicitud.entity.ts`).
* Creación de enumeraciones para `Categoria`, `Prioridad` y `Estado`.
* Definición de `CreateSolicitudDto` y `UpdateSolicitudDto` con decoradores de `class-validator` y `class-transformer`.
* Habilitación global de `ValidationPipe` y `CORS` en `src/main.ts`.

### Etapa 3: Funcionalidad y Reglas de Negocio

* Implementación de operaciones CRUD completas en controlador y servicio.
* Desarrollo del endpoint de búsqueda con filtros combinados: `GET /solicitudes/buscar`.
* Validación e integración de las Reglas de Negocio en la lógica del backend:
  * **RN01 a RN04 y RN06:** Validados mediante DTOs y `ValidationPipe`.
  * **RN05:** Asignación automática del estado `Pendiente` en nuevas solicitudes.
  * **RN07:** Control estricto de fecha de solicitud (no posterior a la actual).
  * **RN08:** Bloqueo de eliminación para solicitudes en estado `Pendiente` o `En Proceso`.
  * **RN09:** Transición prohibida desde estado `Finalizada` hacia `Pendiente`.
  * **RN10:** Respuestas HTTP 404 (`NotFoundException`) para consultas o modificaciones de identificadores inexistentes.

```

```
