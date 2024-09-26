const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    butInstall.style.visibility = 'visable'
    butInstall.textContent = 'Install Me!'
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async (event) => {
    await event.prompt()
    butInstall.setAttribute('disabled',true)
    window.location.replace('_blank')
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App Installed',event)
});
