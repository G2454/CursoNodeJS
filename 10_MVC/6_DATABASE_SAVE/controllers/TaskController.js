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

    static showTask(req, res) {
        res.render('tasks/all'); // Add this to prevent another error
    }
}

export default TaskController;
