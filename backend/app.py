from flask import (Flask, jsonify, request)
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app,origins="*")

from services.Labs import *

@app.route('/', methods=["GET","POST","DELETE","READ"])
def home():
    return 'Hello, World!'

@app.route('/getLabs', methods=["GET"])
def getLabs():
    return getAllLabData()

@app.route('/getLabInfo', methods=["GET"])
def getInfo():
    experiment = request.args.get("experiment")
    jsonData = getLabInfoData(experiment)
    return jsonData

@app.route('/getStimuli', methods=["GET"])
def getStimuli():
    #process arguments
    experiment = request.args.get("experiment")
    list = str(request.args.get("list"))
    lineNumber = int(request.args.get("lineNumber"))

    stimuli = getStimuliData(experiment,list,lineNumber)
    return stimuli

@app.route("/getLabQuestions",methods=["GET"])
def getQuestion():
    experiment = request.args.get("experiment")
    list = str(request.args.get("list"))
    lineNumber = int(request.args.get("lineNumber"))
    question = getQuestionData(experiment,list,lineNumber)
    return question

@app.route("/postStatistics",methods=["POST"])
def postStatistics():
    jsonData = request.get_json()
    writeToStatisticsFile(jsonData)
    return "Good"

@app.route("/getStatistics",methods=["GET"])
def getStatistics():
    experiment = request.args.get("experiment")
    line = readFromStatisticsFile(experiment)
    return line

@app.route("/sendAnswer",methods=["POST"])
def postAnswer():
    jsonData = request.get_json();
    writeAnswerToStatisticsFile(jsonData)
    return "Cool"

if __name__ == '__main__':
    app.run()