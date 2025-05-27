import axios from 'axios';

const ProductosList = ({ productos, setProductoEditando, onEliminar }) => {
    const eliminarProducto = async (id) => {
        try {
        await axios.delete(`http://localhost:3000/productos/${id}`);
        onEliminar(); // Llama a obtenerProductos() desde ProductosPage
        } catch (error) {
        console.error('Error al eliminar producto:', error);
        }
    };

    return (
        <div>
        <h3 className="mt-4">📦 Lista de Productos</h3>
        <table className="table table-bordered mt-4">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {productos.map((producto) => (
                <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                    <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setProductoEditando(producto)}
                    >
                    Editar
                    </button>
                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarProducto(producto.id)}
                    >
                    Eliminar
                    </button>
                </td>
                </tr>
            ))}
            {productos.length === 0 && (
                <tr>
                <td colSpan="3" className="text-center">No hay productos cargados.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export default ProductosList;
