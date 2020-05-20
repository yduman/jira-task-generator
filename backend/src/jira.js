const axios = require("axios");
const { AUTH_KEY, JIRA_URL } = require("./config");

const url = `https://${JIRA_URL}/rest/api/latest/issue/bulk`;
const headers = {
  Authorization: `Basic ${AUTH_KEY}`,
  "Content-Type": "application/json",
};

const createIssuesRequest = async (data) => {
  try {
    const response = await axios({
      url,
      method: "post",
      headers,
      data,
    });

    return await response.status;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createIssuesRequest };
