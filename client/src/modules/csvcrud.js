import { ref, computed, reactive } from 'vue'
import Papa from "papaparse";
import { useRoute } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "bottom-left",
    duration: 4000,
    max: 2
});
const getCsvs = () => {

    const route = useRoute();
    const csvId = computed(() => route.params.id)
    const csv = ref({});

    const userId = ref({});
    const state = ref({
        emptyString: "",
        lineChartData: "",
        csvTitle: "",
        newCsv: {},
        csvs: {},
        data: {
            labels: [],
            datasets: [
                {
                    label: "",
                    backgroundColor: "#f87979",
                    data: [],
                },
            ],
        },
        tableColumn: [],
        tableRow: [],
        editTableColumns: [],
        editTableColumnNumbers: [],
        editTableData: []

    })
    const generateIndexArray = (value) => {
        const indexArray = [];
        for (let i = 1; i <= value; i++) {
            indexArray.push(i);
        }
        return indexArray;
    }


    const getTableData = (newValue) => {
        const names = newValue.names;
        const numbers = newValue.numbers;

        // Create an array of objects to represent the table rows
        const tableRows = names.map((name, index) => ({
            id: index,
            name,
            number: numbers[index],
        }));

        // Create an array of object to represent table columns
        const tableColumns = [{
            label: "Name",
            field: "name",
        },
        {
            label: "Number",
            field: "number",
        },];



        const columnIndex = generateIndexArray(tableRows.length);

        state.value.editTableColumns = ["ID", "Name", "Number"];
        state.value.editTableColumnNumbers = columnIndex;
        state.value.editTableData = tableRows;


        state.value.tableColumn = tableColumns;
        state.value.tableRow = tableRows;
        console.log("state.value.tableColumn", state.value.tableColumn);
        console.log("state.value.tableRow", state.value.tableRow);
        // console.log("state.value.editTableData", state.value.editTableData);
    }

    const getBarChartData = async (newValue) => {
        state.value.lineChartData = {
            labels: newValue.names,
            datasets: [
                {
                    label: newValue.Title,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
                    hoverBorderColor: "rgba(54, 162, 235, 1)",
                    data: newValue.numbers,
                },
            ],
        };
    }

    // done
    const GetAllCsvs = async () => {
        try {
            await fetch("http://localhost:3000/csv/get")
                .then((res) => res.json())
                .then((data) => {
                    state.value.csvs = data;
                })
            // console.log("state.value.csvs", state.value.csvs);
        } catch (error) {
            console.log(error);
            toaster.warning("Oops! Something went wrong. Can't display the csv files");
        }
    }
    // done
    const handleFileChange = (event) => {
        //get file, fileName, and uploadDate from event
        const file = event.target.files[0];
        const fileName = event.target.files[0].name;
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                const names = results.data.map((item) => item.name);
                const numbers = results.data.map((item) => parseInt(item.number));
                names.pop();
                numbers.pop();
                state.value.newCsv = {
                    title: state.value.csvTitle,
                    file: fileName,
                    names,
                    numbers,
                };
                // console.log(state.value.newCsv);

            },
        });
    }
    // done
    const handleSubmit = async () => {

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: state.value.newCsv
            })
        }
        try {
            const response = await fetch("http://localhost:3000/csv/new", requestOptions)
            const data = await response.json();
            toaster.success(data.message);
        } catch (error) {
            console.log(error);
            throw error;
        }
        GetAllCsvs();
    }
    // done
    const deleteCsv = async (_id) => {
        try {
            const response = await fetch("http://localhost:3000/csv/delete/" + _id, { method: "DELETE" })
            const data = await response.json();
            console.log(data);
            toaster.success(`Successfully delete ${data.title}. Please reload the page to see the new changes.`);
        } catch (err) { console.log(err) };
    }
    // done
    const editCsv = async (_id) => {
        const tempcsv = csv.value;
        console.log("editCsv");
        delete tempcsv._id;
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: tempcsv
            })
        }
        try {
            fetch("http://localhost:3000/csv/update/" + _id, requestOptions)
                .then(res => res.body)
                .then(res => {
                    GetAllCsvs();
                })
        } catch (error) { console.log(error) }
    }

    // done
    const GetSpecificCsvById = async (id) => {
        try {
            const response = await fetch("http://localhost:3000/csv/get/" + id);
            if (!response.ok) {
                toaster.warning("Oops! Something went wrong. Csv not found! Please Return to Dashboard page.", { duration: 10000 });
                return;
            }
            else {
                csv.value = await response.json();
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    // done
    const sortAscending = (csvData) => {
        const data = csvData.numbers.map((number, index) => ({
            name: csvData.names[index],
            number,
        }));
        data.sort((a, b) => a.number - b.number);
        const names = data.map(({ name }) => name);
        const numbers = data.map(({ number }) => number);
        csv.value = { ...csvData, names, numbers };
    };
    // done
    const sortDescending = (csvData) => {
        const data = csvData.numbers.map((number, index) => ({
            name: csvData.names[index],
            number,
        }));
        data.sort((a, b) => b.number - a.number);
        const names = data.map(({ name }) => name);
        const numbers = data.map(({ number }) => number);
        csv.value = { ...csvData, names, numbers };
    };
    // done
    const changeTitle = async (newValue) => {
        const title = newValue;
        const temp = csv.value;
        console.log("changeTitle")
        csv.value = { ...temp, title };
    }
    // done
    const deleteRow = async (deleteIndex) => {
        const temp = csv.value;
        const names = temp.names;
        const oldNumbers = temp.numbers;
        const deleteName = names.splice(deleteIndex, 1);
        const numbers = [...oldNumbers.slice(0, deleteIndex), ...oldNumbers.slice(deleteIndex + 1)];
        toaster.success(`Successfully deleted row "${deleteName}" from the Column.`);
        csv.value = { ...temp, names, numbers };
    }
    return {
        csv,
        csvId,
        getBarChartData,
        GetSpecificCsvById,
        getTableData,
        deleteRow,
        state,
        GetAllCsvs,
        handleFileChange,
        handleSubmit,
        deleteCsv,
        editCsv,
        sortAscending,
        sortDescending,
        changeTitle,
    }
}
export default getCsvs

