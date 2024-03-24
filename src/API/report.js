import axios from "axios";

export const getReport = async () =>{
    const {data} = await axios.get ("http://localhost:8080/api/v1/reports");
    return data;
};

export const createReport = async (report) =>{
    const {data} = await axios.post(`http://localhost:8080/api/v1/reports`
    , report);
    return data;
};

export const deleteReport= async (id) => {
    const {data} = await axios.delete(`http://localhost:8080/api/v1/reports/${id}`
    );
    return data;
};

export const updateReportFunc = async (report) => {   
    const {data} =await axios.put(`http://localhost:8080/api/v1/reports/${report.id}`, report);
    return data;
};