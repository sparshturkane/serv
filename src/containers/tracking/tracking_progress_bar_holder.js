import React from 'react';

class ProgressBarHolder extends React.Component {
    constructor(props) {
        super(props);
    }

    currentStyle(){
        switch (this.props.GroupId) {
            case 3:
            return {
                width : "0%"
            }

            case 4:
            return {
                width : "25%"
            }

            case 5:
            return {
                width : "50%"
            }

            case 6:
            return {
                width : "75%"
            }

            case 7:
            return {
                width : "100%"
            }

            default:

        }
    }

    progressBarUL(){
        switch (this.props.GroupId) {
            case 3:
            return (
                <ul className="progressBarUL">
                    <li className="progressBarLI currentState">PICKUP</li>
                    <li className="progressBarLI ">RECEIVED</li>
                    <li className="progressBarLI ">REWARDS</li>
                    <li className="progressBarLI ">RECYCLE</li>
                    <li className="progressBarLI ">FEEDBACK</li>
                </ul>
            );

            case 4:
            return (
                <ul className="progressBarUL">
                <li className="progressBarLI activeState">PICKUP</li>
                <li className="progressBarLI currentState">RECEIVED</li>
                <li className="progressBarLI ">REWARDS</li>
                <li className="progressBarLI ">RECYCLE</li>
                <li className="progressBarLI ">FEEDBACK</li>
                </ul>
            );

            case 5:
            return (
                <ul className="progressBarUL">
                <li className="progressBarLI activeState">PICKUP</li>
                <li className="progressBarLI activeState">RECEIVED</li>
                <li className="progressBarLI currentState">REWARDS</li>
                <li className="progressBarLI ">RECYCLE</li>
                <li className="progressBarLI ">FEEDBACK</li>
                </ul>
            );

            case 6:
            return (
                <ul className="progressBarUL">
                <li className="progressBarLI activeState">PICKUP</li>
                <li className="progressBarLI activeState">RECEIVED</li>
                <li className="progressBarLI activeState">REWARDS</li>
                <li className="progressBarLI currentState">RECYCLE</li>
                <li className="progressBarLI ">FEEDBACK</li>
                </ul>
            );

            case 7:
            return (
                <ul className="progressBarUL">
                <li className="progressBarLI activeState">PICKUP</li>
                <li className="progressBarLI activeState">RECEIVED</li>
                <li className="progressBarLI activeState">REWARDS</li>
                <li className="progressBarLI activeState">RECYCLE</li>
                <li className="progressBarLI currentState">FEEDBACK</li>
                </ul>
            );

            default:

        }
    }

    spriteIMGUL(){
        switch (this.props.GroupId) {
            case 3:
            return (
                <ul className="spriteIMGUL">
                    <li className="spriteIMGLI activeState"><span className="newCircleBox currentCircleBox"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox "></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox "></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox "></span></li>
                    <li className="spriteIMGLI currentState"><span className="newCircleBox "></span></li>
                </ul>
            );

            case 4:
            return (
                <ul className="spriteIMGUL">
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox currentCircleBox"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox "></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox "></span></li>
                    <li className="spriteIMGLI currentState"><span className="newCircleBox "></span></li>
                </ul>
            );

            case 5:
            return (
                <ul className="spriteIMGUL">
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox currentCircleBox"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox "></span></li>
                    <li className="spriteIMGLI currentState"><span className="newCircleBox "></span></li>
                </ul>
            );

            case 6:
            return (
                <ul className="spriteIMGUL">
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox currentCircleBox"></span></li>
                    <li className="spriteIMGLI currentState"><span className="newCircleBox "></span></li>
                </ul>
            );

            case 7:
            return (
                <ul className="spriteIMGUL">
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                    <li className="spriteIMGLI currentState"><span className="newCircleBox currentCircleBox"></span></li>
                </ul>
            );

            default:

        }
    }

    render(){

        // var myBarStyle = ;
        return(
            <div className="progressBarHolder">
                <div className="progressBarContent">
                    <div className="myProgress1">
                        <div className="myBar1" style={this.currentStyle()}></div>
                    </div>
                </div>

                {this.progressBarUL()}
                {this.spriteIMGUL()}

            </div>
        );
    }
}

export default ProgressBarHolder;
