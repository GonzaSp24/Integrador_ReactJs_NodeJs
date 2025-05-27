import { useEffect, useState } from 'react';

import axios from 'axios';

const ProductoForm = ({ productoEditando, setProductoEditando, onGuardar }) => {
    const [form, setForm] = useState({ nombre: '', precio: '' });

    useEffect(() => {
        if (productoEditando) {
        setForm(productoEditando);
        } else {
        setForm({ nombre: '', precio: '' });
        }
    }, [productoEditando]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre || !form.precio) {
        alert('Todos los campos son obligatorios');
        return;
        }

        try {
        if (productoEditando) {
            await axios.put(`http://localhost:3000/productos/${form.id}`, form);
        } else {
            console.log('Enviando:', form);
            await axios.post('http://localhost:3000/productos', form);
            if (onGuardar) onGuardar();
        }

        setForm({ nombre: '', precio: '' });
        onGuardar();
        } catch (error) {
        alert('Error al guardar producto');
        console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h3>{productoEditando ? '✏️ Editar Producto' : '➕ Agregar Producto'}</h3>
        <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control"
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            className="form-control"
            />
        </div>
        <button type="submit" className="btn btn-success">
            {productoEditando ? 'Actualizar' : 'Agregar'}
        </button>
        {productoEditando && (
            <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
                setProductoEditando(null);
                setForm({ nombre: '', precio: '' });
            }}
            >
            Cancelar
            </button>
        )}
        </form>
    );
};

export default ProductoForm;
