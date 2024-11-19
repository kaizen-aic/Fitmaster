# import flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# create and configure flask instance
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#create instance of the db
db = SQLAlchemy(app)