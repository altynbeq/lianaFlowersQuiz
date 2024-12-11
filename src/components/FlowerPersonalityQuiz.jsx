import React, { useState } from "react";
import { FaArrowLeft, FaRedoAlt } from "react-icons/fa";

// Common styles
const fontFamily = "font-[Comfortaa]";

// Components
const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-lg p-4 bg-white ${className}`}>{children}</div>
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
        bgColor: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
        textColor: "text-white",
      };
    }
    // Default to female styles
    return {
      bgColor: "bg-pink-300",
      hoverColor: "hover:bg-pink-600",
      textColor: "text-white",
    };
  };

  const styles = getButtonStyles(gender);

  return (
    <button
  onClick={onClick}
  disabled={disabled}
  className={`px-4 py-2 rounded-lg bg-white font-medium transition-all duration-300 
    ${disabled
      ? "bg-gray-300 cursor-not-allowed"
      : `hover:scale-105 hover:shadow-lg ${styles.textColor}`
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
        "Алой розой — символизирует страсть, силу и привлекает внимание своей яркостью и магнетизмом.",
        "Черной орхидеей — олицетворяет загадочность, элегантность и уникальность, притягивая взгляды своей необычностью.",
      ],
    },
    {
      question: "Вы — ladyboss, с каким цветком вы себя ассоциировали?",
      options: [
        "Чёрной розой — символизирует силу, уверенность и непокорность, подчеркивая вашу власть и решимость.",
        "Алой орхидеей — олицетворяет элегантность, страсть и способность вдохновлять, при этом сохраняя независимость и лидерство.",
      ],
    },
    {
      question: "⁠Вы — очень чувственная, с каким цветком вы себя олицетворяете?",
      options: [
        "Красной розой — символизирует страсть, эмоции и глубокие чувства, олицетворяя вашу интенсивность и искренность.",
        "Пурпурной орхидеей — ассоциируется с тайной, соблазнительностью и изысканной красотой, отражая вашу чувственность и утонченность.",
      ],
    },
    {
      question: "Вы — нежная натура, с каким цветком вы себя олицетворяете?",
      options: [
        "Белой лилией — символизирует чистоту, изысканность и утонченную красоту, олицетворяя вашу мягкость и невинность.",
        "Розовой пионой — олицетворяет нежность, элегантность и душевную теплоту, отражая вашу заботливость и мягкость.",
      ],
    },
    {
      question: "Вы — очень милосердная, с каким цветком вы себя олицетворяете?",
      options: [
        "Белой розой — символизирует чистоту, доброту и сострадание, отражая вашу искреннюю заботу о других.",
        "Пион — олицетворяет спокойствие, исцеление и гармонию, подчеркивая вашу способность приносить утешение и поддержку.",
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
        "Лавандой — олицетворяет вечность, спокойствие и покой.",
        "Пионом — символизирует богатство, храбрость и честь.",
      ],
    },
    {
      question: "Вы — лидер по натуре, каким бы цветком вы себя олицетворяли?",
      options: [
        "Красной розой — символизирует страсть, силу и решительность.",
        "Чёрной орхидеей — олицетворяет загадочность, стойкость и независимость, что присуще уверенным и сильным лидерам.",
      ],
    },
    {
      question: "Вы — очень яркая личность, каким бы цветком вы себя олицетворяли?",
      options: [
        "Алой розой — символизирует страсть, энергичность и силу.",
        "Оранжевым тюльпаном — олицетворяет радость, креативность и оптимизм, всегда излучая тепло и энтузиазм.",
      ],
    },
    {
      question: "Вы — очень добрый человек, каким бы цветком вы себя олицетворяли?",
      options: [
        "Белой лилией — символизирует чистоту, доброту и мир.",
        "Лавандой — ассоциируется с мягкостью, спокойствием и умиротворением.",
      ],
    },
    {
      question: "Вы — очень порядочный человек, каким бы цветком вы себя олицетворяли?",
      options: [
        "Белой розой — символизирует честность, чистоту и порядочность, отражая стремление к справедливости и достоинству.",
        "Тюльпаном — ассоциируется с искренностью, прямолинейностью и надежностью, всегда стоя на страже своих ценностей.",
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
        "Вы — харизматичная личность с яркой энергетикой, которая привлекает внимание и вдохновляет окружающих.",
    },
    ladyboss: {
      title: "LadyBoss 🌺",
      description:
        "Вы — лидер и вдохновитель. Ваши качества — сила, уверенность и умение руководить с грацией и страстью.",
    },
    sensual: {
      title: "Чувственная Душа 🌸",
      description:
        "Вы — чувственная и утончённая личность, которая излучает тепло, эмоции и элегантность.",
    },
    gentle: {
      title: "Нежная Натура 💮",
      description:
        "Вы — утончённая и заботливая личность, которая излучает спокойствие, доброту и мягкость.",
    },
    merciful: {
      title: "Милосердное Сердце 🤍",
      description:
        "Вы — человек с большим сердцем, который стремится помогать другим, даря утешение и поддержку.",
    },
  },
  male: {
    charisma: {
      title: "Харизматичный Лидер 💼",
      description:
        "Вы — прирождённый лидер с харизмой, которая вдохновляет окружающих и побуждает их следовать за вами.",
    },
    leader: {
      title: "Уверенный Лидер 💪",
      description:
        "Вы — человек, который способен принимать решения с уверенностью, сочетая силу и проницательность.",
    },
    harmony: {
      title: "Гармоничная Личность 🧘",
      description:
        "Вы — человек, который ценит внутреннюю гармонию и баланс, создавая вокруг себя спокойствие и уют.",
    },
    vibrant: {
      title: "Яркая Личность 🔥",
      description:
        "Вы — энергичный и страстный человек, который излучает силу и позитив, вдохновляя окружающих.",
    },
    kind: {
      title: "Добрая Душа 🌱",
      description:
        "Вы — человек с тёплым сердцем, готовый поддерживать и помогать, излучая доброту и мир.",
    },
    honorable: {
      title: "Порядочный Человек 🛡️",
      description:
        "Вы — человек, который ценит честность, справедливость и достоинство, оставаясь верным своим принципам.",
    },
  },
};


export const FlowerPersonalityQuiz = ({ gender }) => {
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
    const traits = Object.keys(personalityInterpretations[gender]); // Get traits for the selected gender
    const randomTrait = traits[Math.floor(Math.random() * traits.length)]; // Pick a random trait
    return personalityInterpretations[gender][randomTrait]; // Return the corresponding interpretation
  };
  

  const currentQuizQuestion = questions[gender][currentQuestion];
  const getGenderStyles = (gender) => {
    if (gender === "male") {
      return {
        gradientFrom: "from-blue-100",
        gradientTo: "to-green-100",
        borderColor: "border-blue-200",
        headerGradientFrom: "from-blue-200",
        headerGradientTo: "to-green-200",
        buttonHoverFrom: "hover:from-blue-600",
        buttonHoverTo: "hover:to-green-600",
        // answerBoxBg: "bg-blue-500", // Background for answer boxes
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
      // answerBoxBg: "bg-pink-50", // Background for answer boxes
    };
  };
  
  const genderStyles = getGenderStyles(gender);
  return showResult ? (
    <div
      className={` flex items-center justify-center  ${fontFamily}`}
    >
      <Card className={`w-full max-w-md shadow-2xl border-2 ${genderStyles.borderColor}`}>
        <CardHeader className={`bg-gradient-to-r justify-center text-center flex p-1 rounded-2xl ${genderStyles.headerGradientFrom} ${genderStyles.headerGradientTo} text-center`}>
          <CardTitle className="text-1xl  font-bold text-black">
            {determinePersonality(gender).title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <p className="text-1xl text-gray-700 mb-4 leading-relaxed">
            {determinePersonality(gender).description}
          </p>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            onClick={resetQuiz}
            className={`w-full flex items-center justify-center bg-gradient-to-r ${genderStyles.headerGradientFrom} ${genderStyles.headerGradientTo} ${genderStyles.buttonHoverFrom} ${genderStyles.buttonHoverTo} text-black`}
          >
            <FaRedoAlt className="mr-2" /> Пройти квиз снова
          </Button>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className={`flex items-center  justify-center  ${fontFamily}`}>
      <Card className={`w-full max-w-md shadow-2xl border-2 ${genderStyles.borderColor}`}>
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
  
        <CardHeader className={`bg-gradient-to-r rounded-2xl ${genderStyles.headerGradientFrom} ${genderStyles.headerGradientTo} text-center`}>
          <CardTitle className="text-1xl font-bold text-gray-800">
            Квиз: Ваша личность — цветок
          </CardTitle>
        </CardHeader>
  
        <CardContent className={` ${genderStyles.answerBoxBg}`}>
          <div className="mb-4 bg-white">
            <p className="text-1xl font-semibold mb-6 text-gray-800 text-center">
              {currentQuizQuestion.question}
            </p>
            {currentQuizQuestion.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              gender={gender}
              className={`w-full mb-4 text-left text-black whitespace-normal border-2 bg-white  hover:${genderStyles.gradientFrom} transition-all duration-300 text-md`}
            >
              {option}
            </Button>
          ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center justify-center bg-gradient-to-r ${genderStyles.headerGradientFrom} ${genderStyles.headerGradientTo} ${genderStyles.buttonHoverFrom} ${genderStyles.buttonHoverTo} text-black`}
            >
              <FaArrowLeft className="mr-2" /> Назад
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
