import { Link } from "react-router-dom";

const HistoryPage = () => {
  const conversations =
  JSON.parse(
    localStorage.getItem("conversations")
  ) || [];

  return (
    <div>
      <header>
        <h1>Product Recommendation AI</h1>

        <nav>
          <Link to="/" >
            Want new suggestion?
          </Link>
        </nav>
      </header>

      <h2>Previous Suggestions</h2>

      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        conversations.map(
          (conversation) => (
            <div
              key={conversation.id}
              className="history-card"
            >
              {conversation.messages.map(
                (msg, index) => (
                  <div key={index}>
                    <p>
                      <strong>
                        User:
                      </strong>{" "}
                      {msg.user}
                    </p>

                    {msg.bot.map(
                      (
                        response,
                        responseIndex
                      ) => (
                        <div
                          key={
                            responseIndex
                          }
                          dangerouslySetInnerHTML={{
                            __html:
                              response,
                          }}
                        />
                      )
                    )}
                  </div>
                )
              )}
            </div>
          )
        )
      )}
    </div>
  );
};

export default HistoryPage;