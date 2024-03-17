import { useState, useEffect } from "react"
import { getCustomer, deleteCustomer, createCustomer, updateCustomerFunc } from "../../API/customer";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';


function Customer() {
  const [customer, setCustomer]= useState([]);
  const [reload, setReload]= useState(true);
  const [newCustomer, setNewCustomer]= useState({
    name:"", 
    phone:"", 
    mail:"", 
    address:"", 
    city:""});
  const [updateCustomer, setUpdateCustomer]= useState({
    name:"", 
    phone:"", 
    mail:"", 
    address:"", 
    city:""
  });

  useEffect(() => {
    //Dosyalşarı çektiğimiz kısım
    getCustomer().then((data) => {
      setCustomer(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete= (id) => {
    // const id =event.target.id
    console.log(id);
      deleteCustomer(id).then(() => {
       setReload(true);
      });
  };
  //Müşteri güncelleme
  const handleUpdate =() =>{
    updateCustomerFunc(updateCustomer).then(()=>{
      
      setReload(true);
    });
    console.log("Güncelleme bitti")
    setUpdateCustomer({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:""
    });
  };


  //Yeni Müşteri Ekleme
  const handleNewCustomer = (event) =>{
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
    
  };

  const handleCreate =() =>{
    createCustomer(newCustomer).then(() => {
      setReload(true)
    });
    setNewCustomer({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:""
    });
  }

  const handleUpdateBtn =(cust) =>{
    
    setUpdateCustomer({
      name: cust.name,
      phone:cust.phone,
      mail:cust.mail,
      address:cust.address,
      city:cust.city,
      id:cust.id
    });

  };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <div>
      <h1>Customer</h1>
      <br />
      <h3>Add Custormer</h3>
      <div className="customer-newcustomer">
        <input type="text" 
        placeholder="Name" 
        name="name"
        value={newCustomer.name}
        onChange={handleNewCustomer} />
        <input type="text" 
        placeholder="Phone" 
        name="phone"
        value={newCustomer.phone}
        onChange={handleNewCustomer}/>
        <input type="text" 
        placeholder="Mail" 
        name="mail"
        value={newCustomer.mail}
        onChange={handleNewCustomer}/>
        <input type="text" 
        placeholder="Address" 
        name="address"
        value={newCustomer.address}
        onChange={handleNewCustomer}/>
        <input type="text" 
        placeholder="City" 
        name="city"
        value={newCustomer.city}
        onChange={handleNewCustomer}/>
        <button onClick={handleCreate}>Add</button>
      </div>
      <div className="customer-updatecustomer">
        <h3>Update Customer</h3>
        <input type="text" 
        placeholder="Name" 
        name="name"
        value={updateCustomer.name}
        onChange={handleUpdateChange} />
        <input type="text" 
        placeholder="Phone" 
        name="phone"
        value={updateCustomer.phone}
        onChange={handleUpdateChange}/>
        <input type="text" 
        placeholder="Mail" 
        name="mail"
        value={updateCustomer.mail}
        onChange={handleUpdateChange}/>
        <input type="text" 
        placeholder="Address" 
        name="address"
        value={updateCustomer.address}
        onChange={handleUpdateChange}/>
        <input type="text" 
        placeholder="City" 
        name="city"
        value={updateCustomer.city}
        onChange={handleUpdateChange}/>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>
        <br />
        <h3>Customers</h3>
        <br />
        {customer.map((customer) => (
          <div
          key={customer.id}
          >
            {customer.name} {customer.phone} {customer.mail} {customer.address}
            {customer.city} 
            <span id={customer.id}
            onClick={() => handleDelete(customer.id)}>
             <DeleteIcon/>
            </span>
            <span onClick={() => handleUpdateBtn(customer)}>
              <UpdateIcon/>
              </span>
          </div>
               ))}
      </div>
    </div>
  )
}

export default Customer
