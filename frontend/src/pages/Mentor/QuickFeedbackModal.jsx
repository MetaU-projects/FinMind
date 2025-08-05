import { useState } from "react";

const feedbackTemplates = [
    "Great session today! Keep up the momentum and feel free to reach out if anything is unclear.",
    "You're making solid progress — next time let’s dive deeper into [topic].",
    "Awesome job today! I’ll share a few resources to help you prepare for next steps.",
    "Thanks for the session! Let me know if you want to adjust your goals or focus areas.",
    "You're asking great questions — that’s key to growth. Keep them coming!"
];

export default function QuickFeedbackModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-4 px-4 py-2 rounded text-white bg-[#3D52A0] cursor-pointer"
            >
                Quick Feedback
            </button>

            {isOpen && (
                <div className="fixed inset-0 backdrop-blur-xs fixed inset-0 z-50 flex justify-center items-center">
                    
                    <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-xl w-full max-w-lg shadow-lg relative">
                        <button
                            className="absolute top-3 right-4 text-xl font-bold cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-semibold mb-4">📬 Select Feedback to Copy</h2>
                        <ul className="space-y-4 max-h-96 overflow-y-auto">
                            {feedbackTemplates.map((text, index) => (
                                <li
                                    key={index}
                                    className="bg-zinc-100 dark:bg-gray-800 p-3 rounded flex justify-between items-center"
                                >
                                    <span className="text-sm">{text}</span>
                                    <button
                                        onClick={() => handleCopy(text, index)}
                                        className="ml-3 text-sm text-blue-600 hover:underline cursor-pointer"
                                    >
                                        {copiedIndex === index ? "Copied!" : "Copy"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};


