import { getVaccine, deleteVaccine, createVaccine,updateVaccineFunc } from "../../API/vaccine"
import { getAnimals } from "../../API/animal";
import { useState, useEffect } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { getReport } from "../../API/report";
import UpdateIcon from '@mui/icons-material/Update';

function Vaccine() {
    const [vaccine, setVaccine] = useState([]);
    const [reload, setReload] = useState(true);
    const [animal, setAnimal] = useState([]);
    const [reportList, setReportList] = useState([]);
    const [newVaccine, setNewVaccine] = useState({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animal: { id: "" },
        reportId: ""
    })

    useEffect(() => {
        getVaccine().then((data) => {
            setVaccine(data);
        });
        getAnimals().then((data) => {
            setAnimal(data);
        });
        getReport().then((data) => {
            setReportList(data);
        });
    }, [reload]);

    const handleDelete = (id) => {
        deleteVaccine(id).then(() => {
            setReload(true);
        });
    };

    const handleCreate = () => {

        createVaccine(newVaccine).then(() => {
            setReload(true);
        });
        setNewVaccine({
            name: "",
            code: "",
            protectionStartDate: "",
            protectionFinishDate: "",
            animal: { id: "" },
            reportId: "" // Yeni eklenen rapor ID alanını sıfırla
        })
        
        console.log(newVaccine)
    };
    const [updateVaccine, setUpdateVaccine]= useState({
            name: "",
            code: "",
            protectionStartDate: "",
            protectionFinishDate: "",
            animal: { id: "" },
            reportId: "" 
    });

    const handleUpdate =() => {
        updateVaccineFunc(updateVaccine).then(() =>{
            setReload(true);
        });
        setUpdateVaccine({
            name: "",
            code: "",
            protectionStartDate: "",
            protectionFinishDate: "",
            animal: { id: "" },
            reportId: "" 
        })
    }

    const handleUpdateBtn = (vaccine) =>{
        setUpdateVaccine({
            name: vaccine.name,
            code: vaccine.code,
            protectionStartDate: vaccine.protectionStartDate,
            protectionFinishDate: vaccine.protectionFinishDate,
            animal: vaccine.animal,
            reportId: vaccine.reportId 
        })
    };
    const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        if (name === "animal") {
          setUpdateVaccine((prevVaccine) => ({
            ...prevVaccine,
            animal: {
              id: value,
            },
          }));
        } else {
            setUpdateVaccine({
            ...updateVaccine,
            [name]: value,
          });
        }
      };


    const handleNewVaccine = (e) => {
        const { name, value } = e.target;
        console.log("newVacciedesin")
        setNewVaccine((prevVaccine) => ({
            ...prevVaccine,
            [name]: name === "animal" ? { id: value } : value
        }));
        console.log(newVaccine)
    };
    

    return (
        <div>
            <h3>Vaccine</h3>
            <div>
                <input type="text"
                    name="name"
                    placeholder="Name"
                    value={newVaccine.name}
                    onChange={handleNewVaccine} />
                <input type="text"
                    name="code"
                    placeholder="Code"
                    value={newVaccine.code}
                    onChange={handleNewVaccine} />
                <input type="date"
                    name="protectionStartDate"
                    placeholder="Protection Start Date"
                    value={newVaccine.protectionStartDate}
                    onChange={handleNewVaccine} />
                <input type="date"
                    name="protectionFinishDate"
                    placeholder="Protection Finish Date"
                    value={newVaccine.protectionFinishDate}
                    onChange={handleNewVaccine} />

                <select name="animal"
                    value={newVaccine?.animal?.id}
                    onChange={handleNewVaccine}>
                    <option value="">Select Animal</option>
                    {animal.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name}
                        </option>
                    ))}
                </select>
                <select name="reportId" // Rapora ait id alanı
                    value={newVaccine?.reportId}
                    onChange={handleNewVaccine}>
                    <option value="">Select Report</option>
                    {reportList.map((report) => (
                        <option key={report.id} value={report.id}>
                            {report.diagnosis}
                        </option>
                    ))}
                </select>
                <button onClick={handleCreate}>Add Vaccine</button>
            </div>
            <div>
            <input type="text"
                    name="name"
                    placeholder="Name"
                    value={newVaccine.name}
                    onChange={handleUpdateChange} />
                <input type="text"
                    name="code"
                    placeholder="Code"
                    value={newVaccine.code}
                    onChange={handleUpdateChange} />
                <input type="date"
                    name="protectionStartDate"
                    placeholder="Protection Start Date"
                    value={newVaccine.protectionStartDate}
                    onChange={handleUpdateChange} />
                <input type="date"
                    name="protectionFinishDate"
                    placeholder="Protection Finish Date"
                    value={newVaccine.protectionFinishDate}
                    onChange={handleUpdateChange} />
                <select name="animal"
                    value={newVaccine.animal}
                    onChange={handleUpdateChange}>
                    <option value="">Select Animal</option>
                    {animal.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name}
                        </option>
                    ))}
                </select>
                <select name="reportId" // Rapora ait id alanı
                    value={newVaccine?.reportId}
                    onChange={handleUpdateChange}>
                    <option value="">Select Report</option>
                    {reportList.map((report) => (
                        <option key={report.id} value={report.id}>
                            {report.diagnosis}
                        </option>
                    ))}
                </select>
                <button onClick={handleUpdate}>Update Vaccine</button>
            </div>
            <div>
                <h3>Vaccines</h3>
                {vaccine.map((vaccine) => (
                    <div id={vaccine.id} key={vaccine.id}>
                        {vaccine.name} {vaccine.code}
                        {vaccine.protectionStartDate}
                        {vaccine.protectionFinishDate}
                        <span id={vaccine.id} onClick={() => handleDelete(vaccine.id)}>
                            <DeleteIcon />
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

export default Vaccine;
