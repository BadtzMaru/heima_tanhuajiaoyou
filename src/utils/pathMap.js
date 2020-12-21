/**
 * 接口基地址
 */
export const BASE_URI = 'http://157.122.54.189:9089';

/**
 *  登录 获取验证码
 */
export const ACCOUNT_LOGIN = '/user/login'; // 登录
/**
 *  新用户信息注册
 */
export const ACCOUNT_REGINFO = '/user/loginReginfo'; // 新用户信息注册
/**
 *  检查验证码
 */
export const ACCOUNT_VALIDATEVCODE = '/user/loginVerification'; // 检查验证码
/**
 * 审核头像
 */
export const ACCOUNT_CHECKHEADIMAGE = '/user/loginReginfo/head'; //审核头像
/**
 * 审核头像
 */
export const USER_INFO = '/my/userinfo'; //审核头像

/**
 * 最近来访
 */
export const FRIENDS_VISITORS = '/friends/visitors'; // 最近来访
/**
 * 最近来访
 */
export const FRIENDS_TODAYBEST = '/friends/todayBest'; // 最近来访
/**
 * 推荐朋友
 */
export const FRIENDS_RECOMMEND = '/friends/recommendation'; // 推荐朋友
/**
 * 探花-左滑右滑-数据
 */
export const FRIENDS_CARDS = '/friends/cards'; // 探花-左滑右滑-数据
/**
 * 探花-喜欢和不喜欢
 */
export const FRIENDS_LIKE = '/friends/like/:id/:type'; // 探花-喜欢和不喜欢
/**
 * 搜附近
 */
export const FRIENDS_SEARCH = '/friends/search'; // 搜附近
/**
 * 测灵魂-问卷列表
 */
export const FRIENDS_QUESTIONS = '/friends/questions'; // 测灵魂-问卷列表
/**
 * 测灵魂 测试题
 */
export const FRIENDS_QUESTIONSECTION = '/friends/questionSection/:id'; // 测灵魂 测试题
/**
 * 测灵魂-提交问卷获得鉴定单信息
 */
export const FRIENDS_QUESTIONANS = '/friends/questionsAns/:id'; // 测灵魂-提交问卷获得鉴定单信息
/**
 * 朋友信息（点击朋友进入）;
 */
export const FRIENDS_PERSONALINFO = '/friends/personalInfo/:id'; // 朋友信息（点击朋友进入）;

// 圈子接口(QZ)
/**
 *  推荐动态
 */
export const QZ_TJDT = '/qz/recommend'; // 推荐动态
/**
 *  最新动态
 */
export const QZ_ZXDT = '/qz/newtrends'; // 最新动态
/**
 * 单条动态评论
 */
export const QZ_DT_PL = '/qz/comment/:id'; //单条动态评论
/**
 *  动态-点赞&取消点赞
 */
export const QZ_DT_DZ = '/qz/star/:id'; // 动态-点赞&取消点赞
/**
 *  动态-喜欢&取消喜欢
 */
export const QZ_DT_XH = '/qz/like/:id'; // 动态-喜欢&取消喜欢
/**
 *  动态-不感兴趣
 */
export const QZ_DT_BGXQ = '/qz/noInterest/:id'; // 动态-不感兴趣
/**
 * 评论-点赞
 */
export const QZ_DT_PL_DZ = '/qz/comments/star/:id'; //评论-点赞
/**
 * 评论-提交
 */
export const QZ_DT_PL_TJ = '/qz/comments/submit/:id'; //评论-提交
/**
 * 动态-图片-上传
 */
export const QZ_IMG_UPLOAD = '/qz/trends/image/upload'; //动态-图片-上传
/**
 *   动态发布
 */
export const QZ_DT_PUBLISH = '/qz/trend/submit'; //  动态发布

/**
 * 我的信息
 */
export const MY_INFO = '/my/userinfo'; //我的信息

/**
 * 我的动态
 */
export const MY_TRENDS = '/my/trends';
/**
 * 互相喜欢，喜欢，粉丝 - 统计
 */
export const MY_COUNTS = '/my/counts';
/**
 * 个人信息保存
 */
export const MY_SUBMITUSERINFO = '/my/submitUserInfo';
/**
 * 喜欢列表数据接口
 */
export const MY_LIKELIST = '/my/likelist';
