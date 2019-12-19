const mongoose = require('mongoose')
    Sale = mongoose.Schema({

    client: {
        type: String,
        require: true,
    },
    payment: {
        type: String,
        require: true,
    },
    cash: {
        type: Number,
        require: true,
    },
    gold: {
        type: String
    },
    dateAt: {
        type: String
    },
    dateIn: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('sales', Sale)