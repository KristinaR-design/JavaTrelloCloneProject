export const ADD_BOARD = "ADD_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const SET_BOARDS = "SET_BOARDS";
export const EDIT_BOARD = "EDIT_BOARD";
import axios from 'axios';
axios.defaults.withCredentials = true;

// Action для добавления доски
export const addBoard = (newBoard) => async (dispatch) => {
    const userId = localStorage.getItem("user_id");
    const boardWithColumns = {
        ...newBoard,
        userId: userId,
    };

    try {
        const response = await axios.post(
            "http://localhost:8080/api/boards",
            boardWithColumns,
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
                type: ADD_BOARD,
                payload: response.data, 
            });
        } else {
            console.error("Failed to add board.");
        }
    } catch (error) {
        console.error("Error adding board:", error);
    }
};

export const deleteBoard = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/boards/${id}`);

        if (response.status === 200) {
            dispatch({
                type: DELETE_BOARD,
                payload: id, 
            });
        } else {
            console.error("Failed to fetch boards.");
        }
    } catch (error) {
        console.error("Error fetching boards:", error);
    }
};


export const setBoards = () => async (dispatch) => {
    const userId = localStorage.getItem("user_id");

    try {
        const response = await axios.get(`http://localhost:8080/api/boards/${userId}`);

        if (response.status === 200) {
            dispatch({
                type: SET_BOARDS,
                payload: response.data,  // axios автоматически парсит ответ
            });
        } else {
            console.error("Failed to fetch boards.");
        }
    } catch (error) {
        console.error("Error fetching boards:", error);
    }
};

// Action для редактирования доски
export const editBoards = (id, updatedBoard) => async (dispatch) => {

    try {
        const response = await axios.put(`http://localhost:8080/api/boards/${id}`, updatedBoard);
        if (response.status === 200) {
            dispatch({
                type: EDIT_BOARD,
                payload: {
                    id,
                    updatedBoard: response.data, 
                },
            });
        } else {
            console.error("Failed to fetch boards.");
        }
    } catch (error) {
        console.error("Error fetching boards:", error);
    }
};

// Action для упорядочивания досок
export const reorderBoards = (boards) => ({
    type: "REORDER_BOARDS",
    payload: boards
});
