import './Home.css';
import axios from "axios"
import Navbar from "../../component/Navbar/Navbar"
import { useEffect, useState } from "react"
import Footer from "../../component/Footer/Footer"
import { Link } from "react-router-dom";

function App() {

  const [transaction, setTransaction] = useState();
  const [debitSum, setDebitSum] = useState();
  const [creditSum, setCreditSum] = useState()
  const [user, setUser] = useState({})


  const deleteTransaction = async (_id) => {
    const response = await axios.delete(`/api/transactions/${_id}`)
    if (response?.data?.success) {
      loadTransaction();
    }
  }

  const CATEGORY_EMOJI_MAP = {
    "food": "🍕",
    "entertainement": "🎷",
    "rent": "🏠",
    "shooping": "🧺",
    "travel": "✈️",
    "education": "📕",
    "salary": "💰",
    "side-hussle": "🎽",
    "freelancing": "💻",
    "other": "🤷‍♂️"
  }

  const loadTransaction = async () => {


    const userStore = JSON.parse(localStorage.getItem('user'))
    const id = userStore._id
    const response = await axios.get(`/api/transactions/user/${id}`);
    const transactionData = response?.data?.data;

    let totalCredit = 0;
    let totalDebit = 0;

    transactionData.forEach((transacation, index) => {
      if (transacation.type === "credit"){
        totalCredit =+ transacation.amount;
      }
      else {
        totalDebit += transacation.amount
      }
    })

    setCreditSum(totalCredit);
    setDebitSum(totalDebit);
    setTransaction(transactionData);
  };

  useEffect(() => {
    loadTransaction();
  }, [user])

 
  useEffect(() => {
    const storeUser = JSON.parse(localStorage.getItem('user' || '{}'))
    if (storeUser?.email) {
      setUser(storeUser)

    } else {
      alert('you are not logged in !...')
      window.location.href = '/login'
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='background'>
      </div>
      <div className='show-amount'>
        <h2 className='credit-card'>Credit : {creditSum}₹</h2>
        <h2 className='credit-card'>Debit : {debitSum}₹</h2>
        <h2 className='credit-card'>Total : {debitSum +creditSum }₹</h2>
        <br />
      </div>
      <br/>
      <div className='flex-home '>

        {
          transaction?.map((transaction, index) => {
            const { _id, amount, type, category, description, createdAt } = transaction;

            const date = new Date(createdAt).toLocaleDateString();
            const time = new Date(createdAt).toLocaleTimeString();
            return (
              <>
                <div className='transaction-card' key={index}>
                  <span className={`amount-text ${type == "debit" ? "debit-amount" : "credit-amount"}`}>
                    {type == "debit" ? "-" : "+"} {" "}
                    {amount}

                  </span>
                  <span className='category'>
                    {type === "debit" ? "Debited" : "Credited"}
                    <span className='time'>  on &nbsp; {date} &nbsp;at &nbsp;{time}</span>
                  </span>
                  <p className='description-box'>Message : {description}</p>

                  <span className='box'>
                    {CATEGORY_EMOJI_MAP[category]}
                    {category}</span>
                  <br />

                  <div className='container-button'>
                    <button type="button"
                      className="delete-button"
                      onClick={() => {
                        deleteTransaction(_id)
                      }}>
                      ❌</button>

                    <Link to={`/update/${_id}`}
                      className='update-button'>✏️</Link>
                  </div>

                </div>
              </>
            )
          })}
      </div>

      <Footer />
    </>
  );
}
export default App;
