import axios from 'axios'

const createAPiInstance = (baseURL) => {
    return axios.create({ baseURL });
}

const auths = createAPiInstance(`http://localhost:8000/auth`);

export const registerUser = async (
    name,
    email,
    password,
    role,
    school,
    major,
    classification,
    description,
    bio,
    availability) => {
    try {
        const data = {
            name,
            email,
            password,
            role: role.toUpperCase(),
            school,
            major,
            classification: classification.toUpperCase(),
            description,
            bio,
            availability
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