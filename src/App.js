import './App.css';
import Category from './components/category';
import TaskCard from './components/taskCard';
import React, { useState } from 'react';

export const todoType = {
  ALL : 0,
  WORK: 1,
  STUDY: 2,
  ENTERTAINMENT: 3,
  FAMILY: 4
};

function App() {

  const datas = [
    {
      id: 1, 
      name: "Task 1", 
      description: "it's a description and it's a description and it's a description and", 
      categories: [todoType.WORK, todoType.STUDY, todoType.ENTERTAINMENT],
      done: false 
    },
    {
      id: 2, 
      name: "Task 2", 
      description: "it's a description and it's a description and it's a description and zdiehd izhd dizojdzhd zodzd dzihdzihdehdhed doiehhid deoihdioed eopjeodjeopdze foezjfoejfp feojeopj fopje fopjf fopje efojepjofjeopjf doj eojfe ojpoejopejopfdj", 
      categories: [todoType.STUDY],
      done: false
    },
    {
      id: 3, 
      name: "Task 3", 
      description: "it's a description and it's a description zodjjdazjpod sdzjsdàazhd izjdioza dzajd isohzad idohedoi", 
      categories: [todoType.ENTERTAINMENT],
      done: false
    },
    {
      id: 4, 
      name: "Task 4", 
      description: "it's a description and it's a description and it's a description it's a description and it's a descon and it's a description it's a descion and it's a descript and it's a n", 
      categories: [todoType.WORK],
      done: false
    },
    {
      id: 5, 
      name: "Task 5", 
      description: "it's a description and it's a description and it's a description", 
      categories: [todoType.STUDY, todoType.WORK],
      done: false
    },
  ];

  const [tasks, setTasks] = useState(datas);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [addPopup, setAddPopup] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [currentCategory, setCurrentCategory] = useState(todoType.ALL);

  const [work, setWork] = useState(false);
  const [study, setStudy] = useState(false);
  const [entertainment, setEntertainment] = useState(false);
  const [family, setFamily] = useState(false);

  const changeTaskState = (id) => {
    const updatedFilteredTasks = [...filteredTasks];
    updatedFilteredTasks.map(task => {
      if (task.id == id) {
        task.done = !task.done;
        setFilteredTasks(updatedFilteredTasks);
      }
    });
  }

  const displayByTaskCategory = (category) => {
    const updatedTasks = [...tasks];
    let newTasksList = [];
    
    if (category === todoType.ALL) {
      newTasksList = updatedTasks;
    }
    else {
      updatedTasks.map(task => {
        task.categories.map(c => {
          if (c === category) {
            newTasksList.unshift(task);
            return;
          }
        });
      });
    }
    setCurrentCategory(category);
    setFilteredTasks(newTasksList);
  }

  const deleteTask = (id) => {
    const updatedFilteredTasks = [...filteredTasks];
    setFilteredTasks(updatedFilteredTasks.filter(task => task.id !== id));

    const updatedTasks = [...tasks];
    setTasks(updatedTasks.filter(task => task.id !== id));
  }

  const editTask = (id, name, description, work, study, entertainment, family) => {
    const updatedFilteredTasks = [...filteredTasks];
    let newFilteredList = updatedFilteredTasks.map((task) => {
      if (task.id == id) {
        task.name = name;
        task.description = description;

        let categoriesList = [];

        if (work) categoriesList.push(todoType.WORK);
        if (study) categoriesList.push(todoType.STUDY);
        if (entertainment) categoriesList.push(todoType.ENTERTAINMENT);
        if (family) categoriesList.push(todoType.FAMILY);

        task.categories = categoriesList;
      }
      return task;
    }).filter((task) => task.categories.includes(currentCategory) || currentCategory === todoType.ALL);
    setFilteredTasks(newFilteredList);
  }

  const add = () => {
    setName("");
    setDescription("");
    setWork(false);
    setStudy(false);
    setEntertainment(false);
    setFamily(false);
    
    setAddPopup(!addPopup);
  }

  const editName = (event) => {
    setName(event.target.value);
  }

  const editDescription = (event) => {
    setDescription(event.target.value);
  }

  const editWork = () => {
      setWork(!work);
  }

  const editStudy = () => {
      setStudy(!study);
  }

  const editEntertainment = () => {
      setEntertainment(!entertainment);
  }

  const editFamily = () => {
      setFamily(!family);
  }

  const addTask = () => {
    let t = [...tasks];

    let categoriesList = [];

    if (work) categoriesList.push(todoType.WORK);
    if (study) categoriesList.push(todoType.STUDY);
    if (entertainment) categoriesList.push(todoType.ENTERTAINMENT);
    if (family) categoriesList.push(todoType.FAMILY);

    const newTask = {
      id: tasks.length + 1, 
      name: name, 
      description: description, 
      categories: categoriesList,
      done: false
    };

    t.push(newTask);
    setTasks(t);
    setAddPopup(!addPopup);

    let updatedFilteredTasks = [...filteredTasks];

    if (currentCategory === todoType.ALL) {
      updatedFilteredTasks.push(newTask);
    }
    else {
      const success = newTask.categories.includes(currentCategory);
      if (success) {
        updatedFilteredTasks.push(newTask);
      }
    }
    setFilteredTasks(updatedFilteredTasks);
  }

  return (
    <div className="parentContainer">
      <div className="menu">
          <div className="block">
            <h1>todo</h1>
            <div className="categories">
              <Category name="all" color="rgb(255, 100, 155)" type={todoType.ALL} displayByTaskCategory={displayByTaskCategory}/>
              <Category name="work" color="rgb(197, 155, 255)" type={todoType.WORK} displayByTaskCategory={displayByTaskCategory}/>
              <Category name="study" color="rgb(155, 176, 255)" type={todoType.STUDY} displayByTaskCategory={displayByTaskCategory}/>
              <Category name="entertainment" color="rgb(255, 155, 120)" type={todoType.ENTERTAINMENT} displayByTaskCategory={displayByTaskCategory}/>
              <Category name="family" color="rgb(155, 255, 127)" type={todoType.FAMILY} displayByTaskCategory={displayByTaskCategory}/>
              <span className='add' onClick={add}>+</span>
            </div>
          </div>
      </div>
      <div className="tasksContainer">
        {filteredTasks.map(task => (
          <TaskCard 
            key={task.id}
            id={task.id} 
            name={task.name} 
            description={task.description} 
            categories={task.categories} 
            done={task.done}
            changeTaskState={changeTaskState}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>
      {
        addPopup ?
        (
            <div className='editAddPopup'>
                <div className="popup">
                    <div className='closeButton' onClick={add}>Close</div>
                    <div className="field">
                        <label htmlFor="name">Name :</label>
                          <input type="text" id="name" value={name} onChange={editName}/>
                    </div>
                    <div className="field">
                        <label htmlFor="description">Description :</label>
                        <textarea id="description" value={description} onChange={editDescription}/>
                    </div>    
                    <div className='checkboxs'>
                        <div className="checkBox">
                            <input type="checkbox" checked={work} onChange={editWork}/>
                            <p>work</p>
                        </div>                                                     
                        <div className="checkBox">
                            <input type="checkbox" checked={study} onChange={editStudy}/>
                            <p>study</p>
                        </div>                                                     
                        <div className="checkBox">
                            <input type="checkbox" checked={entertainment} onChange={editEntertainment}/>
                            <p>entertainment</p>
                        </div>                                                     
                        <div className="checkBox">
                            <input type="checkbox" checked={family} onChange={editFamily}/>
                            <p>family</p>
                        </div>                                                     
                    </div>                                                    
                    <button className='validateButton' onClick={addTask}>Validate</button>
                </div>
            </div>
        )
        :
        (
            <></>
        )
        }      
    </div>
  );
}

export default App;