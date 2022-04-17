/** @jsxImportSource theme-ui */
import SimpleReactFooter from "simple-react-footer";
import { FaDiscord ,FaTwitter} from "react-icons/fa";

const Footer = () => {


    return (
        <>

            <div className="container">
                {/* <img
                    sx={{
                        padding: "5px",
                        marginTop: "5px",
                        marginBottom: "5px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        maxWidth: "30%",
                        display: "block"
                    }}
                    src="/images/text_logo.png"
                    alt="tbf" /> */}
                <div className="row" style={{ "alignItems": "center" }}>
                    <div className="col">
                        <img
                            sx={{
                                // padding: "5px",
                                // marginTop: "5px",
                                // marginBottom: "5px",
                                // marginLeft: "auto",
                                // marginRight: "auto",
                                maxWidth: "220px",
                                maxHeight: "220px",
                                alignItems: "center"
                                // display: "block"
                            }}
                            src="/images/logo.png"
                            alt="tbf" />
                    </div>
                    {/* <div className="col">
                        
                    </div> */}
                    <div className="col">
                        <p>Copyright © 2021  The Big Five All Rights Reserved</p>
                    </div>
                    <hr style={{
                        border: "1px solid",
                        borderColor: "#fca903",
                    }} />
                </div>
                <div className="container"
                    style={{"display":"inline-block","textAlign": "center","paddingRight":"30px"}}>
                <a href="https://discord.com/invite/thebigfive" target={"_blank"}><FaDiscord /> </a> 
                <a href="https://twitter.com/thebigfivenft" target={"_blank"}>
                <FaTwitter />

                </a>
                </div>
            </div>


            {/* <div>
                <div classNameName="section ">
                    <div classNameName="container">
                        <div classNameName="row">
                            <div classNameName="col-lg-6">
                               
                            </div>
                            <div classNameName="col" style={{ "float": "right" }}>
                                <a classNameName="app-btn mx-2 mr-lg-3" href="#"><i classNameName="fa fa-twitter">hi</i></a>
                                <a classNameName="app-btn mx-2 mr-lg-3" href="#"><i classNameName="fa fa-linkedin">bi</i></a>
                                <a classNameName="app-btn mx-2 mr-lg-3" href="#"><i classNameName="fa fa-facebook"></i></a>
                                <a classNameName="app-btn mx-2 mr-lg-3" href="#"><i classNameName="fa fa-git"></i></a>
                                <a classNameName="app-btn mx-2 mr-lg-3" href="#"><i classNameName="fa fa-pinterest-p"></i></a>
                                <a classNameName="app-btn mx-2 mr-lg-0" href="#"><i classNameName="fa fa-paper-plane"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Footer


