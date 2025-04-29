import { ADD_CARD, SET_CARDS, DELETE_CARD, EDIT_CARD, REORDER_CARDS } from "../actions/cardActions";

const initialState = {
    cards: [],
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload],
            };

        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload),
            };

        case SET_CARDS:
            return {
                ...state,
                cards: action.payload,
            };

        case EDIT_CARD:
            return {
                ...state,
                cards: state.cards.map(card =>
                    card.id === action.payload.id
                        ? { ...card, ...action.payload.updatedCard }
                        : card
                ),
            };

        case REORDER_CARDS:
            return {
                ...state,
                cards: action.payload,
            };

        default:
            return state;
    }
};

export default cardReducer;