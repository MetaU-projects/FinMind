import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../contexts/UserContext";

export default function WithAuth(WrappedComponent, authRoles) {

    return function ProtectedComponent(props) {
        const { user, loading } = useUser();
        const navigate = useNavigate();

        useEffect(() => {
            if (!loading && (!user || !authRoles.includes(user.role))) 
                navigate('/auth/login');
        }, [user, loading, authRoles, navigate]);

        if(loading) return <p>Loading...</p>
        if (!user || !authRoles.includes(user.role)) return null;

        return <WrappedComponent {...props} />;
    };
};