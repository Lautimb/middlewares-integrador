const multer  = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public/images/users'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
  module.exports = multer({ storage,
    fileFilter: (req, file, cb)=>{
        const acceptedExt = ['.jpg','.png','.jpeg','.webp']
        const ext = path.extname(file.originalname);
        
        if(!acceptedExt.includes(ext)){
            req.file = file;
        }
        cb(null, acceptedExt.includes(ext))
    }
  })
  