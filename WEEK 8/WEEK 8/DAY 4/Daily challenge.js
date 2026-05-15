import React, { useState } from 'react';

const Calculator = () => {
  // State hooks for inputs and result
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  // Event Handler for the calculation
  const handleCalculation = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult("Please enter valid numbers");
      return;
    }

    let calculation;
    switch (operation) {
      case 'add': calculation = n1 + n2; break;
      case 'subtract': calculation = n1 - n2; break;
      case 'multiply': calculation = n1 * n2; break;
      case 'divide': calculation = n2 !== 0 ? n1 / n2 : "Cannot divide by zero"; break;
      default: calculation = 0;
    }
    
    setResult(calculation);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px' }}>
      <h2>React Calculator</h2>
      
      <input 
        type="number" 
        placeholder="First Number" 
        value={num1} 
        onChange={(e) => setNum1(e.target.value)} 
      />
      
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">×</option>
        <option value="divide">÷</option>
      </select>

      <input 
        type="number" 
        placeholder="Second Number" 
        value={num2} 
        onChange={(e) => setNum2(e.target.value)} 
      />

      <button onClick={handleCalculation} style={{ marginTop: '10px', display: 'block' }}>
        Calculate
      </button>

      {result !== null && (
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Result: {result}
        </div>
      )}
    </div>
  );
};

export default Calculator;