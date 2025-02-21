const validate = require('validate.js');
const mongoConnection = require('./connection');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');

class DB {
  constructor(config, dbName) {
    this.config = config;
    this.dbName = dbName;
  }

  setCollection(collectionName) {
    this.collectionName = collectionName;
  }

  getDatabase() {
    const config = this.config.replace('//', '');
    /* eslint no-useless-escape: "error" */
    const pattern = new RegExp('/([a-zA-Z0-9-_]+)?');
    const dbName = pattern.exec(config);
    return dbName[1];
  }

  async findOne(
    params,
    projection = {},
    sortFields = {},
    dbName = this.dbName
  ) {
    const ctx = 'mongodb-findOne';
    const result = await mongoConnection.getConnection(this.config);
    if (!dbName) {
      dbName = this.getDatabase();
    }
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.findOne(params, {
        projection,
        sort: sortFields,
      });
      if (validate.isEmpty(recordset)) {
        return wrapper.data(null);
      }
      return wrapper.data(recordset);
    } catch (err) {
      logger.log(ctx, err.message, 'Error find data in mongodb');
      return wrapper.error(`Error Find One Mongo ${err.message}`);
    }
  }

  async findMany(params, projection = {}, sort = {}, dbName = this.dbName) {
    const ctx = 'mongodb-findMany';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.find(params, { projection, sort }).toArray();
      if (validate.isEmpty(recordset)) {
        return wrapper.data([]);
      }
      return wrapper.data(recordset);
    } catch (err) {
      logger.log(ctx, err.message, 'Error find data in mongodb');
      return wrapper.error(`Error Find Many Mongo ${err.message}`);
    }
  }

  async findPaginated(
    sortByfield,
    size,
    page,
    params,
    sortOrder = 1,
    projection = {},
    dbName = this.dbName
  ) {
    const ctx = 'mongodb-findPaginated';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const sortParam = { [sortByfield]: sortOrder };
      const pageParam = size * (page - 1);
      const recordset = await db
        .find(params, { projection })
        .sort(sortParam)
        .limit(size)
        .skip(pageParam)
        .toArray();
      const { data: totalData } = await this.countAll(params);
      if (validate.isEmpty(recordset)) {
        return wrapper.paginationData([], {
          totalData,
          totalPage: 1,
        });
      }
      return wrapper.paginationData(recordset, {
        totalData,
        totalPage: Math.ceil(totalData / size),
      });
    } catch (err) {
      logger.log(ctx, err.message, 'Error upsert data in mongodb');
      return wrapper.error(`Error Mongo ${err.message}`);
    }
  }

  async insertOne(document, dbName = this.dbName) {
    const ctx = 'mongodb-insertOne';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.insertOne(document);
      if (recordset.insertedCount !== 1) {
        return wrapper.error('Failed Inserting Data to Database');
      }
      return wrapper.data(document);
    } catch (err) {
      logger.log(ctx, err.message, 'Error insert data in mongodb');
      return wrapper.error(`Error Insert One Mongo ${err.message}`);
    }
  }

  async insertMany(documents, dbName = this.dbName) {
    const ctx = 'mongodb-insertMany';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const recordset = await db.insertMany(documents);
      if (recordset.insertedCount < 1) {
        return wrapper.error('Failed Inserting Data to Database');
      }
      return wrapper.data(documents);
    } catch (err) {
      logger.log(ctx, err.message, 'Error insert data in mongodb');
      return wrapper.error(`Error Insert Many Mongo ${err.message}`);
    }
  }

  async updateOne(params, updateDocument, dbName = this.dbName) {
    const ctx = 'mongodb-updateOne';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.updateOne(params, { $set: updateDocument });
      if (data.modifiedCount > 0) {
        const recordset = await this.findOne(params);
        return wrapper.data(recordset.data);
      }
      return wrapper.error('Failed updating data');
    } catch (err) {
      logger.log(ctx, err.message, 'Error update data in mongodb');
      return wrapper.error(`Error Update Mongo ${err.message}`);
    }
  }

  async updateMany(params, updateDocument, pushtoArray, dbName = this.dbName) {
    const ctx = 'mongodb-updateMany';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const query = { $set: updateDocument };
    if (pushtoArray) {
      query.$push = pushtoArray;
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.updateMany(params, query);
      if (data.modifiedCount >= 0) {
        const recordset = await this.findOne(params);
        return wrapper.data(recordset.data);
      }
      return wrapper.error('Failed updating data');
    } catch (err) {
      logger.log(ctx, err.message, 'Error update data in mongodb');
      return wrapper.error(`Error Update Mongo ${err.message}`);
    }
  }

  async upsertOne(params, updateDocument, dbName = this.dbName) {
    const ctx = 'mongodb-upsertOne';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.updateOne(
        params,
        { $set: updateDocument },
        { upsert: true }
      );
      if (data.upsertedCount >= 0) {
        const recordset = await this.findOne(params);
        return wrapper.data(recordset.data);
      }
      return wrapper.error('Failed upserting data');
    } catch (err) {
      logger.log(ctx, err.message, 'Error upsert data in mongodb');
      return wrapper.error(`Error Upsert Mongo ${err.message}`);
    }
  }

  async deleteOne(params, dbName = this.dbName) {
    const ctx = 'mongodb-deleteOne';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.deleteOne(params);
      if (data.deletedCount > 0) {
        return wrapper.data(true);
      }
      return wrapper.error('Failed deleting data');
    } catch (err) {
      logger.log(ctx, err.message, 'Error upsert data in mongodb');
      return wrapper.error(`Error Upsert Mongo ${err.message}`);
    }
  }

  async countAll(params, dbName = this.dbName) {
    const ctx = 'mongodb-countAll';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const count = await db.countDocuments(params);
      return wrapper.data(count);
    } catch (err) {
      logger.log(ctx, err.message, 'Error count data in mongodb');
      return wrapper.error(`Error Mongo ${err.message}`);
    }
  }

  async aggregate(params, dbName = this.dbName) {
    const ctx = 'mongodb-aggregate';
    if (!dbName) {
      dbName = this.getDatabase();
    }
    const result = await mongoConnection.getConnection(this.config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    }
    try {
      const cacheConnection = result.data.db;
      const connection = cacheConnection.db(dbName);
      const db = connection.collection(this.collectionName);
      const data = await db.aggregate(params).toArray();
      return wrapper.data(data);
    } catch (err) {
      logger.log(ctx, err.message, 'Error aggregate data in mongodb');
      return wrapper.error(`Error Mongo ${err.message}`);
    }
  }
}

module.exports = DB;
