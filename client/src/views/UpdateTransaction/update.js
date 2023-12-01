import { useEffect, useState } from "react"
import axios from 'axios';
import { useParams } from "react-router-dom"
import "./../AddTransaction/AddTransaction.css"
import Footer from "./../../component/Footer/Footer"
import Navbar from "./../../component/Navbar/Navbar"

function UpdateTransaction() {

    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState("Credit")
    const [category, setCategory] = useState('Other')

    const { _id } = useParams();

    const loadTransaction = async () => {
        const response = await axios.get(`/api/transactions/${_id}`)
        const {amount, type,category,description} = response?.data?.data

        setAmount(amount)
        setType(type)
        setCategory(category)
        setDescription(description)
    }
    useEffect(() => {
        loadTransaction();
    }, [])

    const updateTransaction = async () => {
        const updateDetails = { amount, type,category,description}
        const response = await axios.put(`/api/transactions/${_id}`, updateDetails)
        alert(response?.data?.message)
    }

    return (<>
    <Navbar/>
        <div className="Transaction-card">
            <h1 className="text">Update Transaction</h1>
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
                        <label className='cetgory-text'>Category :-</label><br/>
                        <select
                        className='form-control-regi'
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
                    onClick={updateTransaction}
                >Update Transaction</button>
            </form>
        </div>
        <Footer />
    </>
    )
}
export default UpdateTransaction;