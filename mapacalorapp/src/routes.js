
import Dashboard from "views/Dashboard.jsx";
import Busqueda from "views/Busqueda.jsx";
import Investigacion from "views/Investigacion.jsx";
import Incidentes from "views/Incidentes.jsx";
import Informacion from "views/Informacion.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/Busqueda",
    name: "Busqueda",
    icon: "pe-7s-note2",
    component: Busqueda,
    layout: "/admin"
  },
  {
    path: "/Investigacion",
    name: "Mapa de Investigacion",
    icon: "pe-7s-map-marker",
    component: Investigacion,
    layout: "/admin"
  },
  {
    path: "/Incidentes",
    name: "Mapa de Incidentes",
    icon: "pe-7s-map-2",
    component: Incidentes,
    layout: "/admin"
  },
  {
    path: "/Informacion",
    name: "Informacion",
    icon: "pe-7s-info",
    component: Informacion,
    layout: "/admin"
  }
];

export default dashboardRoutes;
