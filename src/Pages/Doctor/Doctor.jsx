import { useState, useEffect } from "react";
import { getDoctor, deleteDoctor, createDoctor, updateDoctorFunc } from "../../API/doctor";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import './Doctor.css'

function Doctor() {
    const [doctorList, setDoctorList] = useState([]);
    const [reload, setReload] = useState(true);
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    });
    const [updateDoctor, setUpdateDoctor] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    });
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getDoctor().then((data) => {
            setDoctorList(data);
        });
        setReload(false);
    }, [reload]);

    const handleNewDoctor = (event) => {
        setNewDoctor({
            ...newDoctor,
            [event.target.name]: event.target.value,
        });
    };

    const handleCreate = () => {
        createDoctor(newDoctor).then(() => {
            setReload(true);
        });
        setNewDoctor({
            name: "",
            email: "",
            address: "",
            city: "",
            phone: ""
        });
    };

    const handleDelete = (id) => {
        deleteDoctor(id).then(() => {
            setReload(true);
        });
    };

    const handleUpdate = () => {
        updateDoctorFunc(updateDoctor).then(() => {
            setReload(true);
        });
        setUpdateDoctor({
            name: "",
            email: "",
            address: "",
            city: "",
            phone: ""
        });
    };

    const handleUpdateChange = (event) => {
        setUpdateDoctor({
            ...updateDoctor,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdateBtn = (doc) => {
        setUpdateDoctor({
            name: doc.name,
            email: doc.email,
            address: doc.address,
            city: doc.city,
            phone: doc.phone,
            id: doc.id
        });
    };

    const filteredDoctors = doctorList.filter(doctor => {
        return doctor.name.toLowerCase().includes(searchText.toLowerCase());
    });

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
                    onChange={handleNewDoctor} />
                <input type="text"
                    placeholder="Mail"
                    name="email"
                    value={newDoctor.email}
                    onChange={handleNewDoctor} />
                <input type="text"
                    placeholder="Address"
                    name="address"
                    value={newDoctor.address}
                    onChange={handleNewDoctor} />
                <input type="text"
                    placeholder="City"
                    name="city"
                    value={newDoctor.city}
                    onChange={handleNewDoctor} />
                <button className="add-btn" onClick={handleCreate}>Add</button>
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
                    onChange={handleUpdateChange} />
                <input type="text"
                    placeholder="Mail"
                    name="email"
                    value={updateDoctor.email}
                    onChange={handleUpdateChange} />
                <input type="text"
                    placeholder="Address"
                    name="address"
                    value={updateDoctor.address}
                    onChange={handleUpdateChange} />
                <input type="text"
                    placeholder="City"
                    name="city"
                    value={updateDoctor.city}
                    onChange={handleUpdateChange} />
                <button onClick={handleUpdate}>Update</button>
            </div>
            <input type="text" placeholder="Search by name" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            {filteredDoctors.map((doctor) => (
                <div key={doctor.id}>
                    {doctor.name} {doctor.phone} {doctor.mail} {doctor.address}
                    {doctor.city}
                    <span id={doctor.id} onClick={() => handleDelete(doctor.id)}>
                        <DeleteIcon />
                    </span>
                    <span onClick={() => handleUpdateBtn(doctor)}>
                        <UpdateIcon />
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Doctor;
