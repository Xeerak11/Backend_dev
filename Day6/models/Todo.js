import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true, default: "Hey"},
    desc: String,
    isDone: Boolean,
    days: Number,
    tag:String
});
TodoSchema.pre('save', function (next) {
  if (!this.tag || this.tag === 'Sigma') {
    const tags = ['urgent', 'chill', 'work', 'personal', 'weird'];
    this.tag = tags[Math.floor(Math.random() * tags.length)];
  }
  next();
});
export const Todo = mongoose.model('Todo', TodoSchema);