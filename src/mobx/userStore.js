import {observable, action, makeObservable} from 'mobx';

class UserStore {
	constructor() {
		// 使用 makeObservable mobx6.0 才会更新视图
		makeObservable(this);
	}
	@observable user = {};

	@action setUser(user) {
		this.user = user;
	}
}

export default new UserStore();
