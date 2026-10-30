# One Solution — landing

Sitio estático de [one-solution.tech](https://one-solution.tech): empresa de soluciones de software con IA, con LubriControl como producto insignia.

- `index.html`, `styles.css`, `script.js`, `favicon.svg`: el sitio, sin dependencias ni compilación.
- `Dockerfile` + `nginx.conf`: imagen nginx que usa Dokploy para publicarlo.

Al cambiar `styles.css` o `script.js`, subí el número de versión en `index.html` (`styles.css?v=N`): Cloudflare guarda esos archivos en caché por 7 días.

Vista previa local:

```bash
python -m http.server 4321
```
