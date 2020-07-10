import {ADD_DECK, ADD_QUESTION, GET_DECKS} from '../actions'

function decks (state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                [action.key]:{
                    title:action.deck.title,
                    questions:action.deck.questions
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.deckKey]:{
                    ...state[action.deckKey],
                    questions: state[action.deckKey].questions.concat({
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
