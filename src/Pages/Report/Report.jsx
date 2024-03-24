import { useState, useEffect } from "react";
import { createReport, getReport, deleteReport, updateReportFunc} from "../../API/report";
import { getAppointment } from "../../API/appointment";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

function Report() {
    const [report, setReport] = useState([]);
    const [reload, setReload] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [newReport, setNewReport] = useState({
        diagnosis: "",
        price: "",
        appointment: ""
    });
    const [updateReport, setUpdateReport] = useState({
        diagnosis: "",
        price: "",
        appointment: ""
    })

    useEffect(() => {
        getReport().then((data) => {
            setReport(data);
        });
        getAppointment().then((data) => {
            setAppointments(data);
        });
    }, [reload]);

    const handleNewReport = (e) => {
        const { name, value } = e.target;
        setNewReport((prevReport) => ({
            ...prevReport,
            [name]: value
        }));
    };
    //Delete işlemi
    const handleDelete = (id) => {
      
        deleteReport(id).then(() => {
          setReload(true);
        });
      };

      //Update İşlemi
      const handleUpdate =() =>{
        updateReportFunc(updateReport).then(()=>{
          setReload(true);
        });
        
        setUpdateReport({
            diagnosis: "",
            price: "",
            appointment: ""
        });
      };

      const handleUpdateBtn =(report) =>{
    
        setUpdateReport({
            diagnosis: report.diagnosis,
            price:report.price,
            appointment:report.appointment,
        });
      };

      const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        if (name === "appointment") {
          setUpdateReport((prevReport) => ({
            ...prevReport,
            appointment:{
                id: value,
            }
          }));
        } else {
          setUpdateReport({
            ...updateReport,
            [name]: value,
          });
        }
      };


    const handleCreate = () => {
        // Seçilen hayvana ait appointment'ın id'sini al
        const selectedAppointmentId = newReport.appointment;
        
        // Yeni rapor objesini oluştur
        const newReportData = {
            diagnosis: newReport.diagnosis,
            price: newReport.price,
            appointmentId: selectedAppointmentId
        };

        // Raporu oluştur ve POST isteğini gönder
        createReport(newReportData).then(() => {
            setReload(!reload);
        });

        // Yeni rapor formunu sıfırla
        setNewReport({
            diagnosis: "",
            price: "",
            appointment: ""
        });
    };

    return (
        <div>
            <h3>Reports</h3>
            <div>
                <div>
                    <input 
                        type="text"
                        placeholder="Diagnosis"
                        name="diagnosis"
                        value={newReport.diagnosis}
                        onChange={handleNewReport} />
                    <input 
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={newReport.price}
                        onChange={handleNewReport} />
                    <select 
                        name="appointment" 
                        value={newReport.appointment}
                        onChange={handleNewReport}>
                        <option value="" disabled>Select Appointment</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>
                                {appointment.animal.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleCreate}>Add Report</button>
                </div>
                <div>
                    <input 
                        type="text"
                        placeholder="Diagnosis"
                        name="diagnosis"
                        value={updateReport.diagnosis}
                        onChange={handleUpdateChange} />
                    <input 
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={updateReport.price}
                        onChange={handleUpdateChange} />
                    <select 
                        name="appointment" 
                        value={updateReport.appointment}
                        onChange={handleUpdateChange}>
                        <option value="" disabled>Select Appointment</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>
                                {appointment.animal.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleUpdate}>Update Report</button>
                </div>
                {report.map((report) => (
                    <div key={report.id}>
                        {report.diagnosis} {report.price}
                        <span id={report.id} onClick={() => handleDelete(report.id)}>
                        <DeleteIcon/>
                        </span>
                        <span onClick={() => handleUpdateBtn(report)}>
                        <UpdateIcon/>
                    </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Report;
