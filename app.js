import { sendMessage } from "./helper.js";

const replaceButton = document.querySelector('.replace-gist_btn');
const firstChild = replaceButton.firstChild;
if(replaceButton) {
    replaceButton.addEventListener('click', async () => {
        await sendMessage({ action: 'REPLACE' });
    })
    replaceButton.addEventListener('focus', () => {
        replaceButton.textContent = 'OK'
    })
}