module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cardCodeField:'.card-second-row #code',
    messageDriver:'.input-container #comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    supportiveButton: 'div=Supportive',
    activeSupportiveButton: '//div[@class="tcard active"]//div[starts-with(text(),"Supportive")]',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-text',
    addCard: 'div=Add card',
    linkCardButton:'button=Link',
    closeButton:'.payment-picker .close-button',
    blanketSwitch:'.r-sw-container .r-sw .switch',
    isOrdered: '//div[@class="r-sw-container"]//input [@type= "checkbox"]',
    addIceCream:'.r-counter .counter-plus',
    carSearchButton:'.smart-button-wrapper .smart-button',
    // Modals
    phoneNumberModal: '.modal',
    orderModal: '.order .order-body',
    driverInfoModal:'.order-body',
    // Misc.
    placeHolder: '.plc',
    counterValue: '.counter-value',
    addedPaymentMethod: '//div[@class="pp-row"]//div[contains(text(), "Card")]',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addACreditCard: async function(){
       const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.click();

        const addCard = await $(this.addCard);
        await addCard.click();

        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.click();
        await cardNumberField.setValue(123400004321);

        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.click();
        await cardCodeField.setValue(12);

        const placeHolder = await $(this.placeHolder);
        await placeHolder.waitForDisplayed();
        await placeHolder.click();

        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForClickable();
        await linkCardButton.click();

        const closeButton = await $(this.closeButton);
        await closeButton.click();
    },
    messageDriverInput: async function() {
        const messageDriver = await $(this.messageDriver);
        await messageDriver.setValue('Get some whiskey');
        await messageDriver.waitForDisplayed();
    }
};