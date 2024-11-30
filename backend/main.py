# import components
from flask import request, jsonify
from config import app, db
from models import User


#GET users
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda u: u.to_json(), users))
    return jsonify({'users': json_users})


#POST users
@app.route('/api/users', methods=['POST'])
def create_user():
    first_name = request.json.get('firstName')
    last_name = request.json.get('lastName')
    email = request.json.get('email')

    if not first_name or not last_name or not email:
        print("bad request received")
        return jsonify({'message': 'missing required fields'}), 400,  #bad request

    new_user = User(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400

    return jsonify({'message': "User created!"}), 201


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

# Mock storage for demonstration (replace with actual database in production)
authenticate_users = {}

@app.route('/api/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    if email in authenticate_users:
        return jsonify({'message': 'User already exists'}), 400

    # Store email and plain password (insecure; for demo purposes only)
    authenticate_users[email] = password
    return jsonify({'message': 'User registered successfully!'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    if authenticate_users.get(email) != password:
        return jsonify({'message': 'Invalid email or password'}), 400

    return jsonify({'message': 'Logged in successfully!'}), 200    

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

    # Mock logic: In a real scenario, save the user's group subscription in the database
    return jsonify({'message': f'You successfully joined the group: {group_name}'}), 200

# Mock database for simplicity
COMMUNITY_POSTS = []

# GET community posts
@app.route('/api/posts', methods=['GET'])
def get_posts():
    return jsonify({"posts": COMMUNITY_POSTS})

# POST a new community post
@app.route('/api/posts', methods=['POST'])
def create_post():
    content = request.json.get('content')
    if not content:
        return jsonify({'message': 'Post content is required'}), 400

    new_post = {"content": content}
    COMMUNITY_POSTS.append(new_post)

    return jsonify({'message': 'Post created successfully!'}), 201

# Mock database for simplicity
HEALTH_DATA = []

# GET health data
@app.route('/api/health', methods=['GET'])
def get_health_data():
    return jsonify({"records": HEALTH_DATA})

# POST health data
@app.route('/api/health', methods=['POST'])
def submit_health_data():
    weight = request.json.get('weight')
    heart_rate = request.json.get('heartRate')
    fitness_goal = request.json.get('fitnessGoal')

    if not weight or not heart_rate or not fitness_goal:
        return jsonify({'message': 'All fields are required'}), 400

    new_record = {
        "weight": weight,
        "heartRate": heart_rate,
        "fitnessGoal": fitness_goal,
    }
    HEALTH_DATA.append(new_record)
    return jsonify({'message': 'Health data submitted successfully!'}), 201


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
