import { useState } from "react"
import axios from 'axios'
import "./AddTransaction.css"
import Navbar from "./../../component/Navbar/Navbar"
import Footer from "./../../component/Footer/Footer"
// import UpdateTransaction from "./../UpdateTransaction/update"

function AddTransaction() {

    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState("Credit")
    const [category, setCategory] = useState('Other')


    const handleCheck = (e) => {
        if (e.target.checked) {
            setCategory([...category, e.target.value]);
        }
        else {
            const indexToDeleted = category.indexOf(e.target.value)
        }

    }


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
                    }} /><br />

                <div className="flex">
                    <h3 >Type: {type}</h3>
                    <input type="radio"
                        name="type"
                        value="Credit"
                        onChange={(e) => {
                            setType(e.target.value)
                        }
                        }
                    />Credit <br />

                    <input type="radio"
                        name="type"
                        value="Debit"
                        onChange={(e) => {
                            setType(e.target.value)
                        }
                        }
                    />Debit

                </div>



               
                <div className="category-text">
                <h3> category:</h3>
                <input type="checkbox" value="food"
                className="category-design"
                    onChange={handleCheck} />Food

                <input type="checkbox" value="entertainment"
                className="category-design"
                    onChange={handleCheck} />Entertainment

                <input type="checkbox" value="rent"
                className="category-design"
                    onChange={handleCheck} />Rent<br />

                <input type="checkbox" value="shooping"
                className="category-design"
                    onChange={handleCheck} />Shooping

                <input type="checkbox" value="travel"
                className="category-design"
                    onChange={handleCheck} />Travel

                <input type="checkbox" value="education"
                className="category-design"
                    onChange={handleCheck} />Education

                <input type="checkbox" value="salary"
                className="category-design"
                    onChange={handleCheck} />Salary

                <input type="checkbox" value="freelancing"
                className="category-design"
              
                    onChange={handleCheck} />Freelancing

                <input type="checkbox" value="side-hussle"
                className="category-design"
                
                    onChange={handleCheck} />Side-hussle<br />

                <input type="checkbox" value="other"
                className="category-design"
                checked
                    onChange={handleCheck} />Other<br />
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
        {/* <UpdateTransaction/> */}
        <Footer />
       
    </>
    )

}
export default AddTransaction