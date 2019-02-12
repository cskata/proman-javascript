from flask import Flask, render_template, jsonify
import data_manager


app = Flask(__name__)


@app.route("/")
def route_index():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/boards", methods=['GET'])
def get_boards():
    boards = data_manager.get_boards()
    return jsonify(boards)


def main():
    app.run(
        host='0.0.0.0',
        port=8001,
        debug=True
    )


if __name__ == '__main__':
    main()
