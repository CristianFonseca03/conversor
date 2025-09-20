Crea una aplicación web usando **React** con **TypeScript** que permita convertir de peso colombiano (COP), peso mexicano (MXN) o dólar estadounidense (USD) a una moneda ficticia compuesta por **balatros**, **gansitos** y **silksongs**.

**Requisitos funcionales:**

- El usuario puede elegir la moneda de origen (COP, MXN o USD).
- El usuario puede ingresar un valor numérico.
- La app consulta las tasas de conversión reales usando la API pública https://frankfurter.dev/ para obtener el valor actualizado de COP, MXN y USD.
- La app convierte el monto a la moneda ficticia, mostrando el resultado en la combinación adecuada de silksongs, balatros y gansitos (por ejemplo: 33 USD = 1 silksong, 1 balatro y 3 gansitos).
- Permite mostrar combinaciones parciales, como 3 balatros y 3 gansitos, si el monto no alcanza para un silksong completo.
- **La página siempre debe mostrar la equivalencia actualizada de dólar (USD) a peso colombiano (COP) y a peso mexicano (MXN), usando la tasa de la API.**

**Equivalencias ficticias:**

- 1 gansito = 1 dólar
- 1 balatro = 10 gansitos
- 2 balatros = 1 silksong

**Requisitos visuales y de experiencia:**

- Cada unidad de moneda ficticia debe representarse usando los siguientes íconos:
  - 🤡 para balatro
  - 🪿 para gansito
  - 🕷️ para silksong
- El diseño debe ser sencillo, responsivo y fácil de entender.

**Requisitos técnicos:**

- Usa **buenas prácticas de desarrollo en React y TypeScript** (componentes reutilizables, tipado estricto, estructura de carpetas clara, manejo adecuado de estado, etc).
- Prepara el proyecto para **deploy en GitHub Pages** (usa [gh-pages](https://www.npmjs.com/package/gh-pages) o similar).
- Incluye un README con instrucciones claras para instalación, desarrollo y despliegue.

**Entrega:**

- Estructura el proyecto como un repositorio listo para ser subido a GitHub.
- Incluye los archivos de configuración necesarios para el deploy en GitHub Pages.
