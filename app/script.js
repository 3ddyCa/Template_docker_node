document.addEventListener('DOMContentLoaded', () => {
    const info = document.getElementById('info');
    info.textContent = `Application lancée le ${new Date().toLocaleString('fr-FR')}`;
});