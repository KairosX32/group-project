const Lead = require('../models/leads_model');             //going to need to load the mongoose model that is going to handle the logs, the schema

//controllers job is to accept incoming requests from a route & then do something with the data thats coming in, i.e CRUD
// .index .show .create .destroy are defined actions that perform CRUD

//Get All
exports.index = (req, res) => {
    Lead.find({}).then((lead) => {              // using mongoose find query to find all data for a route without a filter
        res.status(200).json(lead);
    }).catch((err) => {
        res.send(err);
    });                  
};


//Get by ID
exports.show = (req, res) => {                          // when you go to leads/id it will send you back the data for that one single lead with the id 
    Lead.findById(req.params.id).then((lead) => {           // filtering by id 
        if (lead) {
            res.status(200).json(lead);         // sending back data
        } else {
            res.status(404).json({message: 'Lead not found!'});
        }                           
    }).catch((err) => {
        res.status(500).send(err);
    });                                                                
};

//Post
exports.create = (req, res) => {
    const newLead = new Lead(req.body);   // Creating a new lead that follows our mongoose model

    newLead.save().then((lead) => {             //saving to mongo db
        res.status(201).json(lead);
    }).catch((err) => {
        res.status(400).send(err);
    })               
};

//Put
exports.update =  (req, res) => {   
    Lead.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then((lead) => {                 // finding data by filtering through id and updating it & returning the modified document
        res.status(200).json(lead);
    }).catch((err) => {
        res.send(err);
    })          
};


//Delete
exports.destroy =  (req, res) => {
    Lead.deleteOne({_id: req.params.id}).then(() => {          // deleting data by filtering through id
        res.json({message: `Lead (${req.params.id}) successfully deleted.`});
    }).catch((err) => {
        res.send(err);
    })
}

