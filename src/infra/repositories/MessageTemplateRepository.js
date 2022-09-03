const MessageTemplateModel = require('../models/MessageTemplateModel');
const ReturnFieldsConsultHelper = require('../helpers/ReturnFieldsConsultHelper');

class MessageTemplateRepository {
  async findOne (filters, fieldsReturns = null) {
    return await MessageTemplateModel.findOne(filters, ReturnFieldsConsultHelper({ arrayFields: fieldsReturns }));
  }

  async findOneWithLean (filters, fieldsReturns = null) {
    return await MessageTemplateModel.findOne(filters, ReturnFieldsConsultHelper({ arrayFields: fieldsReturns })).lean();
  }

  async findAllPaginate (searchConfig, options) {
    return await MessageTemplateModel.paginate(searchConfig, options);
  }

  async updateOneAndReturn (filters, modify) {
    return await MessageTemplateModel.findOneAndUpdate(filters, modify, { new: true });
  }

  async updateOneAndReturnWithLean (filters, modify) {
    return await MessageTemplateModel.findOneAndUpdate(filters, modify, { new: true }).lean();
  }

  async create (data) {
    return await MessageTemplateModel.create(data);
  }
}

module.exports = MessageTemplateRepository;