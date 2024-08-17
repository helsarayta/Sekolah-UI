import logo from './logo.svg';
import './App.css';
import TableComponent from "./components/TableComponent";
import {Route, Routes} from "react-router";
import Api from "./api/Api";
import {useEffect, useState} from "react";
import FormInput from "./components/FormInput";

function App() {
    const [rowsSekolah, setRowsSekolah] = useState([])
    const [rowsPengguna, setRowsPengguna] = useState([])
    const [rowsPenggunaSekolah, setRowsPenggunaSekolah] = useState([])

    const getSekolah = () => {
        Api.getAllSekolah().then(resp => {
            setRowsSekolah(resp.data)
        })
    }

    const getAllPengguna = () => {
        Api.getAllPengguna().then(resp => {
            setRowsPengguna(resp.data)
        })
    }

    const getSekolahDanPengguna = () => {
        Api.getSekolahDanPengguna().then(resp => {
            setRowsPenggunaSekolah(resp.data)
        })
    }


    useEffect(() => {
        getSekolah()
        getAllPengguna()
        getSekolahDanPengguna()
    }, []);

    return (
    <div className="App"
         style={{width:'80%',
             margin:'0 auto',
             padding:'20px',
             backgroundColor: '#f0f0f0',
             borderRadius: '8px',
             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
      <Routes>
        <Route
            path="/sekolah"
            element={<TableComponent
            title={"Data Sekolah"}
            rows={rowsSekolah}
            tableName={"sekolah"}/>}
        />
          <Route
              path="/pengguna"
              element={<TableComponent
                  title={"Data Guru dan Siswa"}
                  rows={rowsPengguna}
                  tableName={"pengguna"}/>}
          />
          <Route
              exact
              path="/"
              element={<TableComponent
                  title={"Data Sekolah dan Pengguna"}
                  rows={rowsPenggunaSekolah}
                  tableName={null}/>}
          />
          <Route
              exact
              path="/form"
              element={<FormInput />}
          />
      </Routes>


    </div>
  );
}

export default App;
