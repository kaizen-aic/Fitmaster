# import components
from flask import request, jsonify
from config import app, db
from models import User
from models import Schedule 
from models import Leaderboard

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

# other pages
@app.route('/api/page1', methods=['GET'])
def page1():
    return jsonify({"message": "This is data for Page 1"})

@app.route('/api/page2', methods=['GET'])
def page2():
    return jsonify({"message": "This is data for Page 2"})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
