

interface PushButtonProps {
    className?: string;
    style: 'ghost' | 'solid';
    icon?: IconName;
    text?: string;
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    onPressed?: () => void;
}

type IconName = 'expand' | 'calendar' | 'lock' | 'highlight' | 'estimation' | 'x' | 'save' | 'plus';

const getButtonStyleFromProps = (props: PushButtonProps) => {

    let style = '';

    if(props.style === 'solid' && props.color === 'primary') {
        style = 'bg-primary text-white';
    }
    else if(props.style === 'solid' && props.color === 'secondary') {
        style = 'bg-secondary text-black';
    }

    else if(props.style === 'ghost') {
        style = 'more-custom-width:border-[1px] more-custom-width:border-ghost more-custom-width:text-button-text'
    }

    if(props.icon) {
        style = `${style} more-custom-width:p-[8px_24px_8px_16px] less-custom-width:p-[6px_6px_6px_6px]`;
    }
    else {
        style = `${style} p-[13px_24px_13px_24px] less-custom-width:p-[6px_6px_6px_6px]`;
    }

    return style;
    
};


export default function PushButton(props: PushButtonProps) {
    
    const style = getButtonStyleFromProps(props);
    
    
    return (
        <button
            className={`flex flex-row gap-[12px] font-medium disabled:opacity-50 items-center rounded-[4px] text-[14px] ${props.className} ${style}`}
            disabled={props.disabled}
            onClick={() => {
                if(props.onPressed)
                    props.onPressed();
            }}>
            
            {props.icon && <img src={`assets/icons/${props.icon}.svg`} className="w-[24px]"/>}
            
            <span className="less-custom-width:hidden">{props.text}</span>
        
        </button>
    )
}
