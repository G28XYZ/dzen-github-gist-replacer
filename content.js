chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action } = request;
    switch (action) {
        case "REPLACE":
            doReplace();
            sendResponse(request);
            break;
        default:
            sendResponse(request);
    }
    return true; // признак что ответ будет асинхронный
});

const doReplace = () => {
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    let allGists = document.querySelectorAll('[data-testid="embed-block_external article-render__block"]');
    !allGists?.length && (allGists = document.querySelectorAll('[class^="content--embed-block__block-"]'));

    const createIframe = (linkToGist) => {
        const iframe = document.createElement('iframe');

        linkToGist = `<script src="${linkToGist}.js"></script>`
        '<script src="https://gist.github.com/G28XYZ/6d3ad2d10ec732591fb0471940359948.js"></script>'

        const template = {
            id  : genRanHex(6),
            html: `\n ${linkToGist}\n <script>\n var links = document.querySelectorAll('a');\n links.forEach(function(link) {\n link.setAttribute('target', '_blank');\n });\n var gist = document.querySelector('.gist-file');\n $sf.watchElementSize(gist);\n </script>\n`
        }
    
        iframe.setAttribute('id', template.id);
        iframe.setAttribute('src', 'https://dzen.ru/custom-adv/safeframe');
        iframe.setAttribute('class', 'adaptive-iframe');
        iframe.setAttribute('name', encodeURIComponent(JSON.stringify(template)));
        iframe.setAttribute('frameborder', 'no');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('hidefocus', 'true');
        iframe.setAttribute('tabindex', '-1');
        iframe.setAttribute('marginwidth', '0');
        iframe.setAttribute('marginheight', '0');

        iframe.style.backgroundColor = 'transparent';

        const setHeightCallback = (event) => {
            try {
                if(event.origin.includes('dzen') && event.data.id === iframe.id) {
                    iframe.style.height = `${event.data.height + 18}px`;
                    iframe.style.maxHeight = '500px';
                    window.removeEventListener('message', setHeightCallback)
                }
            } catch {}
        }
    
        window.addEventListener('message', setHeightCallback);

        return iframe;
    }

    if(allGists.length) {
        const gistUrls = [];
        allGists.forEach(item => {
            const aLink = item.querySelector('a');
            if(aLink) {
                const url = decodeURIComponent(aLink?.href?.replace('https://dzen.ru/away?to=', ''));
                if(url) gistUrls.push(url);
            }
            if(!(item.firstChild instanceof HTMLIFrameElement)) {
                item.firstChild?.remove?.();
                item.append(createIframe(aLink))
            }
        })

    }

}