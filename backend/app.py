from flask import (Flask, jsonify, request)
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app,origins="*")

@app.route('/', methods=["GET","POST","DELETE","READ"])
def home():
    return 'Hello, World!'

@app.route('/getLabs', methods=["GET"])
def getLabs():
    jsonFile = open("./labs.json/")
    jsonData = json.load(jsonFile)
    jsonFile.close()
    return jsonData

@app.route('/getLabInfo', methods=["GET"])
def getInfo():
    experiment = request.args.get("experiment")
    #labType = labType.replace(" ", "")

    jsonFile = open("./LabInfo/"+experiment.replace(" ","").replace("/","-")+".json")
    jsonData = json.load(jsonFile)
    jsonFile.close()
    return jsonData

@app.route('/getStimuli', methods=["GET"])
def getStimuli():
    #process arguments
    experiment = request.args.get("experiment")
    list = str(request.args.get("list"))
    lineNumber = int(request.args.get("lineNumber"))

    #make path to list and get the index and condition
    filteredPath = experiment.replace(" ","").replace("/","-");
    print(filteredPath)
    jsonFile = open("./CounterbalancingLists/"+filteredPath+".json")
    listData = json.load(jsonFile)
    jsonFile.close()
    command = listData[list][lineNumber]
    index = command[0]
    condition = command[1]

    #make the path and load in jsonData
    jsonFile = open("./LabStimuli/"+filteredPath+".json")
    stimuliData = json.load(jsonFile)
    jsonFile.close()
    #command is the the two character string composed of the index and condition
    return stimuliData[index][condition]

@app.route("/getLabQuestions",methods=["GET"])
def getQuestion():
    experiment = request.args.get("experiment")
    list = str(request.args.get("list"))
    lineNumber = int(request.args.get("lineNumber"))

    #make path to list and get the index and condition
    filteredPath = experiment.replace(" ","").replace("/","-");
    jsonFile = open("./CounterbalancingLists/"+filteredPath+".json")
    listData = json.load(jsonFile)
    jsonFile.close()
    command = listData[list][lineNumber]
    index = command[0]
    condition = command[1]

     #make the path and load in jsonData
    jsonFile = open("./LabQuestions/"+filteredPath+".json")
    questionData = json.load(jsonFile)
    jsonFile.close()
    #command is the the two character string composed of the index and condition
    return {"Question":questionData[index]["Question"],
            "Answer":questionData[index][condition]}

if __name__ == '__main__':
    app.run()