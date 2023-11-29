import './Home.css';
import axios from "axios"
import Navbar from "./../../component/Navbar/Navbar"
import { useEffect, useState } from "react"
import Footer from "./../../component/Footer/Footer"



function App() {

  const [transaction, setTransaction] = useState();

  const deleteTransaction = async (_id) => {
    const response = await axios.delete(`/api/transactions/${_id}`)
    if (response?.data?.success) {
        loadTransaction();
    }
}
  

  const CATEGORY_EMOJI_MAP = {
    "Food": "🍕",
    "Entertainment": "🎷",
    "Rent": "🏠",
    "Shooping": "🧺",
    "Travel": "✈️",
    "Education": "📕",
    "Salary": "💰",
    "Side-hussle": "🎽",
    "Freelancing": "💻",
    "Other":"🤷‍♂️"
  }

  const loadTransaction = async () => {
    const response = await axios.get("/api/transactions");
    const transaction = response?.data?.data;
    console.log(transaction)
    setTransaction(transaction);
  }

  useEffect(() => {
    loadTransaction();
  }, [])

  return (
    <>
    <Navbar/>
    <div className='flex'>

      {
        transaction?.map((transaction, index) => {
          const { _id, amount, type, category,description, createdAt } = transaction;
          const date = new Date(createdAt).toLocaleDateString();
          const time = new Date(createdAt).toLocaleTimeString();
          return (
            <>
              <div className='transaction-card' key={index}>

                <span className={`amount-text ${type === "debit" ? "debit-amount" : "credit-amount"}`}>
                  {type === "debit" ? "-" : "+"} {" "}
                  {amount}

                </span>
                <span className='category'>
                  {type === "debit" ? "Debited" : "Credited"}
                  <span className='time'>  on &nbsp; {date} &nbsp;at &nbsp;{time}</span>
                </span>
                <p className='description-box'>Message : {description}</p>
               
                <span className='box'>
                  {CATEGORY_EMOJI_MAP[category] }
                  {category}</span>
                  <br/>

                  <button type="button"
                                        className="delete-button"
                                        onClick={() => {
                                            deleteTransaction(_id)
                                        }}>
                                        ❌</button>

                                    <a href={`/updateTransaction/${_id}`} target="_blank"
                                        className="update-button">✏️</a>

              </div>
            </>
          )
        })}
    </div>
    <Footer/>
    </>
  );
}
export default App;
