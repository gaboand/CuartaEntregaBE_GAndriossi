import multer from 'multer';
import path from 'path';
import { __dirname } from "../utils.js";
import fs from 'fs';
import { UserModel } from '../dao/mongo/models/user.model.js';

const ensureDir = dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
};

const uploadsDir = path.join(__dirname, './public/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let targetDir;
    switch (file.fieldname) {
      case "profile":
        targetDir = path.join(uploadsDir, 'profile');
        break;
      case "product":
        targetDir = path.join(uploadsDir, 'products');
        break;
      case "document":
        targetDir = path.join(uploadsDir, 'documents');
        break;
      default:
        return cb(new Error('Tipo de archivo no soportado'), false);
    }
    ensureDir(targetDir);
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const uploadUserDocuments = upload.fields([
  { name: 'profile', maxCount: 1 },
  { name: 'product', maxCount: 50 },
  { name: 'document', maxCount: 4 }
]);

const handlePostUpload = async (req, res) => {
  const uid = req.params.uid;
  const user = await UserModel.findById(uid);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const documentUpdates = req.files['document']?.map(doc => ({
    name: doc.originalname,
    reference: `/uploads/documents/${doc.filename}`
  })) || [];

  const profileUpdates = req.files['profile']?.map(profile => ({
    name: profile.originalname,
    reference: `/uploads/profile/${profile.filename}`
  })) || [];

  const productUpdates = req.files['product']?.map(product => ({
    name: product.originalname,
    reference: `/uploads/products/${product.filename}`
  })) || [];

  user.documents.push(...documentUpdates, ...profileUpdates, ...productUpdates);
  await user.save();

  res.status(200).json({
    message: 'Archivos cargados exitosamente',
    documents: user.documents
  });
};

export { uploadUserDocuments, handlePostUpload };