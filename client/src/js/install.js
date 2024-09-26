const butInstall = document.getElementById("buttonInstall");

// event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  //Tutor
  window.deferredPrompt = event;

  butInstall.style.visibility = "visable";
  butInstall.textContent = "Install Me!";
});

// click event handler on the `butInstall` element (Tutor)
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  butInstall.setAttribute("disabled", true);
});

// handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App Installed", event);
});
