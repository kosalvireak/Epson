export const tableRow1 = [
    { name: "John Doe", age: 25, email: "johndoe@example.com" },
    { name: "Jane Doe", age: 30, email: "janedoe@example.com" },
    { name: "Bob Smith", age: 45, email: "bobsmith@example.com" },
    { name: "Alice Johnson", age: 23, email: "alicejohnson@example.com" },
    { name: "David Brown", age: 34, email: "davidbrown@example.com" },
    { name: "Emily Davis", age: 27, email: "emilydavis@example.com" },
    { name: "Frank Martin", age: 50, email: "frankmartin@example.com" },
    { name: "Grace Lee", age: 29, email: "gracelee@example.com" },
    { name: "Henry Thompson", age: 38, email: "henrythompson@example.com" },
    {
        name: "Isabella Anderson",
        age: 28,
        email: "isabellaanderson@example.com",
    },
    { name: "Jacob Wilson", age: 31, email: "jacobwilson@example.com" },
    { name: "Kelly Green", age: 42, email: "kellygreen@example.com" },
];
export const tableColumn1 = [
    {
        label: "Name",
        width: "250px",
        field: "name",
    },
    {
        label: "Age",
        field: "age",
    },
    {
        label: "Email",
        width: "350px",
        field: "email",
    },
];
export const tableRow2 = [
    { name: "kosalvireak", number: "330" },
    { name: "Monyjenni", number: "64" },
    { name: "Punvireakroth", number: "337" },
    { name: "Chanjnint21", number: "59" },
    { name: "heatkoemnak", number: "78" },
    { name: "SokreaksaRoeurng", number: "54" },
    { name: "chakriyamet", number: "46" },
    { name: "NhorkSopheakna", number: "43" },
    { name: "SOYHOK", number: "73" },
    { name: "Ponhrith", number: "296" },
    { name: "nohannah", number: "131" },
    { name: "Pheak02", number: "24" },
    { name: "soumany", number: "117" },
    { name: "Neangthary", number: "25" },
    { name: "phearaZ", number: "51" },
    { name: "Sreynaj", number: "175" },
    { name: "RaThida", number: "32" },
    { name: "SIPHAI", number: "65" },
    { name: "Hok", number: "500" },
];
export const tableColumn2 = [
    {
        label: "Name",
        width: "250px",
        field: "name",
    },
    {
        label: "Number",
        field: "number",
    },
];
export const costumeTheme = {
    table: "table table-bordered table-striped table-hover",
    pagination: "pagination btn-group",
    paginationInfo: "float-start",
    dropdown: "form-select form-select-sm",
    search: "form-control form-control-sm",
};
export const paginationOptions = {
    enabled: true,
    perPage: 12,
    perPageDropdown: [5, 10, 20, 50],
};

export const barChartData = {
    labels: [
        "kosalvireak",
        "Monyjenni",
        "Punvireakroth",
        "Chanjnint21",
        "heatkoemnak",
        "SokreaksaRoeurng",
        "chakriyamet",
        "NhorkSopheakna",
        "SOYHOK",
        "Ponhrith",
        "nohannah",
        "Pheak02",
        "soumany",
        "Neangthary",
        "phearaZ",
        "Sreynaj",
        "RaThida",
        "SIPHAI",
        "Hok",
    ],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [
                330, 64, 337, 59, 78, 54, 46, 43, 73, 296, 131, 24, 117, 25, 51,
                175, 32, 65, 73,
            ],
        },
    ],
};
export const barChartData2 = {
    labels: ["Dell", "Asus", "Apple"],
    datasets: [{
        label: 'Data Two',
        backgroundColor: '#f45479',
        data: [70, 20, 10]
    }],
};
export const doughnutChartData = {
    labels: ["Roth", "Many", "Sopheak", "Vireak"],
    datasets: [
        {
            backgroundColor: ["red", "green", "#f51", "pink"],
            data: [40, 20, 10, 30],
        },
    ],
};
export
    const bubbleChartData = {
        datasets: [
            {
                label: "Data One",
                backgroundColor: "#f87979",
                data: [
                    {
                        x: 20,
                        y: 25,
                        r: 5,
                    },
                    {
                        x: 40,
                        y: 10,
                        r: 10,
                    },
                    {
                        x: 30,
                        y: 22,
                        r: 30,
                    },
                ],
            },
            {
                label: "Data Two",
                backgroundColor: "#7C8CF8",
                data: [
                    {
                        x: 10,
                        y: 30,
                        r: 15,
                    },
                    {
                        x: 20,
                        y: 20,
                        r: 10,
                    },
                    {
                        x: 15,
                        y: 8,
                        r: 30,
                    },
                ],
            },
        ],
    };

export
    const lineChartData = {
        labels: ["Mid Jan", "Jan", "Mid Feb", "Feb", "Mid Mar", "Mar"],
        datasets: [
            {
                label: "Monthly Progress",
                backgroundColor: "#f87979",
                data: [0, 5, 14, 22, 24, 27, 30],
            },
        ],
    };