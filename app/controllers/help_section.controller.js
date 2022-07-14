const db = require("../models");
const HelpSection = db.help_sections;
// Create and Save a new help_section
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a help_section
  const help_section = new HelpSection({
    topic: req.body.topic,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  });
  // Save help_section in the database
  help_section
    .save(help_section)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the help_section."
      });
    });
};
// Retrieve all help_sections by description from the database.
exports.findAllDescriptions = (req, res) => {
  const description = req.query.description;
  var condition = description ? { description: { $regex: new RegExp(description), $options: "i" } } : {};
  HelpSection.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving help_sections."
      });
    });
};
// Retrieve all help_sections by title from the database.
exports.findAllTitles = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  HelpSection.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving help_sections."
      });
    });
};
// Retrieve all help_sections.titles by topic from the database.
exports.findAllByTopic = (req, res) => {
  const topic = req.params.topic;
  HelpSection.find( {'topic': topic} )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving help_sections."
      });
    });
};
// Retrieve all help_sections by topic from the database.
exports.findAllTopics = (req, res) => {
  const topic = req.query.topic;
  var condition = topic ? { topic: { $regex: new RegExp(topic), $options: "i" } } : {};
  HelpSection.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving help_sections."
      });
    });
};
// Find a single help_section with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  HelpSection.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found help_section with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving help_section with id=" + id });
    });
};
// Find a single help_section with a topic and title
exports.findOneByTopicAndTitle = (req, res) => {
  const topic = req.params.topic;
  const title = req.params.title;
  HelpSection.findOne({ 'topic': topic, 'title': title })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found help_section with topic= " + topic + " and title= " + title });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving help_section with topic= " + topic + " and title= " + title });
    });
};
// Update a help_section by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  HelpSection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update help_section with id=${id}. Maybe help_section was not found!`
        });
      } else res.send({ message: "help_section was updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating help_section with id=" + id
      });
    });
};
// Delete a help_section with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  HelpSection.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete help_section with id=${id}. Maybe help_section was not found!`
        });
      } else {
        res.send({
          message: "help_section was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete help_section with id=" + id
      });
    });
};
// Delete all help_sections from the database.
exports.deleteAll = (req, res) => {
  HelpSection.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} help_sections were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all help_sections."
      });
    });
};