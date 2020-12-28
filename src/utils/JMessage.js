import JMessage from 'jmessage-react-plugin';
import Toast from './Toast';

export default {
  // 初始化
  init() {
    JMessage.init({
      appkey: 'c0c08d3d8babc318fe25bb0c',
      isOpenMessageRoaming: true,
      isProduction: false,
      channel: '',
    });
  },
  // 注册
  register(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.register(
        {
          username,
          password,
        },
        resolve,
        reject,
      );
    });
  },
  // 登陆
  login(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.login(
        {
          username,
          password,
        },
        resolve,
        reject,
      );
    });
  },
  /* 
		极光 - 发送文本消息
		@param {String} username 要接收信息的对象
		@param {String} text 消息文本
		@param {Object} extras 发送消息额外携带的参数
	*/
  sendTextMessage(username, text, extras) {
    return new Promise((resolve, reject) => {
      // 消息类型 单个 即可
      const type = 'single';
      JMessage.sendTextMessage({type, username, text, extras}, resolve, reject);
    });
  },
  /* 
    获取历史消息
  	@param {String} username 要接收信息的对象
		@param {Number} from 从第几条开始获取
		@param {Number} limit 一共要获取几条
  */
  getHistoryMessages(username, from, limit) {
    return new Promise((resolve, reject) => {
      JMessage.getHistoryMessages({type: 'single', username, from, limit}, resolve, reject);
    });
  },
  /* 
    发送图片消息
  	@param {String} username 要接收信息的对象
		@param {String} path 图片路径
		@param {Object} extras 发送消息额外携带的参数
  */
  sendImageMessage(username, path, extras = {}) {
    return new Promise((resolve, reject) => {
      JMessage.sendImageMessage({type: 'single', username, path, extras}, resolve, reject);
    });
  },
  // 获取当前登录用户的未读消息
  getConversations() {
    Toast.showLoading('获取中');
    return new Promise((resolve, reject) => {
      JMessage.getConversations((res) => {
        Toast.hideLoading();
        resolve(res);
      }, reject);
    });
  },
  // 退出
  logout: JMessage.logout,
};
