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


def format_boards_with_cards(boards):
    for board in boards:
        board["cards"] = get_cards(board["id"])
        board["statuses"] = board["statuses"].split(",")



