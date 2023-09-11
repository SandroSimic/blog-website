import multer from 'multer';
import path from "path";




const upload = multer({ dest: 'uploads/' });

export default upload;