
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/patient"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/profil"
  },
  {
    "renderMode": 2,
    "route": "/dpi-list"
  },
  {
    "renderMode": 2,
    "route": "/create-dpi"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 2921, hash: 'b99ed9b1ee31481c38a05b590866de67fc61298023872266a36f028c8b577596', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1115, hash: 'dd61402674bd4004c4e909f95f2f0ea24c8417924ba28664f3ddfce96a3a7bd8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 10153, hash: 'ba7a8150bbf6a9a01ae1c5ec37e5f3aea12268484a9dbd02350f9ad4e8cb3141', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'profil/index.html': {size: 6623, hash: '4985993a60cb954634b3606b9f36c8cfb638764d4da835fbdfd0f307ed1a1505', text: () => import('./assets-chunks/profil_index_html.mjs').then(m => m.default)},
    'dpi-list/index.html': {size: 6208, hash: '872d6cfbe5fc5dc42497262c78c1ca576cbd0dbc44e1499085cae0ee2f3a5d15', text: () => import('./assets-chunks/dpi-list_index_html.mjs').then(m => m.default)},
    'create-dpi/index.html': {size: 5273, hash: '175417ab7cf3e9fff9aa7b0d79048775c82c3542c16f779d3b3d7ab25243ec66', text: () => import('./assets-chunks/create-dpi_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 3938, hash: 'cbcf114a67a44a5595cf009462b0f246c89ad2b0dcc71ef53dafa78019d747de', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 138690, hash: '511a4364510df35d48750bea4227a2118617a83dcd647addd2bd921cfb7dd0cb', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'patient/index.html': {size: 12926, hash: 'a9f1f25c6b62ae90dc365bf6b6328bb8cdd033755143ea10f3b4bf2debc0961f', text: () => import('./assets-chunks/patient_index_html.mjs').then(m => m.default)},
    'styles-SXOWL56N.css': {size: 2194, hash: 'O3kJZN+VGuI', text: () => import('./assets-chunks/styles-SXOWL56N_css.mjs').then(m => m.default)}
  },
};
