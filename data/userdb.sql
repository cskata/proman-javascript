ALTER TABLE IF EXISTS ONLY public.cards
  DROP CONSTRAINT IF EXISTS board_id_fkey CASCADE;

ALTER TABLE IF EXISTS ONLY public.boards
  DROP CONSTRAINT IF EXISTS boards_pk CASCADE;

DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards
(
  id       serial NOT NULL,
  title    text,
  statuses text
);

ALTER TABLE ONLY boards
  ADD CONSTRAINT boards_pk PRIMARY KEY (id);


ALTER TABLE IF EXISTS ONLY public.cards
  DROP CONSTRAINT IF EXISTS cards_pk CASCADE;


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