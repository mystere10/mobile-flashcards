import {AsyncStorage} from 'react-native';

export const CARD_STORAGE_KEY = 'MobileFlash:Cards'

export const __getDecks = () => {
    return AsyncStorage.getItem(CARD_STORAGE_KEY).then((result) => {
        const decks = JSON.parse(result)
        return decks
    })
}

export const __AddDeck = (deck, key) => {
    return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
        [key]: deck
    })).catch((err) => console.log('error occured', err))
}

export const __AddCardToDeck = (card, deckId) => {
    __getDecks().then(result => {
        let data = result
        data[deckId] = {
            ...data[deckId].title,
            questions: [
                ...data[deckId].questions.concat({
                    question: card.question,
                    answer: card.answer
                })
            ]
        }
        AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
            .then(result => console.log("Added to local strage"))
    })
}

