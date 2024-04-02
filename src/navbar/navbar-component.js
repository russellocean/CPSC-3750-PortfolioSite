class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="/src/navbar/navbar.css">
    <nav id="navbar">
      <a href="/index.html" id="name">Russell Welch</a>
        <ul>
          <li><a href="/index.html" data-page="home">Home</a></li>
          <li><a href="/src/pages/about.html" data-page="about">About Me</a></li>
          <li><a href="/src/pages/projects.html" data-page="projects">Projects</a></li>
          <li class="dropdown">
            <a href="#" data-page="school-projects">School Projects</a>
            <div class="dropdown-content">
              <a href="/src/MoreCSS/GroupCSS2.html" data-page="morecss">More CSS Project</a>
              <a href="/src/BasicFixedFluidHybridLayout/layout.html" data-page="layout">Fluid Hybrid Layout</a>
              <a href="/src/JavascriptEvents/chapter04.html" data-page="javascript-events">Javascript Events</a>
              <a href="/src/194974/index.html" data-page="mount-joy">Mt. Joy Band Store</a>
              <a href="/src/PHPHelloWorld/helloworld.php" data-page="php-hello-world">PHP Hello World</a>
              <a href="/src/JavascriptSort/sort.html" data-page="javascript-sort">Javascript Sort</a>
              <a href="/src/MovingButtons/ButtonMove.html" data-page="button-move">Moving Buttons</a>
              <a href="/src/GroupEvents/GroupEvents.html" data-page="group-events">Group - Events</a>
              <a href="/src/GroupAudio/GroupAudio.html" data-page="group-audio">Group - Audio</a>
              <a href="/src/CardObject/CardObject.html" data-page="card-object">Card Objects</a>
              <a href="/src/Prime/prime.html" data-page="prime">Prime Checker</a>
              <a href="/src/Keypress/Keypress.html" data-page="keypress">Key Press Demo</a>
              <a href="/src/jQuery/jQuery.html" data-page="jquery">jQuery Demo</a>
              <a href="/src/hangman/hangman.html" data-page="hangman">Hangman</a>
              <a href="/src/Handlebars/handlebars.html" data-page="handlebars">Handlebars</a>
              <a href="/src/AudioChanger/AudioChanger.html" data-page="audio-changer">Audio Changer</a>
              <a href="/src/zipcodes/index.html" data-page="zipcodes">Zipcodes</a> 
              <a href="/src/LiveSearch/livesearch.html" data-page="livesearch">Live Search</a>
              <a href="/src/PHPFile/numberChecker.html" data-page="php-file">PHP File</a>
              <a href="/src/DMMTExamples/DMMTExamples.html" data-page="dmmt-examples">DMMT Examples</a>
              <a href="/src/GroupSessions/carselection.html" data-page="group-sessions">Group Sessions</a>
            </div>
          </li>
          <li><a href="mailto:russellwelch17@gmail.com" data-page="contact">Contact</a></li>
        </ul>
      </nav>
      `;
  }

  connectedCallback() {
    window.addEventListener("DOMContentLoaded", (event) => {
      document.body.classList.add("page-loaded");
      const currentPage = this.getAttribute("current-page");
      this.shadowRoot.querySelectorAll("a").forEach((link) => {
        if (link.dataset.page === currentPage) {
          link.classList.add("active");
        }
      });
      this.shadowRoot
        .querySelector(".dropdown")
        .addEventListener("mouseover", () => {
          this.shadowRoot.querySelector(".dropdown-content").style.display =
            "block";
        });
      this.shadowRoot
        .querySelector(".dropdown")
        .addEventListener("mouseout", () => {
          this.shadowRoot.querySelector(".dropdown-content").style.display =
            "none";
        });
    });
  }
}

customElements.define("custom-navbar", NavbarComponent);
