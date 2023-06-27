
interface TaskEditorProps {
    taskText?: string;
    onFocused?: () => void;
    onBlur?: () => void;
    onTextChange?: (newText: string) => void;
    className?: string;
}


export default function TaskEditor(props: TaskEditorProps) {

    return (
        <div className={`w-full flex flex-row gap-3 ${props.className}`}>
            
            <img
                className="flex flex-row items-center justify-center w-[24px]"
                src="/assets/icons/add.svg"/>
            
            <input
                className="w-full text-[16px] text-task-text focus:outline-none caret-[#0C66FF]"
                type="text"
                placeholder="Type to add new task"
                onChange={(event) => {
                    if(props.onTextChange) {
                        props.onTextChange(event.target.value);
                    }
                }}
                onFocus={props.onFocused}
                onBlur={props.onBlur}/>
        </div>
    )
}
