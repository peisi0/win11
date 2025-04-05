class WinTaskbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0 20px;
                }
                .start-menu {
                    /* 开始菜单样式 */
                }
            </style>
            <button class="start-button">
                <img src="Windows_11.png" width="32">
            </button>
        `;
    }
}
customElements.define('win-taskbar', WinTaskbar);
