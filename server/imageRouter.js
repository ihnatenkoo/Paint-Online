import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageRouter = Router();

imageRouter.post('/', (req, res) => {
	try {
		const data = req.body.img.replace('data:image/png;base64,', '');

		fs.writeFileSync(
			path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
			data,
			'base64'
		);

		res.status(200).json({ message: 'Image saved' });
	} catch (error) {
		res.status(500).json(error);
	}
});

imageRouter.get('/', (req, res) => {
	try {
		const filePath = path.resolve(__dirname, 'files', `${req.query.id}.jpg`);

		if (!fs.existsSync(filePath)) {
			return res.status(404).json({ error: 'File not found' });
		}

		const file = fs.readFileSync(filePath);
		const data = `data:image/png;base64,` + file.toString('base64');

		res.json(data);
	} catch (error) {
		return res.status(500).json(error);
	}
});

export default imageRouter;
