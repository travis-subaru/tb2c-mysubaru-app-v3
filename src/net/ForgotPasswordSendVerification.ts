// TODO: Wire

/**
 * {"success":true,"errorCode":null,"dataName":null,"data":null}
 */

fetch("https://mobileapi.qa.subarucs.com/g2v23/forgotPasswordSendVerification.json;jsessionid=50954685843DCA49F9AB7CF6FEFBD21E", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "http://localhost:8000/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "contactMethod=email&languageCode=en",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});
