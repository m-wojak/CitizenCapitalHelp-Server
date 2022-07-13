module.exports = app => {
    const help_sections = require("../controllers/help_section.controller.js");
    var router = require("express").Router();
    // Create a new help_section
    router.post("/", help_sections.create);
    // Retrieve all help_sections by title
    router.get("/", help_sections.findAllTitles);
    // Retrieve all help_sections by topic
    router.get("/topic/:topic", help_sections.findAllByTopic);
    // Retrieve one help_section by topic and title
    router.get("/:topic/:title", help_sections.findOneByTopicAndTitle);
    // Retrieve a single help_section with id
    router.get("/:id", help_sections.findOne);
    // Update a help_section with id
    router.put("/:id", help_sections.update);
    // Delete a help_section with id
    router.delete("/:id", help_sections.delete);
    // Create a new help_section
    router.delete("/", help_sections.deleteAll);
    app.use('/api/help_sections', router);
  };