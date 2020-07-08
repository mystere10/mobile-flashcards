import {ADD_DECK, ADD_QUESTION, GET_DECKS} from '../actions'

function decks(state={}, action) {
    switch(action.type){
        case ADD_DECK:
            return {
                ...state,
                [action.key]: {
                    title: action.deck.title,
                    question: action.deck.questioj
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.deckKey]: {
                    ...state[action.deckKey].questions.concat({
                        question: action.card.question,
                        answer: action.card.answer
                    })
                }
            }
        default:
            return state
    }
}

export default decks
