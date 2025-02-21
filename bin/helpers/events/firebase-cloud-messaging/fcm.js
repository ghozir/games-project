const logger = require('../../utils/logger');
const wrapper = require('../../utils/wrapper');
const { InternalServerError } = require('../../error');
const { getConnection, isConnected } = require('./connection');

class FCM {
  /**
   *
   * @param {String} projectId;
   */
  constructor (projectId) {
    this.projectId = projectId;
  }
  async sendToDevice(registrationToken, data, options = {}) {
    if(!isConnected(this.projectId)){
      const message = 'Not connected to firebase';
      logger.error('helper-fcm', message);
      return wrapper.error(new InternalServerError(message));
    }
    const { messaging } = getConnection(this.projectId);
    try {
      const result = await messaging().send({
        token: registrationToken,
        data,
        notification:{
          title: 'Pesan Obrolan Baru',
          body: 'Yuk baca pesan obrolan baru'
        },
        android: options,
      });
      return wrapper.data(result);
    } catch (error) {
      logger.error('helper-fcm', error);
      return wrapper.error(new InternalServerError(error.message));
    }
  }

  async sendToManyDevice(registrationTokens, data, options = {}, message = {}){
    if(!isConnected(this.projectId)){
      const errorMessage = 'Not connected to firebase';
      logger.error('helper-fcm', errorMessage);
      return wrapper.error(new InternalServerError(errorMessage));
    }
    const { messaging } = getConnection(this.projectId);
    const messagesIds = [];
    const errors = [];
    const result = await messaging().sendEachForMulticast({
      tokens: registrationTokens,
      data,
      notification:{
        title: message.title || 'Notifikasi Baru',
        body: message.body || ''
      },
      android : {
        ...options,
        priority: 'high',
      },
    });
    result.responses.forEach(v =>{
      if(v.success){
        messagesIds.push(v.messageId);
      }
      else errors.push(v.error);
    });

    if(result.successCount == 0){
      const mappedError = result.responses.map(v => v.error);
      logger.error('helper-fcm', mappedError);
      return wrapper.error(new InternalServerError(mappedError));
    }

    return wrapper.data({
      successCount: result.successCount,
      failedCount: result.failureCount,
      successMessageIds: messagesIds,
      errors
    });
  }
  async sendToTopics(topicName, data, options = {}){
    if(!isConnected(this.projectId)){
      const message = 'Not connected to firebase';
      logger.error('helper-fcm', message);
      return wrapper.error(new InternalServerError(message));
    }
    const { messaging } = getConnection(this.projectId);
    const result = await messaging().sendToTopic(topicName, {
      data,
      notification:{
        title: 'Pesan Obrolan Baru',
        body: 'Yuk baca pesan obrolan baru'
      },
    }, options);
    if(!result.messageId){
      logger.error('helper-fcm', 'Error when sending topic');
      return wrapper.error(new InternalServerError('Error sending topic'));
    }
    return wrapper.data(result.messageId);
  }
}

module.exports = FCM;
