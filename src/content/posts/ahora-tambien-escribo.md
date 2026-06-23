---
title: 'Ahora esto también es un blog'
description: 'Renombré la sección a posts: ya no todo tiene que ser un repo de GitHub.'
pubDate: 'Jun 22 2026'
---

Hasta ahora esta sección era un portafolio de proyectos: cada entrada apuntaba
a un repositorio de GitHub y de ahí salía todo, incluso el icono y el banner.

Eso estaba bien para mostrar código, pero me dejaba afuera todo lo demás: notas,
ideas a medio cocinar, cosas que aprendí y quiero escribir aunque no tengan un
repo asociado.

## Qué cambió

Ahora las entradas son **posts**, y cada parte es opcional e independiente:

- Una **imagen** dentro del post (`heroImage`) y un **icono** en la lista (`icon`),
  que pongo yo con la URL que quiera. Si no los pongo, no se muestran (este post,
  por ejemplo, no tiene ninguno).
- Un **link a un repo** (`githubRepo`), que además trae la fecha del último commit.
- Y si no hay nada de eso, queda un **post de blog** normal: solo título,
  descripción, fecha y el texto que estás leyendo.

Nada se trae solo de GitHub: las imágenes son siempre explícitas.

## Cómo escribo uno nuevo

Creo un archivo `.md` en `src/content/posts/` con este frontmatter mínimo:

```yaml
---
title: 'Título del post'
description: 'Una línea que resume de qué va.'
pubDate: 'Jun 22 2026'
---
```

Y le sumo lo que quiera, todo opcional:

```yaml
heroImage: 'https://…/banner.png'   # imagen dentro del post
icon: 'https://…/icon.png'          # iconito en la lista
githubRepo: 'usuario/repositorio'   # link al repo + último commit
```

Eso es todo.
