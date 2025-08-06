import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import InterestSearch from '../../components/SignupComp/InterestSearch';
import AvailabilityInput from '../../components/SignupComp/AvailabilityInput';
import { getUserInfo } from '../../services/mentorshipService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserInfo();
                setUser(data);
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    school: data.school || "",
                    major: data.major || "",
                    classification: data.classification || "",
                    bio: data.bio || "",
                    interests: data.interest || "",
                    preference: data.preference || "",
                })
            } catch (err) {
                toast.error("Failed to load user profile")
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;

        if (newPassword !== confirmPassword) {
            toast.error("New passwrds do not match.");
            return;
        }

        setPasswordLoading(true);
        try {
            toast.success("Password updated successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setShowPasswordForm(false);
        } catch (err) {
            toast.error("Failed to update password");
        } finally {
            setPasswordLoading(false);
        }
    };

    if (!formData || !user) return null;

    return (
        <div>
            <Header />
            <div className="flex flex-col md:flex-row max-w-6xl mx-auto py-10 px-6 gap-6">
                <div className="md:w-1/4 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 dark:bg-zinc-700" />
                    <h2 className="text-xl font-semibold dark:text-white">{formData.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-6 capitalize">{user.role}</p>
                    <div className="space-y-3">
                        <button className="w-full text-left text-sm font-medium dark:text-white">Profile</button>
                        <button className="w-full text-left text-sm font-medium dark:text-white">Interests</button>
                        <button className="w-full text-left text-sm font-medium dark:text-white">Availability</button>
                    </div>
                </div>

                <div className="md:w-3/4 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 dark:text-white">Edit Profile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">School</label>
                            <input type="text" value={formData.school} disabled className="input" />
                        </div>

                        <div>
                            <label className="label">Role</label>
                            <input type="text" value={user.role} disabled className="input" />
                        </div>

                        <div>
                            <label className="label">Name</label>
                            <input name="name" type="text" value={formData.name} onChange={handleChange} className="input" />
                        </div>

                        <div>
                            <label className="label">Email</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} className="input" />
                        </div>

                        <div>
                            <label className="label">Major</label>
                            <input name="major" type="text" value={formData.major} onChange={handleChange} className="input" />
                        </div>

                        <div>
                            <label className="label">Classification</label>
                            <select name="classification" value={formData.classification} onChange={handleChange} className="input">
                                <option value="">Select</option>
                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} className="input h-24 resize-none" />
                        </div>

                        <div className='md:col-span-2'>
                            <label className='label'>Current Interests</label>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                {user.interest.map((interest) => (
                                    <span key={interest.id} className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full">
                                        {interest.interest.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Interests</label>
                            <InterestSearch selected={formData.interests} setSelected={(interests) => setFormData((prev) => ({ ...prev, interests }))} />
                        </div>

                        <div className='md:col-span-2'>
                            <label className='label'>Current Availability</label>
                            <ul className='list-disc ml-6 mb-2 text-sm text-gray-700 dark:text-gray-300'>
                                {formData.preference.map((slot, index) => (
                                    <li key={index}>
                                        {slot.day}: {slot.startTime} - {slot.endTime}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Availability</label>
                            <AvailabilityInput value={formData.preference} onChange={(preference) => setFormData((prev) => ({ ...prev, preference }))} />
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4 justify-end">
                        <button onClick={() => setFormData(null)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg text-sm font-medium">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    <div className="mt-10">
                        <button
                            onClick={() => setShowPasswordForm((prev) => !prev)}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            {showPasswordForm ? "Hide Password Change" : "Change Password"}
                        </button>

                        {showPasswordForm && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="label">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                                        className="input"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                        className="input"
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-4">
                                    <button
                                        onClick={handlePasswordChange}
                                        disabled={passwordLoading}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {passwordLoading ? "Updating..." : "Update Password"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}
