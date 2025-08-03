import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SlideShow({ slides }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='relative w-full h-80 md:96 flex flex-col items-center overflow-hidden justify-center text-center'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-cetner justify-center px-4"
                >
                    <img
                        src={slides[index].img}
                        alt="Slide Image"
                        className='w-full h-68 object-cover rounded-md mb-4'
                    />
                    <p className='text-sm font-medium text-gray-800 dark:text-gray-200' >{slides[index].text}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}