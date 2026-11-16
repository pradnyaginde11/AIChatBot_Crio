import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import sampleData from "../aiData/sampleData.json";
import sampleProductData from "../aiData/sampleProductData.json";

const ChatPage = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("currentConversation")
      ) || []
    );
  });

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "currentConversation",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    let response;

    if (selectedCategory) {
      const searchText = `${selectedCategory} ${input}`;

      const productMatch =
        sampleProductData.find(
          (item) =>
            item.question.toLowerCase() ===
            searchText.toLowerCase()
        );

      response = productMatch
        ? productMatch.response
        : [
            "Sorry, I did not understand your query!",
          ];

      setSelectedCategory(null);
    } else {
      const categoryMatch = sampleData.find(
        (item) =>
          item.question.toLowerCase() ===
          input.toLowerCase()
      );

      if (categoryMatch) {
        response = [categoryMatch.response];
        setSelectedCategory(
          categoryMatch.question
        );
      } else {
        response = [
          "Sorry, I did not understand your query!",
        ];
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        user: input,
        bot: response,
      },
    ]);

    setInput("");
  };

  const handleNewSuggestion = () => {
  const conversations =
    JSON.parse(
      localStorage.getItem("conversations")
    ) || [];

  if (messages.length > 0) {
    conversations.push({
      id: Date.now(),
      messages: [...messages],
    });

    localStorage.setItem(
      "conversations",
      JSON.stringify(conversations)
    );
  }

  localStorage.removeItem(
    "currentConversation"
  );

  setMessages([]);
  setSelectedCategory(null);
};

  return (
    <div className={darkMode ? "dark" : ""}>
      <header>
        <h1>Product Recommendation AI</h1>

        <nav>
        <Link to="/">Want new suggestion?</Link>

        <Link to="/history">Previous Recommendations</Link>
        </nav>
      </header>

      <div className="toolbar">
        <button
          type="button"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "Light Mode"
            : "Dark Mode"}
        </button>
      </div>

      <div className="chat-container">
        {messages.map(
          (message, index) => (
            <div
              key={index}
              className="message-wrapper"
            >
              <div className="user-message">
                {message.user}
              </div>

              <div className="bot-message">
                {message.bot.map(
                  (item, idx) => (
                    <div
                      key={idx}
                      dangerouslySetInnerHTML={{
                        __html: item,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Please tell me about your query!"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />

        <button type="submit">
          Ask
        </button>
      </form>

      <div className="new-chat-btn">
  <button
    type="button"
    onClick={handleNewSuggestion}
  >Want new suggestion?</button>
</div>
    </div>
  );
};

export default ChatPage;