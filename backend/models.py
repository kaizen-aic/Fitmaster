from config import db

# User model (already implemented)
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