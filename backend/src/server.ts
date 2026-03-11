import 'dotenv/config';
import { createServer } from 'http';
import { app } from './app';
import { connectDB } from './config/db';
import { bootstrapAdmin, createDefaults } from './config/bootstrap';

const PORT = process.env.PORT || 5000;

const banner = `

         _______        .__  .__    _________              
         \\      \\  __ __|  | |  |  /   _____/ ____   ____  
         /   |   \\|  |  \\  | |  |  \\_____  \\_/ __ \\_/ ___\\ 
        /    |    \\  |  /  |_|  |__/        \\  ___/\\  \\___ 
        \\____|__  /____/|____/____/_______  /\\___  >\\___  >
                \\/                        \\/     \\/     \\/ 
            Forum Software - Backend
            Running on Port: ${PORT}

`

async function bootstrap() {
    console.log(banner);

    await connectDB();
    
    // bootstrap Functions
    await bootstrapAdmin();
    await createDefaults();

    const httpServer = createServer(app);

    httpServer.listen(PORT, () => {
        console.log(`🚀 Server started`);
    });
}

bootstrap();