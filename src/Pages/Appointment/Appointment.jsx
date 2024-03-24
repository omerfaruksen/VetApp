import { useState, useEffect } from "react";
import { getAppointment, createAppointment, deleteAppointment, updateAppointmentFunc} from "../../API/appointment";
import { getDoctor } from "../../API/doctor";
import { getAnimals } from "../../API/animal";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [reload, setReload] = useState(true);
  const [doctor, setDoctor] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    doctor: { id: "" }, 
    animal: { id: "" }
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    date: "",
    doctor: { id: "" }, 
    animal: { id: "" },
  });

  useEffect(() => {
    getAppointment().then((data) => {
      setAppointment(data);
    });
    getDoctor().then((data) => {
      setDoctor(data);
    });
    getAnimals().then((data) => {
      setAnimal(data);
    });
    setReload(false);
  }, [reload]);

  const handleCreate = () => {
    createAppointment(newAppointment).then(() => {
      setReload(true);
    });
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      date: "", // Reset only the date field
    }));
  };

  const handleNewAppointment = (e) => {
    const { name, value } = e.target;
    if (name === "doctor" || name === "animal") {
      setNewAppointment((prevAppointment) => ({
        ...prevAppointment,
        [name]: { id: value },
      }));
    } else {
      setNewAppointment((prevAppointment) => ({
        ...prevAppointment,
        [name]: value,
      }));
    }
  };

  const handleDelete = (id) => {
      
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateBtn =(appointment) =>{
    
    setUpdateAppointment({
      date: appointment.date,
      id: appointment.id
    });

  };

  const handleUpdate = () => {
    updateAppointmentFunc(updateAppointment).then(() => {
      setReload(true);
    });
    setUpdateAppointment({
      date: "",
      doctor: { id: "" },
      animal: { id: "" }
    });
  };
  

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    if (name === "doctor" || name === "animal") {
      setUpdateAppointment((prevUpdateAppointment) => ({
        ...prevUpdateAppointment,
        [name]: { id: value },
      }));
    } else {
      setUpdateAppointment((prevUpdateAppointment) => ({
        ...prevUpdateAppointment,
        [name]: value,
      }));
    }
  };
  
  return (
    <div>
      <h3>Appointment</h3>
      <select
        name="doctor"
        value={newAppointment?.doctor?.id}
        onChange={handleNewAppointment}
      >
        <option value="" disabled>
          Select Doctor
        </option>
        {doctor.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      <select
        name="animal"
        value={newAppointment?.animal?.id}
        onChange={handleNewAppointment}
      >
        <option value="" disabled>
          Select Animal
        </option>
        {animal.map((animal) => (
          <option key={animal.id} value={animal.id}>
            {animal.name}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        name="date"
        value={newAppointment.date}
        onChange={handleNewAppointment}
      />
      <button onClick={handleCreate}>Add Appointment</button>
      <br />
      <select
        name="doctor"
        value={newAppointment?.doctor?.id}
        onChange={handleUpdateChange}
      >
        <option value="" disabled>
          Select Doctor
        </option>
        {doctor.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      <select
        name="animal"
        value={newAppointment?.animal?.id}
        onChange={handleUpdateChange}
      >
        <option value="" disabled>
          Select Animal
        </option>
        {animal.map((animal) => (
          <option key={animal.id} value={animal.id}>
            {animal.name}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        name="date"
        value={updateAppointment.date}
        onChange={handleUpdateChange}
      />
      <button onClick={handleUpdate}>Update</button>
      {appointment.map((appointment) => (
        <div key={appointment.id}>
          {appointment.date}{" "}
          {doctor.find((doc) => doc.id === appointment.doctor.id)?.name}
          {animal.find((ani) => ani.id === appointment.animal.id)?.name}
          <span id={appointment.id} onClick={() => handleDelete(appointment.id)}>
              <DeleteIcon/>
            </span>
            <span onClick={() => handleUpdateBtn(appointment)}>
              <UpdateIcon/>
            </span>
        </div>
      ))}
    </div>
  );
}

export default Appointment;
