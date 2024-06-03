document.addEventListener('DOMContentLoaded', function() {
    loadUrls();
});

document.getElementById('openUrls').addEventListener('click', function() {
    const urlList = document.getElementById('urlList').value.split('\n').map(url => url.trim()).filter(url => url);
    saveUrls(urlList);
    chrome.runtime.sendMessage({ type: 'openUrls', urls: urlList });
});

document.getElementById('restoreTabs').addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'restoreTabs' });
});

document.getElementById('clearAndRestore').addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'clearAndRestore' });
});

function saveUrls(urls) {
    chrome.storage.local.set({ savedUrls: urls }, function() {
        console.log('URLs saved');
    });
}

function loadUrls() {
    chrome.storage.local.get(['savedUrls'], function(result) {
        if (result.savedUrls) {
            document.getElementById('urlList').value = result.savedUrls.join('\n');
        }
    });
}
