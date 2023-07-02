import { expect, test, describe, beforeEach, beforeAll, afterAll } from 'vitest';
import type { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { createServer, ViteDevServer } from 'vite';
import { afterEach } from 'vitest';


describe('addingNewTask', () => {

    let server: ViteDevServer;
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        server = await createServer({server: {port: 3000}});
        await server.listen()
        browser = await puppeteer.launch({ headless: true });
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    })

    afterAll(async () => {
        await browser.close()
        await server.close();
    })

    test('Add new task successfully', async () => {

        await page.goto('http://localhost:3000');

        const newTaskInputText = await page.waitForSelector('#new-task-input', {timeout: 10000});
        await newTaskInputText?.click();
        await newTaskInputText?.type('New Task 1');

        const addButton = await page.waitForSelector('#add-button');
        addButton?.click();
        
        await page.waitForSelector('.existent-task-input');
    
        const newTaskText = await page?.$eval('.existent-task-input', (element) => (element as HTMLInputElement).value);

        expect(newTaskText).toBe('New Task 1');
    });


    test('Edit existent task', async () => {
        await page.goto('http://localhost:3000');
        
        // Adding a new task for editing
        const newTaskInputText = await page.waitForSelector('#new-task-input', {timeout: 10000});
        await newTaskInputText?.click();
        await newTaskInputText?.type('New Task 1');

        const addButton = await page.waitForSelector('#add-button');
        addButton?.click();


        // Editing the task
        const existentTaskInput = await page.waitForSelector('.existent-task-input');
        await existentTaskInput?.click();
        await newTaskInputText?.type(' Edited');
        
        const updateButton = await page.waitForSelector('#update-button');
        await updateButton?.click();

        // Wait for the update to get accomplished
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        const editedTaskText = await page?.$eval('.existent-task-input', (element) => (element as HTMLInputElement).value);

        expect(editedTaskText).toBe('New Task 1 Edited');
    })
});
