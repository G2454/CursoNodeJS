import { raw } from 'express';
import Task from '../models/Task.js'; // Ensure ".js" is included if it's an ES module

class TaskController {
    static createTask(req, res) {
        res.render('tasks/create');
    }

    static async createTaskSave(req, res) {
        const task ={
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task)
        res.redirect('/tasks')
    }

    static async showTask(req, res) {

        const tasks = await Task.findAll({raw:true})

        res.render('tasks/all', {tasks}); // Add this to prevent another error
    }
}

export default TaskController;
