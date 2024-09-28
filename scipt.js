// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/api/comment', async (req, res) => {
    const { code } = req.body;
    const apiKey = process.env.OPENAI_API_KEY; // Sử dụng biến môi trường để lấy API key
    
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Hãy tạo một chú thích cho đoạn mã Scratch sau: ${code}` }]
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        const aiComment = response.data.choices[0].message.content;
        res.json({ comment: aiComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã có lỗi xảy ra." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
