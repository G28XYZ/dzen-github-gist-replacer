import { sendMessage } from "./helper.js";

const replaceButton = document.querySelector('.replace-gist_btn');
if(replaceButton) {
    const text = replaceButton.querySelector('span');
    const countText = replaceButton.querySelector('strong');
    replaceButton.addEventListener('click', async () => {
        await sendMessage({ action: 'REPLACE' });
        text && (text.textContent = 'watching');
        countText && (countText.textContent = '1');
    })
}