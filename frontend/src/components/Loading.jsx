const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-800"></div>
                <p className="mt-4 text-primary-600">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;