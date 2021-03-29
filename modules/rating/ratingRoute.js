const express = require('express');
const router = express.Router();

const ratingModel = require('./ratingModel');
const mapToModule = require('../../helper/mapToModule');

// Router & controller save rating
router.post('/',(req, res)=>{      
    const rating = new ratingModel(  {
      rating : req.body.rating,
        course : req.body.course,
        user : req.body.user,
        comment : req.body.comment,
       status:req.body.status
    } )


    rating.save().then((result => {
        res.status(201).json(result);
    })).catch((err)=>{
        res.status(500).json({
            success : false,
            error : err
        })
    })
})  

// Router & controller to get all rating data
router.get('/',async (req,res)=>{
    const rating = await ratingModel.find();
    if(!rating){
        res.status(500).json({success : false, message : "No rating found !"})
    }
    else
    res.status(200).json({success : true, result : rating})
}
)

// Router & controller to update a rating data
router.put('/:id', async(req, res)=>{
    // if (!mongoose.isValidObjectId(req.params.id)){
    //     res.status(500).send("Invalid category id")
    // }
    // else{
        const rating = await ratingModel.findById(
        req.params.id );
     
       
       mapToModule.mapToRating(rating,req.body);


        const updatedRating =  await rating.save();
        // console.log(updatedQuestion)
        if(!rating){
         res.status(500).json({
             success:false,
             message:  `No rating found with id : ${req.params.id}`
         })
     }
     res.status(200).send(updatedRating);
    
    
 })


// Router & controller to delete a rating
 router.delete('/:id',(req, res)=>{
    ratingModel.findByIdAndRemove(req.params.id).then(rating =>{
         if(rating){
              return res.status(200).json({success:true, message: "rating is deleted successfully"})
             } 
             else{
                 return res.status(404).json({success:false, message : 'rating not found'})
             }
     }).catch(err => {
         return res.status(404).json({success:false, error :err})
     } )
     
 })

  // Router & controller to get a rating data by Id
  router.get('/:id',async (req, res)=>{
    const rating = await ratingModel.findById(req.params.id);
    if(!rating){
        res.status(500).json({
            success:false,
            message: "No rating found with that id"
        })
    }
    else
    res.status(200).send(rating);
})

// Router & controller to count total rating
router.get('/get/count',async (req, res)=>{
    const ratingCount = await ratingModel.countDocuments((count)=> count);
    if(!ratingCount){
        res.status(500).json({
            success:false
        })
    }

    else 
    res.send({ratingCount:ratingCount})

})


module.exports = router;