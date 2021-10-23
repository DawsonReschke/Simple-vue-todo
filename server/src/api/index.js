const express = require('express');
const db = require('monk')(process.env.MONGO_URI)
const joi = require('@hapi/joi'); 
const { date } = require('@hapi/joi');

//Todo DB version 1.00
// const todos = db.get('todos'); 

// Todo DB version 1.10
const todos = db.get('todos_v110')
// console.log(todos); 

const todo_schema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  timeTag : joi.number().required().default(5),
  completed: joi.boolean().default(false),
  subID: joi.number().default(constrain(Date.now() + (Math.random() * 1000)))
});

const category_schema = joi.object({
  category: joi.string(),
  list: joi.array().items(todo_schema),
});
const router = express.Router();


function getNewKey(val){
  return constrain(Number(Date.now()) + (Math.random() * 10000));
}
function constrain(num){
  var temp = String(num); 
  if(temp.length == 12){
    return temp;
  }else if(temp.length > 12){
    temp = temp.substring(0,12);
  }else{
    console.log('youre fucked')
  }
  return Number(temp)
}
//Todo DB version 1.00 POST
// router.post('/', async (req,res,next) =>{
//   try{
//     const dbEntry = req.body; 
//     const validated = await todo_schema.validateAsync(dbEntry); 
//     const inserted = await todos.insert(validated); 
//     res.json(inserted); 
//   }catch(error){
//     next(error); 
//   }
// });


router.delete('/:id', async (req,res,next)=>{
  try{
    const { id } = req.params; 
    const body = req.body; 
    const subID = body.subID; 
    const db = await todos.findOne({_id: id}); 
    const dbList = db.list;
    const temp = dbList; 
    let deletedI; 
    for(let i = 0 ;i < temp.length; i++){
      if(temp[i].subID == subID){
         deletedI = temp.splice(i,1);  
      }
    }
    if(temp.length == 0){
      const removed = await todos.remove({_id:id});
      console.log(removed); 
      res.json(removed); 
    }else{
      const updated = await todos.update({_id: id},{$set: {list: temp}});
      console.log(updated); 
      res.json(updated); 
    }
  }catch(err){
    console.log("error",err);
  }
})


// router.delete('/:id', async (req,res,next) =>{
//   console.log("deleting"); 
//   try{
//     const { id } = req.params; 
//     const { subID } = req.body[0].subID; 
//     console.log(id,subID); 
//     // const deleted = await todos.remove({_id : id});
//     // res.json(deleted); 
//   }catch(error){
//     next(error); 
//   }
// });

//only used for clearing the temp DB, should not be used in prod. 
router.delete('/', async (req,res,next) =>{
  try{
    const deleted = await todos.remove({}); 
    res.json(deleted); 
  }catch(error){
    next(error); 
  }
})



//Todo DB version 1.00 PUT
// router.put('/:id', async (req,res,next) =>{
//   try{
  //   const { id } = req.params; 
  //   const dbEntry = await todos.find({_id:id});
  //   const Tcompleted = req.body.completed; 
  //   const Ttitle = req.body.title;
  //   const Tdescription = req.body.description;
  //   const TtimeTag = req.body.timeTag;
  //   const updated = await todos.update({_id: id}, {$set: 
  //     {
  //       completed: Tcompleted,
  //       title: Ttitle,
  //       description: Tdescription,
  //       timeTag: TtimeTag
  //     }});
  //   res.json(updated);
  // }catch(error){
  //     next(error); 
  //   }
  // });

  // DB version 1.10: GET
  router.get('/', async (req, res, next) => {
    const entries = await todos.find({}); 
    try{
      res.json(entries);
    }catch(error){
      next(error); 
    }
  });
  //DB version 1.00: GET
// router.get('/', async(req,res,next)=>{
//   try {
//     const entries = await todos.find({});
//     res.json(entries); 
//   } catch (error) {
//     console.log(error); 
//   }
// })

  router.post('/', async (req,res,next) =>{
    try{
      const dbEntry = req.body; 
      const validated = await category_schema.validateAsync(dbEntry);
      const cat = validated.category; 
      const listEntry = validated.list[0]; 
      listEntry.subID += Math.random() * 173869420; 
      //step 1: check if db contains a category defined from dbEntry.category
      const DB = await todos.findOne({category: cat});
      if(DB){
        //Step 2: if the db contains the category
          // pull out the array from that category, 
          //push your new data, 
          //update the array...
          let temp = DB.list; 
          temp.push(listEntry); 
          // console.log(temp);
          // console.log(DB._id);
        const inserted = await todos.update({_id:DB._id}, {$set:{list: temp}})
        res.json(inserted); 
      }else{
        //Step 3: if the db does not contain the category
          //add it.
        const inserted = await todos.insert(validated); 
        res.json(inserted); 
      }
    }catch(err){
      console.log("POST ERROR: ",err); 
      next(err); 
    }
  })

  router.put('/:id', async (req,res,next) =>{
    // intent of this function: 
      // take an existing todo (by subID)
        //change it, then put it back updated...
    try {
      const { id } = req.params; 
      const newTODO = await category_schema.validateAsync(req.body);
      const newList = newTODO.list[0]; 
      const catData = await todos.findOne({_id: id}); 
      let catList = catData.list; 
      for(let i = 0; i < catList.length; i++){
        console.log(newList.subID, catList[i].subID)
        if(catList[i].subID == newList.subID){
          console.log("it worked");
          catList[i] = newList; 
        }
      } 
      const updated = await todos.update({_id : id}, {$set: {list: catList}})
      res.json(updated); 
    } catch (error) {
      console.log(error); 
      next(error);
    }
  })

module.exports = router;
