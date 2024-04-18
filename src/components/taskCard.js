import  { todoType } from '../App';
import React, { useState } from 'react';

export default function(props) {
    const { id, name, description, categories, done, changeTaskState, deleteTask, editTask } = props;

    const [optionsPopup, setOptionsPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);

    const [taskName, setTaskName] = useState(name);
    const [taskDescription, setTaskDescription] = useState(description);

    const [work, setWork] = useState(categories.includes(todoType.WORK));
    const [study, setStudy] = useState(categories.includes(todoType.STUDY));
    const [entertainment, setEntertainment] = useState(categories.includes(todoType.ENTERTAINMENT));
    const [family, setFamily] = useState(categories.includes(todoType.FAMILY));

    const changeState = () => {
        changeTaskState(id);
    }

    const popup = () => {    
        setOptionsPopup(!optionsPopup)
    }

    const edit = () => {
        setTaskName(name);
        setTaskDescription(description);
        setWork(categories.includes(todoType.WORK));
        setStudy(categories.includes(todoType.STUDY));
        setEntertainment(categories.includes(todoType.ENTERTAINMENT));
        setFamily(categories.includes(todoType.FAMILY));
        
        setEditPopup(!editPopup);
    }

    const deleted = () => {
        deleteTask(id);
    }

    const edited = () => {
        editTask(id, taskName, taskDescription, work, study, entertainment, family);
        edit();
        popup();
    }

    const editName = (event) => {
        setTaskName(event.target.value);
    }

    const editDescription = (event) => {
        setTaskDescription(event.target.value);
    }

    const changeWork = () => {
        setWork(!work);
    }

    const changeStudy = () => {
        setStudy(!study);
    }

    const changeEntertainment = () => {
        setEntertainment(!entertainment);
    }
    const changeFamily = () => {
        setFamily(!family);
    }
    

    return (
        <>
            <div className="taskCard">
                <div className="nameAndButton">
                    <p className={`name ${done ? 'taskDone' : ''}`}>{name}</p>
                    <span className="taskButton" onClick={popup}>...</span>
                </div>
                <p className={`description ${done ? 'taskDone' : ''}`}>{description}</p>
                <div className="taskCardFooter">
                    <div className="taskCardCategories">
                        {categories.map(category => (
                            <div key={category}>
                                { 
                                    category === todoType.WORK && <div className="round" style={{backgroundColor: 'rgb(197, 155, 255)'}}></div>
                                }

                                { 
                                    category === todoType.STUDY && <div className="round" style={{backgroundColor: 'rgb(155, 176, 255)'}}></div>
                                }

                                { 
                                    category === todoType.ENTERTAINMENT && <div className="round" style={{backgroundColor: 'rgb(255, 155, 120)'}}></div>
                                }

                                { 
                                    category === todoType.FAMILY && <div className="round" style={{backgroundColor: 'rgb(155, 255, 127)'}}></div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="checkBox">
                        <input type="checkbox" checked={done} onChange={changeState}/>
                        <p>Done</p>
                    </div>
                </div>
                {
                    optionsPopup ? 
                    (
                    <div className="optionsPopup">
                        <p onClick={edit}>Edit</p>
                        <p onClick={deleted}>Delete</p>
                    </div>

                    )
                    :
                    (
                        <></>
                    )
                }
            </div>
            {
                editPopup ?
                (
                    <div className='editAddPopup'>
                        <div className="popup">
                            <div className='closeButton' onClick={edit}>Close</div>
                            <div className="field">
                               <label htmlFor="name">Name :</label>
                                 <input type="text" id="name" value={taskName} onChange={editName}/>
                            </div>
                            <div className="field">
                                <label htmlFor="description">Description :</label>
                                <textarea id="description" value={taskDescription} onChange={editDescription}/>
                            </div>
                            <div className='checkboxs'>
                                <div className="checkBox">
                                    <input type="checkbox" checked={work} onChange={changeWork}/>
                                    <p>work</p>
                                </div>                                                     
                                <div className="checkBox">
                                    <input type="checkbox" checked={study} onChange={changeStudy}/>
                                    <p>study</p>
                                </div>                                                     
                                <div className="checkBox">
                                    <input type="checkbox" checked={entertainment} onChange={changeEntertainment}/>
                                    <p>entertainment</p>
                                </div>                                                     
                                <div className="checkBox">
                                    <input type="checkbox" checked={family} onChange={changeFamily}/>
                                    <p>family</p>
                                </div>                                                     
                            </div>
                            <button className='validateButton' onClick={edited}>Validate</button>
                        </div>
                    </div>
                )
                :
                (
                    <></>
                )
            }
        </>
    );
}