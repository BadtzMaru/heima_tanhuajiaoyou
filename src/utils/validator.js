export default {
  validatePhone(phone) {
    const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    return reg.test(phone);
  },
  renderRichText(text) {
    const finalList = [];
    const rule = /(\/\{.+?\})/g;
    const emoArr = text.match(rule);
    if (emoArr == null) {
      finalList.push({text});
    } else {
      const textArr = text.replace(rule, '￥￥').split('￥￥');
      while (textArr.length) {
        finalList.push({text: textArr.shift()});
        if (emoArr.length) {
          finalList.push({image: emoArr.shift()});
        }
      }
    }
    return finalList;
  },
};
