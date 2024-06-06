import clienteAxios from '../lib/axios'; // Ajusta la ruta según la estructura de tu proyecto
//recibe token como props
export const fetchUser = async (token) => {
    try {
        const response = await clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            // Token no válido o expirado
            localStorage.removeItem('AUTH_TOKEN');
            throw new Error('Unauthorized');
        } else {
            throw new Error(error?.response?.data?.errors || 'Unexpected error');
        }
    }
};