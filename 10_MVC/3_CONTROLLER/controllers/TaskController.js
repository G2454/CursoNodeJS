import Task from '../models/Task'

module.exports = class TaskController{

    static createTask(req, res){
        res.render('task/create')
    }

}