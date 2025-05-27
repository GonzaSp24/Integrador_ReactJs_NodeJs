import autoTable from 'jspdf-autotable';
import axios from 'axios';
import jsPDF from 'jspdf';

const ExportarProductosPDF = () => {
    const exportar = async () => {
        try {
        const res = await axios.get('http://localhost:3000/productos');
        const productos = res.data;

        const doc = new jsPDF();
        doc.text('Listado de Productos', 14, 10);
        autoTable(doc, {
            startY: 20,
            head: [['Nombre', 'Precio']],
            body: productos.map(p => [p.nombre, `$${p.precio}`]),
        });
        doc.save('productos.pdf');
        } catch (error) {
        alert('Error al exportar productos');
        console.error(error);
        }
    };

    return (
        <button className="btn btn-outline-secondary mt-3" onClick={exportar}>
        📄 Exportar Productos en PDF
        </button>
    );
};

export default ExportarProductosPDF;
