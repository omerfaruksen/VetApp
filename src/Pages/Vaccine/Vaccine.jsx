import { getVaccine, deleteVaccine, createVaccine } from "../../API/vaccine"
import { getAnimals } from "../../API/animal";
import { useState, useEffect } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { getReport } from "../../API/report";

function Vaccine() {
    const [vaccine, setVaccine] = useState([]);
    const [reload, setReload] = useState(true);
    const [animal, setAnimal] = useState([]);
    const [reportList, setReportList] = useState([]);
    const [newVaccine, setNewVaccine] = useState({
        name: "",
        code: "",
        protection_start_date: "",
        protection_finish_date: "",
        animal: "",
        reportId: "" // Yeni eklenen rapor ID alanı
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
            protection_start_date: "",
            protection_finish_date: "",
            animal: "",
            reportId: "" // Yeni eklenen rapor ID alanını sıfırla
        })
    };

    const handleNewVaccine = (e) => {
        const { name, value } = e.target;
        setNewVaccine((prevVaccine) => ({
            ...prevVaccine,
            [name]: name === "animal" ? { id: value } : value
        }));
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
                    name="protection_start_date"
                    placeholder="Protection Start Date"
                    value={newVaccine.protection_start_date}
                    onChange={handleNewVaccine} />
                <input type="date"
                    name="protection_finish_date"
                    placeholder="Protection Finish Date"
                    value={newVaccine.protection_finish_date}
                    onChange={handleNewVaccine} />
                <select name="animal"
                    value={newVaccine.animal}
                    onChange={handleNewVaccine}>
                    <option value="">Select Animal</option>
                    {animal.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name}
                        </option>
                    ))}
                </select>
                <select name="reportId" // Rapora ait id alanı
                    value={newVaccine.reportId}
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
                {vaccine.map((vaccine) => (
                    <div id={vaccine.id} key={vaccine.id}>
                        {vaccine.name} {vaccine.code}
                        {vaccine.protection_start_date}
                        {vaccine.protection_finish_date}
                        <span id={vaccine.id} onClick={() => handleDelete(vaccine.id)}>
                            <DeleteIcon />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Vaccine;
