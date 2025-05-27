import { useEffect, useState } from 'react';

import axios from 'axios';

const UsuarioForm = ({ usuarioEditando, setUsuarioEditando, onGuardar }) => {
    const [form, setForm] = useState({ nombre: '', email: '', edad: '' });

    useEffect(() => {
        if (usuarioEditando) {
            setForm(usuarioEditando);
        } else {
            setForm({ nombre: '', email: '', edad: '' });
        }
    }, [usuarioEditando]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre || !form.email || !form.edad) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            if (usuarioEditando) {
                await axios.put(`http://localhost:3000/usuarios/${form.id}`, form);
            } else {
                await axios.post('http://localhost:3000/usuarios', form);
            }

            setForm({ nombre: '', email: '', edad: '' });
            setUsuarioEditando(null);
            if (onGuardar) onGuardar();
        } catch (error) {
            alert('Error al guardar usuario');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h3 className="mb-3 text-start">
                {usuarioEditando ? '✏️ Editar Usuario' : '➕ Agregar Usuario'}
            </h3>

            <div className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Ingrese el nombre"
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="correo@ejemplo.com"
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Edad</label>
                    <input
                        type="number"
                        name="edad"
                        value={form.edad}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Edad"
                        min="0"
                    />
                </div>
            </div>

            <div className="mt-3 text-start">
                <button type="submit" className="btn btn-success me-2">
                    {usuarioEditando ? 'Actualizar' : 'Agregar'}
                </button>
                {usuarioEditando && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setUsuarioEditando(null);
                            setForm({ nombre: '', email: '', edad: '' });
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default UsuarioForm;
