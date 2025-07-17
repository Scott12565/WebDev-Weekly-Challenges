// Select the DOM elements where quote and author will be displayed
const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author');
// Select the button that triggers a new quote display
const newQuoteBtn = document.querySelector('.new-quote-btn');

// Array to store all quotes fetched from JSON
let quotes = [];

/**
 * Picks a random quote from the 'quotes' array and updates the DOM
 */
const getRandomQuote = () => {
    // Generate a random index within the bounds of the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    // Get the quote object at the random index
    const randomQuote = quotes[randomIndex];

    // Update the quote text element with the quote
    quoteText.textContent = randomQuote.quote;
    // Update the author text element with the author or fallback to 'Unknown'
    authorText.textContent = randomQuote.author ? `- ${randomQuote.author}` : '- Unknown';
}

/**
 * Fetches quotes data from the JSON file and initializes the first random quote
 */
const fetchQuotes = async () => {
    try {
        // Fetch the quotes.json file from the server
        const response = await fetch('./quotes.json');
        // Parse the response JSON (expected to be an array of quote objects)
        const data = await response.json();
        // Assign the fetched quotes to the 'quotes' array
        quotes = data;
        // Display an initial random quote
        getRandomQuote();
    } catch (error) {
        // Log any errors during fetch and display an error message to the user
        console.error('Error fetching quotes:', error.message);
        quoteText.textContent = 'Failed to load quotes. Please try again later.';
        authorText.textContent = '';
    }
}

// Add event listener to button to display a new random quote when clicked
newQuoteBtn.addEventListener('click', getRandomQuote);

// Fetch quotes when the page loads to initialize the app
fetchQuotes();
