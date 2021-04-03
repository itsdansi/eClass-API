const express = require('express');
const router = express.Router();

const sliderModel = require('./sliderModel');
const mapToModule = require ('../../helper/mapToModule')


// Router to get all sliders 
router.get('/',async (req,res)=>
{
    const slider = await sliderModel.find();
    if(!slider){
        res.status(500).json({success : false, message : "No slider found !"})
    }
    else
    res.status(200).json({success : true, result : slider})
}
)


// Router to add a new slider
router.post('/', async (req, res)=> {
    const slider = new sliderModel({

        title : req.body.title,
        desc : req.body.desc,
        imageUrl : req.body.imageUrl,
        status : req.body.status

    })

    const newSlider = await slider.save();
    if(!newSlider){
        res.status(500).json({success : false , message : "Slider not added"})
    }
    else 
    res.status(200).send(newSlider);

})

// Router to update a slider data by Id
router.put('/:id', async(req, res)=>{
    // if (!mongoose.isValidObjectId(req.params.id)){
    //     res.status(500).send("Invalid slider id")
    // }
    // else{
        const slider = await sliderModel.findById(
        req.params.id );

     
            
        mapToModule.mapToSlider(slider,req.body);

        const updatedSlider =  await slider.save();
        if(!slider){
         res.status(500).json({
             success:false,
             message:  `No slider found with id : ${req.params.id}`
         })
     }
     res.status(200).send(updatedSlider);
    
    
 })

//  Router to delete a slider by Id
router.delete('/:id', async (req,res)=>
{
    const slider = await sliderModel.findByIdAndDelete(req.params.id);
    if(slider){
        return res.status(200).json({success:true, message: "Slider  deleted successfully"})

    }
    else 
    return res.status(404).json({success:false, message : 'Slider not found'})

})

// Router to get a slider data by Id
  router.get('/:id',async (req, res)=>{
    const slider = await sliderModel.findById(req.params.id);
    if(!slider){
        res.status(500).json({
            success:false,
            message: "No slider found with that id"
        })
    }
    else
    res.status(200).send(slider);
})

module.exports = router;