// Select the HTML elements by class names
const carouselBtnLeft = document.querySelector('.slider-btn-left');
const carouselBtnRight = document.querySelector('.slider-btn-right');
const dots = document.querySelectorAll('.dots-dot');
const productCards = document.querySelectorAll('.product-card');

// Initialize current slide to 0
let currentCard = 0;

// Display the Card in the given index
function showCard(cardIndex) {
    productCards.forEach((card, index) => {
        // if loop index >= index of Card we want to show 
        // AND loop index < index of Card we want to show + num. of visible cards 
        card.classList.toggle('hidden', !(index >= cardIndex && index < cardIndex + getVisibleCardCount()));

        /*
            Example: When we are in Cards 0 and 1 in the mobile version,
            we click "next" to go to Card 2 and 3.
            First we check into the list of product cards: is the initial index of the loop (0) >= 2? No. 
            Does index 1 pass the condition? No. 
            2 does. So we check, is 2 < (2 + 2)? Yes.
            The same iterations are done for card 3. It will fulfill both conditions.
            Not card 4, 5 etc. though, because they will not pass the 2nd condition: index < cardIndex + getVisibleCardCount(),
            4 < 4 is false, just as 5 < 4, 6 < 4 etc. are
        */
    });

    // Update the active state of the dots
    updateDots(cardIndex);
}

// Go to the next Card
const goToNextCard = () => {
    currentCard = (currentCard + getVisibleCardCount()) % productCards.length;
    /*
        Example: We are on currentCard = 4, which is together with card 5.
        getVisibleCardCount() returns 2 because we are on mobile
        productCards.length is 10
        So, (4 + 2) % 10 = 6
        And we go to product 6, it will be in the place of product 4.
        The same with card number 5, it will be replaced by card number 7.
    */
    showCard(currentCard);
};

// Go to previous Card
const goToPrevCard = () => {
    currentCard = (currentCard - getVisibleCardCount() + productCards.length) % productCards.length;
    showCard(currentCard);
};

// Update the active state of the dots based on the current Card index
function updateDots(cardIndex) {
    dots.forEach((dot, index) => {
        dot.classList.toggle('dots-dot--active', index === Math.floor(cardIndex / getVisibleCardCount()));
    });
}

// Make the dots go to the corresponding Card
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentCard = index * getVisibleCardCount();
        showCard(currentCard);
    });
});

// Combine click event listeners for carousel buttons
carouselBtnRight.addEventListener('click', goToNextCard);
carouselBtnLeft.addEventListener('click', goToPrevCard);

// To show only 2 cards on mobile version, and 5 on desktop
function getVisibleCardCount() {
    return window.innerWidth >= 768 ? 5 : 2; 
}

// Initialize carousel by showing the first cards
showCard(0);
