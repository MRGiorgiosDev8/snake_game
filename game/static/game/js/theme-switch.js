document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeStylesheet = document.getElementById('themeStylesheet');

    const lightThemeURL = "/static/game/css/styles.css";
    const darkThemeURL = "/static/game/css/dark-styles.css";

    const currentTheme = localStorage.getItem('theme') || 'light';
    const sliderAnimated = localStorage.getItem('sliderAnimated') || 'false';

    themeStylesheet.setAttribute('href', currentTheme === 'dark' ? darkThemeURL : lightThemeURL);
    themeToggleBtn.checked = currentTheme === 'dark';

    if (sliderAnimated === 'false') {
        themeToggleBtn.checked = currentTheme === 'dark';
        localStorage.setItem('sliderAnimated', 'true');
    }

    themeToggleBtn.addEventListener('change', () => {
        const newTheme = themeToggleBtn.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        localStorage.setItem('sliderAnimated', 'true');

        gsap.to('body', {
            duration: 0.4,
            opacity: 0,
            ease: "bounce.in",
            onComplete: () => {
                themeStylesheet.setAttribute('href', newTheme === 'dark' ? darkThemeURL : lightThemeURL);
                gsap.to('body', { duration: 0.4, opacity: 1, ease: "bounce.in" });
            }
        });
    });
});