from flask import (Flask, jsonify, request)
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app,origins="http://localhost:5173")

@app.route('/', methods=["GET","POST","DELETE","READ"])
def home():
    return 'Hello, World!'

@app.route('/getLabInfo', methods=["GET"])
def getInfo():
    experiment = request.args.get("experiment")
    #labType = labType.replace(" ", "")
    print("Experiment:",experiment)
    jsonFile = open("./LabInfo/"+experiment.replace(" ","").replace("/","-")+".json")
    jsonData = json.load(jsonFile)
    jsonFile.close()
    return jsonData

@app.route('/getStimuli', methods=["GET"])
def getStimuli():
    experiment = request.args.get("experiment")
    list = request.args.get("list")
    lineNumber = request.args.get("lineNumber")

    print("Experiment:",experiment)
    print("List Number: ",list)
    print("Line Number: ",lineNumber)

    jsonFile = open("./LabStimuli/"+experiment.replace(" ","").replace("/","-")+".json")
    jsonData = json.load(jsonFile)
    jsonFile.close()
    command = jsonData["counterBalancingLists"][list][int(lineNumber)]
    return jsonData[command[0]][command[1]]

if __name__ == '__main__':
    app.run()