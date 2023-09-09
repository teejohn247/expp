import express, { Express } from 'express';
import databaseConnection from '@root/setupDatabase';
import { MainServer } from '@root/setupServer';
import { config } from '@root/config';

class Application {
	public initialize(): void {
		// load config
		this.loadConfig();
		const app: Express = express();
		// connect to database
		databaseConnection();

		// start server
		const server: MainServer = new MainServer(app);

		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
		config.cloudinaryConfig();
	}
}

const application: Application = new Application();
application.initialize();
