// posts için gerekli routerları buraya yazın
const router = require('express').Router();

const { json } = require('express');
const {  find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment, } = require("./posts-model");


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
        .json({message:"veri bulunamadı"})
    }
    else{
        res.json(user);
    }
}
catch(error){
    res.status(500),json({message:"bilgi alınamadı"})
}
})
router.post("/",async(req,res)=>{
    try{
       const {title,contents,created_at,updated_at}=req.body;
       if (!title || !contents || !created_at || !updated_at) {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için bilgileri sağlayınsağlayın" });
      }
      else {
        const inserted = await insert({ title:title,contents:contents,created_at:created_at,updated_at:updated_at });
        res.status(201).json(inserted);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
    }
})

router.put("/:id",async (req,res)=>{
    try{
        const {title,contents,created_at,updated_at}=req.body;
        if (!title || !contents || !created_at || !updated_at) {
            res
              .status(400)
              .json({ message: "Lütfen kullanıcı için bilgileri sağlayınsağlayın" });
          }
          else  {
            const user = await findById(req.params.id);
            if(!user){
                res
                .status(400)
                .json({message:"verilen id ye ait bileşen bulunamadı"})
            }
          
          else {
            const updateuser = await update(req.params.id,{ title:title,contents:contents,created_at:created_at,updated_at:updated_at })
            res.json(updateuser);
          }
        }
    }
    catch{
        res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    }
})

router.delete("/:id",async(req,res)=>{
try{

    const user = await findById(req.params.id);
    if(!user){
res
.status(400)
.json({message:"verilen id ye ait bileşen bulunamadı"})
    }
    else{
        const updatedata=await remove(req.params.id);
        res.json(updatedata);
    }


}
catch{ 
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }

})





module.exports = router;