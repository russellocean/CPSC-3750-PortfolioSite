class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="/src/navbar/navbar.css">
    <nav id="navbar">
          <ul>
            <li><a href="/index.html" data-page="home">HOME</a></li>
            <li><a href="/src/pages/about.html" data-page="about">ABOUT ME</a></li>
            <li><a href="/src/pages/projects.html" data-page="projects">PROJECTS</a></li>
            <li><a href="/src/MoreCSS/GroupCSS2.html" data-page="morecss">MORE CSS PROJECT</a></li>
            <li><a href="/src/BasicFixedFluidHybridLayout/layout.html" data-page="layout">FLUID HYBRID LAYOUT</a></li>
            <li><a href="mailto:russellwelch17@gmail.com" data-page="contact">CONTACT</a></li>
          </ul>
        </nav>
      `;
  }

  connectedCallback() {
    const currentPage = this.getAttribute("current-page");
    this.shadowRoot.querySelectorAll("a").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.add("active");
      }
    });
  }
}

customElements.define("custom-navbar", NavbarComponent);
