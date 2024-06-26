function authAdmin(req, res, next) {
    const userRole = req.session.role;

    if (!userRole) {
        return res.sendStatus(401);
    }
    if (userRole === "admin") {
        return next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
    }
}

export default authAdmin;
