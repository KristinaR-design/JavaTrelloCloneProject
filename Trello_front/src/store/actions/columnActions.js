export const ADD_COLUMN = "ADD_COLUMN";
export const DELETE_COLUMN = "DELETE_COLUMN";
export const SET_COLUMNS = "SET_COLUMNS";
export const EDIT_COLUMN = "EDIT_COLUMN";
export const REORDER_COLUMNS = "REORDER_COLUMNS";
import axios from 'axios';
axios.defaults.withCredentials = true;

// Action для добавления доски
export const addColumn = (title, boardId) => async (dispatch) => {
        try {          
        const response = await axios.post(
            "http://localhost:8080/api/columns",
            {"title": title, "boardId": boardId},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, 
            }
        );

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: ADD_COLUMN,
                payload: response.data, 
            });
        } else {
            console.error("Failed to add column.");
        }
    } catch (error) {
        console.error("Error adding column:", error);
    }
};

export const deleteColumn = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/columns/${id}`);

        if (response.status === 200) {
            dispatch({
                type: DELETE_COLUMN,
                payload: id, 
            });
        } else {
            console.error("Failed to fetch columns.");
        }
    } catch (error) {
        console.error("Error fetching columns:", error);
    }
};


export const setColumns = (boardId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/columns/${boardId}`);

        if (response.status === 200) {
            dispatch({
                type: SET_COLUMNS,
                payload: response.data, 
            });
        } else {
            console.error("Failed to fetch columns.");
        }
    } catch (error) {
        console.error("Error fetching columns:", error);
    }
};

// Action для редактирования доски
export const editColumn = (id, updatedColumn) => async (dispatch) => {

    try {
        const response = await axios.put(`http://localhost:8080/api/columns/${id}`, updatedColumn);
        if (response.status === 200) {
            dispatch({
                type: EDIT_COLUMN,
                payload: {
                    id,
                    updatedColumn: response.data, 
                },
            });
        } else {
            console.error("Failed to fetch column.");
        }
    } catch (error) {
        console.error("Error fetching column:", error);
    }
};


export const reorderColumns = (reorderedColumns) => async (dispatch) => {
    dispatch({
        type: REORDER_COLUMNS,
        payload: reorderedColumns,
    });
    try {
    // Update each column's order in the API
    for (let i = 0; i < reorderedColumns.length; i++) {
        const column = reorderedColumns[i];
        
        column.c_order = i;

        await axios.put(`http://localhost:8080/api/columns/${column.id}`, column);
    }

    // Update local state
    dispatch({
        type: REORDER_COLUMNS,
        payload: reorderedColumns,
    });
    } catch (error) {
    console.error("Failed to reorder columns:", error);

}};
