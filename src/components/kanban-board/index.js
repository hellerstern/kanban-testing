import React, { useState, useEffect } from "react";


// Icons
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import { FiTrash } from 'react-icons/fi';

import "./index.css";


const KanbanBoard = () => {

  const [tasks, setTasks] = useState([
    { name: 'task 0', stage: 0 },
    { name: 'task 1', stage: 0 },
    { name: 'task 2', stage: 0 },
    { name: 'task 3', stage: 0 },
    { name: 'task 4', stage: 1 },
    { name: 'task 5', stage: 1 },
    { name: 'task 6', stage: 1 },
    { name: 'task 7', stage: 2 },
    { name: 'task 8', stage: 2 },
    { name: 'task 9', stage: 3 },
  ]);

  const stagesNames = ['Backlog', 'To do', 'Ongoing', 'Done'];

  const [stagesTasks, setStagesTasks] = useState([]);



  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < stagesNames.length; ++i) {
      tmp.push([]);
    }

    for (let i = 0; i < tasks.length; i++) {
      const stageId = tasks[i].stage;
      tmp[stageId].push(tasks[i]);
    }

    setStagesTasks(tmp)

    console.log(tmp);
  }, [tasks])


  const moveToForward = (task) => {
    let stateCopy = [...tasks];
    let index = stateCopy.indexOf(task);
    stateCopy[index].stage++;
    setTasks(stateCopy);
  }

  const moveToBack = (task) => {
    let stateCopy = [...tasks];
    let index = stateCopy.indexOf(task);
    stateCopy[index].stage--;
    setTasks(stateCopy);
  }

  const removeTask = (task) => {
    const stateCopy = [...tasks.filter(item => item != task)];
    setTasks(stateCopy);
  }


  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                      <div className="li-content layout-row justify-content-between align-items-center">
                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                        <div className="icons">
                          {
                            i !== 0 && <button onClick={() => moveToBack(task)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                            <BsArrowLeftShort></BsArrowLeftShort>
                          </button>
                          }

                          <button className="icon-only x-small mx-2" onClick={() => removeTask(task)} data-testid={`${task.name.split(' ').join('-')}-remove`}>
                            <FiTrash></FiTrash>
                          </button>

                          {
                            i !== stagesTasks.length-1 && <button onClick={() => moveToForward(task)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                            <BsArrowRightShort></BsArrowRightShort>
                          </button>
                          }
                        </div>
                      </div>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default KanbanBoard;