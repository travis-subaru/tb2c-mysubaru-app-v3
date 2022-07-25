
fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/lock/execute.json;jsessionid=486F109DF24A28E8323A5AB384405601", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "http://localhost:20924/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"pin\":\"1234\",\"delay\":0,\"forceKeyInCar\":false,\"vin\":\"4S3BMAA66D1038385\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  });

  fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/remoteService/status.json;jsessionid=486F109DF24A28E8323A5AB384405601?serviceRequestId=4S3BMAA66D1038385_1658774020437_20_%40NGTP&_=1658773958147", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "http://localhost:20924/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});

fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/condition/execute.json;jsessionid=486F109DF24A28E8323A5AB384405601?_=1658773958148", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "http://localhost:20924/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});


fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/unlock/execute.json;jsessionid=486F109DF24A28E8323A5AB384405601", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "http://localhost:20924/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"unlockDoorType\":\"ALL_DOORS_CMD\",\"pin\":\"1234\",\"delay\":0,\"vin\":\"4S3BMAA66D1038385\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});

fetch("https://mobileapi.qa.subarucs.com/g2v23/service/g2/remoteService/status.json;jsessionid=486F109DF24A28E8323A5AB384405601?serviceRequestId=4S3BMAA66D1038385_1658774162671_19_%40NGTP&_=1658773958150", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "http://localhost:20924/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
