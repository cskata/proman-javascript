from connection import connection_handler
from psycopg2 import sql


@connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT * FROM boards
                    ORDER BY id;
                    """)
    boards = cursor.fetchall()
    format_boards_with_cards(boards)
    return boards


@connection_handler
def get_cards(cursor, board_id):
    cursor.execute("""
                    SELECT * FROM cards
                    WHERE board_id = %(board_id)s
                    """,
                   {"board_id": board_id})
    cards = cursor.fetchall()
    return cards


@connection_handler
def get_last_id(cursor, table):
    cursor.execute(sql.SQL("""
                    SELECT max(id) FROM {table};
                    """).format(table=sql.Identifier(table)))
    max_id = cursor.fetchone()
    return max_id["max"]


@connection_handler
def add_new_board(cursor, new_board):
    cursor.execute("""
                    INSERT INTO boards(title, statuses)
                    VALUES (%(title)s, %(statuses)s);
                    """,
                   {"title": new_board["title"], "statuses": new_board["statuses"]})


@connection_handler
def add_new_card(cursor, new_card):
    cursor.execute("""
                    INSERT INTO cards (title, board_id, status_id, order_num)
                    VALUES (%(title)s, %(board_id)s, %(status_id)s, %(order_num)s);
                    """,
               {"title": new_card["title"], "board_id": new_card["board_id"],
                "status_id": new_card["status_id"], "order_num": new_card["order_num"]})


@connection_handler
def delete_card(cursor, card_id):
    cursor.execute("""
                    DELETE FROM cards
                    WHERE id = %(card_id)s;
                   """,
                   {"card_id": card_id})


def format_boards_with_cards(boards):
    for board in boards:
        board["cards"] = get_cards(board["id"])
        board["statuses"] = board["statuses"].split(",")



