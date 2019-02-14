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
                    ORDER BY order_num ASC;
                    """,
                   {"board_id": board_id})
    cards = cursor.fetchall()
    return cards


@connection_handler
def add_new_board(cursor, data):
    cursor.execute("""
                    INSERT INTO boards(title, statuses)
                    VALUES (%(title)s, %(statuses)s);
                    """, data)


@connection_handler
def add_new_card(cursor, data):
    cursor.execute("""
                    INSERT INTO cards (title, board_id, status_id, order_num)
                    VALUES (%(title)s, %(board_id)s, %(status_id)s, %(order_num)s);
                    """, data)


@connection_handler
def delete_card(cursor, data):
    cursor.execute("""
                    DELETE FROM cards
                    WHERE id = %(card_id)s;
                   """, data)


@connection_handler
def update_board_title(cursor, data):
    cursor.execute("""
                    UPDATE boards
                    SET title = %(new_title)s WHERE id = %(id)s;
                    """, data)


@connection_handler
def update_card_title(cursor, data):
    cursor.execute("""
                    UPDATE cards
                    SET title = %(new_title)s WHERE id = %(id)s;
                    """, data)


@connection_handler
def update_statuses(cursor, data):
    cursor.execute("""
                    UPDATE boards
                    SET statuses = %(statuses)s WHERE id = %(id)s
                    """, data)


@connection_handler
def delete_board(cursor, data):
    cursor.execute("""
                        DELETE FROM cards
                        WHERE board_id = %(board_id)s;
                        """, data)
    cursor.execute("""
                    DELETE FROM boards
                    WHERE id = %(board_id)s;
                    """, data)


@connection_handler
def update_card_order(cursor, data):
    cursor.execute("""
                    UPDATE cards
                    SET status_id = %(status)s, order_num = %(order)s
                    WHERE id = %(cardId)s;
                    """, data)


@connection_handler
def update_board_visibility(cursor, data):
    cursor.execute("""
                    UPDATE boards
                    SET visibility = %(visibility)s
                    WHERE id = %(board_id)s;
                    """, data)


def format_boards_with_cards(boards):
    for board in boards:
        board["cards"] = get_cards(board["id"])
        board["statuses"] = board["statuses"].split(",")



