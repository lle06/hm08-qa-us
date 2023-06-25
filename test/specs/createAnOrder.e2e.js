const page = require('../../page');
const helper = require('../../helper')

describe('call a taxi', () => {
    it('fill in the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    })
    it('select supportive plan', async () => {
        const supportiveButton = $(page.supportiveButton);
        await supportiveButton.click();

    })
    it('fill in phone number', async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();

    })
    it('adding a credit card', async () => {
        await page.addACreditCard();
        const paymentCardIcon = await $(page.paymentCardIcon);
        await expect(paymentCardIcon).toBeExisting();

    })
    it('message driver', async () => {
        const messageDriver = await $(page.messageDriver);
        await messageDriver.setValue('Get some whiskey');
        await messageDriver.waitForDisplayed();
        await expect (await messageDriver.getValue()).toContain('Get some whiskey');

    })
    it('order blanket and handkerchiefs', async () => {
        const blanketSwitch = await $(page.blanketSwitch);
        await blanketSwitch.click();
        const sliderRound = await $(page.sliderRound);
        await expect(sliderRound).not.toBe(before);

    })
        it('order 2 ice creams', async () => {
            //add button is clicked
        const addIceCream = await $(page.addIceCream);
        await addIceCream.click();
        await addIceCream.click();

        const counterValue = await $(page.counterValue);
        await expect(await counterValue.getText()).toEqual('2');
       
    })
    it('car search modal should appear', async () => {
        const carSearchButton = await $(page.carSearchButton);
        await carSearchButton.click();

        const orderModal = await $(page.orderModal);
        await expect(await orderModal).toBeExisting();

    }) 
        it('driver info modal appears', async () => {
        const driverInfoModal = await $(page.driverInfoModal);
        await driverInfoModal.waitForExist({timeout: 35000});
        await expect (driverInfoModal).toBeExisting();

    }) 
})

