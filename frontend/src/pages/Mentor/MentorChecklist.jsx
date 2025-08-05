import { useState } from "react";

const mentorChecklist = [
    "Reviewed mentee’s profile and goals",
    "Checked in on previous action items",
    "Introduced new concepts or topics",
    "Recommended resources or next steps",
    "Scheduled or discussed next session",
    "Encouraged feedback from mentee"
];

export default function MentorChecklist() {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const toggleCheck = (index) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="w-full p-4 rounded-xl shadow-md bg-gray-200 dark:bg-gray-900 dark:text-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left font-semibold text-lg"
            >
                📝 Session Checklist
                <span className="text-xl cursor-pointer">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
                <ul className="mt-4 space-y-3">
                    {mentorChecklist.map((item, index) => (
                        <li key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={!!checkedItems[index]}
                                onChange={() => toggleCheck(index)}
                                className="mr-3 h-4 w-4 cursor-pointer"
                            />
                            <label className="text-sm">{item}</label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};



