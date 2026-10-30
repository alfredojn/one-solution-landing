# One Solution — landing

Sitio estático de [one-solution.tech](https://one-solution.tech): empresa de soluciones de software con IA, con LubriControl como producto insignia.

- `index.html`, `styles.css`, `script.js`, `favicon.svg`: el sitio, sin dependencias ni compilación.
- `Dockerfile` + `nginx.conf`: imagen nginx que usa Dokploy para publicarlo.

Vista previa local:

```bash
python -m http.server 4321
```
