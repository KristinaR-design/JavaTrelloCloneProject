export const SET_CARDS = "SET_CARDS";
export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const REORDER_CARDS = "REORDER_CARDS";

export const addCard = (newCard) => async (dispatch) => {
    const response = await fetch("https://67e5229718194932a584b0b0.mockapi.io/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch({
            type: ADD_CARD,
            payload: data,
        });
    } else {
        console.error("Failed to add card.")
    }
}

export const deleteCard = (id) => async (dispatch) => {
    const response = await fetch(`${"https://67e5229718194932a584b0b0.mockapi.io/task"}/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch({
            type: DELETE_CARD,
            payload: id,
        });
    } else {
        console.error("Failed to delete card.");
    }
};

export const setCards = () => async (dispatch) => {
    const response = await fetch("https://67e5229718194932a584b0b0.mockapi.io/task");
    const data = await response.json();

    dispatch({
        type: SET_CARDS,
        payload: data,
    });
};

export const editCard = (id, updatedCard) => async (dispatch) => {
    const response = await fetch(`${"https://67e5229718194932a584b0b0.mockapi.io/task"}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCard),
    });

    if (response.ok) {
        const data = await response.json();

        dispatch({
            type: EDIT_CARD,
            payload: {
                id,
                updatedCard: data,
            },
        });
    } else {
        console.error("Failed to edit card.");
    }
};

export const reorderCards = (reorderedCards) => async (dispatch) => {
  try {
    // Update each card in the API
    for (const card of reorderedCards) {
      const response = await fetch(`${"https://67e5229718194932a584b0b0.mockapi.io/task"}/${card.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...card,
          order: card.order,
          column_id: card.column_id,
          desk_id: card.desk_id
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update card ${card.id}`);
      }
    }

    // Update local state
    dispatch({
      type: REORDER_CARDS,
      payload: reorderedCards,
    });

    // Refresh cards from API to ensure consistency
    dispatch(setCards());
  } catch (error) {
    console.error("Failed to reorder cards:", error);
    // Refresh cards from API to ensure consistency
    dispatch(setCards());
  }
};