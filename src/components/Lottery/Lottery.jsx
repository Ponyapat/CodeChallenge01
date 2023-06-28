import React, { useState,useEffect } from 'react';
import './Lottery.css';

const Lottery = () => {

  const [results, setResults] = useState([]);
  const [lotteryNumber, setLotteryNumber] = useState('');
  const [winningPrizes, setWinningPrizes] = useState([]);

  const generateLotteryNumbers = () => {
    const firstPrize = Math.floor(Math.random() * 1000);
    const secondPrizes = [];
    const sideNumbers = [];
    const lastTwoDigits = [];

    for (let i = 0; i < 3; i++) {
      secondPrizes.push(Math.floor(Math.random() * 1000));
    }

    for (let i = 0; i < 2; i++) {
      if (sideNumbers < firstPrize ) {
        sideNumbers.push(firstPrize+1);
      } else {
        sideNumbers.push(firstPrize-1);
      }
    }

    for (let i = 0; i < 1; i++) {
      lastTwoDigits.push(Math.floor(Math.random() * 100));
    }


    const newResults = [
      { prize: 'รางวัลที่ 1', numbers: [firstPrize] },
      { prize: 'รางวัลที่ 2', numbers: secondPrizes },
      { prize: 'รางวัลเลขข้างเคียงรางวัลที่ 1', numbers: sideNumbers },
      { prize: 'รางวัลเลขท้าย 2 ตัว', numbers: lastTwoDigits },
    ];

    setResults(newResults);
    localStorage.setItem('lotteryResults', JSON.stringify(newResults));
};


  const checkLotteryNumber = () => {
    const numberToCheck = parseInt(lotteryNumber);
  
    const winningPrizes = results
      .filter((result) => result.numbers.includes(numberToCheck))
      .map((result) => result.prize);
  

    if (winningPrizes.length === 0) {

      setWinningPrizes(['ไม่ถูกรางวัล']);

    } else {

      setWinningPrizes(winningPrizes);
    }
  };


  useEffect(() => {
    const persistedResults = localStorage.getItem('lotteryResults');
    if (persistedResults) {
      setResults(JSON.parse(persistedResults));
    }
  }, []);
  


  return (
    <div className='container'>
      <h1 className='glow'>ผลการออกรางวัลล็อตเตอรี่ Diversition</h1>
        <div className='gacha'>
          <button 
            className='btn1 btn-glow btn-primary'
            onClick={generateLotteryNumbers}>
              ดำเนินการสุ่มรางวัล
          </button>
        </div>
      
      
      <div className='grid'>
        <div div className='card1'>
          <table>
            {results.map((result, index) => (
              <tr key={index}>
                <th colspan="2">
                  {result.prize}
                </th>
                <td colspan="3">
                  {result.numbers.join(', ')}
                </td>
            </tr>
          ))}
        </table>
      </div>
        
      <div className='card2'>
        <div className='Title'>
          <h2>ตรวจรางวัลล็อตเตอรี่ Diversition</h2>
        </div>
        
        <div className='check'>
          <label > เลขล็อตเตอรี่ : 
            <input type="text" 
              placeholder='กรอกเลขล็อตเตอรี่' 
              value={lotteryNumber}
              onChange={(e) => setLotteryNumber(e.target.value)}/>
          </label>
              
            <button 
              className='btn btn-glow btn-primary'
              onClick={checkLotteryNumber}>
                ตรวจรางวัล
            </button>

            {winningPrizes.length > 0 && (
            <div className='result'>
              <p>หมายเลข {lotteryNumber} :</p>
                <ul>
                  {winningPrizes.map((prize, index) => (
                    <li key={index}>
                      {prize}
                    </li>
                  ))}
                </ul>
            </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lottery;