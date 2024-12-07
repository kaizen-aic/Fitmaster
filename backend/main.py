# import components
from flask import request, jsonify
from sqlalchemy import desc
from config import app, db
from models import User, Feedback
from models import Schedule 
from models import Leaderboard
from models import *
import jwt
def get_jwt_token(request):
    # Extract the JWT token from the Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing!"}), 401
    
    # Decode the token to get the user_id
    try:
        token = token.split(" ")[1]  # Get the token from 'Bearer <token>'
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = decoded_token['user_id']
        return user_id
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return jsonify({"message": "Invalid or expired token!"}), 401
@app.route('/api/schedule', methods=['GET'])
def get_schedule():
    schedules = Schedule.query.all()
    json_schedules = list(map(lambda s: s.to_json(), schedules))
    return jsonify({'schedules': json_schedules})


@app.route('/api/schedule', methods=['POST'])
def create_schedule():
    data = request.json
    title = data.get('title')
    description = data.get('description')
    time = data.get('time')

    if not title or not description or not time:
        return jsonify({'message': 'Missing required fields'}), 400

    new_schedule = Schedule(title=title, description=description, time=time)
    try:
        db.session.add(new_schedule)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': 'Schedule created!'}), 201
@app.route('/api/schedule/<int:schedule_id>', methods=['DELETE'])
def delete_schedule(schedule_id):
    schedule = Schedule.query.get(schedule_id)
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404

    try:
        db.session.delete(schedule)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': 'Schedule deleted!'}), 200

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = Leaderboard.query.order_by(Leaderboard.goals_completed.desc()).all()
    json_leaderboard = list(map(lambda l: l.to_json(), leaderboard))
    return jsonify({'leaderboard': json_leaderboard})

# POST new leaderboard entry
@app.route('/api/leaderboard', methods=['POST'])
def add_leaderboard_entry():
    data = request.json
    name = data.get('name')
    weight_lost = data.get('weightLost')
    goals_completed = data.get('goalsCompleted')

    if not name or weight_lost is None or goals_completed is None:
        return jsonify({'message': 'Missing required fields'}), 400

    new_entry = Leaderboard(name=name, weight_lost=weight_lost, goals_completed=goals_completed)
    try:
        db.session.add(new_entry)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': 'Entry added!'}), 201

# DELETE leaderboard entry
@app.route('/api/leaderboard/<int:entry_id>', methods=['DELETE'])
def delete_leaderboard_entry(entry_id):
    entry = Leaderboard.query.get(entry_id)
    if not entry:
        return jsonify({'message': 'Entry not found'}), 404

    try:
        db.session.delete(entry)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': 'Entry deleted!'}), 200


@app.route('/api/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'user not found'}), 404

    data = request.json
    user.first_name = data.get('firstName', user.first_name)
    user.last_name = data.get('lastName', user.last_name)
    user.email = data.get('email', user.email)

    db.session.commit()

    return jsonify({'message': "User updated!"}), 200


@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'user not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': "User deleted!"}), 200

# Mock data for achievements
achievements = [
    {"id": 1, "name": "First Steps", "milestone": "10,000 steps", "achieved": False},
    {"id": 2, "name": "Calorie Burner", "milestone": "500 calories burned", "achieved": False},
    {"id": 3, "name": "Night Owl", "milestone": "7 hours of sleep", "achieved": False},
]

# GET all achievements
@app.route('/api/achievements', methods=['GET'])
def get_achievements():
    return jsonify({"achievements": achievements}), 200

# PATCH update achievement status
@app.route('/api/achievements/<int:achievement_id>', methods=['PATCH'])
def update_achievement(achievement_id):
    data = request.json
    achieved = data.get("achieved", False)

    # Find the achievement by ID
    for achievement in achievements:
        if achievement["id"] == achievement_id:
            achievement["achieved"] = achieved
            return jsonify({
                "message": f"Achievement {achievement_id} updated!",
                "achievement": achievement
            }), 200

    # If achievement not found
    return jsonify({"message": "Achievement not found"}), 404


# POST users' BMI
@app.route('/api/calculate-bmi', methods=['POST'])
def calculate_bmi():
    # Get height and weight from request data
    height = request.json.get('height')
    weight = request.json.get('weight')

    if not height or not weight:
        print("bad request received")
        return jsonify({'message': 'missing required fields'}), 400,  #bad request

    try:
        height = float(height)
        weight = float(weight)

        # Calculate the BMI
        bmi = (weight / (height * height)) * 703

        # Return the BMI result
        return jsonify({'bmi': round(bmi, 2)}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 400

# Mock storage for demo
authenticate_users = {}

@app.route('/api/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    fitness_trainer = request.json.get('fitnessTrainer', False)  # New parameter from request

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    # Create a new user
    new_user = User(email=email, password=password, fitness_trainer=fitness_trainer)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': 'User registered successfully!'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    # Fetch user from the database
    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({'message': 'Invalid email or password'}), 400

    # Determine redirection based on the type of user
    if user.fitness_trainer:
        redirect_url = "/TrainerHome"
    else:
        redirect_url = "/home"

    return jsonify({'message': 'Logged in successfully!', 'redirect_url': redirect_url}), 200

# other pages
@app.route('/api/page1', methods=['GET'])
def page1():
    return jsonify({"message": "This is data for Page 1"})

@app.route('/api/page2', methods=['GET'])
def page2():
    return jsonify({"message": "This is data for Page 2"})


GROUPS = [
    {"name": "Morning Yoga Club"},
    {"name": "5K Runners Challenge"},
    {"name": "Strength Training Warriors"},
    {"name": "Healthy Eating Support Group"},
]

# GET fitness groups
@app.route('/api/groups', methods=['GET'])
def get_groups():
    return jsonify({"groups": GROUPS})

# POST to join a group
@app.route('/api/join_group', methods=['POST'])
def join_group():
    group_name = request.json.get('groupName')
    if not group_name:
        return jsonify({'message': 'Group name is required'}), 400

    # Mock logic
    return jsonify({'message': f'You successfully joined the group: {group_name}'}), 200
    new_group = FitnessGroup(group_name=group_name, date_created=datetime.utcnow())
    db.session.add(new_group)
    db.session.commit()


@app.route('/api/posts', methods=['GET'])
def get_posts():
    user_id = get_jwt_token(request)
    CD = CommunityBoardPost.query.filter_by(user_id=user_id).order_by(desc(CommunityBoardPost.id)).all()
    Com_Post = []
    for post in CD:
        CBP ={
            "content": post.content,
        }
        Com_Post.append(CBP)
    return jsonify({"posts": Com_Post})

# POST a new community post
@app.route('/api/posts', methods=['POST'])
def create_post():
    content = request.json.get('content')
    if not content:
        return jsonify({'message': 'Post content is required'}), 400
    user_id = get_jwt_token(request)
    new_post = CommunityBoardPost(content=content, user_id=user_id, date_created=datetime.utcnow())
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully!'}), 201

# GET health data
@app.route('/api/health', methods=['GET'])
def get_health_data():
    user_id = get_jwt_token(request)
    health = HealthData.query.filter_by(user_id=user_id).order_by(desc(HealthData.id)).all()
    health_log = []
    for data in health:
        healthdata ={
            "weight": data.weight,
            "heart_rate": data.heart_rate,
            "fitness_goal": data.fitness_goal 
        }
        health_log.append(healthdata)
    return jsonify({"records": health_log})

# POST health data
@app.route('/api/health', methods=['POST'])
def submit_health_data():
    weight = request.json.get('weight')
    heart_rate = request.json.get('heartRate')
    fitness_goal = request.json.get('fitnessGoal')

    if not weight or not heart_rate or not fitness_goal:
        return jsonify({'message': 'All fields are required'}), 400
    user_id = request.args.get('user_id')
    new_record = HealthData(  
        user_id=user_id,
        weight=weight,
        heart_rate=heart_rate,
        fitness_goal=fitness_goal,
        date_created=datetime.utcnow()
    )
    db.session.add(new_record)
    db.session.commit()
    return jsonify({'message': 'Health data submitted successfully!'}), 201

@app.route('/api/feedback', methods=['GET'])
def get_feedbacks():
    feedbacks = Feedback.query.all()
    json_feedbacks = [fb.to_json() for fb in feedbacks]
    return jsonify({'feedbacks': json_feedbacks})

@app.route('/api/feedback', methods=['POST'])
def add_feedback():
    data = request.json
    user_id = get_jwt_token(request)
    message = data.get('message')

    if not user_id or not message:
        return jsonify({'message': 'Missing required fields'}), 400

    feedback = Feedback(user_id=user_id, message=message)
    db.session.add(feedback)
    db.session.commit()
    return jsonify({'feedback': feedback.to_json()}), 201

@app.route('/api/feedback/<int:feedback_id>', methods=['DELETE'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    if not feedback:
        return jsonify({'message': 'Feedback not found'}), 404

    db.session.delete(feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback deleted!'}), 200



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
