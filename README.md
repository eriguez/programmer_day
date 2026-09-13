<!-- markdownlint-disable MD013 -->

# 💻 Feliz Día del Programador — Animación Interactiva 2D Canvas

Una espectacular animación interactiva y responsiva desarrollada con JavaScript Vanilla y HTML5 Canvas para celebrar el **Día del Programador** (el día 256 del año).

La aplicación dibuja texto dinámico estilizado en "pixel art" mediante un sistema físico de partículas que orbitan y reaccionan en tiempo real a las interacciones del usuario sobre un fondo *Deep Blue* minimalista y elegante.

---

## ✨ Características Principales

* **Fondo Deep Blue Sutil:** Configurado en un color azul marino profundo (`#031633`) con un gradiente radial central tenue que aporta profundidad sin generar ruido visual.
* **Tipografía Pixel Art por Matriz Binaria:** Fuentes personalizadas mapeadas bit a bit mediante arreglos de strings (`0` y `1`) con centrado horizontal automático y proporcional.
* **Física de Partículas:** Cientos de partículas individuales con aceleración hidrodinámica, desaceleración por fricción y comportamiento de oscilación orgánica mediante ruido trigonométrico (`Math.sin` / `Math.cos`).
* **Interactividad Táctil y Puntero:** Soporte para eventos de clic/toque (`pointerdown`) que generan ondas de choque expansivas de cian neón y repelen las partículas circundantes modificando su vector de velocidad y tono cromático.
* **Diseño Altamente Responsivo:** El contenedor CSS escala de forma idónea en pantallas móviles manteniendo una relación de aspecto perfecta (`12:7`).

---

## Instalación y Uso Local

Al estar construido puramente con tecnologías web nativas, no necesitas instalar dependencias de Node.js ni configurar servidores pesados.

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com
   cd TU_REPOSITORIO
   ```

2. **Ejecuta la animación:**
   Simplemente abre tu archivo `index.html` en cualquier navegador moderno haciendo doble clic, o utiliza una extensión de servidor local como **Live Server** en tu editor de código.

---

## Estructura del Código

El proyecto consta de una arquitectura limpia dividida en dos archivos principales:

* **`styles.css`:** Controla la rejilla del documento (`display: grid`), el reseteo básico de elementos (`box-sizing: border-box`), y asegura que el lienzo escale de forma fluida adaptándose al tamaño de la ventana (`width: 100%`).
* **`script.js`:** Contiene el bucle de renderizado principal (`requestAnimationFrame`), la lógica de dibujo analítica del contexto 2D (`ctx`), y la clase estructural `Particle` que gobierna el comportamiento físico.

---

## Guía de Personalización

Si deseas experimentar con el diseño o adaptarlo con tus propias variantes, estas son las zonas clave del código:

### Cambiar el Texto o Palabras

Al final de tu archivo JavaScript, puedes invocar la función `makeWord` con el string, la altura vertical (`top`) y el tamaño del píxel (`cell`):

```javascript
makeWord('FELIZ DIA DEL', 215, 11);
makeWord('PROGRAMADOR', 380, 12);
```

### Modificar la Paleta de Colores

Las partículas seleccionan aleatoriamente su tono base a partir del arreglo global de grados cromáticos HSL (`hues`). Puedes cambiar estos números (de `0` a `360`) para mutar los destellos neón:

```javascript
const hues =; // Cianes, morados, rosas y dorados
```

---

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT. ¡Siéntete libre de clonarlo, modificarlo y compartirlo con otros desarrolladores para celebrar nuestro día!

---
*¡Que tu código compile a la primera, y que nunca te falte el café! ☕😎*
