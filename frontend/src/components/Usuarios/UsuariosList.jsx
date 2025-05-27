import axios from 'axios';

const UsuariosList = ({ usuarios, setUsuarioEditando, onEliminar }) => {
    const eliminarUsuario = async (id) => {
        if (window.confirm('¿Estás seguro que quieres eliminar este usuario?')) {
        try {
            await axios.delete(`http://localhost:3000/usuarios/${id}`);
            onEliminar(); // Actualiza la lista en el padre
        } catch (error) {
            alert('Error al eliminar usuario');
            console.error(error);
        }
        }
    };

    return (
        <div>
        <h3 className="mb-4 text-start">📋 Lista de Usuarios</h3>

        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
                <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th style={{ minWidth: '130px' }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.edad}</td>
                    <td>
                        <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setUsuarioEditando(usuario)}
                        >
                        Editar
                        </button>
                        <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarUsuario(usuario.id)}
                        >
                        Eliminar
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="4" className="text-center fst-italic text-muted">
                    No hay usuarios registrados.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default UsuariosList;
