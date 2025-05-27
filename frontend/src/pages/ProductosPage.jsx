import { useEffect, useState } from 'react';

import ExportarProductosPDF from '../components/Productos/ExportarProductosPDF';
import ProductoForm from '../components/Productos/ProductoForm';
import ProductosList from '../components/Productos/ProductosList';
import axios from 'axios';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);

    const obtenerProductos = async () => {
        const res = await axios.get('http://localhost:3000/productos');
        setProductos(res.data);
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <>
        <ProductoForm
            productoEditando={productoEditando}
            setProductoEditando={setProductoEditando}
            onGuardar={obtenerProductos}
        />
        <ExportarProductosPDF productos={productos} />
        <ProductosList
            productos={productos}
            setProductoEditando={setProductoEditando}
            onEliminar={obtenerProductos}
        />
        </>
    );
};

export default ProductosPage;
