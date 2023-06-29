const page = require('../../page');
const helper = require('../../helper')

describe('should call a taxi', () => {
    it('should fill in the address', async () => {    
    await browser.url(`/`);
    await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    const fromField = await $(page.fromField).getValue();
    const toField = await $(page.toField).getValue();
    await expect(fromField).toBe('East 2nd Street, 601');
    await expect(toField).toBe('1300 1st St');

    })
     it('should select supportive plan', async () => {
        const supportiveButton = $(page.supportiveButton);
        await supportiveButton.click();

        const activeSupportiveButton = $(page.activeSupportiveButton);
        await expect (activeSupportiveButton).toBeExisting();

    })
    it('should fill in phone number', async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();

    })
    it('should add a credit card', async () => {
        await page.addACreditCard();
        const addedPaymentMethod = await $(page.addedPaymentMethod);
        await expect (addedPaymentMethod).toBeExisting();

    })
    it('should message driver', async () => {
        const messageDriver = await $(page.messageDriver);
        await messageDriver.setValue('Get some whiskey');
        await messageDriver.waitForDisplayed();
        await expect (await messageDriver.getValue()).toContain('Get some whiskey');

    })
    it('should order blanket and handkerchiefs', async () => {
        const blanketSwitch = await $(page.blanketSwitch);
        await blanketSwitch.click();
        await blanketSwitch.waitForDisplayed();

        const isOrdered = await $(page.isOrdered);
        await expect(isOrdered).toBeChecked();
    
    })
        it('should order 2 ice creams', async () => {
        const addIceCream = await $(page.addIceCream);
        await addIceCream.click();
        await addIceCream.click();

        const counterValue = await $(page.counterValue);
        await expect(await counterValue.getText()).toEqual('2');
       
    })
    it('should show car search modal', async () => {
        const carSearchButton = await $(page.carSearchButton);
        await carSearchButton.click();

        const orderModal = await $(page.orderModal);
        await expect(await orderModal).toBeExisting();

    }) 
        it('should show driver info modal', async () => {
        const driverInfoModal = await $(page.driverInfoModal);
        await driverInfoModal.waitForExist({timeout: 35000});
        await expect (driverInfoModal).toBeExisting();
    }) 
})

