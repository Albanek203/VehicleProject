INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'testCustomer@gmail.com', 'Oleh', 'Lovchuk', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'CUSTOMER');
INSERT INTO users(active, email, name, surname, password, role) VALUES (true, 'testTranspoter@gmail.com', 'Ivan', 'Makarenko', '$2a$10$U0BLK7U1q1Aaq0Hlo5zWFOewTi.RnpfijZKslWihDo92dkzFrANpC', 'TRANSPORTER');

INSERT INTO customer(name, phone, user_id) VALUES ('Lion', '+380977844568', 1);

INSERT INTO delivery(country_from, city_from, street_from, country_to, city_to, street_to, created_date, departure_date, arrival_date, description, status, price, unit, customer_id) VALUES ('Poland', 'Warsaw', 'Grochowska 246', 'Ukraine', 'Lviv', 'Zemelna 2', '2022-10-07', '2022-10-12', '2022-10-22', 'Description', 'NEW', 2000, 'USD', 1);

INSERT INTO cargo(count, unit, name, total_weight, total_volume, is_fragile) VALUES (50, 'PCS', 'box', 300, 6250, false);

INSERT INTO delivery_cargos(delivery_id, cargos_id) VALUES (1, 1);

INSERT INTO transporter(name, phone, user_id) VALUES ('Fast-Best', '+380974878887', 2);

INSERT INTO offer(description, transporter_id) VALUES ('Description', 1);