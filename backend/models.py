from config import db

# User model (already implemented)
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    date_of_birth = db.Column(db.Date, unique=False, nullable=False)
    gender = db.Column(db.String(120), unique=False, nullable=False)

    # Relationship with UserProfile
    user_profile = db.relationship('UserProfile', back_populates='user', uselist=False)

    def to_json(self):
        return {
            "id": self.user_id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }

# FitnessTrainer model
class FitnessTrainer(db.Model):
    trainer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    expertise = db.Column(db.String(120), nullable=False)

    # Relationship with UserProfile
    managed_profiles = db.relationship('UserProfile', back_populates='trainer')

# UserProfile model
class UserProfile(db.Model):
    profile_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    trainer_id = db.Column(db.Integer, db.ForeignKey('fitness_trainer.trainer_id'), nullable=True)  # Optional trainer
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    fitness_goal = db.Column(db.String(120), nullable=True)
    step_count = db.Column(db.Integer, nullable=True)
    calories_burned = db.Column(db.Integer, nullable=True)
    sleep_hours = db.Column(db.Float, nullable=True)

    # Relationships
    user = db.relationship('User', back_populates='user_profile')
    trainer = db.relationship('FitnessTrainer', back_populates='managed_profiles')
    health_metrics = db.relationship('HealthMetrics', back_populates='user_profile', cascade="all, delete-orphan")
    bmi_data = db.relationship('BMIData', back_populates='user_profile', uselist=False, cascade="all, delete-orphan")

# HealthMetrics model
class HealthMetrics(db.Model):
    metrics_id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('user_profile.profile_id'), nullable=False)
    heart_rate = db.Column(db.Integer, nullable=True)
    weight = db.Column(db.Float, nullable=True)
    steps_count = db.Column(db.Integer, nullable=True)
    calories_burned = db.Column(db.Integer, nullable=True)
    sleep_hours = db.Column(db.Float, nullable=True)

    # Relationship
    user_profile = db.relationship('UserProfile', back_populates='health_metrics')

# BMIData model
class BMIData(db.Model):
    bmi_id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('user_profile.profile_id'), nullable=False)
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    bmi_value = db.Column(db.Float, nullable=False)
    calculation_date = db.Column(db.Date, nullable=False)

    # Relationship
    user_profile = db.relationship('UserProfile', back_populates='bmi_data')
