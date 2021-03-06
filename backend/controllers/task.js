const Task = require("../models/tasks");
const Admin = require("../models/admins");

exports.getTask = (req,res,next)=>{
  let value = 'No';
  let taskArray = [];
  Task.find({completed: value})
    .then(documents=>{
      taskArray = documents.filter(x=> x.update === "N/A");
      res.status(200).json({
        message: "Tasks Listed Successfully",
        tasks: taskArray
      });
    })
    .catch(err=>{
      res.status(500).json({
        error: err
      });
    });
};

exports.getReallocated = (req,res,next)=>{
  let value = 'No';
  let taskArray = [];
  Task.find({completed: value})
    .then(documents=>{
      taskArray = documents.filter(x=> x.update !== "N/A");
      console.log(taskArray);
      res.status(200).json({
        message: "Tasks Listed Successfully",
        tasks: taskArray
      });
    })
    .catch(err=>{
      res.status(500).json({
        error: err
      });
    });
};

exports.createTask = (req,res,next)=>{
  Admin.findById(req.body.name).then(adminData=>{
    let adminName = adminData.name;
    const task = new Task({
      title: req.body.title,
      name: req.body.name,
      task: req.body.task,
      date: req.body.date,
      admin: adminName,
      completed: 'No',
      accepted: 'No',
      acceptAdmin: 'N/A',
      adminImagePath: adminData.imagePath,
      update:'N/A',
      reallocate:'N/A'
    });
    task.save()
      .then(result => {
        res.status(201).json({
          message: 'Task Created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.findTask = (req,res,next)=>{
  Task.find({date:req.params.date}).then(result=>{
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  })
};

exports.deleteTask = (req,res,next)=>{
  Task.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Task Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.markCompleted = (req,res,next)=>{
  Task.findOneAndUpdate({_id:req.params.taskId},{
    completed: 'Yes'
  }).then(result=>{
    res.status(201).json({
      message: 'Task updated!',
      result: result
    });
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
};

exports.markAccepted = (req,res,next)=>{
  Task.findOneAndUpdate({_id:req.params.taskId},{
    accepted: 'Yes',
    acceptAdmin: req.params.currentAdmin
  }).then(result=>{
    res.status(201).json({
      message: 'Task updated!',
      result: result
    });
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
};

exports.completedTask = (req,res,next)=>{
  let taskArray = [];
  let reallocateArray = [];
  Task.find({completed:req.params.complete}).then(result=>{
    if(result){
      taskArray = result.filter(x=> x.accepted === req.params.accept);
      reallocateArray = taskArray.filter(x=> x.update === "N/A");
      res.status(200).json(reallocateArray);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
};

exports.reallocatedCompleted = (req,res,next)=>{
  let taskArray = [];
  let reallocateArray = [];
  Task.find({completed:req.params.complete}).then(result=>{
    if(result){
      taskArray = result.filter(x=> x.accepted === req.params.accept);
      reallocateArray = taskArray.filter(x=> x.update !== "N/A");
      res.status(200).json(reallocateArray);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
};

exports.acceptedTask = (req,res,next)=>{
  let taskArray = [];
  let reallocateArray = [];
  Task.find({completed:req.params.complete}).then(result=>{
    if(result){
      taskArray = result.filter(x=> x.accepted === req.params.accept);
      reallocateArray = taskArray.filter(x=> x.update === "N/A");
      res.status(200).json(reallocateArray);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
};

exports.acceptedReallocated = (req,res,next)=>{
  let taskArray = [];
  let reallocateArray = [];
  Task.find({completed:req.params.complete}).then(result=>{
    if(result){
      taskArray = result.filter(x=> x.accepted === req.params.accept);
      reallocateArray = taskArray.filter(x=> x.update !== "N/A");
      res.status(200).json(reallocateArray);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
};

exports.reallocatedTask = (req,res,next)=>{
  Task.find({_id:req.params.taskId}).then(result=>{
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
};

exports.findReallocated = (req,res,next)=>{

  Admin.findById({_id:req.body.reallocate}).then(result=>{
    let reAdminName = result.name;
    const task = new Task({
      _id:req.body.id,
      title: req.body.title,
      name: req.body.name,
      task: req.body.task,
      date: req.body.date,
      admin: req.body.adminName,
      completed: 'No',
      accepted: 'No',
      acceptAdmin: 'N/A',
      adminImagePath: req.body.adminImagePath,
      update:req.body.update,
      reallocate:reAdminName
    });

    Task.updateOne({_id:req.params.id}, task)
      .then(result => {
        res.status(201).json({
          message: 'Task updated!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
};
