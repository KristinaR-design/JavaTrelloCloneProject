import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../css/Sidebar.css";
import { ChevronRight, ChevronLeft, Plus } from "react-feather";
import { Popover } from 'react-tiny-popover'
import deleteImg from "../assets/delete.png";
import editImg from "../assets/change.png";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, deleteBoard, setBoards, editBoards, reorderBoards } from "../store/actions/boardActions";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CompletedTasks from "./CompletedTasks";

const Span = styled.span`
    width: 1.6rem;
    height: 1.5rem;
    margin-right: 0.8rem;
    background-color: ${(props) => (props.color)};
    border-radius: 10px;
`;

const Sidebar = ({ setActiveBoard }) => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.board.boards) || [];

    const [refresh, setRefresh] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(null);
    const [newBoard, setNewBoard] = useState({ "title": "", "color": "" });

    useEffect(() => {
        dispatch(setBoards());
    }, [dispatch, refresh]);

    const addNewBoard = () => {
        dispatch(addBoard(newBoard));
        setIsPopoverOpen(false);
        setNewBoard({ title: "", color: ""});
    };

    const DeleteHandler = (id) => {
        dispatch(deleteBoard(id));
    };

    const editBoard = (id) => {
        dispatch(editBoards(id, newBoard));
        setIsEditOpen(null);
        setNewBoard({ title: "", color: ""});
    };

    const handleChange = (e) => {
        setNewBoard({ ...newBoard, [e.target.name]: e.target.value });
    };

    const setEditOpen = (item) => {
        setIsEditOpen(isEditOpen === item? null : item.id);
        setNewBoard({ title: item.title, color: item.color });
    };

    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination || source.index === destination.index) return;
    
        const reorderedBoards = Array.from(boards);
        const [movedBoard] = reorderedBoards.splice(source.index, 1);
        reorderedBoards.splice(destination.index, 0, movedBoard);
    
        const updatedBoards = reorderedBoards.map((board, index) => ({
            ...board,
            order: index, 
        }));
    
        for (let i = 0; i < updatedBoards.length; i++) {
            const updated = updatedBoards[i];
            const original = boards.find(b => b.title === updated.title);
        
            if (original && original.order !== updated.order) {
                console.log(updated.title)
                await fetch(`https://67e2ae0997fc65f535372377.mockapi.io/api/trello/boards/${updated.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...updated, order: updated.order }),
                });
            }
        }
        
        setRefresh(prev => !prev);
    
    };

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            {collapsed && (
                <div className="p-2">
                    <button onClick={() => setCollapsed(!collapsed)} className="button">
                        <ChevronRight size={17} />
                    </button>
                </div>
            )}

            {!collapsed && (
                <div>
                    <div className="workspace">
                        <h4>Remote Devs Workspace</h4>
                        <button onClick={() => setCollapsed(!collapsed)} className="button-left">
                            <ChevronLeft size={17} />
                        </button>
                    </div>

                    <div className="boardlist">
                        <div className="flex">
                            <h3>Your Boards</h3>


                            <Popover className="popover"
                                isOpen={isPopoverOpen}
                                positions={['right', 'top', 'bottom', 'left']}
                                content={
                                    <div className="newDesk">

                                        <button className="x__button" onClick={() => setIsPopoverOpen(!isPopoverOpen)}> x </button>

                                        <div className="newDiv">Color:</div>
                                        <input className="newColor" type="color" name="color" value={newBoard.color} onChange={handleChange} />
                                        <div className="newDiv">Title:</div>
                                        <input className="newTitle" name="title" value={newBoard.title} onKeyDown={(e) => e.key === 'Enter' && addNewBoard()} onChange={handleChange} type="text" />

                                        <button className="newButton" onClick={addNewBoard}>ADD</button>

                                    </div>
                                }
                            >
                                <button className="button-left" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                                    <Plus size={16} />
                                </button>

                            </Popover>

                        </div>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="boards-droppable" type="board">
                            {(provided) => (
                                <ul
                                    className="your-class"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {boards.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <button className="custom-container" onClick={() => setActiveBoard(item)}>
                                                        <Span color={item.color}/>
                                                        <span>{item.title}</span>
                                                    </button>

                                                    {/* Поповер для редактироования */}
                                                    <Popover
                                                        className="popover"
                                                        isOpen={isEditOpen === item.id}
                                                        positions={["right", "top", "bottom", "left"]}
                                                        content={
                                                            <div className="newDesk">
                                                                <button
                                                                className="x__button"
                                                                onClick={() => setIsEditOpen(null)}
                                                                >
                                                                    x
                                                                </button>

                                                                <div className="newDiv">Color:</div>
                                                                <input
                                                                    className="newColor"
                                                                    type="color"
                                                                    name="color"
                                                                    value={newBoard.color}
                                                                    onChange={handleChange}
                                                                />
                                                                <div className="newDiv">Title:</div>
                                                                <input
                                                                className="newTitle"
                                                                name="title"
                                                                value={newBoard.title}
                                                                onChange={handleChange}
                                                                onKeyDown={(e) => e.key === 'Enter' && editBoard(item.id)}
                                                                type="text"
                                                                />

                                                                <button className="newButton" onClick={() => editBoard(item.id)}>APPLY</button>
                                                            </div>
                                                        }
                                                    >
                                                        <button className="delete-button" onClick={() => setEditOpen(item)}>
                                                            <img src={editImg} alt="Edit" width="25"/>
                                                        </button>
                                                    </Popover>

                                                    <button className="delete-button" onClick={() => DeleteHandler(item.id)}>
                                                        <img src={deleteImg} alt="Delete" width="25"/>
                                                    </button>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
            <CompletedTasks />
        </div>
    );
};

export default Sidebar;