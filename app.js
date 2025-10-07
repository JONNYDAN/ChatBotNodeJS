const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let chatHistory = [];

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  
  const botResponse = generateBotResponse(userMessage);
  
  // Thêm tin nhắn vào lịch sử
  chatHistory.push({
    user: userMessage,
    bot: botResponse,
    timestamp: new Date().toISOString()
  });
  
  // Giữ lịch sử không quá 100 tin nhắn
  if (chatHistory.length > 100) {
    chatHistory = chatHistory.slice(-50);
  }
  
  res.json({ response: botResponse, history: chatHistory });
});

app.get('/api/history', (req, res) => {
  res.json(chatHistory);
});

function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello')) {
    return "Xin chào! Tôi có thể giúp gì cho bạn?";
  } else if (lowerMessage.includes('tên') || lowerMessage.includes('ai')) {
    return "Tôi là chatbot được xây dựng với Node.js và Express!";
  } else if (lowerMessage.includes('thời gian') || lowerMessage.includes('time')) {
    return `Bây giờ là ${new Date().toLocaleTimeString('vi-VN')}`;
  } else if (lowerMessage.includes('cảm ơn')) {
    return "Không có gì! Rất vui được giúp đỡ bạn!";
  } else if (lowerMessage.includes('địa chỉ') || lowerMessage.includes('where')) {
    return "Địa chỉ của trường đại học sư phạm thành phố Hồ Chí Minh!";
  } else if (lowerMessage.includes('nghe nhạc') || lowerMessage.includes('music')) {
    return "Bạn có thể nghe nhạc trên Spotify hoặc YouTube!";
  } else if (lowerMessage.includes('học lập trình') || lowerMessage.includes('learn programming')) {
    return "Bạn có thể bắt đầu với các ngôn ngữ như Python, JavaScript hoặc Java!";
  } else if (lowerMessage.includes('thời tiết') || lowerMessage.includes('weather')) {
    return "Tôi không thể cung cấp thông tin thời tiết hiện tại, bạn có thể kiểm tra trên các trang web như Weather.com!";
  } else if (lowerMessage.includes('giúp tôi') || lowerMessage.includes('help')) {
    return "Tôi sẽ cố gắng giúp bạn! Bạn cần gì?";
  } else if (lowerMessage.includes('học ở đâu') || lowerMessage.includes('where to study')) {
    return "Bạn có thể học ở các trường đại học, cao đẳng hoặc trung tâm đào tạo uy tín!";
  } else if (lowerMessage.includes('món ăn') || lowerMessage.includes('food')) {
    return "Bạn có thể thử các món ăn truyền thống như phở, bún chả hoặc bánh mì!";
  } else if (lowerMessage.includes('thể thao') || lowerMessage.includes('sports')) {
    return "Bạn thích thể thao nào? Bóng đá, bóng rổ hay cầu lông?";
  } else if (lowerMessage.includes('du lịch') || lowerMessage.includes('travel')) {
    return "Bạn muốn đi du lịch ở đâu? Việt Nam có nhiều điểm đến đẹp như Đà Nẵng, Hội An, và Phú Quốc!";
  } else if (lowerMessage.includes('sách') || lowerMessage.includes('book')) {
    return "Bạn thích thể loại sách nào? Tiểu thuyết, khoa học viễn tưởng hay phi hư cấu?";
  } else if (lowerMessage.includes('phim') || lowerMessage.includes('movie')) {
    return "Bạn có thể xem các bộ phim nổi tiếng trên Netflix hoặc YouTube!\n Bạn thích thể loại phim nào?";
  } else if (lowerMessage.includes('Demon Slayer') || lowerMessage.includes('Kimetsu no Yaiba')) {
    return "Ồ! Demon Slayer (Kimetsu no Yaiba) là một bộ anime rất nổi tiếng và được yêu thích trên toàn thế giới!";
  } else if (lowerMessage.includes('One Piece')) {
    return "Tôi cũng thích One Piece, đó là một trong những bộ manga và anime dài nhất và nổi tiếng nhất mọi thời đại!";
  } else if (lowerMessage.includes('Naruto')) {
    return "Naruto là một bộ anime và manga rất phổ biến, kể về hành trình của một ninja trẻ tuổi với ước mơ trở thành Hokage!";
  } else {
    const responses = [
      "Tôi không chắc đã hiểu ý bạn. Bạn có thể diễn đạt khác không?",
      "Đó là một câu hỏi thú vị! Tôi cần học thêm để trả lời chính xác.",
      "Hiện tại tôi chưa thể trả lời câu hỏi đó. Bạn có câu hỏi khác không?",
      "Tôi là một chatbot đơn giản, nhưng tôi luôn cố gắng giúp đỡ!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Route mặc định
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Khởi động server
app.listen(port, () => {
  console.log(`Máy chủ chatbot đang chạy tại http://localhost:${port}`);
});