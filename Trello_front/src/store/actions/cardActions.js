export const SET_CARDS = "SET_CARDS";
export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const REORDER_CARDS = "REORDER_CARDS";
import axios from 'axios';
axios.defaults.withCredentials = true;

export const addCard = (newCard) => async (dispatch) => {

    newCard.T_order = null;

    try {          
        const response = await axios.post(
            "http://localhost:8080/api/tasks",
            newCard,
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
                type: ADD_CARD,
                payload: response.data, 
            });
        } else {
            console.error("Failed to add task.");
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

export const deleteCard = (id) => async (dispatch) => {

    try {
        const response = await axios.delete(`http://localhost:8080/api/tasks/${id}`);

        if (response.status === 200) {
            dispatch({
                type: DELETE_CARD,
                payload: id, 
            });
        } else {
            console.error("Failed to fetch task.");
        }
    } catch (error) {
        console.error("Error fetching task:", error);
    }
};

export const setCards = () => async (dispatch) => {

    try {
        const response = await axios.get(`http://localhost:8080/api/tasks`);

        if (response.status === 200) {
            dispatch({
                type: SET_CARDS,
                payload: response.data, 
            });
        } else {
            console.error("Failed to fetch tasks.");
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

export const editCard = (id, updatedCard) => async (dispatch) => {

    try {
        const response = await axios.put(`http://localhost:8080/api/tasks/${id}`, updatedCard);
        if (response.status === 200) {
            dispatch({
                type: EDIT_CARD,
                payload: {
                    id,
                    updatedCard: response.data, 
                },
            });
        } else {
            console.error("Failed to fetch task.");
        }
    } catch (error) {
        console.error("Error fetching task:", error);
    }
};

export const reorderCards = (reorderedCards) => async (dispatch) => {
  try {
    // Update each card in the API
    for (const card of reorderedCards) {
        await axios.put(`http://localhost:8080/api/tasks/${card.id}`, {
            ...card,
            T_order: card.order,
            column_id: card.column_id
        });
      }

    dispatch({
      type: REORDER_CARDS,
      payload: reorderedCards,
    });

    // Refresh cards from API to ensure consistency
    dispatch(setCards());
  } catch (error) {
    console.error("Failed to reorder tasks:", error);
    // Refresh cards from API to ensure consistency
    dispatch(setCards());
  }
};