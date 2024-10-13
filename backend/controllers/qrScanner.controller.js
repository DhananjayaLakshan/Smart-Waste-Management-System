const QRmodel = require('../models/qrScanner.model');
const UserModel = require('../models/userSchema');
const Message = require('../models/message.model');

const createQR = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        const { location, wasteType, weight, level, owner } = req.body;
        const userId = req.user.userId;

        const getCollector = await UserModel.findById(userId);
        if (!getCollector) {
            return res.status(404).json({ status: 'failed', message: 'User not found' });
        }

        const collectorName = getCollector.Name;

        const qrData = {
            location,
            wasteType,
            weight,
            level,
            owner,
            collector: collectorName
        };

        const createQR = await QRmodel.create(qrData);
        if (!createQR) {
            return res.status(404).json({ status: 'failed', message: 'QR code not created' });
        }

        const getUser = await UserModel.findOne({ Name: owner });
        if (!getUser) {
            return res.status(404).json({ status: 'failed', message: 'User not found' });
        }

        const OwnerId = getUser._id;
        const message = `Your garbage of type ${wasteType} weighing ${weight}Kg at ${level}% level has been collected by ${collectorName}.`;

        const messageData = {
            content: message,
            userId: OwnerId
        };

        const createMessage = await Message.create(messageData);
        if (!createMessage) {
            return res.status(404).json({ status: 'failed', message: 'Message not created' });
        }

        // Both QR code and message creation succeeded, send one response
        return res.status(200).json({
            status: 'success',
            message: 'QR code and message created successfully',
            qrData: createQR,
            messageData: createMessage
        });

    } catch (error) {
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};


const getQR = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        const getQR = await QRmodel.find();

        if (!getQR) {
            return res.status(404).json({ status: 'failed', message: 'QR code not found' });
        }

        return res.status(200).json({ status: 'success', message: 'QR code retrieved successfully', data: getQR });

    } catch (error) {

    }
}

const getQRByType = async (req, res) => {
    try {
        const { type } = req.params;  // Correct way to get the "type" parameter from the URL

        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(401).json({ status: 'failed', message: 'You are not authorized to perform this action' });
        }

        // Find QR codes based on wasteType
        const getQR = await QRmodel.find({ wasteType: type });

        // If no QR codes found, return a 404
        if (!getQR || getQR.length === 0) {
            return res.status(404).json({ status: 'failed', message: 'No QR codes found for the given waste type' });
        }

        // Successfully found QR codes
        return res.status(200).json({ status: 'success', message: 'QR codes retrieved successfully', data: getQR });

    } catch (error) {
        // Handle any internal server errors
        return res.status(500).json({ status: 'failed', message: 'Internal server error', error: error.message });
    }
};



const updateQR = async (req, res) => {
    try {

    } catch (error) {

    }
}



const deleteQR = async (req, res) => {
    try {

    } catch (error) {

    }
}



module.exports = {
    createQR,
    getQR,
    updateQR,
    deleteQR,
    getQRByType
}