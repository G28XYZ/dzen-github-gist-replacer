import { sendMessage } from "./helper.js";

const replaceButton = document.querySelector('.replace-gist_btn');
if(replaceButton) {
    replaceButton.addEventListener('click', async () => {
        await sendMessage({ action: 'REPLACE' });
    })
}