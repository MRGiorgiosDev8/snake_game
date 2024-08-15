document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeStylesheet = document.getElementById('themeStylesheet');

    const lightThemeURL = "/static/game/css/styles.css";
    const darkThemeURL = "/static/game/css/dark-styles.css";

    const currentTheme = localStorage.getItem('theme') || 'light';


    themeStylesheet.setAttribute('href', currentTheme === 'dark' ? darkThemeURL : lightThemeURL);

    themeToggleBtn.addEventListener('click', () => {
        gsap.to('body', {
            duration: 0.4, 
            opacity: 0,
            ease: "bounce.in",
            onComplete: () => {
                if (themeStylesheet.getAttribute('href') === lightThemeURL) {
                    themeStylesheet.setAttribute('href', darkThemeURL);
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeStylesheet.setAttribute('href', lightThemeURL);
                    localStorage.setItem('theme', 'light');
                }
                gsap.to('body', { duration: 0.4, opacity: 1, ease: "bounce.in", });
            }
        });
    });
});