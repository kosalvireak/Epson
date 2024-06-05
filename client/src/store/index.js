import { createStore } from 'vuex'
import csv from './modules/csv'

const store = createStore({
    modules: {
        csv,
    },
})

export default store