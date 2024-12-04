#import db object from config.py
from config import db

# User model
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    fitness_trainer = db.Column(db.Boolean, default=False)


    def to_json(self):
        return {
            "id": self.user_id,
            "email": self.email,
            "fitness_trainer": self.fitness_trainer,
        }
    
class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    time = db.Column(db.String(10), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "time": self.time,
        }
    
class Leaderboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    weight_lost = db.Column(db.Float, nullable=False)
    goals_completed = db.Column(db.Integer, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "weightLost": self.weight_lost,
            "goalsCompleted": self.goals_completed,
        }

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "message": self.message,
        }

class HealthData(db.Model):
    __tablename__ = 'health_data'

    id = db.Column(db.Integer, primary_key=True)
    #user_id = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=False)  # In kilograms
    heart_rate = db.Column(db.Integer, nullable=True)  # Beats per minute
    fitness_goal = db.Column(db.String(150), nullable=False)

    """def to_json(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "weight": self.weight,
            "heartRate": self.heart_rate,
            "fitnessGoal": self.fitness_goal,
        }"""
    
class CommunityBoardPost(db.Model):
    __tablename__ = 'community_board_posts'

    id = db.Column(db.Integer, primary_key=True)
    #user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)

    """def to_json(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "content": self.content,
        }"""

class FitnessGroup(db.Model):
    __tablename__ = 'fitness_groups'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False)

    """def to_json(self):
        return {
            "id": self.id,
            "groupName": self.group_name,
        }"""