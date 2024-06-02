document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get('savedUrls', function (data) {
        if (data.savedUrls) {
            document.getElementById('urls').value = data.savedUrls.join('\n');
        }
    });

    document.getElementById('open-urls').addEventListener('click', function () {
        const urls = document.getElementById('urls').value.split('\n').filter(url => url.trim() !== '');
        chrome.storage.sync.set({ savedUrls: urls }, function () {
            chrome.runtime.sendMessage({ type: 'openUrls', urls: urls });
        });
    });
});
