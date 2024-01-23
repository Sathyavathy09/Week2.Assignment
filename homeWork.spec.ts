import {test, chromium, expect} from "@playwright/test";
test("1. Create Lead in salesforce", async() =>{

    const browser = await chromium.launch({ headless: false, channel:"chrome" });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //1. Login to https://login.salesforce.com
    await page.goto("https://login.salesforce.com/");
    await page.locator('#username').fill("jelamaran@gmail.com");
    await page.locator('#password').fill("Sathya@123");
    await page.locator('#Login').click();

    //2. Click on toggle menu button from the left corner
    await page.click(".slds-icon-waffle");

    //3. Click view All and click Sales from App Launcher
    await page.click("[aria-label='View All Applications']");
    await page.waitForTimeout(6000);
    await page.locator("[title*='Manage your sales']").click();

    //4. Click on Leads tab 
    await page.locator("[title='Leads']").click();

    //5. Click on New button
    await page.getByRole('button',{name:'New'}).click();
    
    //6. Select Salutation dropdown
    await page.locator("[name='salutation']").click();
    await page.locator("[data-value='Mr.']").click();

    //7. Enter the Last Name
    const last_name = "Jones"

    await page.locator("[name='lastName']").fill (last_name);

    //8. Enter the CompanyName 
    await page.locator("[name='Company']").fill("Liberty");

    //9. Click Save and Verify Leads name created
    await page.locator("[name='SaveEdit']").click();
    const name = await page.locator(".forceActionLink").getAttribute("title");
    if(name?.includes(last_name))
    {
        console.log("Leads name created successfully");
        
    }
    
})

test ("2. Edit Lead in Leaftaps", async() =>{

    const browser = await chromium.launch({ headless: false, channel:"chrome" });
    const context = await browser.newContext();
    const page = await context.newPage();
    //1. Launch the browser
    await page.goto("http://leaftaps.com/opentaps/control/main");
    //2. Enter the username
    await page .locator("#username").fill("Demosalesmanager");
    //3. Enter the password
    await page.locator("#password").fill("crmsfa");
    //4. Click Login
    await page.locator(".decorativeSubmit").click();
    //5. Click CRM/SFA link
    await page.locator("text=CRM/SFA").click();
    //6. Click Leads link
    await page.locator("[href='/crmsfa/control/leadsMain']").click();
    //7. Click on Create Lead
    await page.locator("text = Create Lead").click();
    //8. Enter company name
    await page .locator("#createLeadForm_companyName").fill("tcs");
    //9. Enter first 
    await page .locator("[name=firstName]").fill("Sathya");
    //10.Enter last 
    await page .locator("[name=lastName]").fill("M");
    //11.Click on Create Lead button
    await page.locator(".smallSubmit").click();
    //12.Click  Edit
    await page.locator("text=Edit").click();
    //13.Change the company 
    await page .locator("#updateLeadForm_companyName").clear();
    await page .locator("#updateLeadForm_companyName").fill("cts");
    //14.Click Update
    await page.locator("[value = Update]").click();

})

test("3. Create Individuals in salesforce", async() =>{

    const browser = await chromium.launch({ headless: false, channel:"chrome" });
    const context = await browser.newContext();
    const page = await context.newPage();

    
    //1. Login to https://login.salesforce.com
    await page.goto("https://login.salesforce.com/");
    await page.locator('#username').fill("jelamaran@gmail.com");
    await page.locator('#password').fill("Sathya@123");
    await page.locator('#Login').click();
    await page.waitForTimeout(5000);
    //2. Click on toggle menu button from the left corner
    await page.click(".slds-icon-waffle");
    await page.waitForTimeout(6000);

    //3. Click View All and click Individuals from App Launcher
    await page.click("[aria-label='View All Applications']");
    await page.waitForTimeout(6000);
    await page.locator("[data-label=Individuals]").click();

    //4. Click on the Dropdown icon in the Individuals tab
    await page.locator("//div[contains(@class,'slds-p-right--x-small')]").click();
    //await page.locator('[href="/lightning/o/Individual/home"]').click();
    //5. Click on New Individual
    await page.locator("text = New Individual").click();
    //6. Enter the Last Name
    const lastName = "Sims";
    await page.getByPlaceholder("Last Name").fill(lastName);
    //7. Click save and verify Individuals Name
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    const text = await page.locator("[data-aura-class=forceActionsText]").innerText();
    expect (text).toContain (lastName);
    
    
    
})
    test("4. Edit Individuals in salesforce", async() =>{

    const browser = await chromium.launch({ headless: false, channel:"chrome" });
    const context = await browser.newContext();
    const page = await context.newPage();

  //1. Login to https://login.salesforce.com
    await page.goto("https://login.salesforce.com/");
    await page.locator('#username').fill("jelamaran@gmail.com");
    await page.locator('#password').fill("Sathya@123");
    await page.locator('#Login').click();

    //2. Click on toggle menu button from the left corner
    await page.click(".slds-icon-waffle");
  
    //3. Click View All and click Individuals from App Launcher
    await page.click("[aria-label='View All Applications']");
    await page.locator("[data-label=Individuals]").click();
    
    //4. Click on the Individuals tab
    await page.locator("[href='/lightning/o/Individual/home']").click(); 
    //5. Search the Individuals last name
    const searchIndividual = page.getByPlaceholder("Search this list...");
    await searchIndividual.fill("Victor");
    await searchIndividual.press("Enter");
    //6. Click on the Dropdown icon and Select Edit
    await page.waitForLoadState('load');
    //await page.locator("td[class='slds-cell-edit cellContainer']").click();
    await page.locator("(//span[text()='Show Actions'])[1]").click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();

    //7. Select Salutation as 'Mr'
    await page.locator("div[class*='salutation']").click();    
    //await page.locator("(//div[contains(@class,'uiPopupTrigger')])[1]").click();
    await page.locator("[title='Mr.']").click();
    //8. Now enter the first name
    await page.locator("[placeholder='First Name']").fill("Sathya");
        
    //9. Click on Save and Verify the first name
    await page.locator("[title='Save']").click();
    const text = await page.locator("div[role='alertdialog']").innerText();
    expect (text).toContain("Success");
    
}) 
