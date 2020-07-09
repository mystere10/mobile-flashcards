import {AsycStorage, AsyncStorage} from 'react-native';

export const CARD_STORAGE_KEY = 'MobileFlash:Cards'

export const getDecks = () => {
    return AsyncStorage.getItem(CARD_STORAGE_KEY).then((result) => {
        const decks = JSON.parse(result)
        return decks
    })
}

export const AddDeck = (deck, key) => {
    return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }), () => console.log("Added to local storage", deck))
                .catch((err) => console.log('error occured', err))
}

export const AddCardToDeck = (card, deckId) => {
    getDecks().then(result => {
        let data = result
        data[deckId] = {
            ...data[deckId],
            question: [
                ...data[deckId].question.concat({
                    question: card.queston,
                    answer: card.answer
                })
            ]
        }
        AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data))
            .then(result => console.log("Added to local strage"))
    })
}

