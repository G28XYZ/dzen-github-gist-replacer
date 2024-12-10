import { sendMessageToContent } from "./helper.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action } = request;

    switch (action) {
        case "REPLACE":
            sendMessageToContent(request);
            sendResponse(request);
            break;
        default:
            sendResponse(request);
    }

    return true; // признак что ответ будет асинхронный
});
