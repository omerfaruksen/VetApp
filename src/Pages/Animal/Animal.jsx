import { useState, useEffect } from "react"
import { getAnimals, deleteAnimal, createAnimal, updateAnimalFunc} from "../../API/animal";
import { getCustomer } from "../../API/customer";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function Animal() {
    const [animal, setAnimal]= useState([]);
    const [reload, setReload]= useState(true);
    const [customer, setCustomer]= useState([]);
    const [newAnimal, setNewAnimal]= useState({
      name:"",
      species:"",
      breed:"",
      gender:"",
      dateOfBirth:"",
      colour:""
    })
    const [updateAnimal, setUpdateAnimal]= useState({
      name:"",
      species:"",
      breed:"",
      gender:"",
      dateOfBirth:"",
      colour:""
    });

    const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

    useEffect(()=> {
        //Dataları Çektiğimiz Kısım
        getAnimals().then((data) => {
            setAnimal(data);
        });
        
        getCustomer().then((data) => {
          setCustomer(data);
        });
        setReload(false);
    }, [reload]);
    //Delete işlem kısmı
    const handleDelete = (id) => {
      
      deleteAnimal(id).then(() => {
        setReload(true);
      });
    };
    
    //Create Animal
    const handleCreate = () => {
      createAnimal (newAnimal).then (() => {
        setReload(true);
      });
      setNewAnimal({
        name:"",
        species:"",
        breed:"",
        gender:"",
        dateOfBirth:"",
        colour:""
      })
    };
    //Update Animal
    const handleUpdate =() =>{
      updateAnimalFunc(updateAnimal).then(()=>{
        
        setReload(true);
      });
      console.log("Güncelleme bitti")
      setUpdateAnimal({
        name:"",
        species:"",
        breed:"",
        gender:"",
        dateOfBirth:"",
        colour:""
      });
    };
  

    const handleNewAnimal = (e) => {
      const { name, value } = e.target;
      if (name === "customer") {
        setNewAnimal((prevAnimal) => ({
          ...prevAnimal,
          customer: {
            id: value,
          },
        }));
      } else {
        setNewAnimal((prevAnimal) => ({
          ...prevAnimal,
          [name]: value,
        }));
      }
      console.log(newAnimal);
    };
    

    const handleUpdateBtn =(an) =>{
    
      setUpdateAnimal({
        name: an.name,
        species:an.species,
        breed:an.breed,
        gender:an.gender,
        dateOfBirth:an.dateOfBirth,
        colour: an.colour,
        id:an.id
      
      });
  
    };
  
    const handleUpdateChange = (event) => {
      const { name, value } = event.target;
      if (name === "customer") {
        setUpdateAnimal((prevAnimal) => ({
          ...prevAnimal,
          customer: {
            id: value,
          },
        }));
      } else {
        setUpdateAnimal({
          ...updateAnimal,
          [name]: value,
        });
      }
    };
    
    const filteredAnimals = animal.filter((item) => {
      return item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
  return (
    <div>
      <h1>Animal</h1>
      <div>
        <h3>Add Animal</h3>
        <input 
        type="text"
        name="name"
        placeholder="Name"
        value={newAnimal.name}
        onChange={handleNewAnimal}
         />
        <input 
        type="text"
        placeholder="Species"
        name="species" 
        value={newAnimal.species}
        onChange={handleNewAnimal} />
        <input 
        type="text"
        placeholder="Breed"
        name="breed"
        value={newAnimal.breed}
        onChange={handleNewAnimal}  />
        <input 
        type="text"
        placeholder="Gender"
        name="gender"
        value={newAnimal.gender}
        onChange={handleNewAnimal}  />
        <input 
        type="date"
        placeholder="Date Of Birth"
        name="dateOfBirth"
        value={newAnimal.dateOfBirth}
        onChange={handleNewAnimal}  />
        <input 
        type="text"
        placeholder="Colour"
        name="colour"
        value={newAnimal.colour}
        onChange={handleNewAnimal}  />
        {/* Müşterileri select options olarak listeledik */}
        <select name="customer" 
        value={newAnimal?.customer?.id} 
        onChange={handleNewAnimal}>
          <option value="" > Select Customer
          </option>
          {customer.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
          
        </select>
        <button onClick={handleCreate}>Add Animal</button>
        
      </div>
      <div>
        <h3>Update Animal</h3>
      <input 
        type="text"
        name="name"
        placeholder="Name"
        value={updateAnimal.name}
        onChange={handleUpdateChange}
         />
        <input 
        type="text"
        placeholder="Species"
        name="species" 
        value={updateAnimal.species}
        onChange={handleUpdateChange} />
        <input 
        type="text"
        placeholder="Breed"
        name="breed"
        value={updateAnimal.breed}
        onChange={handleUpdateChange}  />
        <input 
        type="text"
        placeholder="Gender"
        name="gender"
        value={updateAnimal.gender}
        onChange={handleUpdateChange}  />
        <input 
        type="date"
        placeholder="Date Of Birth"
        name="dateOfBirth"
        value={updateAnimal.dateOfBirth}
        onChange={handleUpdateChange}  />
        <input 
        type="text"
        placeholder="Colour"
        name="colour"
        value={updateAnimal.colour}
        onChange={handleUpdateChange}  />
        {/* Yazarları select options olarak listeledik */}
        <select name="customer" 
        value={updateAnimal?.customer?.id} 
        onChange={handleUpdateChange}>
          <option value="" disabled> Select Customer
          </option>
          {customer.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
          
        </select>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* <div>
        {animal.map((animal) =>(
            <div
            id={animal.id} 
            onClick={(e) => handleDelete(e)} 
            key={animal.id}>
                 {animal.name} {animal.species} {animal.breed} {animal.dateOfBirth}{animal.gender}{animal.colour}
                 <p>Müşteri: {animal.customer ? animal.customer.name : ''}</p>
            <span id={animal.id}
            onClick={() => handleDelete(animal.id)}>
             <DeleteIcon/>
            </span>
            <span onClick={() => handleUpdateBtn(animal)}>
              <UpdateIcon/>
              </span>
        </div>
        ))}
      </div> */}
      <div>
        {filteredAnimals.map((animal) => (
          <div key={animal.id}>
            {animal.name} {animal.species} {animal.breed} {animal.dateOfBirth} {animal.gender} {animal.colour}
            <p>Müşteri: {animal.customer ? animal.customer.name : ''}</p>
            <span id={animal.id} onClick={() => handleDelete(animal.id)}>
              <DeleteIcon/>
            </span>
            <span onClick={() => handleUpdateBtn(animal)}>
              <UpdateIcon/>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Animal
