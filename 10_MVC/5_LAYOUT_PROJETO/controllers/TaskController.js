import Task from '../models/Task.js'; // Ensure ".js" is included if it's an ES module

class TaskController {
    static createTask(req, res) {
        res.render('tasks/create');
    }

    static showTask(req, res) {
        res.render('tasks/all'); // Add this to prevent another error
    }
}

export default TaskController;
