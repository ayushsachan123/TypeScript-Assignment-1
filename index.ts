import { App } from "./src";

App.getInstance().initializeServer().then(() => {
    console.log('Application started')
})