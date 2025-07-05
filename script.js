const chatBox = document.getElementById("chat-box");

function addMessage(content, sender) {
  const message = document.createElement("div");
  message.classList.add("chat-bubble", sender);
  message.textContent = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  inputField.value = "";

  addMessage("Typing...", "bot");

  const response = await getBotResponse(userMessage);
  const typingBubble = chatBox.querySelector(".bot:last-child");
  typingBubble.textContent = response;
}

// 🔐 Replace this URL with your Pipedream webhook URL
async function getBotResponse(message) {
  const response = await fetch("https://eoftg86yib7crz6.m.pipedream.net", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
