import 'dotenv/config';
import { createServer } from 'http';
import { app } from './app';
import { bootstrapAdmin, connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
    await connectDB();
    await bootstrapAdmin();

    const httpServer = createServer(app);

    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on PORT ${PORT}`);
    });
}

bootstrap();