import clienteAxios from "../lib/axios"
// fetcher
export const fetcher = async (url) => {
    try {
        const response = await clienteAxios(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.errors || 'Unexpected error');
    }
};