// constants.js
export const paymentCycleOptions = {
  '0': "月付",
  '1': "季付",
  '2': "半年付",
  '3': "年付",
  '4': "二年付",
  '5': "三年付",
  '6': "五年付",
};

export const diskTypeOptions = {
  '0': "SSD",
  '1': "NVME",
  '2': "HDD",
};

export const currencyOptions = {
  '0': "USD",
  '1': "CNY",
  '2': "HKD",
  '3': "EUR",
  '4': "GBP",
  '5': "JPY",
};

export const availableOptions = {
  'false': "无货",
  'true': "有货",
};

export const scoreOptions = {
  '0': "0分",
  '1': "1分",
  '2': "2分",
  '3': "3分",
  '4': "4分",
  '5': "5分",
};
export const merchantTypeOptions = {
  '0': "国外商家",
  '1': "国外OneMan",
  '2': "国人商家",
  '3': "国人OneMan",
};

export const renderStars = (score) => {
  const validScore = typeof score === 'number' && score >= 0 && score <= 5 ? score : 0;
  const fullStars = Math.floor(validScore);
  const emptyStars = 5 - fullStars;
  let starsHTML = [];

  // 添加满星
  for (let i = 0; i < fullStars; i++) {
    starsHTML.push(m('i.fas.fa-star'));
  }

  // 添加空心星
  for (let i = 0; i < emptyStars; i++) {
    starsHTML.push(m('i.far.fa-star'));
  }

  return starsHTML;
};

