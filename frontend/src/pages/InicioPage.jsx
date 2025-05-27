import { Link } from 'react-router-dom';

const InicioPage = () => {
    return (
        <div className="inicio-container">
        <h1 className="mb-5">🛒 Bienvenido a la App Fullstack</h1>
        <div className="botones-inicio">
            <Link to="/usuarios" className="btn btn-primary btn-lg">
            Gestión de Usuarios
            </Link>
            <Link to="/productos" className="btn btn-secondary btn-lg">
            Gestión de Productos
            </Link>
        </div>
        </div>
    );
};

export default InicioPage;
