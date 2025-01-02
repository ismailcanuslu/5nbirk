import { Spinner } from "./Spinner";

export function Button({
    apiProgress,
    disabled,
    children,
    onClick,
    styleType = "primary",
    type,
    label
}) {
    return (
        <button
            className={`btn custom-button ${styleType}`}
            disabled={apiProgress || disabled}
            onClick={onClick}
            type={type}
        >
            {apiProgress && <Spinner sm={true} />}
            {label}
            {children}
        </button>
    );
}
