const { Log } = require('../models/index')

const adminMessagessEn = require('../lang/en/adminMessages.json');
const getuserMessagessEn = require('../lang/en/userMessages.json');
const geterrorMessagessEn = require('../lang/en/errorMessages.json');




const getuserMessagess = (messageKey, lang = 'en') => {
  let apiMessagesSource;
  if (lang === 'en') {
    apiMessagesSource = getuserMessagessEn;
  }


  const messageKeyArr = messageKey.split('.');
  const sourceMessageObjKey = messageKeyArr[0];
  const tempMessageKey = messageKeyArr[1];

  if (tempMessageKey in apiMessagesSource[sourceMessageObjKey]) {
    return apiMessagesSource[sourceMessageObjKey][tempMessageKey];
  }
  return 'No appropriate message found for api.';
};

const geterrorMessagess = (messageKey, lang = 'en') => {
  let apiMessagesSource;
  if (lang === 'en') {
    apiMessagesSource = geterrorMessagessEn;
  }


  const messageKeyArr = messageKey.split('.');
  const sourceMessageObjKey = messageKeyArr[0];
  const tempMessageKey = messageKeyArr[1];

  if (tempMessageKey in apiMessagesSource[sourceMessageObjKey]) {
    return apiMessagesSource[sourceMessageObjKey][tempMessageKey];
  }
  return 'No appropriate message found for api.';
};


const getadminMessagess = (messageKey, lang = 'en') => {
  let apiMessagesSource;
  if (lang === 'en') {
    apiMessagesSource = adminMessagessEn;
  } else if (lang === 'fr') {
    apiMessagesSource = adminMessagessEn;
  } else {
    apiMessagesSource = adminMessagessEn;
  }


  const messageKeyArr = messageKey.split('.');
  const sourceMessageObjKey = messageKeyArr[0];
  const tempMessageKey = messageKeyArr[1];

  if (tempMessageKey in apiMessagesSource[sourceMessageObjKey]) {
    return apiMessagesSource[sourceMessageObjKey][tempMessageKey];
  }
  return 'No appropriate message found for api.';
};



module.exports = {
  getuserMessagess,
  getadminMessagess,
  geterrorMessagess,
};
