// 开始菜单切换
function toggleStartMenu() {
    const menu = document.getElementById('startMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// 背景切换功能
let currentBackground = 0;
function changeBackground() {
    currentBackground = (currentBackground % 4) + 1;
    document.body.style.backgroundImage = `url('assets/background/bg${currentBackground}.png')`;
    return false;
}

// 窗口打开函数组
function openNewWindow1() {
    window.open('https://apps.microsoft.com/', '_blank', 'width=800,height=600');
    return false;
}
function openNewWindow2() {
    window.open('https://AL-sama0.github.io/announcement/', '_blank', 'width=800,height=600');
    return false;
}
function openNewWindow3() {
    window.open('https://wokwi.com/projects/new/arduino-mega/', '_blank', 'width=800,height=600');
    return false;
}
function openNewWindow4() {
    window.open('https://AL-sama0.github.io/arduino/', '_blank', 'width=800,height=600');
    return false;
}
function openNewWindow5() {
    window.open('https://google.com/', '_blank', 'width=800,height=600');
    return false;
}
function openNewWindow6() {
    window.open('https://poe.com/', '_blank', 'width=800,height=600');
    return false;
}

// 音频播放
function playSound() {
    document.getElementById('audio').play();
    return false;
}

// 全局点击监听
window.onclick = function(event) {
    const isStartButton = event.target.matches('.start-button') || event.target.closest('.start-button');
    const isChangeBgBtn = event.target.matches('.change-bg-button');

    if (!isStartButton && !isChangeBgBtn) {
        const menu = document.getElementById('startMenu');
        if (menu.style.display === 'block') menu.style.display = 'none';
    }
}
