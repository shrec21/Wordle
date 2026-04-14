import { useState } from "react";

const secWord = "SPEND";
const maxGuess = 5;
const maxLen = 5;

function getColour(guess, secWord, index){
    const letter = guess[index];
    if(letter === secWord[index]) return "green";
    if(secWord.includes(letter)) return "yellow";
    return "red";
}

export default function App() {
   const [guesses, setGuesses] = useState([]);
   const [input, setInput] = useState("");
   const [gameOver, setGameOver] = useState(false);
   const [message, setMessage] = useState("");
   
   function takeGuess(){
    if(input.length !== maxLen || gameOver) return;
    const guess = input.toUpperCase();
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setInput("");
    
    if(guess === secWord){
        setMessage("You've won!");
        setGameOver(true);
    } else if(newGuesses.length >= maxGuess) {
        setMessage("You've lost!");
        setGameOver(true);
    }
   }
   
   return (
     <div style={{padding: 20}}>
     <h1> Shreyas's Wordle</h1>
     
        <div>
            {Array.from({length: maxGuess}).map((_, row) => {
                const guess = guesses[row] || "";
                return (
                    <div key={row} style={{display:"flex", marginBottom: 4}}>
                    {Array.from({length: maxLen}).map((_, col) => (
                    <div key= {col} style={{
                        width: 44,
                        height: 44,
                        border: "1px solid #999",
                        marginRight: 4,
                        display: "flex",
                        alignItems: "center",
                        fontSize: 18,
                        backgroundColor: guess ? getColour(guess, secWord, col) : "white",
                        color: guess ? "white" : "black"
                        
                        }}>
                        {guess[col] || ""}
                    </div>
                ))}
            </div>
    );
    })}
    </div>
    
    {!gameOver && (
        <div style={{marginTop: 12}}>
        <input 
        autoFocus
        value={input} 
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && takeGuess()}
        maxLength={maxLen} />
        
        <button onClick={takeGuess}> Guess </button> 
        </div>
    )}
    
    {message && <p style={{fontSize: 20, marginTop: 12}}>{message}</p>}
    </div>
   );
}

