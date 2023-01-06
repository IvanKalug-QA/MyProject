//Hello my name is Ivan
//Now I'll show you a simple autotest
//Сейчас я покажу вам простой автотест

const puppeteer = require('puppeteer');
const URL_TEST = 'https://www.google.com/';

async function test() {
  console.log('Запуск браузера');
  const browser = await puppeteer.launch({headless: false, slowMo: 150});

  console.log('Создание новой вкладки в браузере');
  const page = await browser.newPage();

  console.log('Переход по ссылке');
  await page.goto(URL_TEST);

  console.log('Ввод текста в поле ');
  const elemeny = await page.$('input[class="gLFyf"]');
  await elemeny.type('YouTube');

  console.log('Нажать на кнопку Найти');
  const  searh = await page.$('input[class="gNO89b"]');
  await searh.click();

  await page.waitForSelector('a[href="https://www.youtube.com/?hl=RU"]');

  console.log('Нажать на ютуб');
  const tap = await page.$('a[href="https://www.youtube.com/?hl=RU"]');
  await tap.click();

  await page.waitForNavigation('#guide');

  console.log('Закрытие браузера');
  await browser.close();
}
test();

//My Autotest_2
//Мой Автотест_2
const puppeteer = require('puppeteer');
const URL_TEST = 'https://www.codewars.com/';

async function test() {
  console.log('Запуск браузера');
  const browser = await puppeteer.launch({headless: false, slowMo: 150, defaultViewport: null});

  console.log('Создание новой вкладки в браузере');
  const page = await browser.newPage();

  console.log('Переход по ссылке');
  await page.goto(URL_TEST);

  console.log('Нажатия на поле SING IN');
  const knock = await page.$('#login-btn');
  await knock.click();

  await page.waitForSelector('#users_sessions');

  console.log('Ввод текста в поле login');
  const elemeny = await page.$('#user_email');
  await elemeny.type('You email');

  console.log('Ввод текста в поле пароль');
  const elemeny1 = await page.$('#user_password');
  await elemeny1.type('You password')

  console.log('Нажать на кнопку SIGN IN');
  const  searh = await page.$('button[type="submit"]');
  await searh.click();

  await page.waitForSelector('#app');

  console.log('Закрытие браузера');
  await browser.close();
}
test();
