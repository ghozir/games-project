const crypto = require('crypto');
const argon2 = require('argon2');
const wrapper = require('../../helpers/utils/wrapper');
const config = require('../../infra/configs/global_config');
const _ = require('lodash');

const encrypt = (text, algorithm, secretKey) => {
  const iv = config.get('/cryptoConfig/iv');
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (text, algorithm, secretKey) => {
  const iv = config.get('/cryptoConfig/iv');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

const getHash = async (text) => {
  try {
    const hash = await argon2.hash(text).catch((err) => {
      throw err;
    });
    return wrapper.data(hash);
  } catch (error) {
    return wrapper.error(error);
  }
};

const verifyHash = async (argon2Hash, text) => {
  try {
    const result = await argon2.verify(argon2Hash, text).catch((err) => {
      throw err;
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(error);
  }
};

const mapTimezone = (tz) => {
  const timezoneMap = {
    WIB: 'Asia/Jakarta',
    WIT: 'Asia/Jayapura',
    WITA: 'Asia/Makassar',
  };
  return timezoneMap[tz] || 'Asia/Jakarta';
};

const deck = [
  { rank: 14, suit: 'hearts', name: 'Ace of Hearts' },
  { rank: 2, suit: 'hearts', name: '2 of Hearts' },
  { rank: 3, suit: 'hearts', name: '3 of Hearts' },
  { rank: 4, suit: 'hearts', name: '4 of Hearts' },
  { rank: 5, suit: 'hearts', name: '5 of Hearts' },
  { rank: 6, suit: 'hearts', name: '6 of Hearts' },
  { rank: 7, suit: 'hearts', name: '7 of Hearts' },
  { rank: 8, suit: 'hearts', name: '8 of Hearts' },
  { rank: 9, suit: 'hearts', name: '9 of Hearts' },
  { rank: 10, suit: 'hearts', name: '10 of Hearts' },
  { rank: 11, suit: 'hearts', name: 'Jack of Hearts' },
  { rank: 12, suit: 'hearts', name: 'Queen of Hearts' },
  { rank: 13, suit: 'hearts', name: 'King of Hearts' },
  { rank: 14, suit: 'diamonds', name: 'Ace of Diamonds' },
  { rank: 2, suit: 'diamonds', name: '2 of Diamonds' },
  { rank: 3, suit: 'diamonds', name: '3 of Diamonds' },
  { rank: 4, suit: 'diamonds', name: '4 of Diamonds' },
  { rank: 5, suit: 'diamonds', name: '5 of Diamonds' },
  { rank: 6, suit: 'diamonds', name: '6 of Diamonds' },
  { rank: 7, suit: 'diamonds', name: '7 of Diamonds' },
  { rank: 8, suit: 'diamonds', name: '8 of Diamonds' },
  { rank: 9, suit: 'diamonds', name: '9 of Diamonds' },
  { rank: 10, suit: 'diamonds', name: '10 of Diamonds' },
  { rank: 11, suit: 'diamonds', name: 'Jack of Diamonds' },
  { rank: 12, suit: 'diamonds', name: 'Queen of Diamonds' },
  { rank: 13, suit: 'diamonds', name: 'King of Diamonds' },
  { rank: 14, suit: 'clubs', name: 'Ace of Clubs' },
  { rank: 2, suit: 'clubs', name: '2 of Clubs' },
  { rank: 3, suit: 'clubs', name: '3 of Clubs' },
  { rank: 4, suit: 'clubs', name: '4 of Clubs' },
  { rank: 5, suit: 'clubs', name: '5 of Clubs' },
  { rank: 6, suit: 'clubs', name: '6 of Clubs' },
  { rank: 7, suit: 'clubs', name: '7 of Clubs' },
  { rank: 8, suit: 'clubs', name: '8 of Clubs' },
  { rank: 9, suit: 'clubs', name: '9 of Clubs' },
  { rank: 10, suit: 'clubs', name: '10 of Clubs' },
  { rank: 11, suit: 'clubs', name: 'Jack of Clubs' },
  { rank: 12, suit: 'clubs', name: 'Queen of Clubs' },
  { rank: 13, suit: 'clubs', name: 'King of Clubs' },
  { rank: 14, suit: 'spades', name: 'Ace of Spades' },
  { rank: 2, suit: 'spades', name: '2 of Spades' },
  { rank: 3, suit: 'spades', name: '3 of Spades' },
  { rank: 4, suit: 'spades', name: '4 of Spades' },
  { rank: 5, suit: 'spades', name: '5 of Spades' },
  { rank: 6, suit: 'spades', name: '6 of Spades' },
  { rank: 7, suit: 'spades', name: '7 of Spades' },
  { rank: 8, suit: 'spades', name: '8 of Spades' },
  { rank: 9, suit: 'spades', name: '9 of Spades' },
  { rank: 10, suit: 'spades', name: '10 of Spades' },
  { rank: 11, suit: 'spades', name: 'Jack of Spades' },
  { rank: 12, suit: 'spades', name: 'Queen of Spades' },
  { rank: 13, suit: 'spades', name: 'King of Spades' },
  { rank: 15, suit: 'joker', name: 'Red Joker' },
  { rank: 15, suit: 'joker', name: 'Black Joker' },
  { rank: 15, suit: 'joker', name: 'Joker 1' },
  { rank: 15, suit: 'joker', name: 'Joker 2' },
];

const deckNoJoker = [
  { rank: 14, suit: 'hearts', name: 'Ace of Hearts' },
  { rank: 2, suit: 'hearts', name: '2 of Hearts' },
  { rank: 3, suit: 'hearts', name: '3 of Hearts' },
  { rank: 4, suit: 'hearts', name: '4 of Hearts' },
  { rank: 5, suit: 'hearts', name: '5 of Hearts' },
  { rank: 6, suit: 'hearts', name: '6 of Hearts' },
  { rank: 7, suit: 'hearts', name: '7 of Hearts' },
  { rank: 8, suit: 'hearts', name: '8 of Hearts' },
  { rank: 9, suit: 'hearts', name: '9 of Hearts' },
  { rank: 10, suit: 'hearts', name: '10 of Hearts' },
  { rank: 11, suit: 'hearts', name: 'Jack of Hearts' },
  { rank: 12, suit: 'hearts', name: 'Queen of Hearts' },
  { rank: 13, suit: 'hearts', name: 'King of Hearts' },
  { rank: 14, suit: 'diamonds', name: 'Ace of Diamonds' },
  { rank: 2, suit: 'diamonds', name: '2 of Diamonds' },
  { rank: 3, suit: 'diamonds', name: '3 of Diamonds' },
  { rank: 4, suit: 'diamonds', name: '4 of Diamonds' },
  { rank: 5, suit: 'diamonds', name: '5 of Diamonds' },
  { rank: 6, suit: 'diamonds', name: '6 of Diamonds' },
  { rank: 7, suit: 'diamonds', name: '7 of Diamonds' },
  { rank: 8, suit: 'diamonds', name: '8 of Diamonds' },
  { rank: 9, suit: 'diamonds', name: '9 of Diamonds' },
  { rank: 10, suit: 'diamonds', name: '10 of Diamonds' },
  { rank: 11, suit: 'diamonds', name: 'Jack of Diamonds' },
  { rank: 12, suit: 'diamonds', name: 'Queen of Diamonds' },
  { rank: 13, suit: 'diamonds', name: 'King of Diamonds' },
  { rank: 14, suit: 'clubs', name: 'Ace of Clubs' },
  { rank: 2, suit: 'clubs', name: '2 of Clubs' },
  { rank: 3, suit: 'clubs', name: '3 of Clubs' },
  { rank: 4, suit: 'clubs', name: '4 of Clubs' },
  { rank: 5, suit: 'clubs', name: '5 of Clubs' },
  { rank: 6, suit: 'clubs', name: '6 of Clubs' },
  { rank: 7, suit: 'clubs', name: '7 of Clubs' },
  { rank: 8, suit: 'clubs', name: '8 of Clubs' },
  { rank: 9, suit: 'clubs', name: '9 of Clubs' },
  { rank: 10, suit: 'clubs', name: '10 of Clubs' },
  { rank: 11, suit: 'clubs', name: 'Jack of Clubs' },
  { rank: 12, suit: 'clubs', name: 'Queen of Clubs' },
  { rank: 13, suit: 'clubs', name: 'King of Clubs' },
  { rank: 14, suit: 'spades', name: 'Ace of Spades' },
  { rank: 2, suit: 'spades', name: '2 of Spades' },
  { rank: 3, suit: 'spades', name: '3 of Spades' },
  { rank: 4, suit: 'spades', name: '4 of Spades' },
  { rank: 5, suit: 'spades', name: '5 of Spades' },
  { rank: 6, suit: 'spades', name: '6 of Spades' },
  { rank: 7, suit: 'spades', name: '7 of Spades' },
  { rank: 8, suit: 'spades', name: '8 of Spades' },
  { rank: 9, suit: 'spades', name: '9 of Spades' },
  { rank: 10, suit: 'spades', name: '10 of Spades' },
  { rank: 11, suit: 'spades', name: 'Jack of Spades' },
  { rank: 12, suit: 'spades', name: 'Queen of Spades' },
  { rank: 13, suit: 'spades', name: 'King of Spades' },
];

const handRankings = [
  'high card',
  'one pair',
  'two pair',
  'three of a kind',
  'straight',
  'flush',
  'full house',
  'four of a kind',
  'straight flush',
  'royal flush',
];

const suitRankings = ['clubs', 'diamonds', 'hearts', 'spades'];

const deckData = (params) => {
  return wrapper.data({
    deck: params == 'deck' ? deck : deckNoJoker,
  });
};

const checkCard = (handDeck, tableDeck) => {
  const combined = handDeck.concat(tableDeck);

  handRankings.forEach((halo) => {});

  return wrapper.data();
};

const royalFlushCheck = (deck) => {
  let royaleRank = [10, 11, 12, 13, 14];
  deck = _.sortBy(deck, ['suit', 'rank']);

  let suitNow;
  for (const [index, card] of deck.entries()) {
    if (card.suit !== deck[index + 1].suit) {
      continue;
    }

    suitNow = card.suit;
    if (royaleRank.includes(card.rank)) {
      _.remove(royaleRank, (num) => num === card.rank);
    } else {
      royaleRank = [10, 11, 12, 13, 14];
      continue;
    }

    if (royaleRank.length === 0 && index !== 0) {
      return true;
    } else {
    }
  }

  if (deck.length >= 5) {
  } else {
  }
};

const isSameSuit = (cards) => {
  return cards.every((card) => card.suit === cards[0].suit);
};

const isSequential = (cards) => {
  const ranks = cards.map((card) => card.rank).sort((a, b) => a - b);
  return ranks.every((rank, i) => i === 0 || rank === ranks[i - 1] + 1);
};

module.exports = {
  encrypt,
  decrypt,
  getHash,
  verifyHash,
  mapTimezone,
  deckData,
};
