const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({

    title : {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, "Title must be at least 3 characters"]
    },
    company : {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, "Company must be at least 3 characters"]
    },
    salary: {
        type: Number,
        required: [true, "{PATH} is required"],
        min: [50000, "Min salary is 50000"]
    },
    isRemote: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

module.exports.Job = mongoose.model('Job', JobSchema)