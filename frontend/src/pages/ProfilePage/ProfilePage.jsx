import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FiUser, FiEdit, FiTag, FiCalendar, FiLock, FiSave, FiX } from 'react-icons/fi';
import InterestSearch from '../../components/SignupComp/InterestSearch';
import AvailabilityInput from '../../components/SignupComp/AvailabilityInput';
import { getUserInfo } from '../../services/mentorshipService';
import { updateUserProfile, updateUserPassword } from '../../services/userService';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

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
                interests: data.interest || [],
                preference: data.preference || [],
            });
        } catch (err) {
            toast.error("Failed to load user profile");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            let interests = [];
            if (Array.isArray(formData.interests)) {
                if (formData.interests.length && typeof formData.interests[0] === "object") {
                    interests = formData.interests.map(i => i.interestId || i.id);
                } else {
                    interests = formData.interests;
                }
            }
            const payload = { ...formData, interests };
            const res = await updateUserProfile(user.id, payload);
            toast.success("Profile updated successfully!");
            fetchUserData();
            setUser(res.user);
            setFormData({
                name: res.user.name || "",
                email: res.user.email || "",
                school: res.user.school || "",
                major: res.user.major || "",
                classification: res.user.classification || "",
                bio: res.user.bio || "",
                interests: res.user.interest || [],
                preference: res.user.preference || [],
            });
        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        setPasswordLoading(true);
        try {
            await updateUserPassword(user.id, { currentPassword, newPassword });
            toast.success("Password updated successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setShowPasswordForm(false);
        } catch (err) {
            toast.error("Failed to update password");
        } finally {
            setPasswordLoading(false);
        }
    };

    if (!formData || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#e1e1e1] dark:bg-[#3D52A0]">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-[#5b6ea0] dark:bg-[#e1e1e1] h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-[#5b6ea0] dark:bg-[#e1e1e1] rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-[#5b6ea0] dark:bg-[#e1e1e1] rounded"></div>
                            <div className="h-4 bg-[#5b6ea0] dark:bg-[#e1e1e1] rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gradient-to-br from-[#e1e1e1] via-[#5b6ea0] to-[#3D52A0] dark:from-[#3D52A0] dark:via-[#5b6ea0] dark:to-[#e1e1e1]">

                <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl shadow-lg overflow-hidden" style={{ background: "linear-gradient(135deg, #3D52A0 0%, #5b6ea0 100%)" }}>
                        <div className="flex flex-col md:flex-row">
                            {/* Sidebar */}
                            <div className="md:w-1/4 p-6 border-r border-[#e1e1e1] bg-gradient-to-b from-[#3D52A0] to-[#5b6ea0]">
                                <div className="flex flex-col items-center">
                                    <div className="relative group">
                                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#5b6ea0] to-[#3D52A0] flex items-center justify-center text-white text-4xl overflow-hidden shadow-md border-4 border-[#e1e1e1]">
                                            {formData.name ? (
                                                <span>{formData.name.charAt(0).toUpperCase()}</span>
                                            ) : (
                                                <FiUser />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <FiEdit className="text-white text-xl" />
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold text-[#e1e1e1] mt-2">{formData.name}</h2>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#e1e1e1] text-[#3D52A0] mt-2 capitalize">
                                        {user.role}
                                    </div>
                                    <p className="text-sm text-[#e1e1e1] mt-3">{formData.school}</p>
                                </div>
                                <div className="mt-8 space-y-2">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile'
                                                ? 'bg-[#e1e1e1] text-[#3D52A0]'
                                                : 'text-[#e1e1e1] hover:bg-[#5b6ea0]'
                                            }`}
                                    >
                                        <FiUser className="mr-3" />
                                        Profile Information
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('interests')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'interests'
                                                ? 'bg-[#e1e1e1] text-[#3D52A0]'
                                                : 'text-[#e1e1e1] hover:bg-[#5b6ea0]'
                                            }`}
                                    >
                                        <FiTag className="mr-3" />
                                        Interests
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('availability')}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'availability'
                                                ? 'bg-[#e1e1e1] text-[#3D52A0]'
                                                : 'text-[#e1e1e1] hover:bg-[#5b6ea0]'
                                            }`}
                                    >
                                        <FiCalendar className="mr-3" />
                                        Availability
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveTab('security');
                                            setShowPasswordForm(true);
                                        }}
                                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security'
                                                ? 'bg-[#e1e1e1] text-[#3D52A0]'
                                                : 'text-[#e1e1e1] hover:bg-[#5b6ea0]'
                                            }`}
                                    >
                                        <FiLock className="mr-3" />
                                        Security
                                    </button>
                                </div>
                            </div>
                            {/* Main Content */}
                            <div className="md:w-3/4 p-8 bg-[#e1e1e1] dark:bg-[#3D52A0]">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-[#3D52A0] dark:text-[#e1e1e1]">
                                        {activeTab === 'profile' && 'Edit Profile'}
                                        {activeTab === 'interests' && 'Your Interests'}
                                        {activeTab === 'availability' && 'Set Availability'}
                                        {activeTab === 'security' && 'Security Settings'}
                                    </h2>
                                    <div className="text-sm text-[#5b6ea0] bg-[#e1e1e1] px-3 py-1 rounded-md">
                                        Last updated: {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                                {activeTab === 'profile' && (
                                    <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-[#5b6ea0] p-8 rounded-xl shadow mb-8">
                                        <div>
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Name</label>
                                            <input name="name" type="text" value={formData.name} onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Email</label>
                                            <input name="email" type="email" value={formData.email} onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">School</label>
                                            <input type="text" value={formData.school} disabled
                                                className="w-full px-4 py-2 rounded-lg border border-[#e1e1e1] bg-[#e1e1e1] dark:bg-[#5b6ea0] text-[#5b6ea0] dark:text-[#e1e1e1] cursor-not-allowed" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Major</label>
                                            <input name="major" type="text" value={formData.major} onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Classification</label>
                                            <select name="classification" value={formData.classification} onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition">
                                                <option value="">Select</option>
                                                <option value="FRESHMAN">Freshman</option>
                                                <option value="SOPHOMORE">Sophomore</option>
                                                <option value="JUNIOR">Junior</option>
                                                <option value="SENIOR">Senior</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Bio</label>
                                            <textarea name="bio" value={formData.bio} onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-[#3D52A0] transition resize-none h-24" />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'interests' && (
                                    <div className="animate-fadeIn bg-white dark:bg-[#5b6ea0] p-8 rounded-xl shadow mb-8">
                                        <div className="mb-4">
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Previous Interests</label>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.isArray(user.interest) && user.interest.length > 0 ? (
                                                    user.interest.map((interest) => (
                                                        <span key={interest.id} className="bg-[#e1e1e1] dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] text-sm px-3 py-1 rounded-full font-medium shadow">
                                                            {interest.interest?.name || interest.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-[#5b6ea0] text-sm">No interests set yet.</span>
                                                )}
                                            </div>
                                        </div>
                                        <InterestSearch
                                            selected={formData.interests}
                                            onSelect={(ids) => setFormData((prev) => ({ ...prev, interests: ids }))}
                                        />
                                    </div>
                                )}

                                {activeTab === 'availability' && (
                                    <div className="animate-fadeIn bg-white dark:bg-[#5b6ea0] p-8 rounded-xl shadow mb-8">
                                        <div className="mb-4">
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Previous Availability</label>
                                            <ul className="list-disc ml-6 text-sm text-[#3D52A0] dark:text-[#e1e1e1]">
                                                {Array.isArray(user.preference) && user.preference.length > 0 ? (
                                                    user.preference.map((slot, idx) => (
                                                        <li key={idx}>
                                                            <span className="font-semibold">{slot.day}:</span> {slot.startTime} - {slot.endTime}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-[#5b6ea0]">No availability set yet.</li>
                                                )}
                                            </ul>
                                        </div>
                                        <AvailabilityInput
                                            value={formData.preference}
                                            onChange={(preference) => setFormData((prev) => ({ ...prev, preference }))}
                                        />
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-[#5b6ea0] p-8 rounded-xl shadow mb-8">
                                        <div>
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Current Password</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block mb-2 font-semibold text-[#3D52A0] dark:text-[#e1e1e1]">Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                                className="w-full px-4 py-2 rounded-lg border border-[#5b6ea0] bg-white dark:bg-[#3D52A0] text-[#3D52A0] dark:text-[#e1e1e1] focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                                            <button
                                                onClick={handlePasswordChange}
                                                disabled={passwordLoading}
                                                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50 shadow transition"
                                            >
                                                {passwordLoading ? "Updating..." : "Update Password"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 pt-6 border-t border-[#5b6ea0] flex justify-end gap-4">
                                    <button
                                        onClick={() => setFormData(null)}
                                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#3D52A0] border border-[#5b6ea0] rounded-lg text-sm font-medium text-[#3D52A0] dark:text-[#e1e1e1] hover:bg-[#e1e1e1] dark:hover:bg-[#5b6ea0] transition-colors"
                                    >
                                        <FiX className="mr-2" />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="inline-flex items-center px-4 py-2 bg-[#3D52A0] hover:bg-[#5b6ea0] text-white rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
                                    >
                                        <FiSave className="mr-2" />
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}