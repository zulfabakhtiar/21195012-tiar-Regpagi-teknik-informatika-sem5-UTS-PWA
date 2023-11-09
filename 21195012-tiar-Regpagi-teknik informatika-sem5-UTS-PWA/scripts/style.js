// window.onload = () => {
//     'use strict';
  
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker
//                .register('./sw.js');
//     }
//   }
  
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if ('serviceWorker' in navigator && navigator.onLine) {
        navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.log('Registrasi service worker Berhasil', reg);
        }, (err) => {
            console.error('Registrasi service worker Gagal', err);
        });
    }
}