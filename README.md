# Mobile flashcards 
This is a react native app that allows a user to create decks and place cards into a specific deck, a card has two fields, the question and the answer then a user can take quizes by answering to questions.

## How to run the APP

1. Clone the repo using this link [here](https://github.com/mystere10/mobile-flashcards.git)
2. run npm install
3. use `expo start` to start the app

## What to know

- This project was tested on iPhone 7
- When registering cards make sure in the answer field use only `yes` or `no` as answers as there is not input field to check what the user typed. In brief the quiz will be multiple choice. You provide a statement then the user evaluate it to yes or no, if the user says yes and it matches the answer to that question will be correct otherwise it will be no.

## List of functions used to save data in the local storage

### __getDecks
This function gets decks from  the local storage

### __AddDeck
It adds decks in the local storage

### __AddCardToDeck
It registers a card to a specific deck and saves it in the local storage

