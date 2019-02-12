from flask import Flask, render_template, jsonify, request, json
import data_manager


app = Flask(__name__)


@app.route("/")
def route_index():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/max-id", methods=['GET'])
def get_max_id():
    ids = {"board_id": data_manager.get_last_id("boards"), "card_id": data_manager.get_last_id("cards")}
    return jsonify(ids)


@app.route("/boards", methods=['GET'])
def get_boards():
    boards = data_manager.get_boards()
    return jsonify(boards)


@app.route("/save-board", methods=['POST'])
def save_board():
    data = request.get_json()
    data_manager.add_new_board(data)
    return "", 204


@app.route("/save-card", methods=["POST"])
def save_card():
    data = request.get_json()
    data_manager.add_new_card(data)
    return "", 204


def main():
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )


if __name__ == '__main__':
    main()
