// const axios = require("axios");
// const moment = require("moment");
// const admin = require("firebase-admin");
const firebase = require('firebase/app');

const db = firebase.firestore();

module.exports = {
 
  history: async (_, { id }) => {
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
};