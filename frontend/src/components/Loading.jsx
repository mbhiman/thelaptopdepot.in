import { motion } from 'framer-motion';

const Loading = ({ fullScreen = false }) => {
    const container = fullScreen
        ? 'fixed inset-0 flex items-center justify-center bg-white z-50'
        : 'flex items-center justify-center py-20';

    return (
        <div className={container}>
            <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-3 h-3 bg-primary-800 rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: index * 0.2,
                            }}
                        />
                    ))}
                </div>
                <p className="text-primary-600 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
