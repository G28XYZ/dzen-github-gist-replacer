import { TMessage } from './types.js';

export const getActiveTab = async () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true }, (tabs) => {
        if (chrome.runtime.lastError) throw new Error(chrome.runtime.lastError.toString());
        const tab = tabs.at(0);
        if (!tab) throw new Error("An error occurred when getting the active tab");
        resolve(tab);
      });
    } catch (error) {
      reject(undefined);
    }
  });
};
/**
 * 
 * @param {TMessage} request
 * @returns {Promise<TMessage | Error>}
 */
export const sendMessage = async (request) => {
  try {
    const response = await chrome.runtime.sendMessage(request);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @param {TMessage} request
 * @param {number} [tabId]
 * @returns {Promise<TMessage | Error>}
 */
export const sendMessageToContent = async (request, tabId) => {
  try {
    tabId = tabId ?? Number((await getActiveTab())?.id);
    if (!tabId || tabId <= 0) {
      throw Error("Can't get the active tab");
    }
    const contentResponse = await chrome.tabs.sendMessage(tabId, { ...request, tabId });
    return Promise.resolve(contentResponse);
  } catch (error) {
    return Promise.reject(error);
  }
};
