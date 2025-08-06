import { createAPIInstance, API_BASE_URL } from "../utils/api";
const user = createAPIInstance(API_BASE_URL);

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await user.patch(`/profile/update`, profileData);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const updateUserPassword = async (userId, passwordData) => {
    try {
        const response = await user.patch(`/password/update`, passwordData);
        return response.data;
    } catch (err) {
        throw err;
    }
};