import multer from 'multer';
import path from "path";


const multerStorageUserImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/img/users')
    },
    filename: (req, file, cb) => {
        console.log(req.user)
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${Date.now()}.${ext}`)
    }
})

const multerStorageBlogImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/img/posts')
    },
    filename: (req, file, cb) => {
        console.log(req.user)
        const ext = file.mimetype.split('/')[1];
        cb(null, `blog-${req.user.id}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(console.log('Not an Image! Please upload only images'), false)
    }
}


const uploadBlogImage = multer({ storage: multerStorageBlogImage, fileFilter: multerFilter });

const uploadUserImage = multer({ storage: multerStorageUserImage, fileFilter: multerFilter })

export { uploadBlogImage, uploadUserImage };