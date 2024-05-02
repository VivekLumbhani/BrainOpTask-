const express=require("express");
const { userRegisterController, userLoginController } = require("../controllers/userController");
const router=express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./profileimg"); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post("/register", upload.fields([{ name: "profile_pic_url" }]), userRegisterController);


router.post("/loginapi",userLoginController);

module.exports=router;