// Funciones
export const customStylesModal = () => {
    //Modal styles
    return {
        customStyles : {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "80%",  // Ancho por defecto del modal
                maxHeight: "80%",  // Altura máxima para permitir el desplazamiento
                overflow: "auto",  // Agrega desplazamiento si el contenido es más grande que la altura máxima
                maxWidth: "600px", // Ancho máximo del modal para evitar que sea demasiado grande en pantallas grandes
                backgroundColor: 'rgb(243, 244, 246)',
                // Media query para tamaños de pantalla más pequeños (celulares)
                '@media (maxWidth: 768px)': {
                    width: "95%", // Ajusta el ancho del modal para pantallas más pequeñas
                },
            }
        }
    }
}

export const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    });
    return formatter.format(valor);
}