import { useContext } from "react";


export function ProfileCard({ user }) {
    const authState = useContext(AuthContext);

    return (
        <div className="card">
            <div className="card-header text-center">
                <img
                    src="/default-profile.png"
                    width="200"
                    className="img-fluid rounded-circle shadow-sm"
                    alt="Profile"
                />
            </div>
            <div className="card-body text-center">
                <span className="fs-3">{user.username}</span>
                {/* Eğer authState.id, user.id'ye eşitse, 'Edit' butonunu göster */}
                {authState.id === user.id && <button className="btn btn-primary">Edit</button>}
            </div>
        </div>
    );
}
