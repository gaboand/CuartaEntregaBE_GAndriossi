import { UserModel } from "../dao/mongo/models/user.model.js";

const changeRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await UserModel.findById(uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (req.session.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
        }

        if (user.role === 'user') {
            if (user.documents.length < 3) {
                return res.status(403).json({
                    message: 'No se puede cambiar a premium sin al menos 3 documentos cargados.'
                });
            }

            user.role = 'premium';
        } else if (user.role === 'premium') {
            user.role = 'user';
        } else {
            return res.status(403).json({
                message: 'El usuario ya tiene un rol distinto de "user" o "premium".'
            });
        }

        await user.save();
        res.status(200).json({ message: `Rol actualizado a ${user.role}`, documents: user.documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
    }
};

export default changeRole;
