import { useState } from "react";
import PushButton from "./PushButton";
import TaskEditor from "./TaskEditor";

interface TaskCardProps {
    taskId: number | null;
    taskText?: string;
}


export default function TaskCard(props: TaskCardProps) {
    
    const [isEditorFocused, setEditorFocused] = useState(false);
    const [taskText, setTaskText] = useState(props.taskText);

    const trimmedTaskText = taskText?.trim();
    
    return (
        <div className={isEditorFocused ? 'w-full bg-[#FAFBFB] shadow-[0px_4px_8px_0px] shadow-[#0000000A] drop-shadow-[0px_8px_16px_rgba(0, 0, 0, 0.04)]' : undefined}>


            <div className={isEditorFocused ? 'border-[1px] border-border rounded-tl-[4px] rounded-tr-[4px] h-10' : undefined}>
                <div className={isEditorFocused ? 'w-full flex flex-row pl-4 pr-2 pt-2' : undefined}>
                
                    <div className="w-full flex flex-row gap-3">
                        
                        
                        <TaskEditor
                            taskText={taskText}
                            onFocused={() => setEditorFocused(true)}
                            onBlur={() => setEditorFocused(false)}
                            className={!isEditorFocused ? 'relative' : undefined}
                            onTextChange={(newText) => setTaskText(newText)}
                            />

                        <div className={isEditorFocused ? 'visible' : 'hidden'}>
                            <img
                                src="https://github.com/r0land013.png?size=24"
                                className="rounded-full"/>
                        </div>
                    </div>


                
                </div>
            </div>


            <div className={isEditorFocused ? 'flex flex-row justify-between p-2 bg-[#FAFBFB]' : 'hidden'}>
                <div className="flex flex-row gap-8">
                    
                    <PushButton
                        style="solid"
                        color="secondary"
                        text="Open"
                        icon="expand"
                        disabled={!trimmedTaskText}/>
                    
                    <div className="flex flex-row gap-1">
                        <PushButton
                            style="ghost"
                            text="Today"
                            icon="calendar"
                            disabled={!trimmedTaskText}/>
                        
                        <PushButton
                            style="ghost"
                            text="Public"
                            icon="lock"
                            disabled={!trimmedTaskText}/>
                        
                        <PushButton
                            style="ghost"
                            text="Highlight"
                            icon="highlight"
                            disabled={!trimmedTaskText}/>
                        
                        <PushButton
                            style="ghost"
                            text="Estimation"
                            icon="estimation"
                            disabled={!trimmedTaskText}/>
                    </div>
                    

                </div>

                <div className="flex flex-row gap-1">
                    <PushButton
                        style="solid"
                        color="secondary"
                        text="Cancel"/>
                    
                    <PushButton
                        style="solid"
                        color="primary"
                        text={trimmedTaskText ? 'Add' : 'Ok'}/>
                </div>
            </div>

        </div>
    )
}
