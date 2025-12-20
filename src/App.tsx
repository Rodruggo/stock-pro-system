import {Routes,Route, Navigate} from "react-router-dom";
import Login from "./login";
import Dashboard from "./pages/dashboard";
import Register from "./pages/Register";
export default function App(){
  const fullname = localStorage.getItem("fullname");


    return(
      <Routes>

      <Route 
      path="/"
      element={fullname ? <Navigate to="/dashboard" /> : <Login />}
       />
       

      <Route 
      path="/Register"
      element={fullname ? <Navigate to="/Register" /> : <Register />}
       />
       <Route
       path="/dashboard"
       element={fullname ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route 
      path="/"
      element={fullname ? <Navigate to="/" /> : <Login />}
       />
      </Routes>

      
    );

  
}

// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.tsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App




// import './App.css'
// import { useState } from 'react';

// function App(){




  
//   // let name: string = 'R
//   // odrigo'; // Explicit type
//   // let name2 = 'wonderland'; //Implicit or inferring type directly
//   // let age : number = 90;
//   // let isTrue : boolean = true;
//   // let result : string = '';

//   // if(isTrue){
//   //   result = "ok";
//   // }
//   // let bigValue :bigint = BigInt(4659889461565165);
//   // let numbers : number[] = [1,2,3,4,];
//   // let names : string[] = ['joy ','to ','the ','world'];
//   // let number1: (number|string)[] = [1+'',2,' three',' four'];
//   // let values : number | string| boolean = "dfd";
//   // let person : {
//   //   name: string,
//   //   age: number,
//   //   address: {
//   //     city: string,
//   //     brgy: string,
//   //   }
//   // }= {name: 'luke', age:69, address:{city:'panglao',brgy:'tawala'}}

//   // function addNumbers(num1:number,num2:number):number{
//   //   return num1 + num2;
//   // }
//   //  const display = addNumbers;
  

//   //  function greet(name:string,greeting?:string):void{
//   //   if(greeting){
//   //     console.log(`${greeting},${name}`);
//   //   }else{
//   //       console.log(`Hello,${name}`); // if no optional parameter
//   //   }
//   //  }
//   //   greet('dwight'); // without optional parameter
//   //   greet('dwight','gwapoha'); // with optional parameter

//   //   //custom type
//   //   type Status = 'Single' | "Taken" | 'Complicated';
//   //   let iAmSingle: Status = 'Single';
//   //   let iAmTaken: Status = "Taken";
//   //   let iAmComplicated: Status = 'Complicated';

//   //   type Person = {name:string, age:number};
//   //   type Employee = {id:number, department: string};
//   //   type EmployeeDetails = Person & Employee;

//   //   const employee: EmployeeDetails = {
//   //     name: 'dwight',
//   //     age: 69,
//   //     id: 1103,
//   //     department: 'Mens Department'

//   //   }
    
//   //   let data: any = 10;
//   //   data = "hello";
//   //   data: true;

//   //   let answer : null = null;
//   //   let behavior: undefined = undefined;

//   //   let manage: unknown = "BSIT";
//   //   let length: number;
//   //   if(typeof manage === "string"){
//   //     length  = manage.length;

//   //   }else{
//   //     length  = 0;

//   //   }

//   //   interface Classmate {
//   //     name: string,
//   //     section: string
//   //   }
//   //   function haha(){
//   //     let toDisplay: Classmate ={name: "Jocel", section: "A"};
//   //     console.log(toDisplay.name, toDisplay.section);
//   //   }
//   //   console.log(haha());

//   //   const noFunction: Classmate ={
//   //     name: "Kyle",
//   //     section: "A"
//   //   }
//   //   console.log(noFunction.name,noFunction.section);

//   //   interface hayskul extends Classmate {
//   //     grade: number
//   //   }
//   //   const displayHayskul:hayskul ={
//   //     name: "Paldo",
//   //     section: "Super ace",
//   //     grade: 7
//   //   }
//   //   console.log(displayHayskul.name,displayHayskul.section,displayHayskul.grade);

//   //   const [inputValue,setInputValue] = useState<string>("");
//   //   const [result1,setResult1] = useState<AgeInformation | null>(null);

//   //   type displayResult = "senior" | "adult" | "minor";
//   //   type AgeInformation = {
//   //     age: number,
//   //     description: displayResult
//   //   }
//   //   function identifyAge(age:number): AgeInformation{
//   //     let description: displayResult = age >=60 ? "senior": age <=17 ? "minor" : "adult";

//   //     return{age,description};


//   //   }
//   //   const handleAge =()=>{
//   //     const age = Number(inputValue);
//   //     if(isNaN(age)|| age<=0){
//   //       alert("invalid age");
//   //       return;
//   //     }
//   //     setResult1(identifyAge(age));
//   //   }



//   // Calculator

//   // const [num1, setNum1] = useState<number>(0);
//   // const [num2, setNum2] = useState<number>(0);
//   // const [operations, setOperations] = useState<string>("");
//   // const [result, setResult] = useState<number>(0);

//   // const handleTotal = () => {
//   //   if (operations === "+") {
//   //     setResult(num1 + num2);
//   //   } else if (operations === "-") {
//   //     setResult(num1 - num2);
//   //   } else if (operations === "*") {
//   //     setResult(num1 * num2);
//   //   } else if (operations === "/" && num2 === 0) {
//   //     alert("Not a Possible Calculation");
//   //     setNum1(0);
//   //     setNum2(0);
//   //     setResult(0);
//   //   } else if (operations === "/") {
//   //     setResult(num1 / num2);
//   //   } else {
//   //     alert("Please enter a valid operation");
//   //     setNum1(0);
//   //     setNum2(0);
//   //     setResult(0);
//   //   }
//   // };

//   // return (
//   //   <div>
//   //     <h1>Calculator app</h1>
//   //     <p>
//   //       Enter Number 1:
//   //       <input
//   //         type="number"
//   //         placeholder="Number1"
//   //         onChange={(e) => setNum1(Number(e.target.value))}
//   //         required
//   //       />
//   //     </p>
//   //     <p>
//   //       Enter Number 2:
//   //       <input
//   //         type="number"
//   //         placeholder="Number2"
//   //         onChange={(e) => setNum2(Number(e.target.value))}
//   //         required
//   //       />
//   //     </p>

//   //     <select
//   //       name="operations"
//   //       value={operations}
//   //       onChange={(e) => setOperations(e.target.value)} 
//   //     >
//   //       <option value="">Select operation</option>
//   //       <option value="+">+</option>
//   //       <option value="-">-</option>
//   //       <option value="*">*</option>
//   //       <option value="/">/</option>
//   //     </select>

//   //     <button onClick={handleTotal}>Total</button>

//   //     <p>The Total is: {result}</p>
//   //   </div>



// //     {/* <h1>Age Identifier</h1>
// //     <input type="number" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} /> <br />
// //     <br />
// //     <button onClick={handleAge}> Check Age</button><br />
// //     {result1 && (
// //       <div>

// //         Age: {result1.age}
// //         <br />
// //         Description:{result1.description}
// //       </div>
// //     )}
// //    {result1?.age} {result1?.description}

// // <br /><br />





// //     {name}, {name2}, {age}, {result}, {bigValue}, {numbers[0]} <br />
// //     {names} , {number1}, {values}, {person.name} {person.age} {person.address.city} <br />


// //     {addNumbers(68,1)}, {display(67,2)} , {iAmComplicated}, {iAmSingle}, {iAmTaken} <br />

// //     {employee.name}, {employee.age}, {employee.id}, {employee.department} <br />
// //     {length} */}

  
// //   )
// // }
// // const [weight,setWeight] = useState<string>("");
// // const [height,setHeight] = useState<string>("");
// // const [result,setResult] = useState<number>(0);
// // const [bmi,setBmi] = useState<string>("");
// // const [tip,setTip] = useState<string>("");
// // type displayResult = "underweight" | "normal weight" | "overweight"|"obese";
// // let iamunder:displayResult = "underweight";
// // let iamnormal:displayResult = "normal weight";
// // let iamoverweight:displayResult = "overweight";
// // let iamobese:displayResult = "obese";

// //  const Handlebmi =()=>{
// //       const Weight = Number(weight);
// //       const Height = Number(height);
// //       if(isNaN(Weight)|| Weight<=0||isNaN(Height)||Height<=0){
// //         alert("invalid height or weight");
// //         return;
// //       }else{
// //           const total = Weight/(Height*2);
          
// //         if(total<18.5){
// //            setResult(total);
// //             setBmi(iamunder);
// //             setTip("Focus on nutrient dense Food");
            
// //         }else if(total>=18.5 && total<=24.9 ){
// //             setResult(total);
// //             setBmi(iamnormal);
// //             setTip("Maintain Balance Eating");
// //         }else if(total>=25&&total<=29.9){
// //            setResult(total);
// //             setBmi(iamoverweight);
// //             setTip("Aim for gradual lifestyle changes");
// //         }else if(total>30){
// //             setResult(total);
// //             setBmi(iamobese);
// //             setTip("Work Closely with healthcare provider");
// //         }

// //       }
// //       return;
// //     }
// //       const getColor = () => {
// //     if (bmi === "underweight"){
// //       return "red";
// //     }else if(bmi == "normal weight"){
// //       return "green";

// //     }else if(bmi==="overweight"){
// //       return "orange";
// //     }else{
// //       return "yellow";  
// //     }
      
    
// //   }
// //   const Wala=()=>{
// //     setBmi("");
// //     setWeight("");
// //     setHeight("");
// //     setResult(0);
// //     setTip("");
// //   }




// // return(
// //   <>
// //   <h1>BMI CALCULATOR</h1>
// // <label htmlFor="">Weight: </label>
// //   <input type="number" value={weight} onChange={(e)=>setWeight((e.target.value))} required /><br />
// //   <label htmlFor="">Height: </label>
// //   <input type="number" value={height} onChange={(e)=>setHeight((e.target.value))} required /> <br />

// //   <button onClick={Handlebmi}>Calculate BMI</button>
// //   <button onClick={Wala}>Clear</button>
// //   <br /><br />

// //   <p hidden={result==0}>Your BMI: <span style={{ color: getColor() }}>{result.toFixed(2)} ({bmi})</span> </p>

 

// //   <p  hidden={result==0}>Tip: <span style={{ color: getColor() }}>{tip}</span>  </p>


// //   </>
// // );
// ///////////////////////////////////////////////////////////
// // interface Book{
// //   name: string ,
// //   author: string,
// //   year?: number

// //   readonly x: number,
// //   readonly y: number
// // }
// // const book: Book = {
// //   name:" Harry Potter",
// //   author: " JK Rowling",
  
// //   x: 45,
// //   y:90


// // }
// // /////////////////////////////////////////////////////
// // interface MathOperation {
// //   (x: number, y:number) : number
// // }
// // const Add:MathOperation =(x,y)=> x+y;
// // const Subtract: MathOperation =(x,y)=> x-y;
// // //////////////////////////////////////////////////////
// // interface Person {
// //   nationality : string
// // }
// // interface Jhon extends Person{
// //   age: number
// // }
// // const ace:Jhon ={
// //  nationality:"Pinoy",
// //  age:56
// // }
// // //////////////////////////////////////////////////////////
// // //Generic type interface because of the type 
// // interface Box <Dwight> {
// //   value?:Dwight
// //   value2?:Dwight
// // }

// // const boxes: Box<string>={
// //   value: "Hellow Dwight"
// // }
// // const boxes2: Box<number>={
// //   value: 69
// // }

// // //////////////////////////////////////////
// // //Assertion type
// // let grade: unknown = "1";
// // let equivalentGrade: number = (Number(grade) as number) + 3;
// // console.log(equivalentGrade);

// // //const assertion
// // let danielsGF = ["Daniela", "Gabriela", "Viola"] as const;
// // // danielsGF.push("Mathilda"); // cant push something in a const 

// // function add(a:number, b:number,...rest: number[]){//rest parameter allows adding of the numbers before it. pwede raka mag sigeg add
// //   return a+b+rest.reduce((p,c) => p+c,0);
// // }




// // return(
// //   <>
// //   {add(2,2,2,2,2,2,2)}
// //   <br />
// //   {danielsGF+" "}
// //   <h1>{boxes2.value}, {boxes.value}</h1>
// //   <h1>what the fudge</h1>
// //   </>
// // )

// // const [name,setName] = useState<string>("");
// // const [cred,setCred] = useState<string >("guest");
// // const [active,setActive] =useState<boolean>(false);
// // const [x,setX] = useState<string>("");
// // const [y,setY] = useState<string>("");
// // const[total,setTotal]= useState<number|null>(null);
// // type Status = "guest" | "admin";
// // interface MathOperation {
// //   (x: number, y:number) : number
// // }
// // const Add:MathOperation =(x,y)=> x+y;
// // const Subtract: MathOperation =(x,y)=> x-y;
// // const Multiply: MathOperation =(x,y)=> x*y;
// // const Divide: MathOperation =(x,y)=> x/y;

// // const Checkcred =()=>{
// //   if(name==""||cred==""){
// //     return alert("Enter credentials");
// //   }else{
// //      setActive(true);
// //   }
 
// // }

// // const add=()=>{
// // let X = Number(x);
// // let Y = Number(y);
// // if(x=="" || y == ""){
// // alert("Please enter a number");
// // }else{
// //    const Total = Add(X,Y);
// //  setTotal(Total);
// // }


// // }
// // const minus=()=>{
// // let X = Number(x);
// // let Y = Number(y);
// // if(x=="" || y == ""){
// // alert("Please enter a number");
// // }else{
// //  const Total = Subtract(X,Y);
// //  setTotal(Total);
// // }

 
// // }
// // const multi=()=>{
// // let X = Number(x);
// // let Y = Number(y);
// // if(x=="" || y == ""){
// // alert("Please enter a number");
// // }else{
// //    const Total = Multiply(X,Y);
// //  setTotal(Total);
// // }

 
// // }
// // const divide=()=>{
// // let X = Number(x);
// // let Y = Number(y);
// // if(x=="" || y == ""){
// // alert("Please enter a number");
// // }
// // else if(Y==0){
// //   alert("Cannot be Divisible by Zero");
// //   setY("");
// // }else{
// //    const Total = Divide(X,Y);
// //  setTotal(Total);
// // }

 
// // }
// // const logout=()=>{
// //   setActive(false);
// //   setCred("guest");
// //   setName("");
// //   setX("");
// //   setY("");
// //   setTotal(0);
// // }
//   // const [Email, setEmail] = useState<string>("");
//   // const [FirstName, setFname] = useState<string>("");
//   // const [LastName, setLname] = useState<string>("");
//   // const [Password, setPass] = useState<string>("");
//   // const [Error, setError] = useState<string>("");
//   // const [showPassword, setShowPassword] = useState<boolean>(false);
//   // const [Strength, setStrength] = useState<string>("");

//   // const passwordchecker = (e: React.ChangeEvent<HTMLInputElement>): void => {
//   //   const pwd: string = e.target.value;
//   //   setPass(pwd);

//   //   const uppercase: RegExp = /[A-Z]/;
//   //   const numbers: RegExp = /\d/g;
//   //   const specialChar: RegExp = /[!@#$%^&*(),.?":{}|<>]/;

//   //   if (!uppercase.test(pwd)) {
//   //     setError("Password must contain at least one uppercase letter.");
//   //     setStrength("");
//   //     return;
//   //   }

//   //   const numMatches: RegExpMatchArray | null = pwd.match(numbers);
//   //   if (!numMatches || numMatches.length < 2) {
//   //     setError("Password must contain at least two numbers.");
//   //     setStrength("");
//   //     return;
//   //   }

//   //   if (!specialChar.test(pwd)) {
//   //     setError("Password must contain at least one special character.");
//   //     setStrength("");
//   //     return;
//   //   }

//   //   const lowered: string = pwd.toLowerCase();
//   //   if (
//   //     (FirstName && lowered.includes(FirstName.toLowerCase())) ||
//   //     (LastName && lowered.includes(LastName.toLowerCase())) ||
//   //     (Email && lowered.includes(Email.toLowerCase()))
//   //   ) {
//   //     setError("Password must not contain your name or email.");
//   //     setStrength("");
//   //     return;
//   //   }

//   //   const blacklist: string[] = ["password", "qwerty", "abc123", "admin", "letmein"];
//   //   if (blacklist.some((word) => lowered.includes(word))) {
//   //     setError("Password must not be a common or dictionary word.");
//   //     setStrength("");
//   //     return;
//   //   }

//   //   setError("");

    
//   //   let score = 0;
//   //   if (pwd.length >= 8) score++;
//   //   if (uppercase.test(pwd)) score++;
//   //   if (numMatches && numMatches.length >= 2) score++;
//   //   if (specialChar.test(pwd)) score++;

//   //   if (score <= 1) setStrength("Weak");
//   //   else if (score <= 3) setStrength("Medium");
//   //   else setStrength("Strong");
//   // };

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   alert("Form submitted successfully!");
//   // };




   
  


  
//     interface Item {
//   id: number;
//   name: string;
//   category: string;
// }

// const createItem = (id: number, name: string, category: string): Item => {
//   return {
//     id,
//     name,
//     category,
//   };
// };

// const initialItems: Item[] = [
//   createItem(1, "Apple", "A red fruit"),
//   createItem(2, "Banana", "A yellow fruit"),
//   createItem(3, "Carrot", "An orange vegetable"),
// ];


//   const [items, setItems] = useState<Item[]>(initialItems);
//   const [query, setQuery] = useState("");
//   const [update, setUpdate] = useState<{ [key: number]: string }>({});

//   const filtered = items.filter(
//     (item) =>
//       item.name.toLowerCase().includes(query.toLowerCase()) ||
//       item.category.toLowerCase().includes(query.toLowerCase())
//   );

//   const handleUpdate = (id: number) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, category: update[id] || item.category }
//           : item
//       )
//     );
  
//     setUpdate((prev) => ({ ...prev, [id]: "" }));
//   };


// return(
//   <>
//   {/* <div hidden={active!=false}>
//     <h1>Calculator Login</h1>
//     <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/><br />
//     <select value={cred}  onChange={(e)=>setCred(e.target.value as Status)}>
//       <option value="guest">Guest</option>
//        <option value="admin">Admin</option>
//     </select><br />
//     <button onClick={Checkcred}>Login</button>
//   </div>


//   <div hidden={cred!="guest" || active==false}>
//     <h1>This is Guest Pagee</h1>
//     <h3>Welcome {name} ({cred}) <button onClick={logout}>logout</button></h3>
//     <h2>Im sorry but you cannot use the Calculator ({cred}) {name}</h2>

//   </div>
//     <div hidden={cred!="admin" || active==false}>
//     <h1>Mini Calculator</h1>
//     <h3>Welcome {name} ({cred}) <button onClick={logout}>logout</button></h3>
    

//     <p>Num1: <input value={x} type="number" onChange={(e)=>String(setX(e.target.value))} required/></p>
//     <p>Num2: <input value={y}type="number" onChange={(e)=>String(setY(e.target.value))} required/></p>
//     <h3><button onClick={add}>+Add</button>
//     <button onClick={minus}>-Minus</button>
//     <button onClick={multi}>xMultiply</button>
//     <button onClick={divide}>/Divide</button></h3>
//     <p hidden ={total==null}>Result: {total}</p>
//   </div> */}

//    {/* <div style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       minHeight: "100vh",
//       background: "#f5f6fa"
//     }}>
//       <form onSubmit={handleSubmit} style={{
//         background: "#fff",
//         padding: "30px",
//         borderRadius: "12px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         width: "400px",
//         textAlign: "center",
//         fontFamily: "Arial, sans-serif"
//       }}>
//         <h1 style={{ marginBottom: "20px", color: "#333" }}>Register Form</h1>

//         <p>
//           <input
//             type="text"
//             value={Email}
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               margin: "8px 0",
//               borderRadius: "8px",
//               border: "1px solid #ccc"
//             }}
//           />
//         </p>

//         <p>
//           <input
//             type="text"
//             value={FirstName}
//             placeholder="First Name"
//             onChange={(e) => setFname(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               margin: "8px 0",
//               borderRadius: "8px",
//               border: "1px solid #ccc"
//             }}
//           />
//         </p>

//         <p>
//           <input
//             type="text"
//             value={LastName}
//             placeholder="Last Name"
//             onChange={(e) => setLname(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               margin: "8px 0",
//               borderRadius: "8px",
//               border: "1px solid #ccc"
//             }}
//           />
//         </p>

//         <p>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={Password}
//             placeholder="Password"
//             onChange={passwordchecker}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               margin: "8px 0",
//               borderRadius: "8px",
//               border: "1px solid #ccc"
//             }}
//           />
//         </p>

//         <div style={{ textAlign: "left", margin: "8px 0" }}>
//           <label>
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//             /> Show Password
//           </label>
//         </div>

//         {Error && (
//           <p style={{ color: "red", marginTop: "10px" }}>{Error}</p>
//         )}
//         {!Error && Strength && (
//           <p style={{
//             marginTop: "10px",
//             color: Strength === "Weak" ? "red" :
//                    Strength === "Medium" ? "orange" : "green",
//             fontWeight: "bold"
//           }}>
//             {Strength} Password
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={!!Error || !Strength || Strength === "Weak"}
//           style={{
//             marginTop: "15px",
//             padding: "10px 20px",
//             borderRadius: "8px",
//             border: "none",
//             background: (!!Error || !Strength || Strength === "Weak") ? "#ccc" : "#4CAF50",
//             color: "#fff",
//             cursor: (!!Error || !Strength || Strength === "Weak") ? "not-allowed" : "pointer",
//             fontSize: "16px",
//             fontWeight: "bold"
//           }}
//         >
//           Register
//         </button>
//       </form>
//     </div> */}




//      <div style={{ padding: "20px" }}>
//       <h3>Midterm Exam | Search and Update Item Using Array</h3>

//       <p>
//         Search:{" "}
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={() => setQuery("")}>Clear</button>
//       </p>

//       {filtered.map((item) => (
//         <div key={item.id} style={{ marginBottom: "15px" }}>
//           <h2>{item.name}</h2>
//           <p>{item.category}</p>

//           <input
//             type="text"
//             value={update[item.id] || ""}
//             placeholder="New Description"
//             onChange={(e) =>
//               setUpdate((prev) => ({ ...prev, [item.id]: e.target.value }))
//             }
//           />
//           <button onClick={() => handleUpdate(item.id)}>Update</button>
//         </div>
//       ))}
//     </div>
//   </>
// );







// }




// export default App;