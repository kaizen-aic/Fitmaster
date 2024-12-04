# import flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
# create and configure flask instance
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, resources={r"/": {"origins": ""}}, supports_credentials=True)
#create instance of the db
db = SQLAlchemy(app)
migrate = Migrate(app,db)