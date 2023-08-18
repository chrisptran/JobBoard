const { Job } = require("../models/job.model")

module.exports.allJobs = (req, res) => {
    Job.find()
        .then(jobList => res.json(jobList))
        .catch(err => res.status(400).json(err))
}

module.exports.oneJob = (req, res) => {
    Job.findOne({ _id: req.params.id })
        .then(oneJob => res.json(oneJob))
        .catch(err => res.status(400).json(err))
}

module.exports.addJob = (req, res) => {
    Job.create(req.body)
        .then(createdJob => res.json(createdJob))
        .catch(err => res.status(400).json(err))
}

module.exports.updateJob = (req, res) => {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedJob => res.json(updatedJob))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteJob = (req, res) => {
    Job.deleteOne({_id: req.params.id})
    .then(status => res.json(status))
    .catch(err => res.status(400).json(err))
}