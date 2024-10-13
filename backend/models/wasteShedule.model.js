const mongoose = require('mongoose');
const {Schema,  model} = mongoose

const wasteSheduleSchema = new Schema({

    wastType : [
        {type: String}
    ],
    address: {
        type: String
    },
    selectedDate : {
        type: Date
    },
    selectedTime : {
        type: String
    },
    userId:{
        type: String
    }
    
})