export default function CardSkeleton({ count = 20 }) {
    return (
        <div className="w-full p-2 m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 animate-pulse">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-4 h-75 rounded-xl shadow-md flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                        <div className="flex gap-2">
                            <div className="h-3 bg-gary-300 dark:gray-700 rounded w-12" />
                            <div className="h-3 bg-gary-300 dark:gray-700 rounded w-10" />
                            <div className="h-3 bg-gary-300 dark:gray-700 rounded w-8" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}