import TaskCard from "./components/TaskCard";
import { useState } from "react";


function App() {
    const [tasks, setTasks] = useState<Array<{id: number, text: string}>>([]);
    
    return (
        <div className="pl-10 pr-10 pt-14 flex flex-col gap-3">

            <TaskCard
                taskId={null}
                onAddNewTask={(newTask) => {
                    const updatedTasks = [newTask, ...tasks];
                    setTasks(updatedTasks);
                }}/>
            
            {tasks.map(aTask => {
                
                return (
                    <TaskCard
                        key={aTask.id}
                        taskId={aTask.id}
                        taskText={aTask.text}
                        onUpdateTask={(updatedTask) => {
                            const taskToUpdateIndex = tasks.findIndex(aTask => aTask.id ===updatedTask.id);
                            const updatedTasks = [...tasks];
                            updatedTasks[taskToUpdateIndex] = updatedTask; 
                            setTasks(updatedTasks);
                        }}/>
                );

            })}
        </div>
    )
}

export default App
