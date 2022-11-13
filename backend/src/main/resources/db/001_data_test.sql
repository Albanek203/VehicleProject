INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'customer@gmail.com', 'Oleh', 'Lovchuk', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'CUSTOMER');
INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'lindaingroup@gmail.com', 'Linda', 'Bun', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'CUSTOMER');
INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'zeitgettruck@gmail.com', 'Achaz', 'Itersbar', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'TRANSPORTER');
INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'ivannest@gmail.com', 'Ivan', 'Makarenko', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'TRANSPORTER');
INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'elwinmutter@gmail.com', 'Elwin', 'Mursko', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'TRANSPORTER');
INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'fastbest@gmail.com', 'Pawel', 'Cypek', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'TRANSPORTER');
INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'admin@gmail.com', 'Petro', 'Schur', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'ADMIN');

INSERT INTO customer(name, phone, user_id) VALUES ('Lion', '+380977844568', 1);
INSERT INTO customer(name, phone, user_id) VALUES ('InGroup', '+380977844568', 2);

INSERT INTO transporter(name, phone, user_id) VALUES ('Zeit', '+4915735987904', 3);
INSERT INTO transporter(name, phone, user_id) VALUES ('My nest', '+48732231269', 4);
INSERT INTO transporter(name, phone, user_id) VALUES ('Mutter', '+4915735995685', 5);
INSERT INTO transporter(name, phone, user_id) VALUES ('Fast-Best', '+380974878887', 6);

INSERT INTO delivery(country_from, city_from, street_from, country_to, city_to, street_to, created_date, departure_date, arrival_date, description, status, price, unit, customer_id) VALUES ('Germany', 'Berlin', 'Craft 6', 'Italy', 'Florence', 'Via Giuseppe 11', '2022-10-11', '2022-10-20', '2022-10-22', 'I need to transport some cargo, preferably by truck.', 'NEW', 2000, 'EUR', 1);
INSERT INTO delivery(country_from, city_from, street_from, country_to, city_to, street_to, created_date, departure_date, arrival_date, description, status, price, unit, customer_id) VALUES ('Germany', 'Berlin', 'Craft 6', 'Poland', 'Wroclaw', 'Fajna 43', '2022-10-11', '2022-10-20', '2022-10-22', 'Our little shop needs a carrier who could transfer the goods to Poland, preferably by truck.', 'HAS_OFFER', 1000, 'USD', 1);
INSERT INTO delivery(country_from, city_from, street_from, country_to, city_to, street_to, created_date, departure_date, arrival_date, description, status, price, unit, customer_id) VALUES ('Poland', 'Warsaw', 'Grochowska 246', 'Ukraine', 'Lviv', 'Zelena 2', '2022-10-9', '2022-10-12', '2022-10-22', 'We need to transport milk', 'ACCEPTED_OFFER', 400, 'USD', 2);
INSERT INTO delivery(country_from, city_from, street_from, country_to, city_to, street_to, created_date, departure_date, arrival_date, description, status, price, unit, customer_id) VALUES ('England', 'Cambridge', 'Sturton 116A', 'Austria', 'Spielberg', 'Ingeringweg 10', '2022-10-6', '2022-10-7', '2022-10-11', 'It is necessary to transport construction materials', 'COMPLETED', 800, 'EUR', 2);

INSERT INTO cargo(count, unit, name, total_weight, total_volume, is_fragile, delivery_id) VALUES (50, 'PCS', 'Fruit box', 300, 62.5, false, 1);
INSERT INTO cargo(count, unit, name, total_weight, total_volume, is_fragile, delivery_id) VALUES (30, 'PCS', 'Vegetable box', 220, 62.5, false, 1);
INSERT INTO cargo(count, unit, name, total_weight, total_volume, is_fragile, delivery_id) VALUES (30, 'PCS', 'Vegetable box', 180, 37.5, false, 2);
INSERT INTO cargo(count, unit, name, total_weight, total_volume, is_fragile, delivery_id) VALUES (500, 'Liter', 'Milk', 515, 24.5, false, 3);
INSERT INTO cargo(count, unit, name, total_weight, total_volume, is_fragile, delivery_id) VALUES (10, 'Pallet', 'Cans of stew', 3000, 22.5, false, 4);

INSERT INTO offer(description, status, delivery_id, transporter_id) VALUES ('Ready to transport goods for 900 USD. Open for discussion', 'NO_CHECKED', 2, 1);
INSERT INTO offer(description, status, delivery_id, transporter_id) VALUES ('Ready to transport goods for 300 USD. Open for discussion', 'ACCEPTED', 3, 1);
INSERT INTO offer(description, status, delivery_id, transporter_id) VALUES ('Ready for work', 'REJECTED', 3, 2);
INSERT INTO offer(description, status, delivery_id, transporter_id) VALUES ('I offer my services', 'REJECTED', 4, 3);
INSERT INTO offer(description, status, delivery_id, transporter_id) VALUES ('I am interested in your proposal, ready to discuss the details', 'DONE', 4, 4);
