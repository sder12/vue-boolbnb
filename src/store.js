import { reactive } from "vue";
export const store = reactive({
    apiUrl: "http://127.0.0.1:8000",
    coordsInput: {},
    addressInput: '',
    services: [],
    searchedApartments: [],
    keyTomTom: "QEZMPbAxyM5B51twR2BRzWuWxSUDiBYg"
});