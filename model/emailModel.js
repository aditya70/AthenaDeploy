//const Joi = require('joi');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
 
module.exports = {
    userId: Joi.string().required(),
    email : Joi.string().email().max(256).required(),
    startDate: Joi.date().format('YYYY-MM-DD').options({ convert: true }).required(),
    endDate: Joi.date().format('YYYY-MM-DD').options({ convert: true }).required()
  }