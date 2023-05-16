// posts için gerekli routerları buraya yazın
const router = require('express').Router();
const postsModel=require("./posts-model");
const { json } = require('express');
const {  find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment } = require("./posts-model");


   router.get("/", async (req, res) => {
        try {
          const allUsers = await find();
          res.json(allUsers);
        } catch (error) {
          res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
        }
      });


router.get("/:id",async (req,res)=>{
try{
    const user = await findById(req.params.id) ;
    if(!user){
        res.status(404)
        .json({message:"Belirtilen ID'li gönderi bulunamadı"})
    }
    else{
        res.json(user);
    }
}
catch(error){
    res.status(500),json({message:"Gönderi bilgisi alınamadı"})
}
})
router.post("/",async(req,res)=>{
    try{
       const {title,contents}=req.body;
       if (!title || !contents ) {
        res
          .status(400)
          .json({ message: "Lütfen gönderi için bir title ve contents sağlayın" });
      }
      else {
        const inserted = await insert({ title:title,contents:contents});
        const insertedpost= await findById(inserted.id)
        res.status(201).json(insertedpost);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
    }
})

router.put("/:id",async (req,res)=>{
    try {
            const post = await postsModel.findById(req.params.id);
            if(!post){
                res.status(404).json({message:"Belirtilen ID'li gönderi bulunamadı"});
            }
            else{
                let {title,contents} = req.body;
                if(!title || !contents){
                    res.status(400).json({message:"Lütfen gönderi için bir title ve contents sağlayın"});
                }else{
                    await postsModel.update(req.params.id,{title,contents});
                    const updatedPost = await postsModel.findById(req.params.id);
                    res.json(updatedPost);
                }
            }
    } catch (error) {
        res.status(500).json({message:"Gönderi bilgileri güncellenemedi"});
    }
    });


router.delete("/:id",async (req,res)=>{
    try {
        const post = await postsModel.findById(req.params.id);
        if(!post){
            res.status(404).json({message:"Belirtilen ID'li gönderi bulunamadı"});
        }else{
           await postsModel.remove(req.params.id);
           res.json(post); 
        }
    } catch (error) {
        res.status(500).json({message:"Gönderi silinemedi" });
    }
});
router.get("/:id/comments",async (req,res)=>{
    try {
        const post = await postsModel.findById(req.params.id);
        if(!post){
            res.status(404).json({message:"Belirtilen ID'li gönderi bulunamadı"});
        }else{
            const postsComments = await postsModel.findPostComments(req.params.id);
            res.json(postsComments);
        }
    } catch (error) {
        res.status(500).json({message:"Yorumlar bilgisi getirilemedi"});
    }
});

module.exports = router;
router.get("/post/:post_id", async (req, res) => {
    try {
      const comments = await findPostComments(req.params.post_id);
      if (!comments) {
        res.status(400).json({ message: "Verilen id'ye ait bileşen bulunamadı" });
      } else {
        res.json(comments);
      }
    } catch (error) {
      res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    }
  });
  

  router.post("/comments", async (req, res) => {
    try {
      const { text, post_id, created_at, updated_at, post } = req.body;
      if (!text || !post_id || !created_at || !updated_at || !post) {
        res.status(400).json({ message: "Lütfen kullanıcı için bilgileri sağlayın" });
      } else {
        const inserted = await insertComment({
          text: text,
          post_id: post_id,
          created_at: created_at,
          updated_at: updated_at,
          post: post
        });
        res.status(201).json(inserted);
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
    }
  });
  

module.exports = router;