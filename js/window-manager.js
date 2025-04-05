class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndex = 100;
    }

    createWindow(options) {
        const win = document.createElement('app-window');
        win.setAttribute('title', options.title);
        win.setAttribute('url', options.url);
        win.style.zIndex = ++this.zIndex;
        document.getElementById('window-container').appendChild(win);
        this.windows.push(win);
        return win;
    }
}

// 初始化窗口系统
window.wm = new WindowManager();
