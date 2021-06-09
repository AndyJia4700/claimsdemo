import React from 'react';
import { connect } from 'react-redux';
import { createCpt } from '../../actions/cpt_actions';

const mSTP = () => {
    return {
        cpt: {
            cpt_code: "",
            cpt_description: "",
            billed_amount: 0,
        }
    }
}

const mDTP = dispatch => ({
    createCpt: cpt => dispatch(createCpt(cpt))
})

class CptCreateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.cpt;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createCpt(this.state);
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="">
                <div className="">
                    <label className="">CPT Code: </label>
                    <input 
                        type="text"
                        value={this.state.cpt_code}
                        onChange={this.update("cpt_code")}
                        className=""
                    />
                </div>

                <div className="">
                    <label className="">Descrption: </label>
                    <input 
                        type="textarea"
                        value={this.state.cpt_description}
                        onChange={this.update("cpt_description")}
                        className=""
                    />
                </div>

                <div className="">
                    <label className="">Amount: </label>
                    <input 
                        type="number"
                        value={this.state.billed_amount}
                        onChange={this.update("billed_amount")}
                        className=""
                    />
                </div>

                <button>Submit</button>
            </form>
        )
    }
}

export default connect(mSTP, mDTP)(CptCreateForm);