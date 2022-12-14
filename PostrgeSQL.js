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
SELECT plane
FROM Trip
WHERE town_from = 'Moscow'
GROUP BY plane;

//Task:  Flight ,committed from 10 a.m. to 14 p.m. on January 1 , 1900 .
//Условие задачи: Вывести вылеты, совершенные с 10 ч. по 14 ч. 1 января 1900 г.
SELECT *
FROM trip
WHERE time_out BETWEEN '1900-01-01 10:00' AND '1900-01-01 14:00'

//Task: Which companies organize flights from Vladivostok
//Условие задачи: Какие компании организуют рейсы из Владивостока
SELECT Company.name
FROM Company
  INNER JOIN Trip ON Company.id = Trip.company
WHERE Trip.town_from = 'Vladivostok'
GROUP BY name;

//Task: Display passengers with the longest name
//Условие задачи: Вывести пассажиров с самым длинным именем
SELECT name
FROM Passenger
ORDER BY LENGTH(name) DESC
LIMIT 1

//Task: Output the id and number of passengers for all past flights
//Условие задачи: Вывести id и количество пассажиров для всех прошедших полётов
SELECT Pass_in_trip.trip,
  COUNT(passenger) AS count
FROM Pass_in_trip
GROUP BY trip

//Task: Print the names of people who have a full namesake among the passengers
//Условие задачи: Выведите имена людей, у которых есть полные тезки среди пассажиров
SELECT name
FROM Passenger
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC

//Task: Which cities did Bruce Willis fly to
//Условие задачи: В какие города летал Брюс Уиллис
SELECT Trip.town_to
FROM Trip
  INNER JOIN Pass_in_trip ON Trip.id = Pass_in_trip.trip
  INNER JOIN Passenger ON Pass_in_trip.passenger = Passenger.id
WHERE Passenger.name = 'Bruce Willis'
GROUP BY town_to;

//Task: Print the date and time of arrival of passenger Steve Martin to London (London)
//Условие задачи: Выведите дату и время прилёта пассажира Стив Мартин (Steve Martin) в Лондон (London)
SELECT Trip.time_in
FROM Trip
  INNER JOIN Pass_in_trip ON Trip.id = Pass_in_trip.trip
  INNER JOIN Passenger ON Pass_in_trip.passenger = Passenger.id
WHERE Passenger.name = 'Steve Martin'
  AND Trip.town_to = 'London'
GROUP BY time_in

//Task: Output a list of passengers sorted by the number of flights (descending) and name (ascending) who have made at least 1 flight.
//Условие задачи: Вывести отсортированный по количеству перелетов (по убыванию) и имени (по возрастанию) список пассажиров, совершивших хотя бы 1 полет.
SELECT Passenger.name,
  COUNT(place) AS count
FROM Trip
  INNER JOIN Pass_in_trip ON Trip.id = Pass_in_trip.trip
  INNER JOIN Passenger ON Pass_in_trip.passenger = Passenger.id
WHERE passenger >= 1
GROUP BY name
ORDER BY count DESC,
  name ASC

//Task: Determine which family member bought potatoes
//Условие задачи: Определить, кто из членов семьи покупал картошку
SELECT FamilyMembers.status
FROM FamilyMembers
  INNER JOIN Payments ON FamilyMembers.member_id = Payments.family_member
  INNER JOIN Goods ON Payments.good = Goods.good_id
WHERE Goods.good_name = 'potato'
GROUP BY status

//Task: How much and who from the family spent on entertainment (entertainment). Output family status, name, amount
//Условие задачи: Сколько и кто из семьи потратил на развлечения (entertainment). Вывести статус в семье, имя, сумму
SELECT FamilyMembers.status,
  FamilyMembers.member_name,
  SUM(unit_price * amount) AS costs
FROM FamilyMembers
  INNER JOIN Payments ON FamilyMembers.member_id = Payments.family_member
  INNER JOIN Goods ON Payments.good = Goods.good_id
  INNER JOIN GoodTypes ON Goods.type = GoodTypes.good_type_id
WHERE GoodTypes.good_type_name = 'entertainment'
GROUP BY status,
  member_name;

//Task: Identify products that have been bought more than 1 time
//Условие задачи: Определить товары, которые покупали более 1 раза
SELECT Goods.good_name
FROM Goods
  INNER JOIN Payments ON Goods.good_id = Payments.good
  INNER JOIN GoodTypes ON Goods.type = GoodTypes.good_type_id
GROUP BY good_name
HAVING COUNT(amount) > 1

//Task: Find the names of all mothers
//Условие задачи: Найти имена всех матерей
SELECT member_name
FROM FamilyMembers
WHERE status = 'mother'
GROUP BY member_name;

//Task: Find the most expensive delicacy and display its cost
//Условие задачи: Найдите самый дорогой деликатес  и выведите его стоимость
SELECT Goods.good_name,
  Payments.unit_price
FROM Payments
  INNER JOIN Goods ON Payments.good = Goods.good_id
  INNER JOIN GoodTypes ON Goods.type = GoodTypes.good_type_id
WHERE GoodTypes.good_type_name = 'delicacies'
GROUP BY good_name,
  unit_price
HAVING (unit_price)
LIMIT 1

//Task: Determine who spent and how much in June 2005
//Условие задачи: Определить кто и сколько потратил в июне 2005
SELECT FamilyMembers.member_name,
  SUM(unit_price * amount) AS costs
FROM FamilyMembers
  INNER JOIN Payments ON FamilyMembers.member_id = Payments.family_member
WHERE Payments.date BETWEEN '2005-06-01' AND '2005-06-30'
GROUP BY member_name;

//Task: Determine which products were not purchased in 2005
//Условие задачи: Определить, какие товары не покупались в 2005 году
SELECT Goods.good_name
FROM Goods
WHERE good_id NOT IN (
    SELECT good
    FROM Payments
    WHERE YEAR(date) = 2005
 )

//Task: How many flights have airlines made from Rostov to Moscow ?
//Условие задачи: Сколько рейсов совершили авиакомпании из Ростова в Москву?
SELECT COUNT(company) AS count
FROM Trip
  INNER JOIN Company ON Trip.company = Company.id
WHERE town_from = 'Rostov'
  AND town_to = 'Moscow'

//Task: Print the names of the passengers who flew to Moscow on the TU-134 plane
//Условие задачи: Выведите имена пассажиров, прилетевших в Москву на самолете ТУ-134
SELECT Passenger.name
FROM Trip
  INNER JOIN Pass_in_trip ON Trip.id = Pass_in_trip.trip
  INNER JOIN Passenger ON Pass_in_trip.passenger = Passenger.id
WHERE Trip.town_to = 'Moscow'
  AND Trip.plane = 'TU-134'
GROUP BY name

//Task: Output the load (number of passengers) of each flight. Output the result in sorted form in descending order of load.
//Условие задачи: Выведите нагруженность (число пассажиров) каждого рейса. Результат вывести в отсортированном виде по убыванию нагруженности.
SELECT Pass_in_trip.trip,
  COUNT(passenger) AS count
FROM Pass_in_trip
  INNER JOIN Trip ON Pass_in_trip.trip = Trip.id
  INNER JOIN Passenger ON Pass_in_trip.passenger = Passenger.id
GROUP BY trip
ORDER BY count DESC

//Task: Output all family members with the surname Quincey.
//Условие задачи: Вывести всех членов семьи с фамилией Quincey.
SELECT *
FROM FamilyMembers
WHERE member_name LIKE '%Quincey%'

//Task: What time does the 4th academic subject start according to the schedule?.
//Условие задачи: Во сколько начинается 4-ый учебный предмет по расписанию ?
SELECT start_pair
FROM Timepair
WHERE id = 4

//Task: Print the names of the teachers who lead physical culture (Physical Culture). Sort the teachers by last name.
//Условие задачи: Выведите имена учителей, которые ведут физическую культуру (Physical Culture). Отсортируйте учителей по фамилии.
SELECT Teacher.last_name
FROM Teacher
  INNER JOIN Schedule ON Teacher.id = Schedule.teacher
  INNER JOIN Subject ON Schedule.subject = Subject.id
WHERE Subject.name = 'Physical Culture'
ORDER BY last_name

//Task: Add a product with the name "Cheese" and the type "food" to the list of products.
//Условие задачи: Добавьте товар с именем "Cheese" и типом "food" в список товаров .
INSERT INTO Goods (good_id, good_name, type)
VALUES (17, 'Cheese', 2)

//Task: Add a new type of "auto" to the list of product types.
//Условие задачи: Добавьте в список типов товаров новый тип "auto".
INSERT INTO GoodTypes (good_type_id, good_type_name)
VALUES (9, 'auto')

//Task: Change the name "Andie Quincey" to the new "Andie Anthony".
//Условие задачи: Измените имя "Andie Quincey" на новое "Andie Anthony".
UPDATE FamilyMembers
SET member_name = 'Andie Anthony'
WHERE member_id = 3

