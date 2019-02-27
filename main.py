from flask import Flask, render_template, jsonify, request, json, session, redirect, url_for
import data_manager
import os

app = Flask(__name__)
app.secret_key = os.urandom(128)


@app.route("/")
def route_index():
    if 'username' in session:
        username = session['username']
        return render_template('boards.html', username=username)
    else:
        return render_template('boards.html')


@app.route("/boards", methods=['GET'])
def get_boards():
    boards = data_manager.get_boards()
    return jsonify(boards)


@app.route("/boards", methods=['POST'])
def save_board():
    data = request.get_json()
    data_manager.add_new_board(data)
    return "", 204


@app.route('/boards', methods=["PUT"])
def update_board_title():
    data = request.get_json()
    data_manager.update_board_title(data)
    return "", 204


@app.route('/boards', methods=["DELETE"])
def delete_board():
    data = request.get_json()
    data_manager.delete_board(data)
    return "", 204


@app.route("/cards", methods=["POST"])
def save_card():
    data = request.get_json()
    data_manager.add_new_card(data)
    return "", 204


@app.route('/cards', methods=["PUT"])
def update_card_title():
    data = request.get_json()
    data_manager.update_card_title(data)
    return "", 204


@app.route("/cards", methods=["DELETE"])
def delete_card():
    data = request.get_json()
    data_manager.delete_card(data)
    return "", 204


@app.route('/statuses', methods=["PUT"])
def update_statuses():
    data = request.get_json()
    data_manager.update_statuses(data)
    return "", 204


@app.route('/card-order-update', methods=["PUT"])
def update_card_order():
    data = request.get_json()
    data_manager.update_card_order(data)
    return "", 204


@app.route('/registration', methods=['POST'])
def register():
    data = request.get_json()
    data_manager.register_user(data)
    return "", 204


@app.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    if data_manager.check_login(user_data):
        session['username'] = user_data['username']
    return redirect(url_for('route_index'))


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('route_index'))


def main():
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )


if __name__ == '__main__':
    main()
