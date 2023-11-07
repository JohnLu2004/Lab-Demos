import json
from pathlib import Path

def getJsonData(entirePath,fileName):
    entirePath = entirePath / (fileName+".json")
    print(entirePath)
    jsonFile = open(entirePath)
    jsonData = json.load(jsonFile)
    jsonFile.close()
    return jsonData

def getcounterbalancingListData(fileName):
    #make path to list and get the index and condition
    dbPath = "./infrastructure/db/"
    directoryPath = "CounterbalancingLists/"
    entirePath = Path(dbPath+directoryPath);
    counterbalancingListData = getJsonData(entirePath,fileName)
    return counterbalancingListData

def getLabQuestionsData(fileName):
    dbPath = "./infrastructure/db/"
    directoryPath = "LabQuestions/"
    entirePath = Path(dbPath+directoryPath);
    questionData = getJsonData(entirePath,fileName);
    return questionData

def getLabStimuliData(fileName):
    dbPath = "./infrastructure/db/"
    directoryPath = "LabStimuli"
    entirePath = Path(dbPath+directoryPath);
    stimuliData = getJsonData(entirePath,fileName)
    return stimuliData

def getLabInfoData(experiment):
    fileName = experiment.replace(" ","").replace("/","-")
    dbPath = "./infrastructure/db/"
    directoryPath = "LabInfo"
    entirePath = Path(dbPath+directoryPath);
    stimuliData = getJsonData(entirePath,fileName)
    return stimuliData

def getAllLabData():
    directoryPath = ""
    fileName="labs"
    entirePath = Path(""+directoryPath);
    jsonData = getJsonData(entirePath,fileName)
    return jsonData

def getLabData(experiment):
    fileName = experiment.replace(" ","").replace("/","-")
    jsonData=getLabInfoData(fileName)
    return jsonData

def getStimuliData(experiment,listNumber,lineNumber):
    fileName = experiment.replace(" ","").replace("/","-")
    counterbalancingListData = getcounterbalancingListData(fileName)

    command = counterbalancingListData[listNumber][lineNumber]
    number = 0;
    while not command[number].isalpha():
        number = number+1
    index = str(command[0:number])
    condition = str(command[number])

    stimuliData = getLabStimuliData(fileName)
    return stimuliData[index][condition]

def getQuestionData(experiment,listNumber,lineNumber):
    fileName = experiment.replace(" ","").replace("/","-")
    counterbalancingListData = getcounterbalancingListData(fileName)
    
    command = counterbalancingListData[listNumber][lineNumber]
    number = 0;
    while not command[number].isalpha():
        number = number+1
    index = str(command[0:number])
    condition = str(command[number])
     #make the path and load in jsonData
    questionData = getLabQuestionsData(fileName)

    jsonObject =  {"Question":questionData[index]["Question"],
            "Answer":questionData[index][condition]}
    return jsonObject

def writeToStatisticsFile(jsonData):
    fileName = jsonData["experiment"].replace(" ","").replace("/","-")
    dateArray = jsonData["dateArray"]
    lineNumber = jsonData["lineNumber"]
    timeArray = [];
    sentenceArray = jsonData["sentenceArray"]
    path = Path("./infrastructure/db/Statistics/"+fileName+".json")
    for i in range(1,len(dateArray)-1):
        first = float(dateArray[i][17:len(dateArray[i])-1])
        second = float(dateArray[i+1][17:len(dateArray[i+1])-1])
        timeArray.append(str(second-first)[0:5])
    
    wholeJson = readFromStatisticsFile(fileName)
    wholeJson["array"][int(lineNumber)]["sentenceArray"]=sentenceArray;
    wholeJson["array"][int(lineNumber)]["timeArray"]=timeArray;
    
    with open(path, "w") as outfile:
        outfile.write(json.dumps(wholeJson))


def readFromStatisticsFile(experiment):
    dbPath = "./infrastructure/db/"
    directoryPath = "Statistics"
    entirePath = Path(dbPath+directoryPath);
    stimuliData = getJsonData(entirePath,experiment.replace(" ","").replace("/","-"))
    return stimuliData

def writeAnswerToStatisticsFile(jsonData):
    fileName = jsonData["experiment"].replace(" ","").replace("/","-")
    lineNumber = jsonData["lineNumber"]
    path = Path("./infrastructure/db/Statistics/"+fileName+".json")
    
    wholeJson = readFromStatisticsFile(fileName)
    wholeJson["array"][lineNumber]["answer"]=jsonData["answer"];
    print("Line Number: ",lineNumber)
    with open(path, "w") as outfile:
        outfile.write(json.dumps(wholeJson))

