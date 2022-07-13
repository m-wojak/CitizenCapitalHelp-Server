module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        topic: String,
        title: String,
        description: String,
        author: String
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const HelpSection = mongoose.model("help_section", schema);
    return HelpSection;
  };