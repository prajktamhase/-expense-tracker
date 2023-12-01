// import './Footer.css';
import { Link } from 'react-router-dom';
import "./../../index.css"


function Footer() {


    return (
        <>
            <div >
          
               
                <div className="design">
                <h1 className='heading text-center'>Expense Tracker</h1><br />
              
                    <div>
                  <h3 className='fontsize'>Golden Lines</h3><br />
                        <span class="description">◼ Debit What Comes In, Credit What Goes Out<br />
                            ◼ Debit the Receiver, Credit the Giver.<br />
                            ◼ Debit All Expenses and Losses, Credit all Incomes and Gains.<br />
                        </span>

                    </div>

                    <div>
                        <h3 className='fontsize'>✔Quick Links</h3><br />
                        <ul class="list-links">
                            <li><a href="/" className='color link-footer fontsize'>Home</a></li>
                            <li><a href="/login" className='color link-footer fontsize'>login</a></li>
                            <li><a href="/signup" className='color link-footer fontsize'>Signup</a></li>
                            <li><a href="/addTransaction" className='color link-footer fontsize'>Add Transaction</a></li>


                        </ul>
                    </div>

                    <div >
                        <h3 className='fontsize'> Address</h3><br />
                        <span class="address fontsize"> xyz,<br/>
                            Above Lotus Hospital <br /><span class="multi">Multispeciality Hospital,</span> <br /><span class="multi">Manjari
                                Farm,</span><br /><span class="multi"> Pune-412307.</span><br />
                            <span class="multi">Mobile No: 9988776655</span></span>

                    </div>
                </div>
              

            </div>


            </>
            )
}

            export default Footer;