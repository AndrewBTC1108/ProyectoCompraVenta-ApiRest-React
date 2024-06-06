export default function InputError({ messages = [], className = '' }) {
    return (
        <>
            {messages.length > 0 && (
                <>
                    {messages.map((message, index) => (
                        <p
                            className={`${className} text-center border border-red-500 bg-red-200 text-red-700 font-bold uppercase p-2 mt-2 text-xs"`}
                            key={index}>
                            {message}
                        </p>
                    ))}
                </>
            )}
        </>
    )
}