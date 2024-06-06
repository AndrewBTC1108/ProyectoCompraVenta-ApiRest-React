import { Link } from "react-router-dom"
export default function Categoria({categorie, handleclickcat, currentcat}) {
    const {id, nombre, url} = categorie;
    const {handleClickCategory} = handleclickcat;
    const {currentCategory} = currentcat;

    //operador ternario para asignar clases de resaltado en el sidebar
    const highlightcurrentcategory = () => currentCategory.id === id ? 'bg-gray-500' : 'bg-white'

    return (
        <div>
            <Link
                to={url}
                className={`${highlightcurrentcategory()} flex items-center gap-4 border w-full p-3 hover:bg-gray-500 cursor-pointer`}
                onClick={() => handleClickCategory(id)}
            >
                <button
                    className='text-lg font-bold cursor-pointer truncate'
                    type='button'
                >
                    {nombre}
                </button>
            </Link>
        </div>
    )
}
