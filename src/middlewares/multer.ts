import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const mimetype = file.mimetype;
      let destination = "files" 
      
      if(mimetype.includes("image")) destination = "photos"
      else if(mimetype.includes("video")) destination = "videos"
      cb(null, `public/${destination}`)
    },
    filename:  function (req, file, cb) {
      const name = file.originalname.replace(/[^.,a-zA-Z]/g, "")
      cb(null, Date.now()  + '-' + name)
    }
  })

const  upload = multer({ storage })

export default upload