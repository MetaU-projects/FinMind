import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RequestList from "../../components/MenteeRequestsList/RequestList";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import { useUser } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import { getMenteeRequests, requestResponse } from "../../services/mentorService";
import { removeRequest } from "../../services/menteeService";
import { createMentorship } from "../../services/mentorshipService";
import { requestStatus } from "../../utils/status";
import SlideShow from "./SlideShow";

export default function HomeMentor() {
    const { user } = useUser();
    const [requests, setRequests] = useState([]);
    const [pickMentee, setPickMentee] = useState(null);
    const [requestId, setRequestId] = useState(null);
    const [menteeId, setMenteeId] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            const results = await getMenteeRequests();
            setRequests(results);
        }
        fetchRequests();
    }, []);

    const handleReqResponse = async () => {
        const respondedAt = new Date();
        await requestResponse(requestId, reqStatus, respondedAt);
        switch (reqStatus) {
            case requestStatus.ACCEPTED:
                await createMentorship(menteeId, user.id);
                break;
            case requestStatus.DECLINED:
                await removeRequest(requestId);
                break;
        }
        setRequests(requests.filter(request => request.mentee.id !== menteeId));
    }

    const tips = [
        { text: "🌱 Growth comes from asking questions.", img: "/public/tip1.jpg" },
        { text: "🤝 Great mentors guide, not give answers.", img: "/public/tip2.jpg" },
        { text: "📌 Be specific with your goals — it helps mentors help you.", img: "/public/tip3.jpg" },
        { text: "💬 Don’t be afraid to follow up after a session.", img: "/public/tip4.jpg" }
    ];

    const features = [
        { text: "📆 Smart scheduling: Suggested times that work for both of you.", img: "/public/f4.jpg" },
        { text: "🧠 AI-powered mentor recommendations tailored to your goals.", img: "/public/f3.jpg" },
        { text: "💡 Explore mentors by skills, schools, or shared interests.", img: "/public/f1.jpg" },
        { text: "🔔 Stay in the loop with real-time updates and alerts.", img: "/public/f2.jpg" }
    ];


    return (
        <div className="home-page">
            <div className="home-header">
                <Header />
                <div className="banner mentor-request">
                    <h2>Welcome back {user.name}</h2>
                    <p className="text-lg">Every conversation is a chance to inspire. Let's get started</p>
                </div>
            </div>
            <div className="pt-5">
                <div className="grid grid-cols-3 gap-4 m-10">
                    <StatCard title="Pending Requests" description="View connection requests wait for your response." />
                    <StatCard title="Current Mentees" description="Stay connected with mentees you've already accepted." />
                    <StatCard title="Your Mentorship Impact" description="Encourage growth through consistent mentorship sessions." />
                </div>
                <div className="grid grid-cols-2 gap-4 m-10">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow">
                        <h2 className="text-lg font-medium mb-4 text-center dark:text-white">Pending Requests</h2>
                        <div className=" overflow-y-auto">
                            {requests.length > 0 ? (
                                <RequestList
                                    requests={requests}
                                    onSelect={setPickMentee}
                                    setRequestId={setRequestId}
                                    setMenteeId={setMenteeId}
                                    setReqStatus={setReqStatus}
                                    onReqResponse={handleReqResponse}
                                />
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-200">No Pending Requests as of this time. Add more skills</div>
                            )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow h-[40vh]">
                            <h2 className="text-lg text-center font-medium dark:text-white">💡 Tip for the day!</h2>
                            <SlideShow slides={tips} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow h-[40vh]">
                            <h2 className="text-lg text-center font-medium dark:text-white">More features coming soon</h2>
                            <SlideShow slides={features} />
                        </div>
                    </div>
                </div>
            </div>
            {pickMentee && (
                <ProfileModal userInfo={pickMentee} setPickMentor={setPickMentee} handleReqResponse={handleReqResponse} setReqStatus={setReqStatus} />
            )}
            <Footer />
        </div>
    )
}

function StatCard({ title, description }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <p className="text-2xl font-bold dark:text-white">{title}</p>
            <p className="text-gray-500 text-sm dark:text-gray-300">{description}</p>
        </div>
    )
}