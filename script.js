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

  // Replace "Typing..." with real response
  const response = await getBotResponse(userMessage);
  const typingBubble = chatBox.querySelector(".bot:last-child");
  typingBubble.textContent = response;
}

async function getBotResponse(message) {
  // === Step 5: Call OpenAI API here ===
  const apiKey = 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; // Replace with your key
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
