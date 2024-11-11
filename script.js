function handleEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const userInput = document.getElementById("userInput");
  if (userInput.value.trim() !== "") {
    createUserMessage(userInput.value);
    processCommand(userInput.value.trim().toLowerCase());
    userInput.value = "";
  }
}

function selectOption(option) {
  createUserMessage(option);
  processCommand(option.toLowerCase());
}

function createUserMessage(text) {
  const chatBody = document.getElementById("chatBody");
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user-message");
  userMessage.innerHTML = `<div class="text">${text}</div>`;
  chatBody.appendChild(userMessage);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function processCommand(command) {
  const chatBody = document.getElementById("chatBody");
  let botResponse = "";

  // List of predefined commands and responses
  const commands = {
    "what is the date?": `Today's date is ${new Date().toLocaleDateString()}.`,
    "what is the time?": `The current time is ${new Date().toLocaleTimeString()}.`,
    "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I want to talk to Customer Care " : "Sure, You can go to contact section and there are a form to contact, Thanks!",
    "My product is not delivered":"OK, May I know about your Product id",
    "My  Credit card payment was not reflect in my account":"Sorry, currently I was not accepting payment from Credit Card"
  };

  // Check for an exact match first
  if (commands[command]) {
    botResponse = commands[command];
  } else {
    // Check for partial matches based on keywords or parts of the command
    const similarCommand = findSimilarCommand(command, Object.keys(commands));
    if (similarCommand) {
      botResponse = commands[similarCommand];
    } else {
      // Default response if no match is found
      botResponse = "I'm not sure how to respond to that. Try typing 'help' to see what I can do!";
    }
  }

  setTimeout(() => {
    const botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot-message");
    botMessage.innerHTML = `<div class="avatar bot-avatar">🤖</div><div class="text">${botResponse}</div>`;
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}

// Function to find a similar command based on keywords or substrings
function findSimilarCommand(input, commands) {
  // List of command keywords
  const commandKeywords = {
    "date": "what is the date?",
    "time": "what is the time?",
    "joke": "tell me a joke"
  };

  // Loop through all keywords and check if the input contains any of them
  for (let keyword in commandKeywords) {
    if (input.includes(keyword)) {
      return commandKeywords[keyword];
    }
  }

  return null;
}