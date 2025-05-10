export default function AuthErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Authentication Error
                </h2>
                <p className="text-center text-gray-600">
                    There was a problem authenticating your account. Please try signing up again.
                </p>
                <a
                    href="/signup"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Return to Sign Up
                </a>
            </div>
        </div>
    )
}