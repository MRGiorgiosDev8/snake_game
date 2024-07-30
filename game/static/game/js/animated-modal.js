document.addEventListener("DOMContentLoaded", function() {
    const usernameModalContent = document.querySelector("#usernameModal .modal-content");
    const gameOverModalContent = document.querySelector("#gameOverModal .modal-content");

    gsap.set([usernameModalContent, gameOverModalContent], { scale: 0, opacity: 0 });
    function showModal(modalContent) {
        gsap.to(modalContent, { duration: 0.5, scale: 1, opacity: 1 });
    }

    function showUsernameModal() {
        document.getElementById('usernameModal').style.display = 'flex';
        showModal(usernameModalContent);
    }

    function showGameOverModal() {
        const finalScore = document.getElementById('finalScore');
        document.getElementById('gameOverModal').style.display = 'flex';

        const score = window.currentScore || 0; 
        finalScore.textContent = "Score: " + score;

        gsap.fromTo(
            gameOverModalContent,
            { scale: 0, opacity: 0 },
            { duration: 0.5, scale: 1, opacity: 1, repeat: 0, yoyo: false }
        );
    }

    showUsernameModal();

    window.showGameOverModal = showGameOverModal;
});