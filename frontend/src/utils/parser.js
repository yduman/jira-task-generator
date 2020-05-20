import { JIRA_PROJECT_KEY } from "../config";

// Identifiers
const TI = "TI";
const T = "T";
const EMPTY_STRING = "";

// VARIABLES FOR JIRA API
const ISSUETYPE_ID = "5";

export const checkInput = (inputData) => {
  const lines = splitLines(inputData);
  checkEmptyStrings(lines);
  checkTags(lines);
};

export const parse = (storyId, inputData, withDefaultTasks) => {
  const lines = splitLines(inputData);

  let result;
  let idea = "";
  let issueUpdates = [];
  let tiNum = 1;
  let tNum = 1;

  lines.forEach((line, i, array) => {
    if (isLastElement(i, array)) {
      createTask(line, tiNum, tNum, idea, storyId, issueUpdates);
      if (withDefaultTasks) createDefaultTasks(storyId, issueUpdates);
      result = createResult(issueUpdates);
    } else if (isTI(line)) {
      const id = line.substring(0, 2);
      const content = line.substring(2);
      idea = id + tiNum + content;
    } else if (isT(line)) {
      createTask(line, tiNum, tNum, idea, storyId, issueUpdates);
      tNum++;
    } else if (line === EMPTY_STRING) {
      tNum = 1;
      tiNum++;
    }
  });

  return result;
};

const createTask = (line, tiNum, tNum, idea, storyId, issueUpdates) => {
  const id = line.substring(0, 1);
  const content = line.substring(1);
  const num = tiNum + "." + tNum;
  const task = id + " " + num + content;

  const taskObject = createIssueUpdate(storyId, task, idea);
  issueUpdates.push(taskObject);
};

const createResult = (issueUpdates) => {
  return { issueUpdates };
};

// if you have default tasks like "Review" or "Manual Testing" you can put it as a string inside this array
const createDefaultTasks = (storyId, issueUpdates) => {
  const defaultTasks = [];

  defaultTasks.forEach((task) => {
    const taskObject = createIssueUpdate(storyId, task, null, true);
    issueUpdates.push(taskObject);
  });
};

const createIssueUpdate = (storyId, task, idea = "", isDefaultTask = false) => {
  let taskObject = {};
  let fields = {};

  if (isDefaultTask) {
    fields["project"] = { key: JIRA_PROJECT_KEY };
    fields["parent"] = { key: storyId };
    fields["summary"] = task;
    fields["issuetype"] = { id: ISSUETYPE_ID };
  } else {
    fields["project"] = { key: JIRA_PROJECT_KEY };
    fields["parent"] = { key: storyId };
    fields["summary"] = task;
    fields["description"] = idea;
    fields["issuetype"] = { id: ISSUETYPE_ID };
  }

  taskObject["update"] = {};
  taskObject["fields"] = fields;

  return taskObject;
};

const checkEmptyStrings = (lines) => {
  if (lines[0] === EMPTY_STRING) {
    throw new Error("Avoid empty first line");
  } else if (lines[lines.length - 1] === EMPTY_STRING) {
    throw new Error("Avoid empty last line");
  } else {
    lines.forEach((line, i, arr) => {
      if (line === EMPTY_STRING) {
        if (arr[i + 1] === EMPTY_STRING) {
          throw new Error("Avoid two consecutive empty lines");
        }
      }
    });
  }
};

const checkTags = (lines) => {
  if (isT(lines[0])) {
    throw new Error("Wrong structure. Start with a TI followed by T's");
  } else if (isTI(lines[lines.length - 1])) {
    throw new Error("Wrong structure. Start with a TI followed by T's");
  }
};

const splitLines = (s) => s.split(/\n/g);

const isTI = (line) => line.startsWith(TI);

const isT = (line) => line.startsWith(T) && !isTI(line);

const isLastElement = (i, array) => i === array.length - 1;
