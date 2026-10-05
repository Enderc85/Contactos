const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

// Vista de Login
exports.formularioLogin = (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/contactos');
    }
    res.render('auth/login', { title: 'Iniciar Sesión', error: null });
};

// Procesar Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.render('auth/login', { 
                title: 'Iniciar Sesión', 
                error: 'El correo electrónico o la contraseña son incorrectos.' 
            });
        }

        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            return res.render('auth/login', { 
                title: 'Iniciar Sesión', 
                error: 'El correo electrónico o la contraseña son incorrectos.' 
            });
        }

        // Guardar sesión
        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        };

        res.redirect('/contactos');
    } catch (err) {
        console.error('Error en login:', err);
        res.render('auth/login', { 
            title: 'Iniciar Sesión', 
            error: 'Ocurrió un error inesperado al iniciar sesión.' 
        });
    }
};

// Vista de Registro
exports.formularioRegister = (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/contactos');
    }
    res.render('auth/register', { title: 'Registro de Usuario', error: null });
};

// Procesar Registro
exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const existe = await prisma.usuario.findUnique({ where: { email } });
        if (existe) {
            return res.render('auth/register', { 
                title: 'Registro de Usuario', 
                error: 'Ya existe un usuario registrado con este correo electrónico.' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword
            }
        });

        // Iniciar sesión automáticamente tras registro
        req.session.usuario = {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email
        };

        res.redirect('/contactos');
    } catch (err) {
        console.error('Error en registro:', err);
        res.render('auth/register', { 
            title: 'Registro de Usuario', 
            error: 'Ocurrió un error inesperado al registrar la cuenta.' 
        });
    }
};

// Cerrar Sesión
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
};
