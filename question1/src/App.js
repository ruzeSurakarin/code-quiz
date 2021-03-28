import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;

  @media screen and (min-width: 600px) {
    overflow-x: auto;
  }
`

const FirstCol = styled.div`
  min-width: 200px;
`
const SecondCol = styled.div`
  flex-grow: 1;
  min-width: 100px;
`
const ThirdCol = styled.div`
  min-width: 300px;
`

const calculateTypeObj = {
  prime: 0,
  fibonacci: 1
}

const App = () => {
  const [number, setNumber] = useState(1)
  const [calculateType, setCalculateType] = useState(calculateTypeObj.prime)
  const [result, setResult] = useState(false)

  const handleNumberChange = event => {
    const value = event.target.value
    setNumber(value)
    calculateResult(value, calculateType)
  }

  const handleCalculationChange = event => {
    const value = event.target.value
    setCalculateType(value)
    calculateResult(number, value)
  }

  const calculateResult = (num, type) => {
    let newNum = num
    if (num < 1) {
      newNum = 1
      setNumber(newNum)
    } else if (num % 1 !== 0) {
      newNum = parseInt(num)
      setNumber(newNum)
    }

    let calculateResult = false
    switch (parseInt(type)) {
      case calculateTypeObj.prime:
        calculateResult = handlePrime(num)
        break

      case calculateTypeObj.fibonacci:
        calculateResult = handleFibonacci(num)
        break
    }
    setResult(calculateResult)
  }

  const handlePrime = num => {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false
    }

    return num > 1
  }

  const isPerfectSquare = num => {
    let x = parseInt(Math.sqrt(num))
    return Math.pow(x, 2) === num
  }

  const handleFibonacci = num => {
    return (
      isPerfectSquare(5 * Math.pow(num, 2) + 4) ||
      isPerfectSquare(5 * Math.pow(num, 2) - 4)
    )
  }

  return (
    <Container>
      <FirstCol>
        <input type="number" value={number} onChange={handleNumberChange} />
      </FirstCol>
      <SecondCol>
        <select value={calculateType} onChange={handleCalculationChange}>
          <option value={calculateTypeObj.prime}>isPrime</option>
          <option value={calculateTypeObj.fibonacci}>isFibanacci</option>
        </select>
      </SecondCol>
      <ThirdCol>{result.toString()}</ThirdCol>
    </Container>
  )
}

export default App
