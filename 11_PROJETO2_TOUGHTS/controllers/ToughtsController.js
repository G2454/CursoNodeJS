import Tought from "../models/Tought.js";
import User from "../models/User.js";


class ToughtsController{
    
    static async showToughts(req, res){
        res.render('toughts/home')
    }
    
}

export default ToughtsController