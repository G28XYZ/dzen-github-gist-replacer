import { sendMessageToContent } from "./helper.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action } = request;

    switch (action) {
        case "REPLACE":
            (async () => {
                await sendMessageToContent(request);
                sendResponse(request);
            })();
            break;
        default:
            sendResponse(request);
    }

    return true; // признак что ответ будет асинхронный
});
