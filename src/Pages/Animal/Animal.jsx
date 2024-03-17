import { useState, useEffect } from "react"
import { getAnimals, deleteAnimal } from "../../API/animal";

function Animal() {
    const [animal, setAnimal]= useState([]);
    const [reload, setReload]= useState(true);

    useEffect(()=> {
        //Dataları Çektiğimiz Kısım
        getAnimals().then((data) => {
            setAnimal(data);
        });
        

        //Dataları Fetch İle çekebilirdik!
        // fetch("http://localhost:8080/api/v1/animals")
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data);
        //     setAnimal(data);
        // });
        setReload(false);
    }, [reload]);
    //Delete işlem kısmı
    const handleDelete= (event) =>{
        const id = event.target.id
        deleteAnimal(id).then(() => {
            setReload(true);
        });



        // fetch(`http://localhost:8080/api/v1/animals/${id}`,{ 
        //     method: "DELETE",
        // }).then(() => {
        //     setReload(true)
        // })
        // .catch((error) =>{
        //     console.error("Error: ", error);
        // });
    };
  return (
    <div>
      <h1>Animal</h1>
      <div>
        {animal.map((animal) =>(
            <div
            id={animal.id} 
            onClick={(e) => handleDelete(e)} 
            key={animal.id}>
                 {animal.name}
        </div>

        ))}
      </div>
    </div>
  )
}

export default Animal
