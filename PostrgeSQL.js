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

//Task: Get a list of all employees whose last letter in the name is 'a'
//Условие задачи: Получите список всех сотрудников, последняя буква в названии которых - "а".
SELECT *
  FROM employees
 WHERE first_name LIKE '%a';

//Task: Get a list of all employees whose name length is more than 10 letters
//Условие задачи: Получите список всех сотрудников, длина имени которых превышает 10 букв
SELECT *
  FROM employees
 WHERE LENGTH (first_name) > 10;

//Task: Get the salary level of each employee: Less than 5000 is considered Low level, More than or equal to 5000 and less than 10000 is considered Normal level, More than or equal to 10000 is considered High level
//Условие задачи: Получите уровень заработной платы каждого сотрудника: Менее 5000 считается низким уровнем, больше или равным 5000 и менее 10000 считается нормальным уровнем, больше или равным 10000 считается высоким уровнем.
SELECT first_name,
       salary,
       CASE
           WHEN salary < 5000 THEN 'Low'
           WHEN salary >= 5000 AND salary < 10000 THEN 'Normal'
           WHEN salary >= 10000 THEN 'High'
           ELSE 'Unknown'
       END
           salary_level
  FROM employees;

//Task: Find the model number, speed, and hard drive size for all PCs priced under $500.
//Условие задачи: Найдите номер модели, скорость и размер жесткого диска для всех ПК стоимостью менее 500 долларов.
SELECT model, speed, hd
FROM PC
WHERE price < 500;

//Task: Find the model number, speed and size of the hard disk of a PC with a 12x or 24x CD and a price of less than $ 600.
//Условие задачи: Найдите номер модели, скорость и размер жесткого диска ПК с 12-кратным или 24-кратным компакт-диском и ценой менее 600 долларов.
SELECT PC.model, PC.speed, PC.hd
FROM PC
WHERE PC.cd IN ('12x', '24x') AND
price < 600;

//Task: For each manufacturer that produces PC notebooks with a hard disk capacity of at least 10 GB, find the speeds of such PC notebooks.
//Условие задачи: Для каждого производителя, выпускающего ПК-блокноты c объёмом жесткого диска не менее 10 Гбайт, найти скорости таких ПК-блокнотов.
SELECT DISTINCT Product.maker, Laptop.speed
FROM Product, Laptop
WHERE Laptop.hd >= 10 AND
 type IN(SELECT type
 FROM Product
 WHERE type = 'laptop'
 );

//Task: Select books whose rating field is not empty
//Условие задачи: Выберите книги, поле рейтинга которых не является пустым
SELECT
     name,
     rating
FROM
     books
WHERE
     rating IS NOT NULL;

//Command: To create a dump
//Команда: Для создания дампа
pg_dump database_name > the path and name of the dump file

//Command: Only certain tables can be copied with this command
//Команда: С помощью этой команды можно скопировать только определенные таблицы
pg_dump -t table_name1 -t table_name2 database_name > the path and name of the dump file

//Command: This command can be used to restore the dump
//Команда: Эта команда может быть использована для восстановления дампа
psql database_name < the path and name of the dump file

//Command: This command is needed to connect to the database
//Команда: Эта команда нужна чтобы подключиться к базе данных
psql -U user_name -d database_name
//Explanation: After entering this command, you will be asked for a password, by default it is smith
//Пояснение: После ввода этой команды, у вас потребуют пароль, по умолчанию он - smith

//Task: Count the number of books that Remarque has written
//Условие задачи: Подсчитайте количество книг, написанных Ремарком
SELECT
    COUNT(*) AS cnt
FROM
    books
WHERE
    author = "Эрих Мария Ремарк";

//Task: Select only unique authors
//Условие задачи: Выбрать только уникальных авторов.
SELECT
    DISTINCT author AS unique_authors
FROM
    books;

//Task: Calculate the average price of books
//Условие задачи: Рассчитайте среднюю цену книг
SELECT
     AVG(price) AS average
FROM
     books;

//Task: Find the total cost of all books
//Условие задачи: Найдите общую стоимость всех книг
SELECT
    SUM(price) AS summa
FROM
    books;

//Task: Return all book titles from the same publisher
//Условие задачи: Вернуть все названия книг от одного и того же издателя
SELECT
     name,
     pub_name
FROM
     books
WHERE
     pub_name IN ('АСТ', 'ЛитРес', 'Росмэн', 'Эксмо');

//Task: Print the title of the book, the author's name and the price from 1990 to 2001
//Условие задачи: Напечатайте название книги, имя автора и цену с 1990 по 2001 год
SELECT
     name,
     author,
     date_pub,
     price
FROM
     books
WHERE
     date_pub BETWEEN "1991-01-01" AND "2000-12-31";

//Task: Print all the books that Remarque did not write
//Условие задачи: Напечатать все книги, которые Ремарк не писал
SELECT
    name,
    author
FROM
    books
WHERE
    author != 'Эрих Мария Ремарк';

//Task: Return the number of rows in the table
//Условие задачи: Вернуть количество строк в таблице
SELECT
   COUNT(*) AS cnt
FROM
   books;

//Task: Find the average number of pages
//Условие задачи: Найдите среднее количество страниц
SELECT
   AVG(page :: integer) AS average
FROM
   books;

//Task: Check if there are gaps in the price table
//Условие задачи: Проверьте, нет ли пробелов в таблице цен
SELECT
     name,
     price
FROM
     books
WHERE
     price IS NULL;

//Task: Select the name field and the price field from the books table. If there is no value in the price column, replace it with 234
//Условие задачи: Выберите поле название и поле цена в таблице книги. Если в столбце цена нет значения, замените его на 234
SELECT
    name,
    CASE WHEN price IS NULL THEN 234
    ELSE price END AS price_info
FROM
    books;

//Task: How long will the student stay at school, studying from the 2nd to the 4th academic subject?
//Условие задачи: Как долго ученик пробудет в школе, изучая со 2-го по 4-й учебный предмет?
 SELECT
     DISTINCT TIMEDIFF((SELECT end_pair FROM Timepair WHERE id = 4), (SELECT start_pair FROM Timepair WHERE id = 2)) as time
  FROM
     Timepair;

//Explore: Today I learned another way to create a database
//Изучил: Сегодня я узнал еще один способ создания базы данных
CREATE DATABASE имя
    [ WITH ] [ OWNER [=] имя_пользователя ]
           [ TEMPLATE [=] шаблон ]
           [ ENCODING [=] кодировка ]
           [ LOCALE [=] локаль ]
           [ LC_COLLATE [=] категория_сортировки ]
           [ LC_CTYPE [=] категория_типов_символов ]
           [ TABLESPACE [=] табл_пространство ]
           [ ALLOW_CONNECTIONS [=] разр_подключения ]
           [ CONNECTION LIMIT [=] предел_подключений ]
           [ IS_TEMPLATE [=] это_шаблон ]

//Task: Get a list of all employees whose name contains the symbol '%'
//Условие задачи: Получите список всех сотрудников, имя которых содержит символ '%'
SELECT *
  FROM employees
 WHERE first_name LIKE '%\%%' ESCAPE '\';

//Task: Get a list of all employees whose name length is more than 10 letters
//Условие задачи: Получите список всех сотрудников, длина имени которых превышает 10 букв
SELECT *
  FROM employees
 WHERE LENGTH (first_name) > 10;

//Task: Get a list of all employees whose last letter in the name is equal to 'm' and the name length is greater than 5
//Условие задачи: Получите список всех сотрудников, последняя буква имени которых равна "м", а длина имени больше 5
SELECT *
  FROM employees
 WHERE SUBSTR (first_name, -1) = 'm' AND LENGTH(first_name)>5;

//Task: Get a list of region_id the sum of all letters of all country_name in which there are more than 60
//Условие задачи: Получите список region_id - сумма всех букв всех названий стран, в которых их более 60
SELECT region_id
    FROM countries
GROUP BY region_id
  HAVING SUM (LENGTH (country_name)) > 60;

//Task: Get a list of employees with the longest name.
//Условие задачи: Получите список сотрудников с самым длинным именем.
SELECT *
  FROM employees
 WHERE LENGTH (first_name) =
       (SELECT MAX (LENGTH (first_name)) FROM employees);

//Task: Get a list of department_id with more than 30 employees
//Условие задачи: Получите список department_id с более чем 30 сотрудниками
SELECT department_id
    FROM employees
GROUP BY department_id
  HAVING COUNT (*) > 30;

//Task: Withdraw all customers from Mexico
//Условие задачи: Вывести всех клиентов из мексики
SELECT *
FROM Customers
WHERE Country='Mexico';

//Task: A table showing the number of users in each country.
//Условие задачи: Таблица, показывающая количество пользователей в каждой стране.
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country;

//Explore: Today I learned how to get data from two tables
//Узнал: Сегодня я узнал, как получать данные из двух таблиц
SELECT
     column_name
FROM
     table_name
INNER JOIN table_name2 IN Table1.column_name = Table2.column_name;

//Explore: Today I learned how to print the psql version and shut down
//Узнал: Сегодня я узнал, как распечатать версию psql и завершить работу
-V
//--version


//Explore: Today I found out with the help of which command you can find out how much disk space is occupied by the specified layer of this table
//Узнал: Сегодня я выяснил, с помощью какой команды можно узнать, сколько места на диске занимает указанный слой этой таблицы
SELECT pg_relation_size('accounts');

//Explore: Today I learned how to make psql request a password before connecting to the database
//Узнал: Сегодня я узнал, как заставить psql запрашивать пароль перед подключением к базе данных
-W
//--password

//Explore: Today I learned how to remove the sorting rule
//Узнал: Сегодня я узнал, как удалить правило сортировки
DROP COLLATION [ IF EXISTS ] имя [ CASCADE | RESTRICT ]

//Explore: Today I found out how to connect to a certain database
//Узнал:Сегодня я узнал, как подключиться к определенной базе данных
\c database_name;

//Explore: Today I learned how to convert types
//Узнал: Сегодня я узнал, как конвертировать типы
SELECT CAST ('365' AS INT);

//Explore: Today I learned how to get a list of databases
//Узнал: Сегодня я узнал, как получить список баз данных
\l

//Explore: Today I learned how to output the current database connection
//Узнал: Сегодня я узнал, как вывести текущее подключение к базе данных
\conninfo

//Explore: Today I found out with which command you can create a file
//Узнал: Сегодня я узнал, с помощью какой команды вы можете создать файл
touch file_name

//Explore: Today I found out with which command you can save a file
//Узнал: Сегодня я узнал, с помощью какой команды вы можете сохранить файл
echo file_name > file_name;

//Explore: Today I found out with which command you can view the contents of the file
//Узнал: Сегодня я узнал, с помощью какой команды вы можете просмотреть содержимое файла
cat file_name;


//Explore: Today I found out with which command you can transfer a file from the current directory to the home directory
//Узнал: Сегодня я узнал, с помощью какой команды вы можете перенести файл из текущего каталога в домашний каталог
mv card.txt ~/


//Explore: Today I learned how to view a file in the editor
//Узнал: Сегодня я узнал, как просмотреть файл в редакторе
nano apache_2020-01-01.txt

//Explore: Today I found out with which command you can create a directory
//Узнал: Сегодня я узнал, с помощью какой команды вы можете создать каталог
mkdir var/log/temp

//Explore: Today I found out with which command you can copy a file or folder
//Узнал: Сегодня я узнал, с помощью какой команды вы можете скопировать файл или папку
cp logs/2020/1/apache_2020-01-01.txt copy


//Explore: Today I found out with which command you can delete empty folders
//Узнал: Сегодня я узнал, с помощью какой команды вы можете удалять пустые папки
rmdir
