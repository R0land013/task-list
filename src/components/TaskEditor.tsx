import { forwardRef } from "react";

interface TaskEditorProps {
    taskText?: string;
    onTextChange?: (newText: string) => void;
    className?: string;
    editingTask?: boolean;
    onFocused?: () => void;
    onBlur?: () => void;
}


const TaskEditor = forwardRef<HTMLInputElement, TaskEditorProps>((props: TaskEditorProps, ref) => {

    
    return (
        <div className={`w-full flex flex-row gap-3 ${props.className}`}>
            
            {props.editingTask ? (
                <input
                className="w-[24px] rounded-[1px] border-button-text"
                type="checkbox"/>
            ):
            (
                <img
                    className="flex flex-row items-center justify-center w-[24px]"
                    src="/assets/icons/add.svg"/>
            )}
            
            <input
                ref={ref}
                className="w-full text-[16px] text-task-text bg-main focus:outline-none caret-[#0C66FF]"
                type="text"
                placeholder={props.editingTask ? '' : 'Type to add new task'}
                onChange={(event) => {
                    if(props.onTextChange) {
                        props.onTextChange(event.target.value);
                    }
                }}
                value={props.taskText}
                onFocus={props.onFocused}
                onBlur={props.onBlur}/>
        </div>
    )
});

export default TaskEditor;