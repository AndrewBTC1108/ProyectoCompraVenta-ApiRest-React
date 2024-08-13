import { useAuth } from "../hooks/useAuth"
import useSWR from "swr"
import {fetcher} from "../hooks/Fetcher"
import Button from "./Button"
import Categoria from "./Categoria"
import { useState } from "react"

export default function Navigate() {
    let token = localStorage.getItem('AUTH_TOKEN');
    const [currentCategory, setcurrentCategory] = useState({id:0})

    const {data: availableCategoriesData, error: availableCategoriesError} = useSWR(
        token ? 'api/categorias' : null, fetcher
    );
    let categories = availableCategoriesData ? availableCategoriesData.data : [];
    //descructuring
    const {logout} = useAuth({middleware: 'auth'});

    //tomar el id de la categoria a la que se da click
    const handleClickCategory = id => {
        const categorie = categories.filter(categoria => categoria.id === id)[0]
        setcurrentCategory(categorie)
    }


    return (
        <nav className="flex flex-col md:flex-row gap-20 items-center">
            {categories.map(categorie => (
                <Categoria
                    key={categorie.id}
                    categorie={categorie}
                    handleclickcat={{handleClickCategory}}
                    currentcat={{currentCategory}}
                />
            ))}
            <Button onClick={logout}>
                Bloquear
            </Button>
        </nav>
    )
}
