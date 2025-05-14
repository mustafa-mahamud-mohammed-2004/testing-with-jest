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
// End-to-end test for pushing and popping values in the stack
describe('Gör en E2E: pop() till stacken vilket uppdaterar top på rätt sätt', () => {
    it('should push two values and pop one, showing correct top value', async () => {
        // Push "First" to the stack
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("First");
        await alert.accept();

        // Push "Second" to the stack
        push = await driver.findElement(By.id('push'));
        await push.click();
        alert = await driver.switchTo().alert();
        await alert.sendKeys("Second");
        await alert.accept();

        // Now pop from the stack
        const pop = await driver.findElement(By.id('pop'));
        await pop.click();

        // Wait for the top element to become visible
        let topElement = await driver.wait(until.elementIsVisible(driver.findElement(By.id('top_of_stack'))), 5000);
        let top = await topElement.getText();

        // Assert that the top of the stack is "First"
        expect(top).toBe("First");

        // Handle any unexpected alert that may appear after the pop operation
        try {
            await driver.wait(until.alertIsPresent(), 2000); // Shorter timeout for unexpected alert
            let alert = await driver.switchTo().alert();
            console.log('Unexpected alert detected: ' + await alert.getText());
            await alert.dismiss(); // Dismiss any unexpected alert
        } catch (error) {
            console.log('No unexpected alert appeared');
        }
    });
});
