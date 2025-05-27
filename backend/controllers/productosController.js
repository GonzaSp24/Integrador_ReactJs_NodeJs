import fs from 'fs';
const filePath = './data/productos.json';

// 🔄 Leer productos del archivo
const leerProductos = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// 💾 Guardar productos en el archivo
const guardarProductos = (productos) => {
    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
};

// 📄 GET /productos
export const listarProductos = (req, res) => {
    const productos = leerProductos();
    res.json(productos);
};

// 🆕 POST /productos
export const crearProducto = (req, res) => {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Faltan datos: nombre, precio' });
    }

    const productos = leerProductos();
    const nuevoProducto = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        nombre,
        precio: parseFloat(precio),
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);
    res.status(201).json(nuevoProducto);
};

// ✏️ PUT /productos/:id
export const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    const productos = leerProductos();
    const index = productos.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos[index] = {
        id: parseInt(id),
        nombre,
        precio: parseFloat(precio),
    };

    guardarProductos(productos);
    res.json(productos[index]);
};

// ❌ DELETE /productos/:id
export const eliminarProducto = (req, res) => {
    const { id } = req.params;
    const productos = leerProductos();
    const producto = productos.find(p => p.id === parseInt(id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const nuevosProductos = productos.filter(p => p.id !== producto.id);
    guardarProductos(nuevosProductos);
    res.json({ mensaje: `Producto con ID ${id} eliminado.` });
};
