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

  // 清除用户信息
  @action clearUser() {
    this.user = {};
  }
}

export default new UserStore();
