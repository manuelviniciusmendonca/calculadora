import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (number) => {
    if (waitingForOperand) {
      setDisplay(number);
      setWaitingForOperand(false);
      return;
    }

    setDisplay(display === "0" ? number : display + number);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearCalculator = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const calculate = (firstValue, secondValue, operation) => {
    const first = parseFloat(firstValue);
    const second = parseFloat(secondValue);

    switch (operation) {
      case "+":
        return first + second;

      case "-":
        return first - second;

      case "×":
        return first * second;

      case "÷":
        return second === 0 ? "Erro" : first / second;

      default:
        return second;
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForOperand) {
      setOperator(nextOperator);
      return;
    }

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator === null || previousValue === null) {
      return;
    }

    const result = calculate(previousValue, display, operator);

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const toggleSign = () => {
    if (display === "0" || display === "Erro") {
      return;
    }

    setDisplay(
      display.startsWith("-")
        ? display.substring(1)
        : "-" + display
    );
  };

  const percentage = () => {
    if (display === "Erro") {
      return;
    }

    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="app">
      <div className="calculator">

        <div className="calculator-header">
          <span>CALCULADORA</span>
          <div className="status-dot"></div>
        </div>

        <div className="display">
          <div className="previous">
            {previousValue !== null && operator
              ? `${previousValue} ${operator}`
              : ""}
          </div>

          <div className="current">
            {display}
          </div>
        </div>

        <div className="buttons">

          <button
            className="function"
            onClick={clearCalculator}
          >
            AC
          </button>

          <button
            className="function"
            onClick={toggleSign}
          >
            ±
          </button>

          <button
            className="function"
            onClick={percentage}
          >
            %
          </button>

          <button
            className="operator"
            onClick={() => handleOperator("÷")}
          >
            ÷
          </button>

          <button onClick={() => inputNumber("7")}>7</button>
          <button onClick={() => inputNumber("8")}>8</button>
          <button onClick={() => inputNumber("9")}>9</button>

          <button
            className="operator"
            onClick={() => handleOperator("×")}
          >
            ×
          </button>

          <button onClick={() => inputNumber("4")}>4</button>
          <button onClick={() => inputNumber("5")}>5</button>
          <button onClick={() => inputNumber("6")}>6</button>

          <button
            className="operator"
            onClick={() => handleOperator("-")}
          >
            −
          </button>

          <button onClick={() => inputNumber("1")}>1</button>
          <button onClick={() => inputNumber("2")}>2</button>
          <button onClick={() => inputNumber("3")}>3</button>

          <button
            className="operator"
            onClick={() => handleOperator("+")}
          >
            +
          </button>

          <button
            className="zero"
            onClick={() => inputNumber("0")}
          >
            0
          </button>

          <button onClick={inputDecimal}>.</button>

          <button
            className="equals"
            onClick={handleEquals}
          >
            =
          </button>

        </div>

        <div className="footer">
          React Calculator
        </div>

      </div>
    </div>
  );
}

export default App;
