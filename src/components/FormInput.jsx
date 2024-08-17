import React, {useEffect, useState} from 'react';
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField} from "@mui/material";
import Api from "../api/Api";
import {useNavigate} from "react-router";
import CloseIcon from '@mui/icons-material/Close';

const FormInput = () => {
    const [namaSekolah, setNamaSekolah] = useState('')
    const [alamatSekolah, setAlamatSekolah] = useState('')
    const [namaPengguna, setNamaPengguna] = useState('')
    const [alamatPengguna, setAlamatPengguna] = useState('')
    const [kategori, setKategori] = useState('')
    const [idSekolah, setIdSekolah] = useState('')
    const [allSekolah, setAllSekolah] = useState([])
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const navigate = useNavigate()

    const resetForm = () => {
        setNamaSekolah('')
        setAlamatSekolah('')
        setNamaPengguna('')
        setAlamatPengguna('')
        setKategori('')
        setIdSekolah('')
    }

    const inputNamaSekolah = (e) => {
        setNamaSekolah(e.target.value)
    }

    const inputAlamatSekolah = (e) => {
        setAlamatSekolah(e.target.value)
    }

    const inputNamaPengguna = (e) => {
        setNamaPengguna(e.target.value)
    }

    const inputAlamatPengguna = (e) => {
        setAlamatPengguna(e.target.value)
    }

    const inputKategori = (e) => {
        setKategori(e.target.value)
        console.log(e.target.value)
    }

    const inputIdSekolah = (e) => {
        setIdSekolah(e.target.value)
    }

    const submitDataSekolah = () => {
        const requestSekolah = {
            nama:namaSekolah,
            alamat:alamatSekolah
        }

        Api.postDataSekolah(requestSekolah).then(resp => {
            resetForm()
            navigate("/sekolah")
        })
    }



    const submitDataPengguna = () => {
        const requestPengguna = {
            nama:namaPengguna,
            alamat:alamatPengguna,
            kategori:kategori,
            idSekolah:idSekolah
        }

        console.log("requestSEK ==>> ",requestPengguna)
        Api.postDataPengguna(requestPengguna).then(resp => {
            resetForm()
            navigate("/")
        }).catch(e => {
            console.log("ERROR ==> ", e.response.data.status )
            setOpenSnackBar(true)
        })
    }

    const getAllSekolah = () => {
        Api.getAllSekolah().then(resp => {
            setAllSekolah(resp.data)
        })
    }

    useEffect(() => {
        getAllSekolah()
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div >
            <h2>FORM INPUT</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
                    <TextField id="outlined-basic" label="Nama Sekolah" variant="outlined" style={{width: '30rem'}}
                               value={namaSekolah} onChange={(e) => inputNamaSekolah(e)}/>
                    <TextField id="outlined-basic" label="Alamat" variant="outlined" style={{width: '30rem'}}
                               value={alamatSekolah} onChange={(e) => inputAlamatSekolah(e)}/>

                    <Button variant="contained" color="primary" style={{width: '5rem'}}
                            onClick={submitDataSekolah}>Submit</Button>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
                    <TextField id="outlined-basic" label="Nama Pengguna" variant="outlined" style={{width: '30rem'}}
                               value={namaPengguna} onChange={(e) => inputNamaPengguna(e)}/>
                    <TextField id="outlined-basic" label="Alamat Pengguna" variant="outlined" style={{width: '30rem'}}
                               value={alamatPengguna} onChange={(e) => inputAlamatPengguna(e)}/>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                            style={{width: '30rem'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Kategori"
                            value={kategori}
                            onChange={(e) => inputKategori(e)}
                        >
                            <MenuItem value={"Guru"}>Guru</MenuItem>
                            <MenuItem value={"Siswa"}>Siswa</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="pilih-sekolah">Pilih Sekolah</InputLabel>
                        <Select
                            style={{width: '30rem'}}
                            labelId="pilih-sekolah"
                            id="pilih-sekolah"
                            label="Pilih Sekolah"
                            value={idSekolah}
                            onChange={(e) => inputIdSekolah(e)}
                        >
                            {allSekolah.map(item =>
                                    <MenuItem value={item.idSekolah}>{item.nama}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" style={{width: '5rem'}}
                            onClick={submitDataPengguna}>Submit</Button>
                </div>
            </div>

            <Snackbar
                open={openSnackBar}
                autoHideDuration={1000}
                // onClose={handleClose}
                message="Sekolah belum diisi !!"
                action={action}
            />

        </div>
    );
};

export default FormInput;