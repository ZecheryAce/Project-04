import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/Dashboard.css";

function Dashboard() {
  // ── State ──────────────────────────────────────────
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  // New question form
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [questionSuccess, setQuestionSuccess] = useState("");
  const [questionLoading, setQuestionLoading] = useState(false);

  // New answer form
  const [answerBody, setAnswerBody] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [answerSuccess, setAnswerSuccess] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // ── Load Categories on Page Load ───────────────────
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // ── Load Questions When a Category is Selected ─────
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/questions/${selectedCategory.id}`);
        setQuestions(res.data);
        setSelectedQuestion(null);
        setAnswers([]);
      } catch (err) {
        console.error("Failed to load questions:", err);
      }
    };
    fetchQuestions();
  }, [selectedCategory]);

  // ── Load Answers When a Question is Selected ───────
  useEffect(() => {
    if (!selectedQuestion) return;

    const fetchAnswers = async () => {
      try {
        const res = await API.get(`/answers/${selectedQuestion.id}`);
        setAnswers(res.data);
      } catch (err) {
        console.error("Failed to load answers:", err);
      }
    };
    fetchAnswers();
  }, [selectedQuestion]);

  // ── Handle Logout ──────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  // ── Handle Post Question ───────────────────────────
  const handlePostQuestion = async () => {
    setQuestionError("");
    setQuestionSuccess("");

    if (!questionTitle.trim()) {
      setQuestionError("Please enter a title for your question.");
      return;
    }
    if (!questionBody.trim()) {
      setQuestionError("Please enter a description for your question.");
      return;
    }

    setQuestionLoading(true);

    try {
      await API.post("/questions", {
        title: questionTitle,
        body: questionBody,
        category_id: selectedCategory.id,
      });

      setQuestionSuccess("Question posted successfully!");
      setQuestionTitle("");
      setQuestionBody("");

      // Refresh the questions list
      const res = await API.get(`/questions/${selectedCategory.id}`);
      setQuestions(res.data);
    } catch (err) {
      setQuestionError(
        err.response?.data?.message || "Failed to post question.",
      );
    } finally {
      setQuestionLoading(false);
    }
  };

  // ── Handle Submit Answer ───────────────────────────
  const handleSubmitAnswer = async () => {
    setAnswerError("");
    setAnswerSuccess("");

    if (!answerBody.trim()) {
      setAnswerError("Please write an answer before submitting.");
      return;
    }

    setAnswerLoading(true);

    try {
      await API.post("/answers", {
        body: answerBody,
        question_id: selectedQuestion.id,
      });

      setAnswerSuccess("Answer submitted successfully!");
      setAnswerBody("");

      // Refresh the answers list
      const res = await API.get(`/answers/${selectedQuestion.id}`);
      setAnswers(res.data);
    } catch (err) {
      setAnswerError(err.response?.data?.message || "Failed to submit answer.");
    } finally {
      setAnswerLoading(false);
    }
  };

  // ── Format Date Helper ─────────────────────────────
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ── Render ─────────────────────────────────────────
  return (
    <div className="dashboard-container">
      {/* ── Header ── */}
      <header className="dashboard-header">
        <h1 className="dashboard-header-title">🪐 PlanetsQA</h1>
        <div className="dashboard-header-right">
          <p className="dashboard-welcome">
            Welcome, <span>{username}</span>
          </p>
          <button className="dashboard-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="dashboard-body">
        {/* ── Sidebar ── */}
        <aside className="dashboard-sidebar">
          <h2>Categories</h2>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`category-item ${selectedCategory?.id === cat.id ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setQuestionError("");
                setQuestionSuccess("");
              }}
            >
              🪐 {cat.name}
            </div>
          ))}
        </aside>

        {/* ── Main Content ── */}
        <main className="dashboard-main">
          {/* No category selected yet */}
          {!selectedCategory && (
            <div className="dashboard-placeholder">
              ← Select a category to view its questions
            </div>
          )}

          {/* Category selected — show question form and questions */}
          {selectedCategory && (
            <>
              {/* Post a Question Form */}
              <div className="question-form">
                <h3>Ask a Question in {selectedCategory.name}</h3>

                <input
                  type="text"
                  placeholder="Question title..."
                  value={questionTitle}
                  onChange={(e) => {
                    setQuestionTitle(e.target.value);
                    setQuestionError("");
                    setQuestionSuccess("");
                  }}
                />

                <textarea
                  placeholder="Describe your question in detail..."
                  rows={3}
                  value={questionBody}
                  onChange={(e) => {
                    setQuestionBody(e.target.value);
                    setQuestionError("");
                    setQuestionSuccess("");
                  }}
                />

                {questionError && <p className="form-error">{questionError}</p>}
                {questionSuccess && (
                  <p className="form-success">{questionSuccess}</p>
                )}

                <button onClick={handlePostQuestion} disabled={questionLoading}>
                  {questionLoading ? "Posting..." : "Post Question"}
                </button>
              </div>

              {/* Questions List */}
              <div className="questions-section">
                <h3>Questions in {selectedCategory.name}</h3>

                {questions.length === 0 ? (
                  <p className="no-questions">
                    No questions yet in this category. Be the first to ask one!
                  </p>
                ) : (
                  questions.map((q) => (
                    <div
                      key={q.id}
                      className={`question-card ${selectedQuestion?.id === q.id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedQuestion(q);
                        setAnswerError("");
                        setAnswerSuccess("");
                        setAnswerBody("");
                      }}
                    >
                      <h4>{q.title}</h4>
                      <p>{q.body}</p>
                      <p className="question-meta">
                        Asked by <span>{q.username}</span> on{" "}
                        {formatDate(q.created_at)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Answers Section — only shows when a question is selected */}
              {selectedQuestion && (
                <div className="answers-section">
                  <h3>Answers for: {selectedQuestion.title}</h3>

                  {/* Existing Answers */}
                  {answers.length === 0 ? (
                    <p className="no-answers">
                      No answers yet. Be the first to answer!
                    </p>
                  ) : (
                    answers.map((a) => (
                      <div key={a.id} className="answer-card">
                        <p>{a.body}</p>
                        <p className="answer-meta">
                          Answered by <span>{a.username}</span> on{" "}
                          {formatDate(a.created_at)}
                        </p>
                      </div>
                    ))
                  )}

                  {/* Submit Answer Form */}
                  <div className="answer-form">
                    <h4>Submit Your Answer</h4>

                    <textarea
                      placeholder="Write your answer here..."
                      rows={3}
                      value={answerBody}
                      onChange={(e) => {
                        setAnswerBody(e.target.value);
                        setAnswerError("");
                        setAnswerSuccess("");
                      }}
                    />

                    {answerError && <p className="form-error">{answerError}</p>}
                    {answerSuccess && (
                      <p className="form-success">{answerSuccess}</p>
                    )}

                    <button
                      onClick={handleSubmitAnswer}
                      disabled={answerLoading}
                    >
                      {answerLoading ? "Submitting..." : "Submit Answer"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
