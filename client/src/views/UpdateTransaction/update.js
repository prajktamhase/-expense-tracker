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
    const handleCheck = (e) => {
        if (e.target.checked) {
            setCategory([...category, e.target.value]);
        }
        else {
            const indexToDeleted = category.indexOf(e.target.value)
        }
    }
    
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
        const response = await axios.put(`/api/transactions${_id}`, updateDetails)
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
                    onClick={updateTransaction}
                >Update Transaction</button>
            </form>
        </div>
        <Footer />
    </>
    )
}
export default UpdateTransaction;