import { ProfileCard } from "./components/ProfileCard";
import { useState, useEffect } from "react";

export function User() {

    const [user, setUser] = useState(null);


    useEffect(() => {

        const fetchUser = async () => {
            // API çağrısını buraya ekleyin
            const fetchedUser = { id: 1, username: "demoUser" };
            setUser(fetchedUser);
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return <ProfileCard user={user} />;
}
