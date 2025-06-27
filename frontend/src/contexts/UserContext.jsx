import { createContext, useState, useContext, useEffect } from 'react';
import { isLoggedIn } from '../services/dataService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await isLoggedIn();
                if(data) setUser(data);
                setLoading(false);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <UserContext.Provider value={{ loading, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
