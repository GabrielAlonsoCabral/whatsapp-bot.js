const { Schema } = require('mongoose');

const templateSchema = new Schema({
    step:String,
    message:String,
    options:[{}]
})

const MessageTemplateSchema = new Schema(
{
    active:Boolean,
    templates:[templateSchema]
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);
module.exports = mongoose.model('MessageTemplateModel', MessageTemplateSchema);