document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeStylesheet = document.getElementById('themeStylesheet');
    const themeImage = document.getElementById('themeImage'); 

    const lightThemeURL = "/static/game/css/styles.css";
    const darkThemeURL = "/static/game/css/dark-styles.css";

    const lightImageURL = "/static/game/images/snakecartoon1.png";
    const darkImageURL = "/static/game/images/purplesnake.png";

    const currentTheme = localStorage.getItem('theme') || 'light';

    themeStylesheet.setAttribute('href', currentTheme === 'dark' ? darkThemeURL : lightThemeURL);
    themeToggleBtn.checked = currentTheme === 'dark';
    themeImage.src = currentTheme === 'dark' ? darkImageURL : lightImageURL;

    themeToggleBtn.addEventListener('change', () => {
        const newTheme = themeToggleBtn.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);

        gsap.to('body', {
            duration: 0.3,
            opacity: 0,
            ease: "power3.in",
            onComplete: () => {
                themeStylesheet.setAttribute('href', newTheme === 'dark' ? darkThemeURL : lightThemeURL);
                themeImage.src = newTheme === 'dark' ? darkImageURL : lightImageURL;
                gsap.to('body', { duration: 0.3, opacity: 1, ease: "power3.in" });
            }
        });
    });
});