export default function Button({ type = 'submit', className, ...props }) {
    return (
        <button
            type={type}
            className={`${className} px-4 py-2 bg-gray-300 border border-transparent rounded-md font-bold uppercase text-black text-sm`}
            {...props}
        />
    )
}
