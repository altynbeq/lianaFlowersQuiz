// src/components/FlowerPersonalityQuiz.js

import React, { useState } from "react";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";
import logo from "../assets/logo.svg"; // Import your company logo

// Common styles
const fontFamily = "font-[Comfortaa]";

// Components
const Card = ({ children, className }) => (
  <div className={`rounded-lg p-4 bg-white ${className}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`border-b pb-2 mb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);

const CardFooter = ({ children, className }) => (
  <div className={`border-t pt-2 mt-4 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className, disabled, gender }) => {
  const getButtonStyles = (gender) => {
    if (gender === "male") {
      return {
        bgColor: "bg-stone-300",
        hoverColor: "hover:bg-stone-600",
        textColor: "text-black",
      };
    }
    // Default to female styles
    return {
      bgColor: "bg-stone-300",
      hoverColor: "hover:bg-stone-600",
      textColor: "text-black",
    };
  };

  const styles = getButtonStyles(gender);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
        ${disabled
          ? "bg-gray-300 cursor-not-allowed"
          : `${styles.bgColor} ${styles.hoverColor} hover:scale-105 hover:shadow-lg ${styles.textColor}`
        } 
        ${className}`}
    >
      {children}
    </button>
  );
};

// Questions for both genders
const questions = {
  female: [
    {
      question: "У вас сильная Харизма, с каким цветком вы себя ассоциировали?",
      options: [
        "Алой розой — символизирует страсть, силу и яркость.",
        "Черной орхидеей — олицетворяет загадочность и уникальность.",
      ],
    },
    {
      question: "Вы — ladyboss, с каким цветком вы себя ассоциировали?",
      options: [
        "Чёрной розой — символизирует силу и уверенность.",
        "Алой орхидеей — олицетворяет элегантность и лидерство.",
      ],
    },
    {
      question: "Вы — очень чувственная, с каким цветком вы себя олицетворяете?",
      options: [
        "Красной розой — символизирует страсть и глубокие чувства.",
        "Пурпурной орхидеей — отражает тайну и утонченность.",
      ],
    },
    {
      question: "Вы — нежная натура, с каким цветком вы себя олицетворяете?",
      options: [
        "Белой лилией — символ чистоты и изысканности.",
        "Розовой пионой — олицетворяет нежность и душевную теплоту.",
      ],
    },
    {
      question: "Вы — очень милосердная, с каким цветком вы себя олицетворяете?",
      options: [
        "Белой розой — чистота, доброта и сострадание.",
        "Пион — символизирует спокойствие, исцеление и гармонию.",
      ],
    },
  ],
  male: [
    {
      question: "Если бы ваша мужская энергия была цветком, каким бы цветком вы стали?",
      options: [
        "Красной розой — страстной и решительной.",
        "Белым лотосом — спокойной и гармоничной.",
      ],
    },
    {
      question: "Вы обладаете внутренней гармонией, на языке цветов, вы были бы?",
      options: [
        "Лавандой — спокойствие и умиротворение.",
        "Пионом — богатство, храбрость и честь.",
      ],
    },
    {
      question: "Вы — лидер по натуре, каким бы цветком вы себя олицетворяли?",
      options: [
        "Красной розой — страсть, сила и решительность.",
        "Чёрной орхидеей — загадочность и независимость.",
      ],
    },
    {
      question: "Вы — очень яркая личность, каким бы цветком вы себя олицетворяли?",
      options: [
        "Алой розой — энергичность и сила.",
        "Оранжевым тюльпаном — радость, креативность и оптимизм.",
      ],
    },
    {
      question: "Вы — очень добрый человек, каким бы цветком вы себя олицетворяли?",
      options: [
        "Белой лилией — доброта и мир.",
        "Лавандой — мягкость и умиротворение.",
      ],
    },
    {
      question: "Вы — очень порядочный человек, каким бы цветком вы себя олицетворяли?",
      options: [
        "Белой розой — честность и чистота.",
        "Тюльпаном — искренность и надежность.",
      ],
    },
  ],
};

// Personality Interpretations (same for both genders)
const personalityInterpretations = {
  female: {
    charisma: {
      title: "Харизматичная Личность 🌹",
      description:
        "Вы — харизматичная личность, излучающая яркую энергетику и вдохновляющая окружающих.",
    },
    ladyboss: {
      title: "LadyBoss 🌺",
      description:
        "Вы — лидер и вдохновитель. Ваши качества — уверенность и умение руководить с грацией.",
    },
    sensual: {
      title: "Чувственная Душа 🌸",
      description:
        "Вы — чувственная и утончённая личность, излучающая тепло и эмоции.",
    },
    gentle: {
      title: "Нежная Натура 💮",
      description:
        "Вы — заботливая и мягкая душа, наполненная добротой и спокойствием.",
    },
    merciful: {
      title: "Милосердное Сердце 🤍",
      description:
        "Вы — человек с большим сердцем, стремящийся помочь и поддержать.",
    },
  },
  male: {
    charisma: {
      title: "Харизматичный Лидер 💼",
      description:
        "Вы — прирождённый лидер с харизмой, вдохновляющий окружающих на действие.",
    },
    leader: {
      title: "Уверенный Лидер 💪",
      description:
        "Вы — принимаете решения с уверенностью и проницательностью.",
    },
    harmony: {
      title: "Гармоничная Личность 🧘",
      description:
        "Вы — ценитель баланса и внутреннего покоя, создающий вокруг себя уют.",
    },
    vibrant: {
      title: "Яркая Личность 🔥",
      description:
        "Вы — энергичный, страстный человек, излучающий позитивную силу.",
    },
    kind: {
      title: "Добрая Душа 🌱",
      description:
        "Вы — человек с тёплым сердцем, готовый поддержать и помочь другим.",
    },
    honorable: {
      title: "Порядочный Человек 🛡️",
      description:
        "Вы — ценитель честности и справедливости, преданный своим принципам.",
    },
  },
};

export const FlowerPersonalityQuiz = ({ gender, avatarPhotoUrl }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestion + 1 < questions[gender].length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const determinePersonality = (gender) => {
    const traits = Object.keys(personalityInterpretations[gender]);
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    return personalityInterpretations[gender][randomTrait];
  };

  const currentQuizQuestion = questions[gender][currentQuestion];
  
  const getGenderStyles = (gender) => {
    if (gender === "male") {
      return {
        gradientFrom: "from-stone-100",
        gradientTo: "to-neutral-100",
        borderColor: "border-stone-200",
        headerGradientFrom: "from-stone-200",
        headerGradientTo: "to-neutral-200",
        buttonHoverFrom: "hover:from-stone-600",
        buttonHoverTo: "hover:to-neutral-600",
        answerBoxBg: "bg-stone-50",
      };
    }
    // Default to female styles
    return {
      gradientFrom: "from-pink-100",
      gradientTo: "to-purple-100",
      borderColor: "border-pink-200",
      headerGradientFrom: "from-pink-200",
      headerGradientTo: "to-purple-200",
      buttonHoverFrom: "hover:from-pink-600",
      buttonHoverTo: "hover:to-purple-600",
      answerBoxBg: "bg-pink-50",
    };
  };

  const genderStyles = getGenderStyles(gender);

  return showResult ? (
    <div className={`flex flex-col min-h-screen items-center justify-center ${fontFamily}`}>
      {/* Company Logo: Larger Size */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Company Logo" className="h-40 w-48" />
      </div>

      <Card className={`w-full max-w-md shadow-2xl border-2 ${genderStyles.borderColor}`}>
        <CardHeader
          className={`bg-gradient-to-r justify-center text-center flex p-1 rounded-2xl ${genderStyles.headerGradientFrom} ${genderStyles.headerGradientTo}`}
        >
          <CardTitle className="text-xl font-bold text-black">
            {determinePersonality(gender).title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          {/* Display the avatar photo if available */}
          {avatarPhotoUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={avatarPhotoUrl}
                alt="Generated Avatar"
                className="w-32 h-32 object-cover rounded-full shadow-lg"
              />
            </div>
          )}

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            {determinePersonality(gender).description}
          </p>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            onClick={resetQuiz}
            className={`w-full flex items-center justify-center bg-stone-300 text-black`}
            gender={gender}
          >
            <FaRedoAlt className="mr-2" /> Пройти квиз снова
          </Button>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className={`flex flex-col items-center justify-center min-h-screen ${fontFamily}`}>
      {/* Company Logo: Larger Size */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Company Logo" className="h-40 w-48" />
      </div>

      <Card className={`w-full max-w-md shadow-lg`}>
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          {questions[gender].map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 mx-1 rounded-full transition-all duration-500 ${
                index <= currentQuestion
                  ? `bg-gradient-to-r ${genderStyles.headerGradientFrom} ${genderStyles.headerGradientTo}`
                  : "bg-gray-300"
              }`}
              style={{
                transform: index === currentQuestion ? "scale(1.2)" : "scale(1)",
              }}
            ></div>
          ))}
        </div>

        {/* Quiz Header */}
        <CardHeader
          className={`bg-gradient-to-r rounded-2xl ${genderStyles.headerGradientFrom} ${genderStyles.headerGradientTo} text-center`}
        >
          <CardTitle className="text-xl font-bold text-gray-800">
            Квиз: Ваша личность — цветок
          </CardTitle>
        </CardHeader>

        {/* Quiz Content */}
        <CardContent className={`p-4 ${genderStyles.answerBoxBg}`}>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-6 text-gray-800 text-center">
              {currentQuizQuestion.question}
            </p>
            {currentQuizQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                gender={gender}
                className="w-full mb-4 text-left text-black whitespace-normal border-2 transition-all duration-300 text-md"
              >
                {option}
              </Button>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center justify-center px-4 py-2 text-black"
              gender={gender}
            >
              <FaArrowLeft className="mr-2" /> Назад
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



