import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RequestList from "../../components/MenteeRequestsList/RequestList";


export default function HomeMentor() {
    return (
        <div className="home-page">
            <div className="home-header">
                <Header />
                <h1 className="banner mentor-request">These Are Your Request(s)</h1>
            </div>
            <div className="home-content"> 
                
                <RequestList />
            </div>
            <Footer />
        </div>
    )
}