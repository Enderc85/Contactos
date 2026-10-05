const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Listar todos los contactos (Vista Agenda en columna)
exports.listarContactos = async (req, res) => {
    try {
        const contactos = await prisma.contacto.findMany({
            include: {
                provincia: {
                    include: { pais: true }
                }
            },
            orderBy: { nombre: 'asc' }
        });
        res.render('contactos/agenda_view', { 
            title: 'Agenda de Contactos', 
            contactos 
        });
    } catch (err) {
        console.error('Error al listar contactos:', err);
        res.status(500).send('Error al obtener la lista de contactos');
    }
};

// 2. Formulario para crear un nuevo contacto
exports.formularioCrear = async (req, res) => {
    try {
        const provincias = await prisma.provincia.findMany({
            orderBy: { nombre: 'asc' }
        });
        res.render('contactos/new', { 
            title: 'Nuevo Contacto',
            provincias 
        });
    } catch (err) {
        console.error('Error al cargar formulario de creación:', err);
        res.status(500).send('Error al cargar el formulario');
    }
};

// 3. Crear contacto en la base de datos
exports.crearContacto = async (req, res) => {
    try {
        const { nombre, telefono, email, provinciaId } = req.body;
        const nuevo = await prisma.contacto.create({
            data: {
                nombre,
                telefono,
                email,
                provinciaId: provinciaId ? parseInt(provinciaId, 10) : null
            }
        });
        res.redirect(`/contactos/${nuevo.id}`);
    } catch (err) {
        console.error('Error al crear contacto:', err);
        res.status(500).send('Error al guardar el contacto');
    }
};

// 4. Eliminar contacto
exports.eliminarContacto = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.contacto.delete({
            where: { id }
        });
        res.redirect('/contactos');
    } catch (err) {
        console.error('Error al eliminar contacto:', err);
        res.status(500).send('Error al eliminar el contacto');
    }
};

// 4. Ver detalle de un contacto específico
exports.verContacto = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(404).send('ID de contacto no válido');
        }
        const contacto = await prisma.contacto.findUnique({
            where: { id },
            include: { provincia: true }
        });

        if (!contacto) {
            return res.status(404).send('Contacto no encontrado');
        }

        res.render('contactos/show', { 
            title: `Contacto: ${contacto.nombre}`, 
            contacto 
        });
    } catch (err) {
        console.error('Error al ver contacto:', err);
        res.status(500).send('Error al obtener el detalle del contacto');
    }
};

// 5. Mostrar formulario de edición
exports.formularioEditar = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const contacto = await prisma.contacto.findUnique({
            where: { id },
            include: { provincia: true }
        });
        const provincias = await prisma.provincia.findMany({
            orderBy: { nombre: 'asc' }
        });

        if (!contacto) {
            return res.status(404).send('Contacto no encontrado');
        }

        res.render('contactos/edit', { 
            title: `Editar: ${contacto.nombre}`, 
            contacto,
            provincias 
        });
    } catch (err) {
        console.error('Error al cargar formulario de edición:', err);
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

// 6. Procesar la edición del contacto
exports.actualizarContacto = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nombre, telefono, email, provinciaId } = req.body;

        await prisma.contacto.update({
            where: { id },
            data: {
                nombre,
                telefono,
                email,
                provinciaId: provinciaId ? parseInt(provinciaId, 10) : null
            }
        });

        res.redirect(`/contactos/${id}`);
    } catch (err) {
        console.error('Error al actualizar contacto:', err);
        res.status(500).send('Error al guardar los cambios del contacto');
    }
};


exports.obtenerNombrePais = async (req, res) => {
    try {
        const provinciaId = parseInt(req.params.id, 10);
        if (isNaN(provinciaId)) {
            return res.status(400).json({ error: 'ID de provincia no válido' });
        }else{
            const provincia = await prisma.provincia.findUnique({
                where: { id: provinciaId },
                include: { pais: true }
            });
        if (!provincia) {
            return res.status(404).json({ error: 'Provincia no encontrada' });
        }else{
            const nombrePais = provincia.pais.nombre;
            res.json({ nombrePais });
        }
        }
    } catch (err) {
        console.error('Error al obtener el nombre del país:', err);
        res.status(500).json({ error: 'Error al obtener el nombre del país' });
    }
};