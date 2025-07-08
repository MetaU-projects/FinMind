import Header from "../../components/Header/Header";
import RequestList from "../../components/MenteeRequestsList/RequestList";


export default function HomeMentor() {
    return (
        <div className="page-wrapper">
            <Header />
            <RequestList />
        </div>
    )
}