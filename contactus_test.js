const { options } = require('joi');
var random = require('random-name')
var val = Math.floor(1000 + Math.random() * 9000);
const { Page } = require('puppeteer');
Feature('contactus');
Scenario('To check user is  able to send message', async ({ I }) => {
    I.amOnPage('/contact')
    I.wait(3)
    I.fillField({ xpath: `//input[@name='firstname']` }, random.first())
    I.fillField({ xpath: `//input[@name='lastname']` }, random.last())
    I.fillField({ xpath: `//input[@name='email']` }, random.middle() + 'gera@gmail.com')
    I.fillField({ xpath: `//input[@name='mobilephone']` }, '905115' + val)
    I.selectOption({ xpath: `//select[starts-with(@id, 'how_did_you_hear_about_us')]` }, 'Word of mouth')
    I.fillField({ xpath: `//textarea[@name='message']` }, 'Message')
    pause()
    I.click({ xpath: `//input[@value='Send Message >']` })
    I.waitForVisible({ xpath: `//div[contains(@class,'submitted-message')]//p` }, 5)
    I.see(`Thank you for your message. We'll get back to you as soon as possible.`, { xpath: `//div[contains(@class,'submitted-message')]//p` })
});
Scenario('To check user is getting validation message when click send button without filling any details ', async ({ I }) => {
    I.amOnPage('/contact')
    I.scrollPageToBottom()
    I.wait(2)
    I.click({ xpath: `//input[@value='Send Message >']` })
    I.wait(2)
    let Fname = await I.grabTextFrom({ xpath: `//li//label[contains(@data-reactid,'$firstname')]` })
    I.assertEqual(Fname, 'Please complete this required field.',);
    let Lname = await I.grabTextFrom({ xpath: `//li//label[contains(@data-reactid,'$lastname')]` })
    I.assertEqual(Lname, 'Please complete this required field.',);
    let Email = await I.grabTextFrom({ xpath: `//li//label[contains(@data-reactid,'$email')]` })
    I.assertEqual(Email, 'Please complete this required field.');
    let mobile = await I.grabTextFrom({ xpath: `//li//label[contains(@data-reactid,'$mobilephone')]` })
    I.assertEqual(mobile, 'Please complete this required field.')
    let msg = await I.grabTextFrom({ xpath: `//li//label[contains(@data-reactid,'$message')]` })
    I.assertEqual(msg, 'Please complete this required field.')
});
