import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";
import { UserProvider } from "./components/UserContext";
import "./styles.css";

function App() {
  
  //Quiz questions
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your favorite season?",
      options: ["Spring 🌸", "Summer ☀️", "Fall 🍂", "Winter ❄️"],
    },
    {
      question: "What's your favorite animal?",
      options: ["Tiger 🐅", "Penguin 🐧", "Bear 🐻", "Eagle 🦅"],
    },
    {
      question: "What's your preferred time of day?",
      options: ["Morning 🌅", "Afternoon 🌞", "Evening 🌇", "Night 🌙"],
    },
    {
      question: "What's your go-to comfort food?",
      options: ["Pizza 🍕", "Ice cream 🍦", "Mac and cheese 🧀", "Chocolate 🍫"]
    }
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  // Quiz answer key
  const elements = {
    "Red 🔴": "Fire",
    "Summer ☀️": "Fire",
    "Tiger 🐅": "Fire",
    "Pizza 🍕": "Fire",
    "Afternoon 🌞": "Fire",
  
    "Blue 🔵": "Water",
    "Spring 🌸": "Water",
    "Penguin 🐧": "Water",
    "Ice cream 🍦": "Water",
    "Night 🌙": "Water",
  
    "Green 🟢": "Earth",
    "Fall 🍂": "Earth",
    "Bear 🐻": "Earth",
    "Mac and cheese 🧀": "Earth",
    "Evening 🌇": "Earth",
  
    "Yellow 🟡": "Air",
    "Winter ❄️": "Air",
    "Eagle 🦅": "Air",
    "Chocolate 🍫": "Air",
    "Morning 🌅": "Air"
  };
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach((answer) => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork();
    }
  }, [currentQuestionIndex]);

  function fetchArtwork() {
    fetch(`https://dog.ceo/api/breeds/image/random`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setArtwork(data.message); // data.message contains the image URL
        } else {
          console.error("Failed to fetch artwork");
        }
      })
      .catch((error) => {
        console.error("Error fetching artwork:", error);
      });
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement("");
    setArtwork(null);
  }

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <Router>
        <Header onReset={resetQuiz} />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
