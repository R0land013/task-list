import { useState, useRef, useEffect } from "react";
import PushButton from "./PushButton";

interface TaskCardProps {
    taskId: number | null;
    taskText?: string;
    onAddNewTask?: (newTask: { id: number, text: string }) => void;
    onUpdateTask?: (updatedTask: { id: number, text: string }) => void;
}

let idForNewTask = 1;

const VIEWPORT_BREAKPOINT = 1230;

export default function TaskCard(props: TaskCardProps) {

    const [isEditorFocused, setEditorFocused] = useState(false);
    const [taskText, setTaskText] = useState(props.taskText);
    const [rerenderBeacuseUserResizedWindow, setRerenderBeacuseUserResizeWindow] = useState(false);
    const isUsingThisTaskCardRef = useRef<'notUsing' | 'using' | 'finished'>('notUsing');
    const taskEditorRef = useRef<HTMLInputElement>(null);

    const trimmedTaskText = taskText?.trim();

    useEffect(() => {
        const handleResize = () => setRerenderBeacuseUserResizeWindow((prevState) => !prevState);
        window.addEventListener('resize', handleResize);

        () => {window.removeEventListener('resize', handleResize)}
    }, []);

    const createNewTask = () => {

        if (props.onAddNewTask && trimmedTaskText) {
            props.onAddNewTask({ id: idForNewTask, text: trimmedTaskText ?? '' });
            idForNewTask++;
        }

        isUsingThisTaskCardRef.current = 'finished';
        setTaskText('');
        leaveTaskCard();
    };

    const updateTask = () => {
        if (props.onUpdateTask && trimmedTaskText && props.taskId) {
            props.onUpdateTask({ id: props.taskId, text: trimmedTaskText });
        }
        else {
            setTaskText(props.taskText);
        }

        isUsingThisTaskCardRef.current = 'finished';
        leaveTaskCard();
    };

    const leaveTaskCard = () => {
        setEditorFocused(false);
        taskEditorRef.current?.blur();
    }

    return (
        <div className={isEditorFocused ? 'w-full bg-main shadow-[0px_4px_8px_0px] shadow-[#0000000A] drop-shadow-[0px_8px_16px_rgba(0, 0, 0, 0.04)]' : undefined}>


            <div className={isEditorFocused ? 'border-[1px] border-border rounded-tl-[4px] rounded-tr-[4px] pb-4' : undefined}>
                <div className={isEditorFocused ? 'w-full flex flex-row pl-4 pr-2 pt-2' : undefined}>

                    <div className="w-full flex flex-row gap-3">

                        <div className={`w-full flex flex-row gap-3`}>

                            {!!props.taskId ? (
                                <input
                                    className="w-[24px] rounded-[1px] border-button-text"
                                    type="checkbox" />
                            ) :
                                (
                                    <img
                                        className="flex flex-row items-center justify-center w-[24px]"
                                        src="/assets/icons/add.svg" />
                                )}

                            <input
                                id="new-task-input"
                                ref={taskEditorRef}
                                className={`w-full text-[16px] text-task-text focus:bg-main focus:outline-none caret-[#0C66FF] ${props.taskId ? 'existent-task-input' : ''}`}
                                type="text"
                                placeholder={'Type to add new task'}
                                onChange={(event) => setTaskText(event.target.value)}
                                value={taskText}
                                onFocus={() => {
                                    if (isUsingThisTaskCardRef.current === 'notUsing' || isUsingThisTaskCardRef.current === 'using') {
                                        setEditorFocused(true);
                                        isUsingThisTaskCardRef.current = 'using'
                                    }
                                }}
                                onBlur={() => {
                                    if (isUsingThisTaskCardRef.current === 'using') {
                                        taskEditorRef.current?.focus();
                                    }
                                    else if (isUsingThisTaskCardRef.current === 'finished') {
                                        taskEditorRef.current?.blur();
                                        isUsingThisTaskCardRef.current = 'notUsing';
                                    }
                                }} />
                        </div>
                    </div>

                    <div className={isEditorFocused ? 'visible' : 'hidden'}>
                        <img
                            src="https://github.com/r0land013.png?size=24"
                            className="rounded-full" />
                    </div>

                </div>
            </div>


            <div className={isEditorFocused ? 'flex flex-row justify-between p-2 bg-[#FAFBFB]' : 'hidden'}>
                <div className="flex flex-row more-custom-width:gap-8 less-custom-width:gap-3">

                    <PushButton
                        style="solid"
                        color="secondary"
                        text="Open"
                        icon="expand"
                        disabled={!trimmedTaskText} />

                    <div className="flex flex-row gap-1 less-custom-width:gap-3">
                        <PushButton
                            style="ghost"
                            text="Today"
                            icon="calendar"
                            disabled={!trimmedTaskText} />

                        <PushButton
                            style="ghost"
                            text="Public"
                            icon="lock"
                            disabled={!trimmedTaskText} />

                        <PushButton
                            style="ghost"
                            text="Highlight"
                            icon="highlight"
                            disabled={!trimmedTaskText} />

                        <PushButton
                            style="ghost"
                            text="Estimation"
                            icon="estimation"
                            disabled={!trimmedTaskText} />
                    </div>


                </div>

                <div className="flex flex-row gap-1">
                    <PushButton
                        style="solid"
                        color="secondary"
                        text="Cancel"
                        className="less-custom-width:hidden"
                        onPressed={() => {

                            setTaskText(props.taskText);
                            isUsingThisTaskCardRef.current = 'finished';
                            leaveTaskCard();
                        }} />



                    {props.taskId ? (// Button for updating the task
                        <PushButton
                            id="update-button"
                            style="solid"
                            color="primary"
                            text={
                                document.documentElement.clientWidth <= VIEWPORT_BREAKPOINT ? undefined
                                    : trimmedTaskText ? 'Save' : 'Ok'
                            }
                            icon={
                                document.documentElement.clientWidth > VIEWPORT_BREAKPOINT ? undefined
                                    : trimmedTaskText ? 'save' : 'x'
                            }
                            onPressed={updateTask} />

                    )
                    :(// Button for adding new task
                        <PushButton
                            id="add-button"
                            style="solid"
                            color="primary"
                            text={
                                document.documentElement.clientWidth <= VIEWPORT_BREAKPOINT ? undefined
                                    : trimmedTaskText ? 'Add' : 'Ok'
                            }
                            icon={document.documentElement.clientWidth > VIEWPORT_BREAKPOINT ? undefined
                                : trimmedTaskText ? 'plus' : 'x'}
                            onPressed={createNewTask}
                        />
                    )}

                </div>
            </div>

        </div>
    )
}
