import { json } from "react-router";

export async function getSentenceArray(
  experiment: string,
  list: number,
  lineNumber: number
) {
  const queryParams = new URLSearchParams();
  queryParams.append("experiment", experiment);
  const stringList: string = list.toString();
  queryParams.append("list", stringList);
  const stringLineNumber: string = lineNumber.toString();
  queryParams.append("lineNumber", stringLineNumber);
  const url = `http://localhost:5000/getStimuli?${queryParams.toString()}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "text/plain",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Server errror");
      }
      return response.text();
    })
    .then((data) => {
      return data.split(" ");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

export async function getWord(
  experiment: string,
  list: number,
  lineNumber: number,
  wordNumber: number
) {
  const sentenceArray = await getSentenceArray(experiment, list, lineNumber);
  if (Array.isArray(sentenceArray)) {
    return sentenceArray[wordNumber];
  } else {
    // Handle the case where getSentenceArray failed (e.g., due to a fetch error)
    console.error("Failed to get sentence array");
    return "Error"; // Or some other default value
  }
}

export async function generateSentence(
  experiment: string,
  list: number,
  lineNumber: number,
  wordNumber: number,
  placeHolder: string
) {
  let sentence: string = "";
  const sentenceArray = await getSentenceArray(experiment, list, lineNumber);
  if (Array.isArray(sentenceArray)) {
    for (let i = 0; i < sentenceArray.length; i++) {
      if (i != wordNumber) {
        for (let j = 0; j < sentenceArray[i].length; j++) {
          sentence = sentence + placeHolder;
        }
      } else {
        sentence = sentence + sentenceArray[i];
      }
      sentence = sentence + " ";
    }
  }
  return sentence;
}

export async function getQuestionAndAnswer(
  experiment: string,
  list: number,
  lineNumber: number
) {
  const queryParams = new URLSearchParams();
  queryParams.append("experiment", experiment);
  const stringList: string = list.toString();
  queryParams.append("list", stringList);
  const stringLineNumber: string = lineNumber.toString();
  queryParams.append("lineNumber", stringLineNumber);
  const url = `http://localhost:5000/getLabQuestions?${queryParams.toString()}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const jsonData = await response.json();
  return jsonData;
}
