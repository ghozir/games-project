const Command = require('./command');
const Query = require('../queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const Unauthorized = require('../../../../helpers/error/unauthorized_error');
const config = require('../../../../infra/configs/global_config');
const common = require('../../../../helpers/utils/common');
const { UnprocessableEntityError, NotFoundError, UnauthorizedError, ConflictError, InternalServerError } = require('../../../../helpers/error');
const _ = require('lodash');
const currency = require('currency-formatter');
const { uniqueNamesGenerator, names } = require('unique-names-generator');
const { ObjectId } = require('mongodb');

class PokerCommand {
  constructor(redis, db) {
    this.command = new Command(redis, db);
    this.ctx = 'authAdmin::command-domain';
    this.query = new Query(redis, db);
    this.config = config;
  }

  shuffleDeck(deck) {
    const newDeck = deck
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return newDeck;
  }

  async pokerStart(payload, user) {
    const arrays = this.shuffleDeck([1, 2, 3, 4, 5, 6].filter((num) => num !== payload.sitOnTable));
    const unusedDeck = await common.deckData('deck no joker').data.deck;

    const shuffledDeck = this.shuffleDeck(unusedDeck);
    const firstDeck = shuffledDeck.splice(0, 2);

    arrays.splice(-1 * (5 - payload.botNumber), 5 - payload.botNumber);
    const players = [
      {
        playerId: user.id,
        playerName: user.name,
        deckOnHand: firstDeck,
        tableIndex: payload.sitOnTable,
        money: 10000000,
        bid: 0,
      },
    ];

    arrays.forEach((bot) => {
      players.push({
        playerId: 'bot',
        playerName: uniqueNamesGenerator({ dictionaries: [names, names], style: 'capital', separator: ' ' }),
        deckOnHand: shuffledDeck.splice(0, 2),
        tableIndex: bot,
        money: 10000000,
        bid: 0,
      });
    });

    players.sort((a, b) => a.tableIndex - b.tableIndex);

    const queryUser = {
      round: 'preflop',
      match: 1,
      playerCount: 1,
      tableCount: 4,
      players: players,
      unusedDeck: shuffledDeck,
      deckOnTable: [],
      potRound: 0,
      tableTurn: 0,
      lastMaxBid: 0,
      roundMaxBid: 0,
      minBlind: 50000,
      smallBlind: 0,
      bigBlind: players.length - 1,
      log: [],
    };

    queryUser.log.push(`New game started with each player bid : ${currency.format(payload.startBid, { code: 'IDR' })}. Now Start with table`);

    const insertNewGame = await this.command.insertPokerNewGame(queryUser);
    if (insertNewGame.err) {
      logger.error(this.ctx, 'Failed to insert new game', 'pokerCommand::pokerStart', insertNewGame.err);
      throw new InternalServerError('Failed to insert new game');
    }

    return wrapper.data(queryUser);
  }

  async pokerNextMove(payload, user) {
    const data = await this.query.findOne({ _id: ObjectId(payload.id) });
    if (data.err) {
      logger.error(this.ctx, 'Failed to find game', 'pokerCommand::pokerNextMove', data.err);
      throw new NotFoundError('Game not found');
    }

    return wrapper.data(data);
  }
}

module.exports = PokerCommand;
