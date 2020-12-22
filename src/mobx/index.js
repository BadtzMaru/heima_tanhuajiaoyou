import {observable, action} from 'mobx';

class RootStore {
	// observable 表示数据可监控,表示是全局数据
	// action 表示行为

	// 手机号码
	@observable mobile = '';
	// token
	@observable token = '';
	// 用户唯一id
	@observable userId = '';

	@action setUserInfo(mobile, token, userId) {
		this.mobile = mobile;
		this.token = token;
		this.userId = userId;
	}
}

export default new RootStore();
