La lógica de negocio está organizada mediante:

### Controller
Gestiona las solicitudes HTTP provenientes del frontend y expone los endpoints REST.

### Service
Contiene las reglas de negocio y el procesamiento de la información.

### Repository
Permite la comunicación con la base de datos mediante Spring Data JPA.

### Model (Entity)
Representa las entidades y tablas almacenadas en la base de datos.


# Herramientas Utilizadas

## Backend

* Java 17
* Spring Boot
* Maven

## Frontend

## Frontend

* Angular 17
* TypeScript
* HTML5
* SCSS
* Angular Router
* Angular Forms
* Angular HttpClient

## Base de Datos

* MySQL 8.0

## Herramientas de Desarrollo

* Visual Studio Code
* Postman
* Swagger
* Git
* GitHub

## Arquitectura

* Arquitectura Cliente - Servidor
* Arquitectura de Tres Capas:

  * Capa de Presentación (Angular)
  * Capa de Negocio (Spring Boot)
  * Capa de Datos (MySQL)


# Módulos del Sistema

## 1. Autenticación

### Login

Permite el acceso seguro al sistema mediante usuario y contraseña, validando credenciales y controlando el acceso según el rol asignado.


## 2. Gestión de Usuarios y Roles

### Usuarios

Administración de usuarios registrados en el sistema.

### Crear Usuario

Registro de nuevos usuarios con sus respectivos datos y permisos.

### Asignación de Roles

Permite asignar y administrar roles como Administrador, Operador, Presidente y Usuario.


## 3. Gestión de Clientes

### Clientes

Registro, consulta, actualización y administración de los clientes afiliados al acueducto.

### Portal Usuario

Espacio donde cada cliente puede consultar su información personal y servicios asociados.


## 4. Gestión de Medidores y Consumo

### Medidores

Administración y control de los medidores instalados.

### Registro de Lecturas

Permite ingresar las lecturas periódicas de los medidores.

### Historial de Lecturas

Consulta histórica de las lecturas registradas por cliente.

### Historial de Consumo

Visualización del consumo de agua registrado a lo largo del tiempo.


## 5. Facturación

### Facturas

Generación y administración de facturas de consumo.

### Historial de Facturas (Administrador)

Consulta de todas las facturas generadas en el sistema.


## 6. Gestión de Pagos

### Pagos

Registro de pagos realizados por los usuarios.

### Historial de Pagos

Consulta de pagos realizados por cada cliente.

### Historial de Pagos (Administrador)

Consulta general de todos los pagos registrados en el sistema.


## 7. Financiaciones

### Financiaciones

Gestión de acuerdos de financiación para usuarios con obligaciones pendientes.

### Cuotas de Financiación

Administración y seguimiento de cuotas pagadas y pendientes.


## 8. Gestión de Mantenimientos

### Turnos de Mantenimiento

Programación y seguimiento de mantenimientos técnicos.

### Configuración de Turnos

Administración de horarios, asignaciones y control de visitas técnicas.


## 9. Reportes

### Reportes Generales

Generación de reportes administrativos y financieros.

### Reporte Mensual

Generación de informes mensuales de recaudo, consumo y facturación.

### Ver Reportes

Consulta y análisis de reportes históricos.


## 10. Paneles por Rol

### Panel Administrador

Acceso completo a todos los módulos del sistema.

### Panel Operador

Gestión de clientes, lecturas y procesos operativos.

### Panel Presidente

Consulta de reportes, indicadores y supervisión administrativa.

### Portal Usuario

Consulta de facturas, pagos, consumos y financiaciones.


## 11. Módulos Informativos

### Inicio

Página principal del sistema.

### Noticias

Publicación de información relevante para la comunidad.

### Servicios

Consulta de servicios ofrecidos por el acueducto.

### Conócenos

Información institucional del acueducto.

### Contáctanos

Canal de comunicación entre usuarios y administración.



# Roles del Sistema

## Administrador

Acceso total al sistema.

## Operador

Registro de lecturas y gestión operativa.

## Presidente

Consulta y supervisión administrativa.

## Usuario

Consulta de facturas, pagos y estado de cuenta.


# Cómo Descargar el Proyecto

## Clonar Repositorios

### Frontend

bash
git clone https://github.com/julianaospina2026/Frontend_AquaVida

### Backend

bash
git clone https://github.com/julianaospina2026/Backend_AquaVida


# Configuración del Backend

1. Abrir el proyecto Backend_AquaVida en Visual Studio Code.
2. Configurar la conexión a MySQL en el archivo:

properties
application.properties


3. Crear la base de datos:

sql
CREATE DATABASE aquavida;

4. Ejecutar el proyecto:

bash
mvn spring-boot:run

El backend iniciará normalmente en:

bash
http://localhost:8080



# Configuración del Frontend

1. Abrir la carpeta Frontend_AquaVida.
2. Instalar dependencias:

bash
npm install

3. Ejecutar Angular:

bash
ng serve

4. Abrir el navegador en:

bash
http://localhost:4200



# Requisitos del Sistema

## Hardware para Desarrollo

Componente              Requisito

Procesador         Intel Core i5 / AMD Ryzen 5 o superior
RAM                8 GB mínimo (16 GB recomendado)
Disco SSD          40 GB libres
Arquitectura       x64



## Hardware para Usuario Final

  Componente       Requisito

 Dispositivo      Computador, Tablet o Smartphone
 Procesador       Octa-Core 2.0 GHz o superior
 RAM              4 GB mínimo
 Almacenamiento   64 GB

# Requisitos de Software

  Software          Versión

  Windows           10 o superior
  Ubuntu            22.04 LTS
  macOS             Compatible
  Java              17
  Angular           17
  Spring Boot       Compatible con Java 17
  Maven             3.8 o superior
  MySQL             8.0 o superior
  Google Chrome     Última versión
  Microsoft Edge    Última versión
  Mozilla Firefox   Última versión

# Funcionalidades Principales

* Gestión de usuarios y roles.
* Gestión de clientes.
* Administración de medidores.
* Registro de lecturas.
* Cálculo automático de consumo.
* Generación automática de facturas.
* Descarga de facturas PDF.
* Registro de pagos.
* Gestión de financiaciones.
* Control de cuotas.
* Programación de mantenimientos.
* Generación de reportes.
* Consulta histórica de información.

