# Clientes

DEMO: [https://smp-clientes.web.app](https://smp-clientes.web.app)

## Backend

Swagger: [https://app.swaggerhub.com/apis-docs/juniorUsca/test/1.0.0](https://app.swaggerhub.com/apis-docs/juniorUsca/test/1.0.0)

El backend se desarrollo en node usando express.
Se desplego a heroku usando contenedores para que sea tratado como un microservicio
Se habilito cors exclusivamente para el frontend

Falta validar los datos que se envian, como solo texto y requeridos

[Mas informacion](https://devcenter.heroku.com/categories/deploying-with-docker)

## Firebase

Se usaron cloud functions de firebase para poder calcular el promedio de edad actualizado
y la desviacion estandar.
Esta funccion se ejecuta despues de una insercion de registro dejando que sea un
post-proceso para que no interfiera con el flujo principal.

## Frontend

Para el frontend se uso react con vite, taildwind para los estilos y para agilizar los formularios DevExtreme.

Falta validar el formulario como requeridos los datos.

[Mas sobre vite](https://vitejs.dev/)
[Mas sobre tailwind](https://tailwindcss.com/)
[Mas sobre devExtreme](https://js.devexpress.com/Demos/WidgetsGallery/Demo/TextBox/Overview/React/Light)
