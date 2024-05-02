const express = require("express");
const router = express.Router();
const multer = require("multer");
const { postController, getPosts } = require("../controllers/postController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./postfolder");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post("/postapi", upload.fields([{ name: "postimg" }]), postController);
router.get("/getposts", getPosts);

module.exports = router;
