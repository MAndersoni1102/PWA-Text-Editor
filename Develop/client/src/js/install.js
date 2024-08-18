const butInstall = document.getElementById('buttonInstall');

// TODO: Add an event handler to the `beforeinstallprompt` event
// Logic for installing the PWA.
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
// Logic for handling the install button.
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    // Wait for the user to respond to the prompt.
    promptEvent.prompt();
    // Clear the deferredPrompt variable.
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
// Logic for handling the app installation event.
window.addEventListener('appinstalled', (event) => {
    console.log('App was installed');
    butInstall.style.display = 'none';
    // Clear the prompt.
    window.deferredPrompt = null;
});