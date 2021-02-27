import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req:any, file, cb) {
      const mimetype = file.mimetype;
      let folder = "files"
      //const USERNAME = req.user.username
      const USERNAME = 'Deiver Guerra Carrascal'
      const USER_FOLDER = `/home/streams-for-lab.co/${USERNAME?.toLowerCase().trim().replace(/ /g,'-')}`
      
      if(mimetype.includes("image")) folder = "photos"
      else if(mimetype.includes("video")) folder = "videos"
      cb(null, `${USER_FOLDER}/${folder}`)
    },
    filename:  function (req, file, cb) {
      cb(null,file.originalname)
    }
  })

const  upload = multer({ storage })

export default upload