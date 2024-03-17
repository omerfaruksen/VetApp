import { useState, useEffect } from "react"
import { getDoctor, deleteDoctor, createDoctor, updateDoctorFunc } from "../../API/doctor"
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';


function Doctor() {
    const [doctor, setDoctor]= useState([]);
    const [reload, setReload]= useState(true);
    const [newDoctor, setNewDoctor]= useState({
        name:"", 
        email:"", 
        address:"", 
        city:"", 
        phone:""}
    );
    
    const [updateDoctor, setUpdateDoctor]= useState({
        name:"", 
        email:"", 
        address:"", 
        city:"", 
        phone:""}
    );
        
    useEffect(() => {
        //Dosyalşarı çektiğimiz kısım
        getDoctor().then((data) => {
            setDoctor(data);
        });
        setReload(false);
    }, [reload]);

    //Doktor Ekleme 
    const handleNewDoctor = (event) =>{
        setNewDoctor({
          ...newDoctor,
          [event.target.name]: event.target.value,
        });
        
    };

    //Doktor ekleme
    const handleCreate =() =>{
        createDoctor(newDoctor).then(() => {
          setReload(true)
        });
        setNewDoctor({
          name:"",
          phone:"",
          mail:"",
          address:"",
          city:""
        });
    };

    //Doktor silme
    const handleDelete= (id) => {
        console.log(id);
          deleteDoctor(id).then(() => {
           setReload(true);
          });
    };

    //Doktor Güncelleme 
    const handleUpdate =() =>{
        updateDoctorFunc(updateDoctor).then(()=>{
          setReload(true);
        });
        setUpdateDoctor({
          name:"",
          phone:"",
          mail:"",
          address:"",
          city:""
        });
    };
    
    const handleUpdateChange = (event) => {
        setUpdateDoctor({
          ...updateDoctor,
          [event.target.name]: event.target.value,
        });
      };

      const handleUpdateBtn =(doc) =>{
    
        setUpdateDoctor({
          name: doc.name,
          phone:doc.phone,
          mail:doc.mail,
          address:doc.address,
          city:doc.city,
          id:doc.id
        });
    
      };
      
  return (
    <div>
      <h1>Doctor</h1>
      <h3>Add Doctor</h3>
      <div className="customer-newcustomer">
        <input type="text" 
        placeholder="Name" 
        name="name"
        value={newDoctor.name}
        onChange={handleNewDoctor} />
        <input type="text" 
        placeholder="Phone" 
        name="phone"
        value={newDoctor.phone}
        onChange={handleNewDoctor}/>
        <input type="text" 
        placeholder="Mail" 
        name="mail"
        value={newDoctor.mail}
        onChange={handleNewDoctor}/>
        <input type="text" 
        placeholder="Address" 
        name="address"
        value={newDoctor.address}
        onChange={handleNewDoctor}/>
        <input type="text" 
        placeholder="City" 
        name="city"
        value={newDoctor.city}
        onChange={handleNewDoctor}/>
        <button onClick={handleCreate}>Add</button>
      </div>
      <div className="customer-updatecustomer">
        <h3>Update Doctor</h3>
        <input type="text" 
        placeholder="Name" 
        name="name"
        value={updateDoctor.name}
        onChange={handleUpdateChange} />
        <input type="text" 
        placeholder="Phone" 
        name="phone"
        value={updateDoctor.phone}
        onChange={handleUpdateChange}/>
        <input type="text" 
        placeholder="Mail" 
        name="mail"
        value={updateDoctor.mail}
        onChange={handleUpdateChange}/>
        <input type="text" 
        placeholder="Address" 
        name="address"
        value={updateDoctor.address}
        onChange={handleUpdateChange}/>
        <input type="text" 
        placeholder="City" 
        name="city"
        value={updateDoctor.city}
        onChange={handleUpdateChange}/>
        <button onClick={handleUpdate}>Update</button>
      </div>
      {doctor.map((doctor) => (
          <div
          key={doctor.id}
          >
            {doctor.name} {doctor.phone} {doctor.mail} {doctor.address}
            {doctor.city} 
            <span id={doctor.id}
            onClick={() => handleDelete(doctor.id)}>
             <DeleteIcon/>
            </span>
            <span onClick={() => handleUpdateBtn(doctor)}>
              <UpdateIcon/>
              </span>
          </div>
               ))}
    </div>
  )
}

export default Doctor
