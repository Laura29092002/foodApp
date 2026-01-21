CREATE TABLE IF NOT EXISTS recipe(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(200)
);


CREATE TABLE IF NOT EXISTS day(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    recipe_lunch_id INTEGER,
    FOREIGN KEY (recipe_lunch_id) REFERENCES recipe(id),
    recipe_dinner_id INTEGER,
    FOREIGN KEY (recipe_dinner_id) REFERENCES recipe(id)
);

CREATE TABLE IF NOT EXISTS step(
    id SERIAL PRIMARY KEY,
    number INTEGER,
    description VARCHAR(1000) NOT NULL,
    recipe_id INTEGER NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE IF NOT EXISTS category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(200),
    category_id INTEGER,
    unit VARCHAR(20),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS recipe_to_ingredient(
    quantity INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    mail VARCHAR(200) NOT NULL,
    role VARCHAR(20) NOT NULL,
    mdp VARCHAR(200) NOT NULL
);