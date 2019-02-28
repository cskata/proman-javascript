ALTER TABLE IF EXISTS ONLY public.boards
  DROP CONSTRAINT IF EXISTS users_id_fk CASCADE;

ALTER TABLE IF EXISTS ONLY public.users
  DROP CONSTRAINT IF EXISTS users_pk CASCADE;

DROP TABLE IF EXISTS public.users;
CREATE TABLE users
(
  id       serial NOT NULL,
  username    varchar(255) UNIQUE NOT NULL,
  password varchar(255) UNIQUE NOT NULL
);

ALTER TABLE ONLY users
  ADD CONSTRAINT users_pk PRIMARY KEY (id);


ALTER TABLE IF EXISTS ONLY public.cards
  DROP CONSTRAINT IF EXISTS boards_id_fk CASCADE;

ALTER TABLE IF EXISTS ONLY public.boards
  DROP CONSTRAINT IF EXISTS boards_pk CASCADE;

DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards
(
  id       serial NOT NULL,
  title    text,
  statuses text,
  user_id integer,
  type boolean
);

ALTER TABLE ONLY boards
  ADD CONSTRAINT boards_pk PRIMARY KEY (id);

ALTER TABLE ONLY boards
  ADD CONSTRAINT users_id_fk FOREIGN KEY (user_id) REFERENCES users (id);

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
  ADD CONSTRAINT boards_id_fk FOREIGN KEY (board_id) REFERENCES boards (id);