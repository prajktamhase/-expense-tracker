import './Home.css';
import axios from "axios"
import Navbar from "../../component/Navbar/Navbar"
import { useEffect, useState } from "react"
import Footer from "../../component/Footer/Footer"
import { Link } from "react-router-dom";
import work from "./w2.png"
import work1 from "./work.png"
import work2 from "./w1.png"
import work3 from "./w5.png"
import work4 from "./w2.png"
import work5 from "./w6.png"

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

      <div className='flex-container-home'>
        <div>
<img src={work} className='image-work'/>
        </div>

        <div>
          <h1 className='text-center'>Better budgeting💸</h1>
        <h3 className='work-text'>  <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Expense tracking provides a detailed overview of where money is being spent, making it easier to create and stick to a budget. Improved cash flow: The process can help identify areas where cash flow can be improved, such as reducing unnecessary expenses or improving payment terms. </i></h3>
         </div>
      </div>

      <div className='flex-container-home'>
        <div >
<h1 className='text-center'>How To Track Your Expenses💳</h1>
<h3 className='work-text'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While the process remains the same, there are two main ways to track your expenses: manually or using an automated expense tracker. Both methods have advantages and disadvantages, so choosing the one that suits your personal or business needs and preferences is essential. A combination of both manual and automated expense tracking is known to be the ideal combination</i></h3>
        </div>

        <div>
<img src={work1} className='image-work'/>
        </div>
      </div>

      <div  className='flex-container-home content'>
        <img src={work2} className='image-flex-home'/>
        <img src={work3} className='image-flex-home'/>
        <img src={work4} className='image-flex-home'/>
        <img src={work5} className='image-flex-home'/>

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
