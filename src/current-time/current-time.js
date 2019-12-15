const currentTimeTemplate = document.createElement('template');
currentTimeTemplate.innerHTML = `
  <h2><slot></slot></h2>
  <time></time>
`;

class CurrentTime extends HTMLElement {
  constructor() {
    super(); // Call parent's contrusctor

    // Create shadow DOM and use the template to generate its content
    this.el = this.attachShadow({ mode: 'closed' });
    this.el.appendChild(currentTimeTemplate.content.cloneNode(true));

    // Store the <time> element inside the class to fetch it only once
    this.timeEl = this.el.querySelector('time');
  }

  // What are the attributes that we want to use on the <current-time> tag ?
  static get observedAttributes() {
    return ['utc'];
  }

  // Keep the utc value inside the class when it changes
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'utc') {
      this.utc = newVal;
    }
  }

  // Once the component is connected, start rendering every second
  connectedCallback() {
    this.render();
    this.interval = setInterval(() => this.render(), 1000);
  }

  // Stop the interval when the component is disconneted
  disconnectedCallback() {
    clearInterval(this.interval);
  }

  // Display the UTC or local time inside the <time> tag
  render() {
    this.timeEl.innerHTML = this.utc ? new Date().toUTCString() : new Date();
  }
}
