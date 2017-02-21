import React from 'react';

class FooterDiv extends React.Component {

    render(){
        return(
            <div className="footerHolder">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="poweredByContent">
                            <span className="poweredBy">Powered By</span>
                            <br/>
                            <a href="https://servify.in/" target="blanck"><img src="images/servifylogo.png" className="servifylogo" alt="Servify logo" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="policyTermContent">
                            <span><a href="https://servify.in/" target="blanck" className="servifytag">www.servify.in</a></span>
                            <br/>
                            <br/>
                            <span className="policyTerm"><a href="https://servify.in/privacy/">Privacy Policy</a></span>
                            <br/>
                            <span className="policyTerm"><a href="https://servify.in/termsandconditions/">Terms and Conditions</a></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterDiv;
