import { useEffect, useMemo, useState } from "react"
import { allInterests } from "../../services/mentorshipService";
import "./SignupComp.css";

export default function InterestSearch({ selecteds = [], onSelect }) {
    const [interests, setInterests] = useState([]);
    const [interestMap, setInterestMap] = useState({});
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const fetchInterests = async () => {
            const data = await allInterests();
            setInterests(data);
            const map = {};
            data.forEach(({ id, name }) => (map[name] = id));
            setInterestMap(map);
        }
        fetchInterests();
    }, []);

    const filterInterests = useMemo(() => {
        return interests.filter(i => 
            i.name.toLowerCase().includes(query.toLowerCase())
        )
    }, [interests, query]);

    const handleSelect = (name) => {
        if (!selected.includes(name)) {
            const updated = [...selected, name];
            setSelected(updated);
            setQuery('');
            onSelect(updated.map(n => interestMap[n]))
        }
    }

    return (
        <div className="interest-search">
            <input className="step-form-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Interests" />
            {query &&
                <ul className="interest-list">
                    {filterInterests.length !== 0 ? filterInterests.map(i => (
                        <li key={i.id} onClick={() => handleSelect(i.name)} className="interest-name">
                            {i.name}
                        </li>
                    )) : (
                        <div className="school">No search results!</div>
                    )
                }
                </ul>
            }
            <div>
                {selected.length > 0 && (
                    <div className="select-interest">
                        {selected.map((interest) => (
                            <div key={interest} className="selected">
                                <span className="mr-2">{interest}</span>
                                <button type="button"
                                    onClick={() => { setSelected(selected.filter((item) => item !== interest)) }}>
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}