export async function getLabs() {
  const response = await fetch("http://localhost:5000/getLabs", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const jsonData = await response.json();
  return jsonData;
}

export async function getSentenceArray(
  experiment: string,
  list: number,
  lineNumber: number
): Promise<string[]> {
  const queryParams = new URLSearchParams();
  queryParams.append("experiment", experiment);
  const stringList: string = list.toString();
  queryParams.append("list", stringList);
  const stringLineNumber: string = lineNumber.toString();
  queryParams.append("lineNumber", stringLineNumber);
  const url = `http://localhost:5000/getStimuli?${queryParams.toString()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });
    if (!response.ok) {
      throw new Error("Server error");
    }
    const data = await response.text();
    return data.split(" ");
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
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
  wordNumber: number,
  placeHolder: string,
  sentenceArray: string[]
) {
  let sentence: string = "";
  if (Array.isArray(sentenceArray)) {
    for (let i: number = 0; i < sentenceArray.length; i++) {
      if (wordNumber == -1 || i != wordNumber) {
        sentence = sentence + placeHolder.repeat(sentenceArray[i].length);
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
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const jsonData = await response.json();
  return jsonData;
}

export function postStatistics(
  sentenceArray: string[],
  statistics: Date[],
  experimentName: string,
  lineNumber: number
) {
  fetch(`http://localhost:5000/postStatistics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sentenceArray: sentenceArray,
      dateArray: statistics,
      experiment: experimentName,
      lineNumber: lineNumber,
    }),
  });
}

export async function getStatistics(experimentName: string) {
  const queryParams = new URLSearchParams();
  queryParams.append("experiment", experimentName);
  const url = `http://localhost:5000/getStatistics?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const value: string = await response.json();
  return value;
}

export async function sendAnswer(
  answerString: string,
  experimentName: string,
  lineNumber: number
) {
  fetch(`http://localhost:5000/sendAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer: answerString,
      experiment: experimentName,
      lineNumber: lineNumber,
    }),
  });
}

export async function counterBalance(input: string) {
  const queryParams = new URLSearchParams();
  queryParams.append("input", input);
  const url = `http://localhost:5000/counterBalance?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
  });

  const value: string = await response.text();
  return value;
}
