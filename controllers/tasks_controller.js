const Task = require('../models/tasks_model');

//Get all
exports.index = (req, res) => {
    Task.find({}).then((task) => {              // using mongoose find query to find all data for a route without a filter
        res.status(200).json(task);
    }).catch((err) => {
        res.send(err);
    });                  
};

//Get One
exports.show = (req, res) => {
    Task.findById(req.params.id).then((task) => {         // finding individual data by id
        if (task) {
            res.status(200).json(task);                 // handling promise to send data if found err if not
        } else {
            res.status(404).json({message: 'Task not found!'});
        }
    }).catch((err) => {
        res.status(500).send(err);
    })
}

// Post
exports.create = (req, res) => {        
    const task = new Task({         // creating a new task that follows model
        title: req.body.title,
        content: req.body.content
    });
    task.save().then(result => {        // saving to db
        res.status(201).json({
            message: 'Task saved successfully!',
            taskId: result._id
        })
    }).catch((err) => {
        res.send(err);
    })
}

//Put
exports.update =  (req, res) => {
    Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})   // updating and returning modified doc
        .then((task) => {
            res.json(task);
        }).catch((err) => {
            res.send(err);
        })
};


//Delete
exports.destroy = (req, res) => {   
       Task.deleteOne({ _id: req.params.id } ).then(result => {     // deleting by id
       res.status(200).json({
           message: "Task successfully deleted!"
        })
   }).catch((err) => {
    res.send(err);
})
}



