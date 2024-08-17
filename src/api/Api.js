import axios from "axios";

const BASE_URL_SEKOLAH = "http://localhost:8080/api/v1/sekolah/";
const BASE_URL_PENGGUNA = "http://localhost:8081/api/v1/pengguna/";
class Api {

     getAllSekolah = () => {
        return axios.get(BASE_URL_SEKOLAH+"all");
    }

    getAllPengguna = () => {
        return axios.get(BASE_URL_PENGGUNA+"all");
    }

    getSekolahDanPengguna = () => {
        return axios.get(BASE_URL_PENGGUNA+"sekolah-pengguna");
    }

    postDataSekolah = (request) => {
         return axios.post(BASE_URL_SEKOLAH+"create", request)
    }

    postDataPengguna = (request) => {
        return axios.post(BASE_URL_PENGGUNA+"create", request)
    }

}

export default new Api()