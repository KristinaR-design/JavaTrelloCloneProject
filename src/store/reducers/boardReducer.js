import { ADD_BOARD, DELETE_BOARD, SET_BOARDS, EDIT_BOARD } from "../actions/boardActions";

const initialState = {
    boards: [],
};

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOARD:
            return {
                ...state,
                boards: [...state.boards, action.payload]
            };
            
        case DELETE_BOARD:
            return {
                ...state, 
                boards: state.boards.filter(board => board.id !== action.payload),
            };

        case SET_BOARDS:
            return {
                ...state,
                boards: action.payload.sort((a, b) => a.order - b.order),
            };
            

        case EDIT_BOARD:
            return {
                ...state,
                boards: state.boards.map(board => 
                    board.id === action.payload.id ? { ...board, ...action.payload.updatedBoard } : board
                ),
            };

        // case REORDER_BOARDS:
        //     return {
        //         ...state,
        //         boards: action.payload,
        //     };

        default:
            return state;    
    }
};

export default boardReducer;