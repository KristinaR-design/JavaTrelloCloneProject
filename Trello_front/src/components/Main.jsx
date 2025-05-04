import React, { useEffect, useState } from "react";
import "../css/Main.css";
import { Popover } from "react-tiny-popover";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/change.png";
import Tasks from "../components/tasks";
import { setColumns, addColumn, deleteColumn, editColumn, reorderColumns } from "../store/actions/columnActions";
import { reorderCards } from "../store/actions/cardActions";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Main = ({ activeBoard }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.column.columns);
  const cards = useSelector((state) => state.card.cards);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [newColumn, setNewColumn] = useState({ title: "" });
  const [isEditOpen, setIsEditOpen] = useState(null);

  useEffect(() => {
    if (activeBoard && activeBoard.id) {
      dispatch(setColumns(activeBoard.id));
    }
  }, [activeBoard, dispatch])

  const handleAddColumn = () => {
    if (!newColumn.title.trim()) return;
    dispatch(addColumn(newColumn.title, activeBoard.id));
    setNewColumn({ title: "" });
    setIsPopoverOpen(false);
  };

  const handleDeleteColumn = (id) => {
    dispatch(deleteColumn(id));
  };

  const handleEditColumn = (id) => {
    if (!newColumn.title.trim()) return;
    dispatch(editColumn(id, { title: newColumn.title }));
    setNewColumn({ title: "" });
    setIsEditOpen(null);
  };

  const onDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;
    
    if (!destination) return;

    if (type === 'column') {
      if (source.index === destination.index) return;

      const filteredColumns = columns
        .filter((item) => activeBoard ? item.boardId === activeBoard.id : false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      const reordered = Array.from(filteredColumns);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      
      const columnsWithOrder = reordered.map((col, index) => ({
        ...col,
        order: index
      }));
      
      dispatch(reorderColumns(columnsWithOrder));
    }
    else if (type === 'task') {
      const sourceColumnId = source.droppableId.split('-')[2];
      const destinationColumnId = destination.droppableId.split('-')[2];
      const movedCard = cards.find(card => card.id.toString() === draggableId);

      if (!movedCard) return;

      const sourceColumnCards = cards
        .filter(card => card.column_id === sourceColumnId)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      const destinationColumnCards = cards
        .filter(card => card.column_id === destinationColumnId)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const sourceIndex = sourceColumnCards.findIndex(card => card.id.toString() === draggableId);
      if (sourceIndex !== -1) {
        sourceColumnCards.splice(sourceIndex, 1);
      }

      if (sourceColumnId === destinationColumnId) {
        sourceColumnCards.splice(destination.index, 0, movedCard);
        
        const updatedCards = sourceColumnCards.map((card, index) => ({
          ...card,
          order: index
        }));

        dispatch(reorderCards(updatedCards));
      } else {
        const updatedCard = {
          ...movedCard,
          column_id: destinationColumnId,
          desk_id: activeBoard.id
        };
        
        destinationColumnCards.splice(destination.index, 0, updatedCard);
        
        const updatedSourceCards = sourceColumnCards.map((card, index) => ({
          ...card,
          order: index
        }));
        
        const updatedDestinationCards = destinationColumnCards.map((card, index) => ({
          ...card,
          order: index
        }));

        const allUpdatedCards = [...updatedSourceCards, ...updatedDestinationCards];
        dispatch(reorderCards(allUpdatedCards));
      }
    }
  };

  return (
    <div className="main">
      {activeBoard ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="columns-droppable" direction="horizontal" type="column">
            {(provided) => (
              <div className="columns" ref={provided.innerRef} {...provided.droppableProps}>
                {columns
                  .filter((item) => activeBoard ? item.boardId === activeBoard.id : false)
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((columnById, index) => (
                    <Draggable key={columnById.id} draggableId={columnById.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="column"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="column-title">{columnById.title}</div>
                          <Tasks currentTask={columnById} />

                          <div className="task-buttons">
                            <Popover
                              className="popover"
                              isOpen={isEditOpen === columnById.id}
                              positions={["bottom", "right", "top", "left"]}
                              content={
                                <div className="newDesk">
                                  <button
                                    className="x__button"
                                    onClick={() => setIsEditOpen(null)}
                                  >
                                    x
                                  </button>
                                  <input
                                    className="newTitle"
                                    name="title"
                                    value={newColumn.title}
                                    onChange={(e) =>
                                      setNewColumn({ title: e.target.value })
                                    }
                                    type="text"
                                  />
                                  <button
                                    className="newButton"
                                    onClick={() => handleEditColumn(columnById.id)}
                                  >
                                    APPLY
                                  </button>
                                </div>
                              }
                            >
                              <button
                                className="edit-button"
                                onClick={() => setIsEditOpen(columnById.id)}
                              >
                                <img src={editImg} alt="Edit" width="25" />
                              </button>
                            </Popover>

                            <button
                              className="delete-button"
                              onClick={() => handleDeleteColumn(columnById.id)}
                            >
                              <img src={deleteImg} alt="Delete" width="25" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}

                <div className="add-column-container">
                  <Popover
                    className="popover"
                    isOpen={isPopoverOpen}
                    positions={["bottom", "right", "top", "left"]}
                    content={
                      <div className="newDesk">
                        <button
                          className="x__button"
                          onClick={() => setIsPopoverOpen(false)}
                        >
                          x
                        </button>
                        <div className="div__title">Title:</div>
                        <input
                          className="newTitle"
                          name="title"
                          value={newColumn.title}
                          onChange={(e) => setNewColumn({ title: e.target.value })}
                          type="text"
                        />
                        <button className="newButton" onClick={handleAddColumn}>
                          ADD
                        </button>
                      </div>
                    }
                  >
                    <button
                      className="newButton add-column-button"
                      onClick={() => setIsPopoverOpen(true)}>
                      ADD COLUMN
                    </button>
                  </Popover>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <h2>Select a board</h2>
      )}
    </div>
  );
};

export default Main;
