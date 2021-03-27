const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userDetailModel = require('./userDetailModel');

// router for getting userDetails
router.get('/',async (req, res)=>{
    const userDetail = await userDetailModel.find().populate('user');

    if(!userDetail){
        res.status(500).json({
            success:false
        })
    }
    else 
    res.status(200).send(userDetail);
})

// router for saving userDetails
router.post('/',async(req, res)=>{

    const user = new userDetailModel(  {
        name : req.body.name,
        image : req.body.image,
        gender : req.body.gender,
        user : req.body.user

    } )
   // console.log(user)

    user.save().then((createdUserDetail => {
        res.status(201).json(createdUserDetail);
    })).catch((err)=>{
        res.status(500).json({
            success : false,
            error : err
        })
    })
})

router.put('/:id', async(req, res)=>{
    // if (!mongoose.isValidObjectId(req.params.id)){
    //     res.status(500).send("Invalid category id")
    // }
    // else{
        const user = await userDetailModel.findByIdAndUpdate(
        req.params.id,
        {
            name : req.body.name,
            image : req.body.image,
            gender : req.body.gender,
            user : req.body.user
         
        },
        {new:true}  
        )
        if(!user){
         res.status(500).json({
             success:false,
             message:  `No user found with id : ${req.params.id}`
         })
     }
     res.status(200).send(user); res.status(200).send(user);
    // }
    
 })


router.delete('/:id',(req, res)=>{
    userDetailModel.findByIdAndRemove(req.params.id).then(user =>{
         if(user){
              return res.status(200).json({success:true, message: "User is deleted successfully"})
             } 
             else{
                 return res.status(404).json({success:false, message : 'User not found'})
             }
     }).catch(err => {
         return res.status(404).json({success:false, error :err})
     } )
     
 })


router.get('/:id',async(req, res) =>{
    const user = await userDetailModel.findById(req.params.id).populate('user').select('-password');
    if (!user){
        res.status(500).json({
            success : false,
            message:  `No user found with id : ${req.params.id}`   

        })
    }
    res.status(200).send(user);
})


module.exports = router;
