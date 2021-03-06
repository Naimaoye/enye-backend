//const axios = require("axios");
//const moment = require("moment");
const admin = require("firebase-admin");

const config = {
  "type": "service_account",
  "project_id": "enye-280409",
  "private_key_id": "e560cf25ce326c6484fcf4ebe68c75edd38cb85b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMolWZ98zWZcS0\n6GjcEQGByd/skVuvKSO4TeceTXvv9jqQjNVFMK2NOU047GVDnpACt64Ju4msgyIE\n973Siy8ZrpyE9nld+APILvKYtZJV0YY5RsL0r5xsmhzOmQ532pEvcYUWdM4tjpKs\nC8rhLg14Tp5SEy79QmrNk20A4Lrw57O9+TvC+WUkGtRqmFavKU02JwJ3Fd9b00cp\nLIdFPi7KP8nL6+bpis7T9E8W9vDRCRicLNrTWsFoB9B9uyzGCmD8uILMylkZ0KkF\n3vK2G+unWmswRPG0ZXBN8oTXN7SlvBkPHB9TXBkDybzRYTBrFCCEykjrW4R1GVCu\nzZa4yohxAgMBAAECggEADHIEyGJ/EmzB8PH30ycEX0IxqIXKZIG5NLvFrjTOkGh6\ndTlAfQbV7kptbzRm3/z+M5Eb4EcH625WAMT3tiztfFePmMFT/i5f3gJXcijMVaRy\noCwE3jxqNDtu/DRoMitAhFj4S/ZmhfQnaNfmgsmSC4amB7Y3l9Ls05QHV4vjaLRl\n6Lz0VIfxqm/HsXKh+ZRT4UHszViyfoPcqQ0jGHRoYUQfI0Rnl1PCTdQbtMf5AQqw\n+WfQDqyY9pNQHoH6x+pEnShXAnn7CDlmL9ZiT0byLD4vxrY7xqD51pKzwcm0ATrS\nQYRCourbtY7u6IQ188wrCgxlGxYksxzKRmU1LaDrQQKBgQDzE+IRhN6BVuZco4Fw\nouM5BCW7rt+dAPuDoeFg7rDZcDniL/gicB7+1syNPEoP49rzRdDr4Qd9PyAomeUq\nqirUkm1wNWHibfKmlQkjyn8eSKonKhYvR01e+yt5WkI6VHFkY9hIlYrg/E/HGdym\nxyYoN9SQpWL+9h6NA7DuLUC4wQKBgQDXg0LxpI0EnyMT8OWZyKusgIk4BjxpRXPA\n+yMssNUDpIkGIOi5sn4/3C4RxMtUD9rQMXIhaAlvgq6BMTQ9cCQYAMk2nGcDjMgH\nfdUvRZRJh7kbnH7Dl1HVrTlG5DYwR3vx/zSnujNmJGC3aDZ7mRdnQJaSjX8czu6J\nQeJCLzqLsQKBgHAnNmFa6sbGb5dCoZB0t14xOa+06duo/mMnp7Nvrg1FKI/iDhzl\nmod+V/a6YHmgaf9gsRqEQ05Yd+AD0aazyPs3bGMfXkB49kJB9WucHLa+VDOpyX6a\n6WnvfYmKSZBcMc1d/AbRaLiR8cUte48/x606xUrP5DM7H7F0iIf8PSaBAoGAKnn3\nltL87F1FN6fySQYxN/W5le48t+71aqLVAvjzcx1Z2HhiBj+0/Hc0KVJlVPMvCHvG\nZ+kueukB5frBth5FLunwvq/C6gM0Za2aeA+5s2hpxpRos7o+aeQTdvKB77AXMNJB\nGZHskYQ3/84tdtzsrPAg/U+gLxhmEW2H382ZN3ECgYEAvZk6uiW9JcOIV1vYh4qb\ncGtL+XbLunT/Pvm46pe3TWR6+u2k806W0b/lwkqT28NHwHq75QY1J69y98N4Rf9p\nBqaBhvbc25apHI+nSkGawXLE+SWwvHc92CaNAng1MK1tgbj2LSzZMocJTU1t3GiQ\nSUuP+yLOBdtAfwXkglEoIEQ=\n-----END PRIVATE KEY-----\n",
  "client_email": "enye-165@enye-280409.iam.gserviceaccount.com",
  "client_id": "115884104667273360365",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/enye-165%40enye-280409.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: "https://enye2-f7389.firebaseio.com"
});

const db = admin.firestore();

// const resultToArray = (result) => {
//     let returnArr = [];
//     result.forEach((childResult) => {
//         var item = childResult.data();
//         item.id = childResult.id;

//         returnArr.push(item);
//     });
//     return returnArr;
// };

const resolverFunctions = {
    Query: {
        hello: () => 'Hello World',
        getHistory: async (_, { id }) => {
            try {
                const searchHistory = await db
                  .collection("medicals")
                  .where("user", "==", id)
                  .get();
                // console.log(searchHistory);
          
                const results = searchHistory.docs.map((result) => {
                  return Object.assign({}, { id: result.id }, result.data());
                });
          
                return results;
              } catch (error) {
                console.log(error);
                throw error;
              }
        }
    }
};

module.exports = resolverFunctions;