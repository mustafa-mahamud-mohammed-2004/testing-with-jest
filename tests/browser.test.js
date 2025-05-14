const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const path = require('path');
const serviceBuilder = new firefox.ServiceBuilder('./geckodriver.exe');

const fileUnderTest = 'file://' + path.resolve(__dirname, '../dist/index.html').replace(/\\/g, '/').replace(/ /g, '%20');
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async () => {
    if (driver) {
        await driver.quit();
    }
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

// End-to-end test with Selenium
describe('Custom E2E: popping from stack updates the top correctly', () => {
    it('should push two values and pop one, showing correct top value', async () => {
        // Push "First"
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("First");
        await alert.accept();

        // Push "Second"
        push = await driver.findElement(By.id('push'));
        await push.click();
        alert = await driver.switchTo().alert();
        await alert.sendKeys("Second");
        await alert.accept();

        // Pop once
        const pop = await driver.findElement(By.id('pops'));
        await pop.click();

        // Check that the top is now "First"
        let top = await driver.findElement(By.id('top_of_stack')).getText();
        expect(top).toBe("First");
    });
});
