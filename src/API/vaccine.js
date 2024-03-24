import axios from "axios";
//Dataları Çektiğimiz Kısım
export const getVaccine= async () => {
    const {data} = await axios.get("http://localhost:8080/api/v1/vaccines");
    return data;
};

export const deleteVaccine= async (id) => {
    const {data} = await axios.delete(`http://localhost:8080/api/v1/vaccines/${id}`
    );
    return data;
}

export const createVaccine = async (vaccine) =>{
    const {data} = await axios.post(`http://localhost:8080/api/v1/vaccines` , vaccine);
    return data;
}