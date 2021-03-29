const router = require("express").Router();

const enrollModel = require('./enrollModel');


 // Router & controller save enroll data
 router.post('/',(req, res)=>{      
    const enroll = new enrollModel(  {
        course : req.body.course,
       status:req.body.status
    } )


    enroll.save().then((result => {
        res.status(201).json(result);
    })).catch((err)=>{
        res.status(500).json({
            success : false,
            error : err
        })
    })
})  

// Router & controller to get all enroll data
router.get('/',async (req,res)=>{
    const enroll = await enrollModel.find();
    if(!enroll){
        res.status(500).json({success : false, message : "No enroll found !"})
    }
    else
    res.status(200).json({success : true, result : enroll})
}
)

// Router & controller to delete an enroll
 router.delete('/:id',(req, res)=>{
    enrollModel.findByIdAndRemove(req.params.id).then(enroll =>{
         if(enroll){
              return res.status(200).json({success:true, message: "Enroll is deleted successfully"})
             } 
             else{
                 return res.status(404).json({success:false, message : 'Enroll not found'})
             }
     }).catch(err => {
         return res.status(404).json({success:false, error :err})
     } )
     
 })

  // Router & controller to get a enroll data by Id
  router.get('/:id',async (req, res)=>{
    const enroll = await enrollModel.findById(req.params.id);
    if(!enroll){
        res.status(500).json({
            success:false,
            message: "No enroll found with that id"
        })
    }
    else
    res.status(200).send(enroll);
})

// Router & controller to count total enroll
router.get('/get/count',async (req, res)=>{
    const enrollCount = await enrollModel.countDocuments((count)=> count);
    if(!enrollCount){
        res.status(500).json({
            success:false
        })
    }

    else 
    res.send({enrollCount:enrollCount})

})


module.exports = router;