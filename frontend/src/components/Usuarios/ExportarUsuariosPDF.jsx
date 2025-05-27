import autoTable from 'jspdf-autotable';
import axios from 'axios';
import jsPDF from 'jspdf';

const ExportarUsuariosPDF = () => {
    const exportar = async () => {
        try {
        const res = await axios.get('http://localhost:3000/usuarios');
        const usuarios = res.data;

        const doc = new jsPDF();
        doc.text('Listado de Usuarios', 14, 10);
        autoTable(doc, {
            startY: 20,
            head: [['Nombre', 'Email', 'Edad']],
            body: usuarios.map(u => [u.nombre, u.email, u.edad]),
        });
        doc.save('usuarios.pdf');
        } catch (error) {
        alert('Error al exportar usuarios');
        console.error(error);
        }
    };

    return (
        <button className="btn btn-outline-primary mt-3" onClick={exportar}>
        📄 Exportar Usuarios en PDF
        </button>
    );
};

export default ExportarUsuariosPDF;
