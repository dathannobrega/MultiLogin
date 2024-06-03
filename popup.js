document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('openUrls').addEventListener('click', openUrls);
    document.getElementById('restoreTabs').addEventListener('click', restoreTabs);
    document.getElementById('clearAndRestoreTabs').addEventListener('click', clearAndRestoreTabs);

    // Carregar URLs salvas ao carregar o popup
    chrome.storage.local.get(['savedUrls'], function (result) {
        if (result.savedUrls) {
            document.getElementById('urls').value = result.savedUrls.join('\n');
        }
    });
});

function openUrls() {
    console.log('Abrindo URLs...');
    const urls = document.getElementById('urls').value.split('\n').map(url => url.trim()).filter(url => url);
    console.log('URLs:', urls);
    chrome.storage.local.set({ savedUrls: urls }); // Salvar URLs localmente
    chrome.runtime.sendMessage({ type: 'openUrls', urls: urls }, function(response) {
        console.log('Resposta do background:', response);
    });
}

function restoreTabs() {
    console.log('Restaurando abas...');
    chrome.runtime.sendMessage({ type: 'restoreTabs' });
}

function clearAndRestoreTabs() {
    console.log('Limpando e restaurando abas...');
    chrome.runtime.sendMessage({ type: 'clearAndRestore' });
}
