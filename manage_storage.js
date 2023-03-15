chrome.storage.onChanged.addListener(updateButtonsState);

// Saves the selected tab into the local storage
function saveToStorage() {
    chrome.storage.local.clear().then(() => {
        // Gets the selected tabs' data
        const list_to_save = tabsListToSave();
        // Stores the list into the local storage
        chrome.storage.local.set(list_to_save);
    });
}

// Retrieves the info of the stored tabs and tells to the bg script to open them
function openStored() {
    // Get the stored tabs
    chrome.storage.local.get().then(stored_list => {
        // Notify the bg script to open them
        notifyBackgroundPage(stored_list);
    });
    // Close the overlay
    destroy();
}

// Deletes all the data stored into the local storage
function deleteStored() {
    chrome.storage.local.clear();
}

// Sends a message, then received by the background script which will open the tabs
function notifyBackgroundPage(list) {
    chrome.runtime.sendMessage({action: 'open_stored', data: list});
}
