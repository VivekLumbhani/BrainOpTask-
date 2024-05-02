const con=require("../config/db")

const postController = async (req, res) => {
    const { username, caption } = req.body;
    try {
        if (!req.files || !req.files['postimg']) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        const postimg = req.files['postimg'][0].filename;
        var newimgpathsetp=postimg;

        console.log("post img " + newimgpathsetp);

        const insertquery = `
            INSERT INTO posttable (postimg, username, uploadedAt, caption)
            VALUES ('${newimgpathsetp}', '${username}', NOW(), '${caption}')
        `;

        con.query(insertquery, (err, result) => {
            if (err) {
                console.error("Error inserting content:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            console.log("Post inserted successfully");
            return res.status(200).json({ message: "Post inserted successfully" });
        });
    } catch (error) {
        console.log("Error in posting:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const getPosts = async (req, res) => {

    const { page, timestamp } = req.query;
    const pageNum = parseInt(page) || 1;
    const timestampFilter = timestamp ? `WHERE timestamp < '${timestamp}'` : '';


    const pageSize = 3;
    const offset = (pageNum - 1) * pageSize;
    
    const selectPostsQuery = `
        SELECT * FROM posttable 
        ${timestampFilter}
        ORDER BY uploadedAt DESC 
        LIMIT ${pageSize} OFFSET ${offset}
    `;

    con.query(selectPostsQuery, (err, result) => {
        if (err) {
            console.error("Error querying posts:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Posts retrieved successfully");
        return res.status(200).json(result);
    });
};



module.exports={postController,getPosts}