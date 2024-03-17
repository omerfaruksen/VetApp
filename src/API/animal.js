import axios from "axios";
//Dataları Çektiğimiz Kısım
export const getAnimals= async () => {
    const {data} = await axios.get("http://localhost:8080/api/v1/animals");
    return data;
}
//Delete işlemi
export const deleteAnimal= async (id) => {
    const {data} = await axios.get(`http://localhost:8080/api/v1/animals/${id}`
    );
    return data;
}