import React from "react";



const handleClick = async ()=> {
  console.log("click")
  const data = {userId: '6837c222f497c2e81adcd447', gameName: 'puzzle', score: 10, win:1}
  const res = await fetch('http://localhost:5000/api/games/result', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  const result = await res.json();
  console.log("result")
  console.log(result)
  
  
}

const Component1 = () => (
  <div className="w-full max-w-7xl h-[45vh] px-4 py-6 bg-gray-200 rounded-3xl shadow-lg">
    <h2 className="text-lg font-semibold">Component 1</h2>
    <p>This is the first component of the homepage.</p>
    <button onClick={handleClick}> Test Button</button>
  </div>
);

export default Component1;
