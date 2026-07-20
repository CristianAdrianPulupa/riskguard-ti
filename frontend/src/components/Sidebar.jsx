import "./Sidebar.css";

const opciones = [
  {
    id: "dashboard",
    icono: "⌂",
    texto: "Dashboard",
  },
  {
    id: "mapa-riesgos",
    icono: "▦",
    texto: "Mapa de riesgos",
  },
  {
    id: "riesgos",
    icono: "⚠",
    texto: "Gestión de riesgos",
  },
  {
    id: "mitigaciones",
    icono: "✓",
    texto: "Mitigaciones",
  },
];

export default function Sidebar() {
  function navegarA(id) {
    const seccion = document.getElementById(id);

    if (seccion) {
      seccion.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">RG</div>

        <div>
          <h1>RiskGuard</h1>
          <span>Gestión de Riesgos TI</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <p className="sidebar-section-label">PLATAFORMA</p>

        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className="sidebar-link"
            onClick={() => navegarA(opcion.id)}
          >
            <span className="sidebar-link-icon">
              {opcion.icono}
            </span>

            <span>{opcion.texto}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-frameworks">
        <p className="sidebar-section-label">ALINEACIÓN</p>

        <div className="framework-item">
          <span className="framework-dot" />
          COBIT 2019 · APO12
        </div>

        <div className="framework-item">
          <span className="framework-dot" />
          Enterprise Risk Management
        </div>

        <div className="framework-item">
          <span className="framework-dot" />
          Modelo IT4+
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user-avatar">CP</div>

        <div>
          <strong>Cristian Pulupa</strong>
          <span>Administrador</span>
        </div>
      </div>
    </aside>
  );
}