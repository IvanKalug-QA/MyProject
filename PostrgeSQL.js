//Hello my name is Ivan
//I'am learning QA Engineer

//Task: Print the names of all the people who are in the airline database
//Условие задачи: Выведите имена всех людей, которые есть в базе данных авиакомпании
SELECT name
FROM passenger;

//Task: Print the names of all airlines
//Услдовие задачи: Выведите названия всех авиакомпаний
SELECT name
FROM Company;

//Task: Bring out all flights made from Moscow
//Условие задачи: Вывести все рейсы, совершенные из Москвы
SELECT *
FROM Trip
WHERE town_from = 'Moscow';

//Task: Print the names of people that end in "man"
//Условие задачи: Вывести имена людей, которые заканчиваются на "man"
SELECT name
FROM passenger
WHERE name LIKE '%man%';
