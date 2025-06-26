import axios from 'axios'

const createAPiInstance = (baseURL) => {
    return axios.create({ baseURL });
}

const auths = createAPiInstance(`http://localhost:8000/auth`);

export const registerUser = async (user) => {
    try {
        const data = {
            ...user,
            role: user.role.toUpperCase(),
            classification: user.classification.toUpperCase(),
        };
        const response = await auths.post('/signup', data);
        return response.data;
    } catch (err) {
        console.error("Error signing up", err);
        throw err;
    }
}

export const loginUser = async (email, password) => {
    try{
        const data = {
            email,
            password
        };
        
        const response = await auths.post('/login', data);
        return response.data;
    }catch(err){
        console.error("Error logging in", err);
        throw err;
    }
}