ALTER TABLE IF EXISTS ONLY public.statuses
  DROP CONSTRAINT IF EXISTS statuses_pk CASCADE;
DROP TABLE IF EXISTS public.statuses;
CREATE TABLE statuses
(
  id   serial NOT NULL,
  name text
);

ALTER TABLE ONLY statuses
  ADD CONSTRAINT statuses_pk PRIMARY KEY (id);


ALTER TABLE IF EXISTS ONLY public.boards
  DROP CONSTRAINT IF EXISTS boards_pk CASCADE;
DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards
(
  id    serial NOT NULL,
  title text
);

ALTER TABLE ONLY boards
  ADD CONSTRAINT boards_pk PRIMARY KEY (id);


ALTER TABLE IF EXISTS ONLY public.cards
  DROP CONSTRAINT IF EXISTS cards_pk CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards
  DROP CONSTRAINT IF EXISTS board_id_fkey CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards
  DROP CONSTRAINT IF EXISTS status_id_fkey CASCADE;
DROP TABLE IF EXISTS public.cards;

CREATE TABLE cards
(
  id        serial NOT NULL,
  title     text,
  board_id  integer,
  status_id integer,
  order_num integer
);

ALTER TABLE ONLY cards
  ADD CONSTRAINT cards_pk PRIMARY KEY (id);

ALTER TABLE ONLY cards
  ADD CONSTRAINT board_id_fkey FOREIGN KEY (board_id) REFERENCES boards (id);

ALTER TABLE ONLY cards
  ADD CONSTRAINT status_id_fkey FOREIGN KEY (status_id) REFERENCES statuses (id);


INSERT INTO statuses
VALUES (1, 'New');
INSERT INTO statuses
VALUES (2, 'In progress');
INSERT INTO statuses
VALUES (3, 'Testing');
INSERT INTO statuses
VALUES (4, 'Done');


INSERT INTO boards
VALUES (1, 'Test Board 1');
INSERT INTO boards
VALUES (2, 'Test Board 2');


INSERT INTO cards
VALUES (1, 'task1', 1, 1, 1);
INSERT INTO cards
VALUES (2, 'task1', 1, 2, 1);
INSERT INTO cards
VALUES (3, 'task1', 1, 4, 1);
INSERT INTO cards
VALUES (4, 'task1', 2, 1, 1);
INSERT INTO cards
VALUES (5, 'task1', 2, 2, 1);
INSERT INTO cards
VALUES (6, 'task1', 2, 3, 1);