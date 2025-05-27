import fs from 'fs';
const filePath = './data/usuarios.json';

// 🔄 Leer usuarios del archivo
const leerUsuarios = () => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// 💾 Guardar usuarios en el archivo
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
};

// 📄 GET /usuarios
export const listarUsuarios = (req, res) => {
    const usuarios = leerUsuarios();
    res.json(usuarios);
};

// 🆕 POST /usuarios
export const crearUsuario = (req, res) => {
    const { nombre, email, edad } = req.body;

    if (!nombre || !email || !edad) {
        return res.status(400).json({ error: 'Faltan datos: nombre, email, edad' });
    }

    const usuarios = leerUsuarios();
    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email ya registrado' });
    }

    const nuevoUsuario = {
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
        nombre,
        email,
        edad: parseInt(edad),
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    res.status(201).json(nuevoUsuario);
};

// ✏️ PUT /usuarios/:id
export const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email, edad } = req.body;

    const usuarios = leerUsuarios();
    const index = usuarios.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuarios[index] = {
        id: parseInt(id),
        nombre,
        email,
        edad: parseInt(edad),
    };

    guardarUsuarios(usuarios);
    res.json(usuarios[index]);
};

// ❌ DELETE /usuarios/:id
export const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    const usuarios = leerUsuarios();
    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const nuevosUsuarios = usuarios.filter(u => u.id !== usuario.id);
        guardarUsuarios(nuevosUsuarios);
    res.json({ mensaje: `Usuario con ID ${id} eliminado.` });
};
