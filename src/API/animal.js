import axios from "axios";
//Dataları Çektiğimiz Kısım
export const getAnimals= async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals");
    return data;
}
//Delete işlemi
export const deleteAnimal= async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/animals/${id}`
    );
    return data;
}

export const createAnimal = async (animal) =>{
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/animals` , animal);
    return data;
}

export const updateAnimalFunc = async (animal) => {   
    const {data} =await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/animals/${animal.id}`, animal);
    return data;
};
export const searchAnimalByName = async (name) => {
    try {
        const response = await axios.get(
            import.meta.env.VITE_APP_BASE_URL + `/api/v1/animals/searchByName?name=${name}`);
        return response.data;
    } catch (error) {
        console.error("Error while searching customer by name:", error);
        throw error;
    }
};
export const searchCustomerByName = async (id) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/searchByCustomer${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error while searching customer by name:", error);
        throw error;
    }
};