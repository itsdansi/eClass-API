const express = require('express');
const router = express.Router();

const answerModel = require('./answerModel');
const mapToModule = require('../../helper/mapToModule')


 // Router & controller post an answer
 router.post('/',(req, res)=>{
    const answer = new answerModel(  {
      title : req.body.title,
        course : req.body.course,
        question : req.body.question,
       status:req.body.status
    } )

    answer.save().then((result => {
        res.status(201).json(result);
    })).catch((err)=>{
        res.status(500).json({
            success : false,
            error : err
        })
    })
})  

// Router & controller to get all answer data
router.get('/',async (req,res)=>{
    const answer = await answerModel.find();
    if(!answer){
        res.status(500).json({success : false, message : "No answer found !"})
    }
    else
    res.status(200).json({success : true, result : answer})
}
)

// Router & controller to update a answer by Id
router.put('/:id', async(req, res)=>{
    // if (!mongoose.isValidObjectId(req.params.id)){
    //     res.status(500).send("Invalid category id")
    // }
    // else{
        const answer = await answerModel.findById(
        req.params.id );

     
       
        mapToModule.mapToAnswer(answer,req.body);

        const updatedAnswer =  await answer.save();
        // console.log(updatedAnswer)
        if(!answer){
         res.status(500).json({
             success:false,
             message:  `No answer found with id : ${req.params.id}`
         })
     }
     res.status(200).send(updatedAnswer);
    
    
 })

// Router & controller to delete an answer data
router.delete('/:id',(req, res)=>{
    answerModel.findByIdAndRemove(req.params.id).then(answer =>{
         if(answer){
              return res.status(200).json({success:true, message: "Answer is deleted successfully"})
             } 
             else{
                 return res.status(404).json({success:false, message : 'Answer not found'})
             }
     }).catch(err => {
         return res.status(404).json({success:false, error :err})
     } )
     
 })

  // Router & controller to get a answer data by Id
  router.get('/:id',async (req, res)=>{
    const answer = await answerModel.findById(req.params.id);
    if(!answer){
        res.status(500).json({
            success:false,
            message: "No answer found with that id"
        })
    }
    else
    res.status(200).send(answer);
})

// Router & controller to count total answer
router.get('/get/count',async (req, res)=>{
    const answerCount = await answerModel.countDocuments((count)=> count);
    if(!answerCount){
        res.status(500).json({
            success:false
        })
    }

    else 
    res.send({answerCount:answerCount})

})

module.exports = router;