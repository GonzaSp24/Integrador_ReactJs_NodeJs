import { useEffect, useState } from 'react';

import ExportarUsuariosPDF from '../components/Usuarios/ExportarUsuariosPDF';
import UsuarioForm from '../components/Usuarios/UsuarioForm';
import UsuariosList from '../components/Usuarios/UsuariosList';
import axios from 'axios';

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    const obtenerUsuarios = async () => {
        try {
        const res = await axios.get('http://localhost:3000/usuarios');
        setUsuarios(res.data);
        } catch (error) {
        console.error('Error al obtener usuarios:', error);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <div className="container my-5">
        <h1 className="mb-4 text-left">Gestión de Usuarios</h1>

        <div className="row">
            <div className="col-md-6 mb-4">
            <div className="card p-4">
                <h2 className="h5 mb-3 text-left">Agregar / Editar Usuario</h2>
                <UsuarioForm
                usuarioEditando={usuarioEditando}
                setUsuarioEditando={setUsuarioEditando}
                onGuardar={obtenerUsuarios}
                />
            </div>
            </div>

            <div className="col-md-6 mb-4">
            <div className="card p-4">
                <h2 className="h5 mb-3 text-left">Lista de Usuarios</h2>
                <UsuariosList
                usuarios={usuarios}
                setUsuarioEditando={setUsuarioEditando}
                onEliminar={obtenerUsuarios}
                />
            </div>
            <div className="mt-3 text-right">
                <ExportarUsuariosPDF usuarios={usuarios} />
            </div>
            </div>
        </div>
        </div>
    );
};

export default UsuariosPage;
