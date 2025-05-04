import React, { useEffect, useState } from "react";
import '../css/Main.css'
import { Popover } from 'react-tiny-popover'
import deleteImg from "../assets/delete.png";
import editImg from "../assets/change.png";
import { addCard, deleteCard, setCards, editCard, reorderCards } from "../store/actions/cardActions";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const Tasks = ({ currentTask }) => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.card.cards);

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [newTask, setNewTask] = useState({ "title": "", "completed":"", columnId:"", desk_id:""});
    const [allData, setAllData] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(null);

    const filteredCards = cards.filter(
        (item) => item.columnId === (currentTask ? currentTask.id : null)
    );

    useEffect(() => {
        dispatch(setCards());
    }, [dispatch, currentTask]);

    const addnewTask = () => {
        const newCard = { 
            title: newTask.title, 
            columnId: currentTask.id, 
            desk_id: currentTask.board_id, 
            completed: false,
            order: filteredCards.length
        };
        dispatch(addCard(newCard));
        setIsPopoverOpen(false);
        setNewTask({ title: "", completed: false });
    };

    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value });
    };

    const swapCheck = (item) => {
        newTask.title = item.title, 
        newTask.columnId = currentTask.id, 
        newTask.desk_id = currentTask.board_id, 
        newTask.completed = item.completed ? false : true

        editTask(item.id);
    };

    const deleteTask = (id) => {
        dispatch(deleteCard(id));
    };

    const editTask = (id) => {
        dispatch(editCard(id, newTask));
        setIsEditOpen(null);
    };

    return (
        <div className="main">
            {currentTask ? (
                <Droppable droppableId={`tasks-droppable-${currentTask.id}`} type="task">
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            style={{ 
                                minHeight: '50px',
                                backgroundColor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.2s ease',
                                padding: '8px'
                            }}
                        >
                            {filteredCards
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="newDesk"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    opacity: snapshot.isDragging ? 0.8 : 1,
                                                    cursor: 'grab',
                                                    transform: snapshot.isDragging ? provided.draggableProps.style.transform : 'none',
                                                    boxShadow: snapshot.isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : 'none',
                                                    marginBottom: '8px'
                                                }}
                                            >
                                                <input type="checkbox" name="completed" checked={item.completed ? true : false} onChange={() => swapCheck(item)}/>
                                                <div className="newDiv">{item.title}</div>
                                                <Popover className="popover"
                                                    isOpen={isEditOpen === item.id}
                                                    positions={['right', 'top', 'bottom', 'left']}
                                                    content={
                                                        <div className="newDesk">
                                                            <button className="x__button" onClick={() => setIsEditOpen(!isEditOpen)}> x </button>
                                                            <div className="newDiv">Title:</div>
                                                            <input className="newTitle" name="title" value={newTask.title} onChange={handleChange} type="text" />
                                                            <button className="newButton" onClick={() => editTask(item.id)}>APPLY</button>
                                                        </div>
                                                    }
                                                >
                                                    <button className="delete-button" onClick={() => setIsEditOpen(item.id)}><img src={editImg} alt="Delete" width="25" /></button>
                                                </Popover>
                                                <button className="delete-button" onClick={() => deleteTask(item.id)}><img src={deleteImg} alt="Delete" width="25" /></button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}

                            <Popover className="popover"
                                isOpen={isPopoverOpen}
                                positions={['right', 'top', 'bottom', 'left']}
                                content={
                                    <div className="newDesk">
                                        <button className="x__button" onClick={() => setIsPopoverOpen(!isPopoverOpen)}> x </button>
                                        <div className="newDiv">Title:</div>
                                        <input className="newTitle" name="title" value={newTask.title} onChange={handleChange} type="text" />
                                        <button className="newButton" onClick={addnewTask}>ADD</button>
                                    </div>
                                }>
                                <button className="newButton" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>ADD</button>
                            </Popover>
                        </div>
                    )}
                </Droppable>
            ) : (
                <h2>No tasks yet</h2>
            )}
        </div>
    );
};

export default Tasks;
