# Sistema de Gestión de Acueducto Veredal

## 1. Introducción

Este documento constituye la guía técnica y de referencia para el sistema de gestión del Acueducto Veredal. Su propósito es describir con precisión la arquitectura, los componentes, los flujos de datos, las decisiones de diseño y los aspectos operativos que permiten construir una solución web robusta para la administración de clientes, usuarios, roles y funciones de gestión comunitaria.

La necesidad de esta solución surge de la realidad de muchos acueductos veredales: procesos de gestión basados en registros manuales o en hojas de cálculo, ausencia de trazabilidad en el consumo de agua, dificultades para centralizar el estado de cuentas y cobros, y limitaciones en la gestión de usuarios con responsabilidades diferenciadas. Estas condiciones reducen la eficiencia administrativa, incrementan los errores operativos y dificultan la toma de decisiones basada en datos.

En este proyecto se plantea un frontend empresarial construido con Angular 17, cuya misión es servir como la interfaz principal de un sistema integrado. El frontend es la primera capa visible para los actores del acueducto y debe ser capaz de presentar información de manera clara, permitir la interacción segura con los datos y habilitar la extensión hacia módulos de pago, consumo, financiamiento y roles.

### 1.1 Contexto y motivación

El Acueducto Veredal es una estructura de servicio comunitario en la cual la gestión adecuada del agua potable, el cobro oportuno y la atención a los usuarios son críticos para la sostenibilidad. La digitalización aporta ventajas tangibles:

- mejora en la captura de datos de clientes y usuarios,
- transparencia en el estado de las obligaciones,
- capacidad de respuesta más rápida frente a eventos de calidad del agua,
- soporte al liderazgo comunal mediante información consolidada.

La motivación principal es entregar una herramienta que soporte tanto al personal técnico como a los órganos de gobierno local, permitiendo que cada actor desempeñe su función con mayor control y menor carga administrativa.

### 1.2 Alcance y enfoque técnico

Esta documentación describe el estado actual del frontend y establece las bases para su integración con un backend RESTful. La aplicación se estructura en componentes standalone, servicios inyectables y modelos tipados, siguiendo los principios de diseño de Angular.

El alcance técnico se centra en:

- la gestión de clientes y sus datos de contacto,
- el manejo de usuarios del sistema con roles básicos,
- una experiencia de navegación simple y consistente,
- la organización de rutas y la configuración de HTTP para futuras ampliaciones.

### 1.3 Audiencia del documento

La guía está dirigida a los siguientes grupos:

- analistas de negocio que validan requisitos,
- desarrolladores frontend que implementan mejoras,
- integradores de backend que conectan servicios de API,
- testers que verifican funcionalidad y calidad,
- patrocinadores que requieren claridad sobre el alcance y los riesgos.

En todos los casos, el documento ofrece una base compartida para entender cómo está construida la solución y qué partes requieren extensión cuando el sistema crezca.

### 1.4 Metodología y principios de diseño

El diseño de la aplicación se apoya en principios clave:

- modularidad: los componentes y servicios están organizados para ser reutilizables y fácilmente extensibles,
- separación de responsabilidades: la lógica de presentación se mantiene en componentes y la lógica de acceso a datos en servicios,
- escalabilidad: la estructura actual facilita la adición de nuevos módulos sin afectar las funcionalidades existentes,
- mantenibilidad: los modelos tipados y el uso de servicios centralizados reducen la complejidad del código,
- seguridad futura: aunque la autenticación aún no se ha implementado, la arquitectura se considera preparada para integrar validación de roles y protección de rutas.

### 1.5 Beneficios esperados

Con la adopción de este sistema, se espera lograr beneficios operativos y organizacionales como:

- reducción de errores en el registro de clientes,
- mayor visibilidad de la información de usuarios y roles,
- base sólida para introducir gestión de pagos y consumo,
- mayor profesionalismo en la administración del acueducto,
- continuidad en los procesos administrativos mediante un sistema digital.

Este documento no solo documenta el estado actual, sino que también prepara al equipo para la evolución hacia un sistema completo de gestión de acueducto veredal. El foco está en generar una plataforma que pueda soportar tanto las necesidades inmediatas como las proyecciones de crecimiento futuro.

### 1.6 Supuestos y limitaciones

La versión actual del frontend asume la existencia de un backend con API RESTful disponible para los recursos de clientes, usuarios y roles. No se ha implementado la lógica de autenticación ni de autorización en el frontend, por lo que el sistema se considera en una fase de prototipo funcional. Asimismo, algunos elementos como la gestión de pagos, consumo y financiamiento están referenciados como futuros hitos y requieren diseño adicional para su integración.

Entre las limitaciones actuales se destacan:

- ausencia de un mecanismo de autenticación y control de acceso completo,
- uso parcial de la configuración de entornos para endpoints de API,
- falta de paginación avanzada en los listados de datos,
- soporte de validaciones básicas sin reglas de negocio completas para cada rol.

Estas limitaciones están documentadas de forma explícita para facilitar la transición hacia las versiones siguientes y para que los equipos de desarrollo y operación puedan priorizar los trabajos de implementación.

### 1.7 Alcance de la documentación

La documentación abarca principalmente el frontend de Angular y su interacción prevista con servicios externos. Incluye tanto la descripción de componentes como la de servicios y modelos de datos. No cubre en detalle la implementación del backend, la infraestructura de despliegue en la nube ni la política de seguridad completa. Sin embargo, ofrece recomendaciones claras sobre qué módulos deben ampliarse y cómo estructurar los desarrollos futuros.

## 2. Objetivo del sistema

Ofrecer una solución digital que permita a los actores del acueducto veredal:

- Administrar clientes y sus datos básicos.
- Gestionar usuarios con roles de Administrador, Operador, Presidente y Cliente.
- Consultar indicadores y servicios desde un panel de inicio.
- Integrar vistas especializadas como historial de pagos, historial de consumo, financiamiento y gestión de roles.

## 3. Alcance funcional

El sistema contempla las siguientes funcionalidades principales:

- Módulo de clientes:
  - Listar clientes registrados.
  - Buscar clientes por documento.
  - Crear, editar y desactivar clientes.
- Módulo de usuarios:
  - Listar usuarios del sistema.
  - Buscar usuarios por nombre de usuario.
  - Crear, editar y eliminar usuarios.
  - Asignar roles a los usuarios.
- Vistas de información y servicio:
  - Página de inicio con elementos de consulta y comunicación.
  - Soporte para futuras vistas de historial de pago, historial de consumo, financiamiento y roles.

## 4. Actores y perfiles

El sistema está diseñado para los siguientes roles:

- **Administrador**: gestiona clientes, usuarios, roles y consulta información estratégica.
- **Operador**: administra la operación diaria, ingresa datos de consumo, facturación y puede atender PQRS.
- **Presidente**: revisa indicadores de gestión, financiamiento y supervisa la calidad del servicio.
- **Cliente**: consulta su historial de pagos, consumo y documentos asociados.

## 5. Arquitectura técnica

El frontend se organiza como una aplicación Angular con los siguientes elementos clave:

- Angular 17.3
- Componentes standalone
- Router de Angular (`@angular/router`)
- Formulario reactivo (`@angular/forms`)
- Cliente HTTP (`@angular/common/http`)
- Estilos con SCSS
- Soporte para renderizado universal con Angular Universal (`@angular/platform-server`)

### 5.1 Estructura principal del frontend

- `src/app/app.component.ts`: componente raíz de la aplicación.
- `src/app/app.routes.ts`: rutas definidas del frontend.
- `src/app/app.config.ts`: configuración de inyección de dependencias y router.
- `src/app/home`: módulo del panel de inicio.
- `src/app/cliente`: módulo de gestión de clientes.
- `src/app/usuario`: módulo de gestión de usuarios.
- `src/app/service`: servicios de acceso a API.
- `src/app/model`: modelos de datos.
- `src/environments/environments.ts`: configuración de entorno y URLs de backend.

## 6. Componentes y módulos

### 6.1 `HomeComponent`

- Componente de presentación de la página de inicio.
- Muestra servicios disponibles y noticias destacadas.
- Sirve como punto de entrada para el panel de administración.

### 6.2 `ClienteComponent`

- Permite listar clientes.
- Incluye búsqueda por documento.
- Permite crear y actualizar datos de cliente.
- Permite desactivar clientes.
- Utiliza formularios reactivos y validación de datos.

### 6.3 `UsuarioComponent`

- Permite listar usuarios del sistema.
- Incluye búsqueda por nombre de usuario.
- Permite crear y actualizar usuarios.
- Asigna roles a los usuarios.
- Utiliza validación de email y estados de usuario.

## 7. Servicios e integración backend

### 7.1 `ClienteService`

- Endpoint base: `${environment.apiUrl}/clientes`
- Métodos:
  - `listar()`
  - `obtenerPorId(id)`
  - `crear(cliente)`
  - `actualizar(id, cliente)`
  - `cambiarEstado(id, estado)`
  - `desactivar(id)`

### 7.2 `UsuarioService`

- Endpoint base: `http://localhost:8080/api/usuarios`
- Métodos:
  - `listar()`
  - `buscarPorUsername(username)`
  - `crear(usuario)`
  - `actualizar(id, usuario)`
  - `eliminar(id)`

### 7.3 `RolService`

- Endpoint base: `http://localhost:8080/api/roles`
- Métodos:
  - `listar()`

## 8. Modelos de datos

### 8.1 `Cliente`

- `id?: number`
- `codigoCliente: string`
- `documento: string`
- `nombre: string`
- `apellido: string`
- `direccion: string`
- `telefono: string`
- `email: string`
- `estrato: number`
- `estado: string`
- `fechaRegistro: string`

### 8.2 `Rol`

- `id: number`
- `nombre: string`

### 8.3 `Usuario`

- `id?: number`
- `username: string`
- `passwordHash: string`
- `email: string`
- `nombres: string`
- `apellidos: string`
- `telefono: string`
- `estado: string`
- `rol: Rol`
- `createdAt?: Date`
- `updatedAt?: Date`

## 9. Flujo de navegación

Rutas principales definidas en `src/app/app.routes.ts`:

- `/inicio` → `HomeComponent`
- `/clientes` → `ClienteComponent`
- `/usuarios` → `UsuarioComponent`
- `**` → redirección a `/inicio`

## 10. Configuración del entorno y ejecución

### 10.1 Requisitos previos

- Node.js (versión compatible con Angular 17)
- npm
- Angular CLI

### 10.2 Instalación

```bash
npm install
```

### 10.3 Ejecución en desarrollo

```bash
npm start
```

Accede a `http://localhost:4200/`.

### 10.4 Compilación de producción

```bash
npm run build
```

## 11. Buenas prácticas y recomendaciones

- Seguir el principio de responsabilidades únicas en componentes.
- Mantener la lógica de negocio en servicios.
- Usar validaciones reactivas en formularios.
- Externalizar endpoints en `environments`.
- Añadir manejo de errores consistente en los servicios.

## 12. Mantenibilidad y extensiones

### 12.1 Áreas de crecimiento

- Implementar vistas para `historialpago`, `historialconsumo`, `financiamiento` y `rol`.
- Añadir autenticación y autorización basada en roles.
- Añadir paginación y filtros avanzados a las listas.
- Migrar URLs de usuario y rol a `environment.apiUrl`.
- Añadir pruebas unitarias con Karma/Jasmine y pruebas de integración.

### 12.2 Sugerencias de mejora

- Crear módulos de función separados (`ClientesModule`, `UsuariosModule`, `FinanciamientoModule`).
- Implementar guardas de ruta (`CanActivate`) para proteger el acceso.
- Usar un interceptor HTTP para manejo global de tokens y errores.

## 13. Documentación adicional

- Archivo de rutas: `src/app/app.routes.ts`
- Configuración global: `src/app/app.config.ts`
- Servicio de datos de clientes: `src/app/service/clientes.service.ts`
- Servicio de datos de usuarios: `src/app/service/usuario.service.ts`
- Modelos de negocio: `src/app/model/*.ts`

## 14. Conclusión

La presente documentación evidencia un avance significativo en la definición de un sistema de gestión para un Acueducto Veredal. El frontend desarrollado con Angular 17 ofrece una estructura técnica coherente que puede servir como núcleo de una solución más amplia. Este sistema ya reúne elementos clave para la administración de clientes, la gestión de usuarios y la organización de roles, lo cual es esencial para garantizar una operación más ordenada y transparente.

En el contexto de un acueducto veredal, la digitalización de procesos administrativos es un factor determinante para la mejora continua. Con este proyecto, se logra proyectar una plataforma que transforma la forma en que se registra la información de los usuarios, se centralizan los permisos de acceso y se obtiene una visión inicial de las necesidades de servicio. El valor generado no está solo en la tecnología, sino en la posibilidad de apoyar la gestión comunitaria con datos estructurados y con mayor control sobre los procesos de facturación y consumo.

Las capacidades actuales del sistema se pueden resumir en tres dimensiones principales:

- **Gestión de clientes**: permite crear, editar, listar y desactivar clientes. Se provee validación de datos y un modelo que soporta la información mínima indispensable para vincular usuarios al sistema de acueducto.
- **Gestión de usuarios**: habilita la administración de usuarios del sistema y la asignación de roles. Aunque no se ha implementado la autenticación completa, el diseño contempla un esquema de roles que distingue entre Administrador, Operador, Presidente y Cliente.
- **Estructura técnica**: utiliza servicios HTTP para la comunicación con APIs, separación clara entre lógica de presentación y lógica de datos, y configuración de rutas centralizada para facilitar la navegación y la ampliación del sistema.

Estas dimensiones permiten una primera versión viable del sistema, pero también abren el camino para su evolución. La implementación actual puede servir como un prototipo funcional que demuestre el flujo y la lógica de negocio, mientras los siguientes desarrollos completan el ecosistema requerído para el acueducto.

### 14.1 Resultados y recomendaciones para el siguiente ciclo

El documento recomienda priorizar las siguientes acciones para llevar el proyecto de prototipo a una solución plenamente operativa:

- implementar un módulo de autenticación y autorización, con control de acceso granular basado en roles,
- normalizar todos los endpoints y configuraciones de API en los entornos de Angular para facilitar despliegues en distintos escenarios,
- desarrollar módulos de `historialpago`, `historialconsumo`, `financiamiento` y `rol`, que son requerimientos críticos para una gestión completa,
- adicionar mecanismos de paginación y filtrado en las listas de clientes y usuarios para manejar grandes volúmenes de datos,
- incorporar pruebas automatizadas de unidad y de integración para asegurar la calidad del código.

Estas recomendaciones no solamente completan funcionalidades, sino que también fomentan la sostenibilidad del sistema a mediano plazo. En particular, la autenticación y los roles permitirán que el sistema sea usado con mayor seguridad y que cada actor acceda únicamente a las funciones que le corresponden.

### 14.2 Impacto operativo

Un sistema bien implementado reduce la carga operativa en los equipos del acueducto, mejora el seguimiento de cuentas por cobrar y da herramientas de control a los comités de seguimiento. La capacidad de contar con un registro digital de clientes y casos de gestión es crítica para la rendición de cuentas y para la toma de decisiones basada en información real.

Además, una plataforma orientada a la gestión de acueducto contribuye a:

- mejorar la coordinación entre el operador y la administración,
- facilitar la atención de reclamos y solicitudes mediante información centralizada,
- permitir la planificación de inversión en infraestructura con base en patrones de consumo,
- apoyar la comunicación entre líderes comunitarios y usuarios finales.

### 14.3 Consideraciones finales

Aunque el proyecto parte desde una aplicación frontend, su verdadero alcance depende de la integración con servicios de backend. En este sentido, la documentación cumple una doble función: documentar el estado del frontend y servir como guía para el diseño e implementación de la capa de servicios que soporte la operación completa.

Se recomienda mantener actualizada esta documentación cada vez que se implemente un nuevo módulo o se cambien aspectos de la arquitectura. La documentación precisa es un componente crítico en proyectos de transformación digital, ya que permite que nuevos colaboradores comprendan el diseño rápidamente y que las decisiones técnicas se realicen con mayor rigor.

En cierre, esta documentación técnica posiciona al Acueducto Veredal para avanzar hacia un sistema de gestión más profesional, eficiente y alineado con los requerimientos de la comunidad. Su enfoque en modularidad, claridad y capacidad de extensión ha sido diseñado para respaldar una evolución ordenada, donde los siguientes pasos agreguen valor tangible a la operación cotidiana y al gobierno del servicio de agua.

### 14.4 Retos y riesgos identificados

Durante la evolución de este proyecto, es importante tener en cuenta varios riesgos que pueden afectar su implementación y adopción:

- dependencia en la disponibilidad de un backend cohesionado,
- posible desalineación entre los roles definidos en el frontend y las políticas reales de control de acceso,
- necesidad de adaptar la interfaz a condiciones de conectividad limitada en zonas rurales,
- requerimiento de capacitación para los usuarios administrativos y comunitarios.

Identificar estos retos desde el inicio permite una planificación más realista y la definición de medidas mitigantes, como la creación de un plan de pruebas de usuario o la implementación de modo offline parcial.

### 14.5 Plan de adopción recomendado

Para que el sistema alcance su máximo potencial, se sugiere un plan de adopción basado en fases:

1. despliegue piloto con el módulo de clientes y usuarios,
2. validación operativa con un grupo reducido de administradores y operadores,
3. incorporación gradual de módulos de historial de consumo y pagos,
4. formación de los líderes comunitarios en el uso del sistema,
5. evaluación continua de indicadores de adopción y del retorno operativo.

Este enfoque gradual permite validar la solución en la práctica, ajustar la experiencia de usuario y consolidar la confianza de los actores del acueducto. Un despliegue escalonado también reduce el riesgo de cambios disruptivos en la operación diaria.

En conclusión, el documento ofrece una guía clara para el desarrollo y la ampliación del sistema, y apoya la definición de un roadmap técnico y operativo. La construcción de esta solución representa un paso importante hacia una gestión más ordenada y sostenible del servicio de agua en comunidades veredales.

---

Esta documentación reúne el estado actual del frontend y la propuesta de alcance funcional para un sistema de administración de acueducto veredal. Puede utilizarse como base para continuar el desarrollo, especificar el backend y ampliar las vistas de gestión operacional y financiera.
