import express from 'express';
import { getAllLands } from './fabric/methods/getAllLands.ts';
import { connectToNetwork } from './fabric/utils/network.ts';
const app = express();
app.use(express.json());
app.get('/api/lands', async (req, res) => {
    try {
        const { contract, gateway } = await connectToNetwork();
        const lands = await getAllLands(contract);
        res.json({ lands });
        gateway.close();
    }
    catch (error) {
        console.error('Failed to fetch lands:', error);
        res.status(500).send('Failed to fetch lands');
    }
});
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map