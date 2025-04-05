class DesktopShortcut extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.addEventListener('dblclick', this.openApp);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    margin: 12px;
                }
                img {
                    width: 48px;
                    height: 48px;
                }
            </style>
            <div>
                <img src="${this.getAttribute('icon')}">
                <div>${this.getAttribute('name')}</div>
            </div>
        `;
    }

    openApp() {
        window.wm.createWindow({
            title: this.getAttribute('name'),
            url: this.getAttribute('url')
        });
    }
}
customElements.define('desktop-shortcut', DesktopShortcut);
