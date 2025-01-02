import './Alert.scss'

export function Alert({ children, styleType = "success", center = false }) {
    return (
        <div className={`custom-alert alert-${styleType} ${center ? 'text-center' : ''}`}>
            <svg className="alert-icon bi" role="img">
                <use href="/sprite.svg#bi bi-exclamation-triangle"></use>
            </svg>
            <div>
                {children}
            </div>
        </div>
    );
}
