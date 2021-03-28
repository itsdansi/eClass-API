const express = require('express');
const router = express.Router();

const questionModel = require('./questionModel');
const mapToModule = require('../../helper/mapToModule')

 // Router & controller save question
 router.post('/',(req, res)=>{
    const question = new questionModel(  {
      title : req.body.title,
        course : req.body.course,
        user : req.body.user,
       status:req.body.status
//    result: req.body
    } )


    question.save().then((result => {
        res.status(201).json(result);
    })).catch((err)=>{
        res.status(500).json({
            success : false,
            error : err
        })
    })
})  

// Router & controller to get all question data
router.get('/',async (req,res)=>{
    const question = await questionModel.find();
    if(!question){
        res.status(500).json({success : false, message : "No question found !"})
    }
    else
    res.status(200).json({success : true, result : question})
}
)

// Router & controller to update a question data
router.put('/:id', async(req, res)=>{
    // if (!mongoose.isValidObjectId(req.params.id)){
    //     res.status(500).send("Invalid category id")
    // }
    // else{
       // console.log(req.params.id);
        const question = await questionModel.findById(
        req.params.id );
       /// console.log(question);
     
       
       mapToModule.mapToCourse(question,req.body);

    //     Object.assign(question, { title : req.body.title,
    //             course : req.body.course,
    //             user : req.body.user,
    //            status:req.body.status});

        const updatedQuestion =  await question.save();
        // console.log(updatedQuestion)
        if(!question){
         res.status(500).json({
             success:false,
             message:  `No question found with id : ${req.params.id}`
         })
     }
     res.status(200).send(updatedQuestion);
    
    
 })


// Router & controller to delete a question
 router.delete('/:id',(req, res)=>{
    questionModel.findByIdAndRemove(req.params.id).then(question =>{
         if(question){
              return res.status(200).json({success:true, message: "Question is deleted successfully"})
             } 
             else{
                 return res.status(404).json({success:false, message : 'Question not found'})
             }
     }).catch(err => {
         return res.status(404).json({success:false, error :err})
     } )
     
 })

  // Router & controller to get a question data by Id
  router.get('/:id',async (req, res)=>{
    const question = await questionModel.findById(req.params.id);
    if(!question){
        res.status(500).json({
            success:false,
            message: "No question found with that id"
        })
    }
    else
    res.status(200).send(question);
})

// Router & controller to count total questions
router.get('/get/count',async (req, res)=>{
    const questionCount = await questionModel.countDocuments((count)=> count);
    if(!questionCount){
        res.status(500).json({
            success:false
        })
    }

    else 
    res.send({questionCount:questionCount})

})


module.exports = router;