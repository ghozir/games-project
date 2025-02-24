const Joi = require('joi');

const pokerNew = Joi.object({
  botNumber: Joi.number().optional().min(0).max(5).default(1),
  startBid: Joi.number().required().min(100000),
  sitOnTable: Joi.number().required().min(1).max(6),
});

const pokerNextMove = Joi.object({
  id: Joi.string().required().hex().length(24),
  playerChoice: Joi.string().optional().default(null).valid('call', 'raise', 'fold', 'all-in', null),
  amount: Joi.number().optional().default(0),
});

module.exports = {
  pokerNextMove,
  pokerNew,
};
