const WasteModel = require('../models/wasteShedule.model')
const UserModel = require('../models/userSchema')


const createSchedule = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { wasteType, selectedDate, selectedTime } = req.body;

        // Fetch the user by ID
        const getUser = await UserModel.findById(userId);
        if (!getUser) {
            return res.status(404).json({ status: 'failed', message: 'User not found' });
        }

        const address = getUser.Address;

        // Create new schedule with 'new' keyword
        const data = new WasteModel({
            userId,
            wasteType,
            selectedDate,
            selectedTime,
            address
        });

        // Save the new schedule to the database
        const savedData = await data.save();

        // Return success response
        return res.status(200).json({ status: 'success', message: 'Schedule created successfully', data: savedData });

    } catch (error) {
        // Return internal server error response
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};

const  getAllSchedules = async (req, res) => {
    try {
        const getScheduls = await WasteModel.find();
        res.status(200).json({ status: 'success', message: 'Schedules fetched successfully', data: getScheduls });
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
}

const getScheduleById = async (req, res) => {
    try {
        const {id} = req.params;
        const getSchedule = await WasteModel.findById(id);
        res.status(200).json({ status: 'success', message: 'Schedule fetched successfully', data: getSchedule });
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
        
    }
}

const updateSchedule = async (req, res) => {
    try {

        const {id} = req.params;
        const { wasteType, selectedDate, selectedTime } = req.body;
        const updateSchedule = await WasteModel.findByIdAndUpdate(id, {
            $set:{
                wasteType, 
                selectedDate, 
                selectedTime
            }
        }, {new: true});
        res.status(200).json({ status: 'success', message: 'Schedule updated successfully', data: updateSchedule
        })

        
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
        
    }
}

const deleteSchedule = async (req, res) => {

    try {

        const {id} = req.params;
        const deleteSchedule = await WasteModel.findByIdAndDelete(id);
        res.status(200).json({ status: 'success', message: 'Schedule deleted successfully', data: deleteSchedule });
        
    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
        
    }
}


module.exports = {
    createSchedule, 
    getAllSchedules, 
    getScheduleById, 
    updateSchedule, 
    deleteSchedule
}