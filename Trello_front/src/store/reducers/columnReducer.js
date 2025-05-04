import { ADD_COLUMN, DELETE_COLUMN, SET_COLUMNS, EDIT_COLUMN, REORDER_COLUMNS } from "../actions/columnActions";
                    
const initialState = {
    columns: [],
};

const columnReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COLUMN:
            return {
                ...state,
                columns: [...state.columns, action.payload]
            };
            
        case DELETE_COLUMN:
            return {
                ...state, 
                columns: state.columns.filter(column => column.id !== action.payload),
            };

        case SET_COLUMNS:
            return {
                ...state,
                columns: action.payload,
            };

        case EDIT_COLUMN:
            return {
                ...state,
                columns: state.columns.map(column => 
                    column.id === action.payload.id ? { ...column, ...action.payload.updatedColumn } : column
                ),
            };

        case REORDER_COLUMNS:
            return {
                ...state,
                columns: action.payload,
            };

        default:
            return state;    
    }
};

export default columnReducer;