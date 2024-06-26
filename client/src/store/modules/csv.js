import { createToaster } from "@meforma/vue-toaster";
import Papa from "papaparse";
import axios from "axios";
import { setAuthToken } from "../../utils";
import router from "../../router/index";

const toaster = createToaster({
    position: "bottom-left",
    duration: 4000,
    max: 2
});

const BACKEND_URL = 'http://localhost:3000'

const state = {
    //User
    user: "",
    Auth: false,
    loading: false,
    error: null,
    token: localStorage.getItem("token"),

    //Csv
    allcsvs: [],
    onecsv: {},
    newcsv: {},
    csvTitle: "",
    displayedCharts: {
        showBarChart: true,
        showLineChart: false,
        showPieChart: true,
        showDoughnutChart: false
    },
    allCsvsEmpty: false,
    isSendingRequest: false,
    dataInsight: {}

};
const getters = {
    //User
    Errors: state => state.error,
    User: state => state.user,
    Auth: state => state.Auth,

    //Csv
    AllCsvs: state => state.allcsvs,
    OneCsv: state => state.onecsv,
    CsvTitle: state => state.csvTitle,
    NewCsv: state => state.newcsv,
    VueGoodTableData: state => state.vuegoodtabledata,
    AllCsvsEmpty: state => state.allCsvsEmpty,
    DisplayedCharts: state => state.displayedCharts,
    IsSendingRequest: state => state.isSendingRequest,
    DataInsights: state => state.dataInsight,

};
const actions = {
    //User
    async registerUser({ dispatch, commit }, user) {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/user/register`,
                user,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            if (res.data.status == true) {
                localStorage.setItem("token", res.data.token);
                commit("userAdded", res.data.token);
                await dispatch("loadUser");
            } else {
                commit("Alert", `${res.data.msg}`);
            }
            commit("setIsSendingRequest", false);
        } catch (err) {
            if (err) {
                commit("Alert", err.message);
                toaster.warning(err.message);
            } else {
                toaster.warning("Server Error");
            }
        }
    },

    async LoginUser({ dispatch, commit }, user) {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/user/login`,
                user,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            if (res.data.status == true) {
                localStorage.setItem("token", res.data.token);
                commit("loggedIN", res.data.token);
                await dispatch("loadUser");
            } else {
                commit("Alert", `${res.data.msg}`);
            }
            commit("setIsSendingRequest", false);
        } catch (err) {
            if (err.res.data.msg) {
                commit("Alert", err.res.data.msg);
            } else {
                commit("Alert", "Login Error");
                toaster.warning("Login Error");
            }
        }
    },

    async loadUser({ commit }, isChangeProfile) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`${BACKEND_URL}/api/user/get`);
            commit("setUser", res.data);
            if (isChangeProfile) {
                return;
            }
            router.push({ path: "/admin/dashboard" }).catch(() => { });
        } catch (err) {
            router.go(-1);
            commit("Alert", err.response.data.msg);
        }
    },
    async resetPassword({ commit }, user) {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/user/resetPassword`,
                user,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            if (res.data.status == true) {
                toaster.success(`${res.data.msg}`);
            } else {
                commit("Alert", `${res.data.msg}`);
            }
            commit("setIsSendingRequest", false);
            console.log(res);
        } catch (err) {
            commit("Alert", "Server Error");
        }
    },
    async updateUser({ commit, dispatch }, user) {
        let User = new FormData();
        User.append('name', user.name);
        User.append('email', user.email)
        User.append('oldpassword', user.oldpassword);
        User.append('newpassword', user.newpassword);
        var imageFile = user.image;
        if (imageFile) {
            User.append('image', imageFile);
        }
        const id = state.user._id
        try {
            const res = await axios.put(`${BACKEND_URL}/api/user/update/` + id,
                User,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

            if (res.data.status == true) {
                await dispatch("loadUser", true);
                toaster.success(res.data.msg);
            } else {
                toaster.warning(res.data.msg);

            }
            commit("setIsSendingRequest", false);
        }
        catch (err) {
            if (err.response.data.msg) {
                commit("Alert", err.response.data.msg);
            } else {
                commit("Alert", "Login Error");
                toaster.warning("Login Error");
            }
        }
    },

    setAlert({ commit }, error) {
        commit("Alert", error);
    },

    //Csv
    async handleFileChange({ dispatch, commit }, event) {
        //get file, fileName, and uploadDate from event
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                const names = results.data.map((item) => item.name);
                const numbers = results.data.map((item) => parseInt(item.number));
                names.pop();
                numbers.pop();
                const newCsv = {
                    title: state.csvTitle,
                    names,
                    numbers,
                };
                commit("addNewCsv", newCsv);
            },
        });
    },
    async handleSubmit({ dispatch, commit }) {
        const csv = state.newcsv;
        try {
            const response = await axios.post(`${BACKEND_URL}/api/csv/new`,
                csv,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            );
            const data = await response.data;
            toaster.success(data.msg);
        } catch (error) {
            toaster.warning(error.response.data.msg);
            console.log(error);
        }
        commit("clearNewCsvState");
        await dispatch("getAllCsvs");

    },
    async getAllCsvs({ commit }) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const response = await axios.get(`${BACKEND_URL}/api/csv/get`);
            const data = await response.data;
            commit("addAllCsvs", data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                commit("setAllCsvsEmpty");
                toaster.warning(err.response.data.msg);
            } else {
                commit("Alert", "Oops! Something went wrong. Can't get the CSV files");
                toaster.warning("Oops! Something went wrong. Can't get the CSV files");
            }
        }
    },

    async getSpecificCsvById({ dispatch, commit }, id) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/csv/get/` + id);
            if (!response.ok) {
                toaster.warning("Oops! Something went wrong. Csv not found! Please Return to Dashboard page.", { duration: 10000 });
                return;
            }
            else {
                const data = await response.json();
                commit("addOneCsv", data);
                dispatch("getDataInsight");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    },
    async deleteCsv({ dispatch, commit }, { id, authorId }) {
        // id is belong to csv
        // authorId is form csv.author
        if (state.user._id != authorId) {
            toaster.warning(`Sorry You are not the owner of this file. Hence You can't delete.`, { duration: 10000 });
        }
        else {
            try {
                const res = await axios.delete(`${BACKEND_URL}/api/csv/delete/${id}`)
                const data = await res.data;
                await dispatch("getAllCsvs");
                console.log("deleteCsv", data.msg);
                toaster.success(data.msg);
            } catch (err) {
                commit("Alert", err.response.data.msg);
                toaster.warning(err.response.data.msg);
            };
        }
    },

    async editCsv({ dispatch, commit }, id) {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/csv/update/${id}`, {
                data: state.onecsv
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (res.data.status == true) {
                commit("addOneCsv", res.data.csv);
                toaster.success('Change has been made.');
            }
            else {
                toaster.warning(res.data.msg);
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    },
    async changeTitle({ dispatch, commit }, newTitle) {
        const title = newTitle;
        const temp = state.onecsv;
        const newOneCsv = { ...temp, title };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
        toaster.success(`Title changed to '${title}'`);
        console.log("changeTitle", title);
    },
    async onChangeDisplayedBarChart({ dispatch, commit }) {
        const temp = state.onecsv;
        state.onecsv.displayedCharts.showBarChart = !state.onecsv.displayedCharts.showBarChart;
        const newOneCsv = { ...temp };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
    },
    async onChangeDisplayedLineChart({ dispatch, commit }) {
        const temp = state.onecsv;
        state.onecsv.displayedCharts.showLineChart = !state.onecsv.displayedCharts.showLineChart;
        const newOneCsv = { ...temp };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
    },
    async onChangeDisplayedPieChart({ dispatch, commit }) {
        const temp = state.onecsv;
        state.onecsv.displayedCharts.showPieChart = !state.onecsv.displayedCharts.showPieChart;
        const newOneCsv = { ...temp };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
    },
    async onChangeDisplayedDoughnutChart({ dispatch, commit }) {
        const temp = state.onecsv;
        state.onecsv.displayedCharts.showDoughnutChart = !state.onecsv.displayedCharts.showDoughnutChart;
        const newOneCsv = { ...temp };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
    },
    async sortAscending({ dispatch, commit }) {
        const temp = state.onecsv;
        const data = temp.numbers.map((number, index) => ({
            name: temp.names[index],
            number,
        }));
        data.sort((a, b) => a.number - b.number);
        const names = data.map(({ name }) => name);
        const numbers = data.map(({ number }) => number);
        const newOneCsv = { ...temp, names, numbers };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
    },
    async sortDescending({ dispatch, commit }) {
        const temp = state.onecsv;
        const data = temp.numbers.map((number, index) => ({
            name: temp.names[index],
            number,
        }));
        data.sort((a, b) => b.number - a.number);
        const names = data.map(({ name }) => name);
        const numbers = data.map(({ number }) => number);
        const newOneCsv = { ...temp, names, numbers };

        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
    },
    async deleteRow({ dispatch, commit }, rowIndex) {
        const temp = state.onecsv;
        const names = temp.names;
        const oldNumbers = temp.numbers;
        const deleteName = names.splice(rowIndex, 1);
        const numbers = [...oldNumbers.slice(0, rowIndex), ...oldNumbers.slice(rowIndex + 1)];
        toaster.success(`Successfully deleted row "${deleteName}" from the Column.`);
        const newOneCsv = { ...temp, names, numbers };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
        console.log("deleteRow", rowIndex);
    },
    async createCsvTable({ dispatch, commit }, array) {
        const names = [];
        const numbers = [];
        const title = "Untitled document";
        var isNumberNotInt = false;

        for (var i = 0; i < array.length; i++) {
            var num = parseInt(array[i].number);

            if (array[i].name == "") {
                commit("Alert", "Your column 'Name' can't be blank.");
                toaster.warning("Your column 'Name' can't be blank.");
                isNumberNotInt = true;
                return false;
            }

            if (Number.isInteger(num)) {
                numbers.push(num);
                names.push(array[i].name.toString());
            }
            else {
                commit("Alert", "Your column 'Number' must be all number and can't be blank.");
                toaster.warning("Your column 'Number' must be all number and can't be blank.");
                isNumberNotInt = true;
                return false;
            }
        }
        if (!isNumberNotInt) {
            const newCsv = {
                title,
                names,
                numbers,
            };
            await commit("addNewCsv", newCsv);
            await dispatch("handleSubmit");
            return true;
        }
    },
    async saveTableData({ dispatch, commit }, array) {
        const temp = state.onecsv;
        const names = [];
        const numbers = [];
        var isNumberNotInt = false;
        for (var i = 0; i < array.length; i++) {
            var num = parseInt(array[i].number);
            if (Number.isInteger(num)) {
                numbers.push(num);
                names.push(array[i].name.toString());
            }
            else {
                commit("Alert", "Your column 'Number' must be all number.");
                toaster.warning("Your column 'Number' must be all number.");
                isNumberNotInt = true
            }
        }

        if (!isNumberNotInt) {
            const newOneCsv = { ...temp, names, numbers };
            commit("addOneCsv", newOneCsv)
            await dispatch("editCsv", temp._id)
            console.log("saveTableData");
        }
        else {
            console.log("Your column 'Number' must be all number.");
        }
    },
    async findMedian({ commit, dispatch }) {
        const { numbers } = state.onecsv;
        const a = [...numbers];
        const n = a.length;

        // Sort the array numerically
        a.sort((x, y) => x - y);

        if (n % 2 !== 0) {
            return a[Math.floor(n / 2)];
        }

        return (a[n / 2 - 1] + a[n / 2]) / 2;
    },
    async getDataInsight({ commit, dispatch }) {
        commit("ClearDataInsight");

        const numbers = state.onecsv.numbers;

        const length = numbers.length;
        const minimum = Math.min(...numbers);
        const maximum = Math.max(...numbers);

        const sum = numbers.reduce((partialSum, a) => partialSum + a, 0);
        const average = Math.round(sum / length);

        const median = await dispatch("findMedian");
        // const median = 5;
        const tempDataInsight = { sum, average, minimum, median, maximum };
        commit("SetDataInsight", tempDataInsight);


    },
};

const mutations = {
    // User 
    userAdded: (state, token) => {
        state.token = token;
    },
    loggedIN: (state, token) => {
        state.token = token;
    },
    setUser: (state, user) => {
        (state.Auth = true), (state.user = user);
    },
    Logout: state => {
        router.push({ path: "/login" });
        localStorage.removeItem("token");
        (state.Auth = false), (state.user = {}), (state.token = null);
    },
    Alert: (state, error) => {
        state.error = error;
        setTimeout(
            function () {
                state.error = null;
            }.bind(this),
            3000
        );
    },
    ClearAlert: state => (state.error = null),
    addAllCsvs: (state, allcsvs) => {
        state.allcsvs = allcsvs;
    },
    //Csv
    addOneCsv: (state, onecsv) => {
        state.onecsv = onecsv;
    },
    addNewCsv: (state, newcsv) => {
        state.newcsv = newcsv;
    },
    addCsvTitle: (state, csvtitle) => {
        state.csvTitle = csvtitle;
    },
    addDisplayedCharts: (state, displayedCharts) => {
        state.displayedCharts = displayedCharts;
    },
    clearNewCsvState: (state) => {
        state.newcsv = {};
        state.csvTitle = "";
    },
    setAllCsvsEmpty: (state) => {
        state.allCsvsEmpty = true;
    },
    setIsSendingRequest: (state, bool) => {
        state.isSendingRequest = bool;
    },
    ClearDataInsight: (state) => {
        state.dataInsight = {};
    },
    SetDataInsight: (state, data) => {
        state.dataInsight = data;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};