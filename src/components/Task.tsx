interface TaskProps {
    taskId: number;
    taskText: string;
}

export default function Task(props: TaskProps) {
    return (
        <div className="w-full flex flex-row gap-3">
            <input
                className="w-[24px] rounded-[1px] border-button-text"
                type="checkbox"/>
            
            <p className="w-full text-[16px] text-task-text">
                {props.taskText}
            </p>
        </div>
    )
}
