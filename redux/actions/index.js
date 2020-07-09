export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addDeck(deck, key) {
    return {
        type: ADD_DECK,
        deck,
        key
    }
}

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addQuetionToDeck(card, deckKey) {
    return {
        type: ADD_QUESTION,
        card,
        deckKey
    }
}