if ('serviceWorker' in navigator) {
  window.addEventListener('load', function registerServiceWorker() {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // PWA registration is progressive enhancement; the website still works.
    });
  });
}
