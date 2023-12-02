import { useState } from "react"
import axios from 'axios'
import "./AddTransaction.css"
import Navbar from "./../../component/Navbar/Navbar"
import Footer from "./../../component/Footer/Footer"

function AddTransaction() {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState("")
    const [category, setCategory] = useState('')


    const addTransaction = async () => {
        if (!amount || !type || !category || !description) {
            alert("All dields are required")
            return
        }

        const TransactionData = {
            amount,
            type,
            category,
            description
        }

        const response = await axios.post('/api/transactions', TransactionData);
        alert(response.data.message)

        setAmount('')
        setType('')
        setCategory('')
        setDescription('')
    }

    return (<>
        <Navbar />
        <div className="Transaction-card">

            <h1 className="text">Add Transaction</h1>
            <form>
                <input type="text"
                    className="form"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value)
                    }} /><br /><br/>

                <div className="flex">
                    <h3 >Type: </h3>
                    <input type="radio"
                        name="type"
                        value="credit"
                        onChange={(e) => {
                            setType(e.target.value)
                        }
                        }
                    />Credit <br />

                    <input type="radio"
                        name="type"
                        value="debit"
                        onChange={(e) => {
                            setType(e.target.value)
                        }
                        }
                    />Debit

                </div>
<br/>   
                <div className="category-text">
                        <label className='cetgory-text '>Category :-</label>
                        <select
                        className='category-box'
                        value={category}
                        onChange={(e)=>{
                            setCategory(e.target.value)
                        }}>
                            <option >select category here</option>
                            <option value="food">Food</option>
                            <option value="entertainement">Entertainment</option>
                            <option value="shopping">Shopping</option>
                            <option value="rent">Rent</option>
                            <option value="travel">Travel</option>
                            <option value="education">Education</option>
                            <option value="salary">Salary</option>
                            <option value="freelancing">Freelancing</option>
                            <option value="side-hussle">Side-hussle</option>
                            <option value="other">Other</option>
                        </select>
                        </div>


                <input type="text"
                    placeholder="Description"
                    className="form "
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }} /><br />

                <button type="button"
                    className=" button-transaction"
                    onClick={addTransaction}
                >Add Transaction</button>
            </form>
        </div>
        <Footer />

    </>
    )
                
}
export default AddTransaction;