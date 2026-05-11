# Controlo Total · Extreme Challenge · III Edição

> Não é uma prova. É um processo.

Página informativa da **III edição do Extreme Challenge** — operação CAOS, 22–27 SET 2026. Travessia de 166,6 km em 5 dias, das Grutas de Mira de Aire ao Centro Geodésico de Portugal.

![Status](https://img.shields.io/badge/status-active-c1272d?style=flat-square)
![Edition](https://img.shields.io/badge/edition-III-c1272d?style=flat-square)
![Distance](https://img.shields.io/badge/distance-166.6km-c1272d?style=flat-square)
![Elevation](https://img.shields.io/badge/D+-3162m-7a8038?style=flat-square)

---

## Operação CAOS · Sumário Táctico

| # | Etapa | Dist. | Tempo | D+ | D− | Dificuldade |
|---|---|---|---|---|---|---|
| 1 | Grutas Mira de Aire → Castelo de Ourém | 33,3 km | 8h45 | +479 m | −458 m | Difícil |
| 2 | Castelo de Ourém → Convento de Cristo (Tomar) | 29,3 km | 7h40 | +368 m | −578 m | Difícil |
| 3 | Convento de Cristo → Constância | 35,5 km | 9h15 | +279 m | −336 m | Difícil |
| 4 | **Constância → Miradouro das Fontes** | **41,6 km** | **12h35** | **+1 092 m** | **−835 m** | **Muito Difícil** |
| 5 | Miradouro das Fontes → Centro Geodésico (Melriça) | 26,9 km | 8h20 | +944 m | −655 m | Difícil |
| **Σ** |  | **166,6 km** | **46h35** | **+3 162 m** | **−2 862 m** |  |

---

## Stack

- **Express** — servidor estático com gzip e headers de segurança
- **HTML/CSS/JS** vanilla — single-file (`public/index.html`), sem build step
- **SVG procedural** — perfis de elevação gerados client-side com PRNG seeded (mulberry32) que respeita as cotas reais
- **Render** — deploy automático via `render.yaml`

Sem React, sem bundler, sem dependências de runtime no frontend. A página inteira renderiza inline em < 60 KB.

## Estrutura

```
.
├── public/
│   └── index.html           # Página completa (HTML + CSS + JS)
├── server.js                # Express static server
├── package.json
├── render.yaml              # Render Blueprint
├── .gitignore
└── README.md
```

---

## Desenvolvimento Local

```bash
git clone https://github.com/<user>/ct-extreme-challenge.git
cd ct-extreme-challenge
npm install
npm start
```

Abre [http://localhost:3000](http://localhost:3000).

> Como a página é 100% client-side, podes simplesmente abrir `public/index.html` no browser. O servidor Express só é necessário em produção.

---

## Deploy no Render

### Via Blueprint (recomendado)

1. Faz push do repo para o GitHub
2. No dashboard Render: **New → Blueprint**
3. Aponta para este repo — o `render.yaml` faz o resto
4. URL final: `https://controlo-total-extreme-challenge.onrender.com`

### Manual

1. **New → Web Service**
2. Conecta o repo
3. Settings:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Health check path**: `/health`
   - **Node version**: `20.11.0`
   - **Environment**: `NODE_ENV=production`

---

## Funcionalidades

- **Mapa táctico SVG** com 6 waypoints geo-referenciados, graticule lat/lon, rosa-dos-ventos e escala
- **Perfil de elevação total** com transições D1→D5 marcadas
- **Perfis individuais** por etapa com pico marcado e range de altitudes
- **12 links Google Maps**: 1 percurso total + 5 individuais + 6 waypoints
- **Estética stencil/militar** consistente com a identidade do CT
- **Totalmente responsivo** — mobile, tablet, desktop
- **Print-friendly** — `@media print` simplifica o layout para impressão

---

## Notas

Dados de elevação validados via [Outdooractive](https://www.outdooractive.com). Os perfis individuais são gerados proceduralmente respeitando D+/D− oficiais e cotas reais — não são GPS tracks reais. Para tracking real durante a operação, recomenda-se o Komoot ou Outdooractive (Pro).

Inscrições e contacto: `@miguel26delgado` · `controlototal.pt`

---

**© 2026 · Controlo Total · MikeDeltaSix · DOC. CT-EXT-III-2026 / REV.01**
