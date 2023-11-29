// import './Footer.css';
import { Link } from 'react-router-dom';


function Footer() {


    return (
        <>
            <div >
          
               
                <div className="design">
                <h1 className='heading text-center'>Expense Tracker</h1><br />
              
                    <div>
                 
                        <span class="fontsize">◼ Everyone loves a great deal.<br />
                            ◼ We’re here to serve only the best products for you.<br />
                            ◼ Your needs in just one place.<br />
                            ◼ Look no further! We got everything for you.<br />
                            ◼ Low low prices await!<br />
                        </span>

                    </div>

                    <div>
                        <h3 className='fontsize'>✔Quick Links</h3><br />
                        <ul class="list-links">
                            <li><a href="./" className='color link-footer fontsize'>Home</a></li>
                            <li><a href="./login" className='color link-footer fontsize'>login</a></li>
                            <li><a href="./signup" className='color link-footer fontsize'>Signup</a></li>
                            <li><a href="./order" className='color link-footer fontsize'>My Order</a></li>


                        </ul>
                    </div>

                    <div >
                        <h3 className='fontsize'> Address</h3><br />
                        <span class="address fontsize"> 404, Laxmi Heights,
                            Above Lotus <br /><span class="multi">Multispeciality Hospital,</span> <br /><span class="multi">Manjari
                                Farm,</span><br /><span class="multi"> Pune-412307.</span><br />
                            <span class="multi">Mobile No: 8805803087</span></span>

                    </div>
                </div>
              

            </div>


            </>
            )
}

            export default Footer;