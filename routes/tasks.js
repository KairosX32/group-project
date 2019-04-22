module.exports =  (app) => {
    const controller = require('../controllers/tasks_controller');

    app.route('/tasks')         //defining route
        .get(controller.index)  //get method returns multiple
        .post(controller.create)        //post method

    app.route('/tasks/:id')
        .get(controller.show)       //get method but by id - returns 1
        .put(controller.update)     // update method
        .delete(controller.destroy)    //delete method
      
}