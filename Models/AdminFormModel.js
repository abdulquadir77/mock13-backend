const mongoose = require("mongoose");

const adminFormSchema = mongoose.Schema({
  company_name: { type: String, require: true },
  position: { type: String, require: true },
  contract: { type: String, require: true },
  location: { type: String, require: true },
});

const AdminFormModel = mongoose.model("job_lists", adminFormSchema);

module.exports = AdminFormModel;
