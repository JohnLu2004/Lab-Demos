from flask import (Flask, jsonify, request)
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app,origins="*")
import math

from services.Labs import *

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Code4891!@localhost/'
db.init_app(app)

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

class User(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String)

with app.app_context():
    db.create_all()

@app.route("/testGet",methods=["GET"])
def testGet():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars().all()
    print("Scalar Object: ",users[1].username)
    return "Done Getting"
3
@app.route("/testPost",methods=["GET"])
def testPost():
    user = User(
        username="John2",
        email="John2@gmail.com",
    )
    db.session.add(user)
    db.session.commit()
    return "Done Posting"

@app.route("/testDelete")
def testDelete():
    User.__table__.drop()
    return "Done Deleting"
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

@app.route("/counterBalance",methods=["GET"])
def counterBalance():
    input = request.args.get("input")
    array = input.split("\n")
    lines = len(array)
    arrayOfArrays=[]
    numConditions = math.ceil(math.pow(lines,1/3))
    print(lines)
    print(numConditions)
    for i in range(0,numConditions**2):
        list=[]
        for j in range(0,numConditions):
            list.append(array[i*numConditions+j])
        arrayOfArrays.append(list)

    line = ""
    print(arrayOfArrays)
    for i in range (0,numConditions):
        for j in range (0,numConditions**2):
            line += str(arrayOfArrays[j][(i+j)%numConditions])+"\n"
        line += "\n"
    return line

if __name__ == '__main__':
    app.run()