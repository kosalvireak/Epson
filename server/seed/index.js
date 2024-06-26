const mongoose = require('mongoose');
const Csv = require('../models/Csvs');
const config = require("../config/default.json");

mongoose.connect(config.mongoURI)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected.');
});


const seedCsvs = [
    {
        title: 'GithubCommit Title 1',
        upload: '16/05/2023, 22:24',
        names: ['Alice', 'Bob', 'Charlie', 'David', 'Ella', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack', 'Katie'],
        numbers: [10, 20, 30, 40, 50, 60, 321, 80, 90, 100, 110]
    },
    {
        title: 'GithubCommit Title 2',
        upload: '17/05/2023, 23:30',
        names: ['Liam', 'Olivia', 'Noah', 'Emma', 'Jackson', 'Ava', 'Lucas', 'Sophia', 'Logan', 'Mia', 'Henry'],
        numbers: [15, 23, 35, 45, 55, 65, 75, 23, 95, 105, 21]
    },
    {
        title: 'GithubCommit Title 3',
        upload: '18/05/2023, 20:15',
        names: ['Ethan', 'Oliver', 'Isabella', 'Mason', 'Sophia', 'Liam', 'Ava', 'Amelia', 'Elijah', 'Harper', 'William'],
        numbers: [12, 22, 32, 42, 52, 21, 72, 82, 92, 102, 21]
    },
    {
        title: 'GithubCommit Title 4',
        upload: '19/05/2023, 18:45',
        names: ['Benjamin', 'Charlotte', 'James', 'Lily', 'Samuel', 'Evelyn', 'Michael', 'Abigail', 'Daniel', 'Grace', 'Alexander'],
        numbers: [18, 28, 38, 48, 58, 23, 78, 21, 98, 108, 21]
    },
    {
        title: 'GithubCommit Title 5',
        upload: '20/05/2023, 17:30',
        names: ['Daniel', 'Emily', 'Ethan', 'Avery', 'Jackson', 'Charlotte', 'Logan', 'Scarlett', 'Carter', 'Chloe', 'Sebastian'],
        numbers: [13, 23, 33, 43, 53, 63, 73, 83, 93, 103, 113]
    },
    {
        title: 'GithubCommit Title 6',
        upload: '21/05/2023, 16:15',
        names: ['William', 'Harper', 'Liam', 'Emma', 'Oliver', 'Sophia', 'Benjamin', 'Ella', 'Samuel', 'Mia', 'Henry'],
        numbers: [16, 26, 36, 46, 56, 21, 76, 86, 11, 106, 116]
    },
    {
        title: 'GithubCommit Title 7',
        upload: '22/05/2023, 15:00',
        names: ['Ava', 'Noah', 'Isabella', 'James', 'Sophia', 'Ethan', 'Olivia', 'William', 'Charlotte', 'Logan', 'Evelyn'],
        numbers: [11, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111]
    },
    {
        title: 'GithubCommit Title 8',
        upload: '23/05/2023, 14:45',
        names: ['Liam', 'Amelia', 'Mason', 'Avery', 'Oliver', 'Ella', 'Lucas', 'Scarlett', 'Elijah', 'Chloe', 'Jack'],
        numbers: [14, 24, 34, 44, 54, 64, 74, 21, 94, 104, 114]
    },
    {
        title: 'GithubCommit Title 9',
        upload: '24/05/2023, 13:30',
        names: ['Sophia', 'Carter', 'Evelyn', 'Henry', 'Ava', 'Daniel', 'Lily', 'Michael', 'Grace', 'Alexander', 'Abigail'],
        numbers: [56, 27, 37, 47, 57, 34, 77, 87, 34, 107, 21]
    },
    {
        title: 'GithubCommit Title 10',
        upload: '25/05/2023, 12:15',
        names: ['Jackson', 'Chloe', 'William', 'Olivia', 'Ella', 'Mason', 'Avery', 'Liam', 'Charlotte', 'Logan', 'Emma'],
        numbers: [2, 29, 39, 12, 59, 69, 79, 21, 12, 109, 2]
    },
    {
        title: 'GithubCommit Title 11',
        upload: '26/05/2023, 11:00',
        names: ['Oliver', 'Scarlett', 'Sophia', 'Noah', 'Ethan', 'Isabella', 'Lily', 'James', 'Samuel', 'Evelyn', 'Ava'],
        numbers: [21, 31, 41, 51, 61, 12, 81, 91, 1, 21, 11]
    },
    {
        title: 'GithubCommit Title 12',
        upload: '27/05/2023, 10:45',
        names: ['Avery', 'Logan', 'Mia', 'Daniel', 'Chloe', 'William', 'Charlotte', 'Liam', 'Amelia', 'Ella', 'Henry'],
        numbers: [22, 32, 21, 52, 62, 72, 82, 21, 102, 112, 122]
    },
    {
        title: 'GithubCommit Title',
        upload: '16/05/2023, 22:24',
        names: [
            'A', 'E', 'J', 'H',
            'R', 'Y', 'W', 'F',
            'G', 'C', 'T'
        ],
        numbers: [
            1, 2, 2, 3, 4,
            4, 4, 5, 6, 8,
            9
        ]
    },
    {
        title: 'vireak',
        upload: '16/05/2023, 22:25',
        names: [
            'T', 'C', 'G', 'F',
            'R', 'Y', 'W', 'H',
            'E', 'J', 'A'
        ],
        numbers: [
            9, 8, 6, 5, 4,
            4, 4, 3, 2, 2,
            1
        ]
    },
    {
        title: 'aaa',
        upload: '16/05/2023, 22:52',
        names: [
            'Pheak02', 'Neangthary',
            'RaThida', 'NhorkSopheakna',
            'chakriyamet', 'phearaZ',
            'SokreaksaRoeurng', 'Chanjnint21',
            'Monyjenni', 'SIPHAI',
            'SOYHOK', 'heatkoemnak',
            'soumany', 'nohannah',
            'Sreynaj', 'Ponhrith',
            'kosalvireak', 'Punvireakroth',
            'Hok'
        ],
        numbers: [
            24, 25, 32, 43, 46, 51,
            54, 59, 64, 65, 73, 78,
            117, 131, 175, 296, 330, 337,
            500
        ]
    },

    {
        title: ' E2stem Student commit',
        upload: '17/05/2023, 21:32',
        names: [
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null
        ],
        numbers: [
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null
        ]
    },
    {
        title: 'GithubCommit Title',
        upload: '17/05/2023, 21:32',
        names: [
            'Lenovo', 'HP',
            'Dell', 'Apple',
            'Acer', 'ASUS',
            'Samsung'
        ],
        numbers: [
            13, 10, 20, 40,
            5, 5, 7
        ]
    },
    {
        title: ' VireakROTH',
        upload: '17/05/2023, 21:32',
        names: [
            'F', 'G', 'E', 'R',
            'T', 'Y', 'A', 'W',
            'C', 'H', 'J'
        ],
        numbers: [
            5, 6, 2, 4, 9,
            4, 1, 4, 8, 3,
            2
        ]
    },
    {
        title: 'asdfghm',
        upload: '17/05/2023, 21:32',
        names: [
            'kosalvireak', 'Monyjenni',
            'Punvireakroth', 'Chanjnint21',
            'heatkoemnak', 'SokreaksaRoeurng',
            'chakriyamet', 'NhorkSopheakna',
            'SOYHOK', 'Ponhrith',
            'nohannah', 'Pheak02',
            'soumany', 'Neangthary',
            'phearaZ', 'Sreynaj',
            'RaThida', 'SIPHAI',
            'Hok'
        ],
        numbers: [
            330, 64, 337, 59, 78, 54,
            46, 43, 73, 296, 131, 24,
            117, 25, 51, 175, 32, 65,
            500
        ]
    },
    {
        title: 'dfsgdh',
        upload: '17/05/2023, 21:32',
        names: [
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null
        ],
        numbers: [
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null
        ]
    },
    {
        title: ' E2stem Student commit',
        upload: '17/05/2023, 21:37',
        names: [
            'Lenovo', 'HP',
            'Dell', 'Apple',
            'Acer', 'ASUS',
            'Samsung'
        ],
        numbers: [
            13, 10, 20, 40,
            5, 5, 7
        ]
    }
];
// local DB
const authorId = ['650881363eabb89c4d4e598a', '6511aba9800466195f906ad4'];

// virakvary @gmail.com
// 650881363eabb89c4d4e598a

// forcodeacademy8 @gmail.com
// 6511aba9800466195f906ad4


// Cloud DB
// const authorId = ['651a94ec9a2a414670518472', '653f190f5022289cd2750413'];

// virakvary @gmail.com
// 651a94ec9a2a414670518472

// pumpkin1P@gmail.com
// 653f190f5022289cd2750413
function random() {
    return Math.floor(Math.random() * authorId.length);
}

const displayedCharts = {
    showBarChart: true,
    showLineChart: true,
    showPieChart: false,
    showDoughnutChart: false
};
const seedDB = async () => {
    await Csv.deleteMany({});
    for (let i = 0; i < seedCsvs.length; i++) {
        const csv = new Csv({
            title: seedCsvs[i].title,
            file: seedCsvs[i].file,
            upload: Date.now(),
            names: seedCsvs[i].names,
            numbers: seedCsvs[i].numbers,
            author: authorId[random()],
            displayedCharts: displayedCharts,
        })
        await csv.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
