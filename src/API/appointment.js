import axios from "axios";

export const getAppointment = async () => {
    const {data} = await axios.get ("http://localhost:8080/api/v1/appointments");
    return data;
};

export const createAppointment = async (appointment) => {
    const {data} = await axios.post(`http://localhost:8080/api/v1/appointments` , appointment);
    return data;
};

export const deleteAppointment= async (id) => {
    const {data} = await axios.delete(`http://localhost:8080/api/v1/appointments/${id}`
    );
    return data;
};

export const updateAppointmentFunc = async (appointment) => {   
    const {data} =await axios.put(`http://localhost:8080/api/v1/appointments/${appointment.id}`, appointment);
    return data;
};