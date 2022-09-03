const ReturnFieldsConsultHelper = ({ arrayFields }) => {
    let finalObject = {};
    if (!arrayFields) return finalObject;
  
    arrayFields.forEach(field => {
      finalObject = { ...finalObject, [field]: 1 };
    });
  
    return finalObject;
  };
  
  module.exports = ReturnFieldsConsultHelper;