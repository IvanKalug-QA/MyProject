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
WHERE name LIKE '%man';

//Task: Print the number of flights made on TU-134
//Условие задачи: Вывести количество рейсов, выполненных на ТУ-134
SELECT COUNT(plane) as count
FROM Trip
WHERE plane = 'TU-134';

//Task: Which companies have flown on Boeing?
//Условие задачи: Какие компании летали на Boeing?
SELECT company.name
FROM Company
  LEFT JOIN Trip ON Trip.company = Company.id
WHERE plane = 'Boeing'
GROUP BY name;

//Task: Print all the names of the planes on which you can fly to Moscow
//Условие задачи: Выведите все названия самолетов, на которых вы можете вылететь в Москву

