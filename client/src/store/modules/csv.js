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

const BACKEND_URL = import.meta.env.VITE_VUE_APP_BACKEND_URL;

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
};
const actions = {
    //User
    async registerUser({ dispatch, commit }, user) {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/user/register`,
                user,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            localStorage.setItem("token", response.data.token);
            commit("userAdded", response.data.token);
            await dispatch("loadUser");
        } catch (err) {
            if (err.response.data.msg) {
                commit("Alert", err.response.data.msg);
            } else {
                commit("Alert", err.response.data.errors[0].msg);
            }
        }
    },

    async LoginUser({ dispatch, commit }, user) {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/user/login`,
                user,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            localStorage.setItem("token", response.data.token);
            commit("loggedIN", response.data.token);
            await dispatch("loadUser");
        } catch (err) {
            if (err.response.data.msg) {
                commit("Alert", err.response.data.msg);
            } else {
                commit("Alert", err.response.data.errors[0].msg);
            }
        }
    },

    async loadUser({ commit }) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`${BACKEND_URL}/api/user/get`);
            commit("setUser", res.data);
            router.push({ path: "/admin/dashboard" }).catch(() => { });
        } catch (err) {
            router.go(-1);
            commit("Alert", err.response.data.msg);
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
            commit("Alert", err.response.data.msg);
            toaster.warning("Oops! Something went wrong. Can't get the CSV files");
        }
    },

    async getSpecificCsvById({ commit }, id) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/csv/get/` + id);
            if (!response.ok) {
                toaster.warning("Oops! Something went wrong. Csv not found! Please Return to Dashboard page.", { duration: 10000 });
                return;
            }
            else {
                const data = await response.json();
                commit("addOneCsv", data);
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
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: state.onecsv
                })
            }
            fetch(`${BACKEND_URL}/api/csv/update/` + id, requestOptions)
                .then(res => res.body)

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    },
    async changeTitle({ dispatch, commit }, newTitle) {
        const title = newTitle;
        const temp = state.onecsv;
        const newOneCsv = { ...temp, title };
        commit("addOneCsv", newOneCsv)
        await dispatch("editCsv", temp._id)
        await dispatch("getSpecificCsvById", temp._id)
        toaster.success(`Title changed to '${title}'`);
        console.log("changeTitle", title);
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
        await dispatch("getSpecificCsvById", temp._id)
        console.log("state.user", state.user._id);
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
        await dispatch("getSpecificCsvById", temp._id)
        console.log("sortDescending", temp.title);
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
                break;
            }
        }
        if (!isNumberNotInt) {
            const newOneCsv = { ...temp, names, numbers };
            commit("addOneCsv", newOneCsv)
            await dispatch("editCsv", temp._id)
            console.log("Save add new Row");
        }
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
        localStorage.removeItem("token");
        state.error = error;
        state.Auth = false;
        state.user = {};
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
    clearNewCsvState: (state) => {
        state.newcsv = {};
        state.csvTitle = "";
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};