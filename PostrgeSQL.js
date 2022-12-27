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

//Task: Delete all family members with the surname "Quincy".
//Условие задачи: Удалить всех членов семьи с фамилией "Quincey".
DELETE FROM FamilyMembers
WHERE member_name LIKE '%Quincey%'

//Task: Delete all flights made from Moscow
//Условие задачи: Удалить все рейсы, выполненные из Москвы
DELETE FROM Trip
WHERE town_from = 'Moscow'

//Task: Withdraw users who have specified a Belarusian phone number?
//Условие задачи: Вывести пользователей,указавших Белорусский номер телефона ?
SELECT *
FROM Users
WHERE phone_number LIKE '%+375%'

//Today I studied nested conditions
//Сегодня я изучал вложенные условия
//For example:
CASE
     WHEN condition THEN
         CASE
             WHEN othercondition THEN
                 ....
         END
END

//Syntax
CASE выражение
    WHEN значение THEN результат
    [WHEN ...]
    [ELSE результат]
END

//Task: Get a list of all employees whose last letter in the name is 'a'
//условие задачи: Получить список всех сотрудников у которых последняя буква в имени равна 'a'
SELECT *
  FROM employees
 WHERE first_name LIKE '%a';

//Task: Get a list of all employees from the 50th and 80th department who have a bonus
//Условие задачи: Получите список всех сотрудников из 50-го и 80-го отделов, у которых есть бонус
SELECT *
  FROM employees
 WHERE     (department_id = 50 OR department_id = 80)
       AND commission_pct IS NOT NULL;

//Task: Get a list of all employees whose salary is in the range from 8000 to 9000
//Условие задачи: Получить список всех сотрудников у которых зарплата находится в промежутке от 8000 до 9000
SELECT *
  FROM employees
 WHERE salary BETWEEN 8000 AND 9000;

//Task: In which classes does the Krause teacher teach?
//Условие задачи: В каких классах введет занятия преподаватель "Krauze" ?
SELECT Class.name
FROM Class
  INNER JOIN Schedule ON Class.id = Schedule.class
  INNER JOIN Teacher ON Schedule.teacher = Teacher.id
WHERE Teacher.last_name = 'Krauze'
GROUP BY name

//Task: How many 10th graders are there in total
//Условие задачи: Сколько всего 10-ых классов
SELECT COUNT(DISTINCT class) AS count
FROM Student_in_class
  INNER JOIN Class ON Student_in_class.class = Class.id
WHERE Class.name LIKE '10%'

//Task: Print the name of the subjects that Romashkin P.P. teaches.
//Условие задачи: Выведите название предметов, которые преподает Ромашкин П.П.
SELECT name AS subjects
FROM Subject
  INNER JOIN Schedule ON Subject.id = Schedule.subject
  INNER JOIN Teacher ON Schedule.teacher = Teacher.id
WHERE Teacher.last_name = 'Romashkin'

//Task: How long will the student stay at school, studying from the 2nd to the 4th academic subject?
//Условие задачи: Сколько времени обучающийся будет находиться в школе, учась со 2-го по 4-ый уч. предмет ?
SELECT DISTINCT TIMEDIFF(
    (
      SELECT end_pair
      FROM Timepair
      WHERE id = 4
    ),
    (
      SELECT start_pair
      FROM Timepair
      WHERE id = 2
    )
  ) AS time
FROM Timepair;

//Task: How many different classrooms of the school were used on 2.09.2019 for educational purposes ?
//Условие задачи: Сколько различных кабинетов школы использовались 2.09.2019 в образовательных целях ?
SELECT COUNT(DISTINCT classroom) AS count
FROM Schedule
WHERE Schedule.date = '2019-09-02'

//Task: Output the average age of people (in years) stored in the database. Round the result down to a whole.
//Условие задачи: Вывести средний возраст людей (в годах), хранящихся в базе данных. Результат округлите до целого в меньшую сторону.
SELECT FLOOR(AVG(YEAR(CURRENT_DATE) - YEAR(birthday))) AS age
FROM FamilyMembers;

//Explore: Today I studied how to change the current information in the table
//Изучил: Сегодня я изучил, как изменить текущую информацию в таблице
UPDATE
    table_name
SET
   column name = field value
WHERE
   condition

//Study: Today I studied how to create a database
//Изучил: Сегодня я изучал, как создать базу данных
createdb -T template0 database_name
//Explanation: A template that creates a clean database
//Пояснение: Шаблон, который создает чистую базу данных

//Study: Today I learned how to add a new row to a table
//Изучил: Сегодня я узнал, как добавить новую строку в таблицу
INSERT INTO
table_name
(column_name)
VALUES
(Meaning_1)

//Study: Today I learned how to apply the construction CASE
//Изучил: Сегодня я узнал, как применять конструкцию CASE
CASE
    WHEN Condition_1 THEN Result_1
    WHEN Condition_2 THEN Result_2
    ELSE Result_3
END;
//Explanation: This construction creates the condition
//Пояснение: Эта конструкция создает условие

//Study: Today I learned how to delete data from a table
//Изучил: Сегодня я узнал, как удалить данные из таблицы
DELETE FROM
      table_name
WHERE
      Condition;

//Task: Get a list of all employees from the 20th and from the 30th department
//Условие задачи: Получите список всех сотрудников из 20-го и из 30-го отделов
SELECT *
  FROM employees
 WHERE department_id = 20 OR department_id = 30;

//Task: Get a list of all employees from the 50th department with a salary greater than 4000
//Условие задачи: Получите список всех сотрудников из 50-го отдела с зарплатой более 4000
SELECT *
  FROM employees
 WHERE department_id = 50 AND salary > 4000;

//Task: Get a list of all employees with job_id equal to 'IT_PROG'
//Условие задачи: Получите список всех сотрудников с job_id, равным 'IT_PROG'
SELECT *
  FROM employees
 WHERE job_id = 'IT_PROG'

