
import TaskCard from "./components/TaskCard";
import Task from "./components/Task";


const testTasks = [
    { id: 1, text: 'Cook' },
    { id: 2, text: 'Work in my app' },
]


function App() {
    

    return (
        

        <div className="pl-10 pr-10 pt-14 flex flex-col gap-3">

            <TaskCard taskId={null}/>
            
            {testTasks.map(aTask => {

                return <Task taskId={aTask.id} taskText={aTask.text}/>;

            })}
        </div>
    )
}

export default App
