// ==UserScript==
// @name         Дополнение для NekitOVK
// @namespace    http://tampermonkey.net/
// @version      2025-05-07
// @description  Дополнение для NekitOVK
// @author       NikitaLamb
// @match        *://nekitovk.veliona.no/*
// @icon         *://nekitovk.veliona.no/img/favicon.png
// @grant        none
// ==/UserScript==

const targetLink = document.querySelector('a[href="settings.php"]');
if (targetLink) {
    targetLink.insertAdjacentHTML('afterend', '<a href="bugtracker.php">Баг трекер</a>');
}


if (window.location.href.includes("bugtracker.php")) {
    const element = document.getElementById("bugs_filters");
    if (element) {
        element.style.display = "none";
    }
}

function replaceText() {
    // Ищем все текстовые узлы на странице
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes('OpenVK')) {
            node.nodeValue = node.nodeValue.replace(/OpenVK/g, 'NekitOVK');
        }
    }
}

// Вызываем функцию сразу
replaceText();

// Если страница динамическая (например, SPA), используем MutationObserver
new MutationObserver(replaceText).observe(document.body, {
    childList: true,
    subtree: true
});


const element = document.getElementById('content-main');
if (element) {
    // Заменяем текст "OpenVK" на "NekitOVK"
    element.innerHTML = element.innerHTML.replace(/OpenVK/g, 'NekitOVK');

    // Заменяем ссылку openvk.veselcraft.ru на nekitovk.veliona.no
    element.innerHTML = element.innerHTML.replace(
        /http:\/\/openvk\.veselcraft\.ru\//g,
        'https://nekitovk.veliona.no/'
    );
}