import React from 'react';
import { connect } from 'react-redux';
import { createIcd } from '../../actions/icd_actions';

const mSTP = () => {
    return {
        icd: {
            icd_code: "",
            icd_description: "",
        }
    }
}

const mDTP = dispatch => ({
    createIcd: icd => dispatch(createIcd(icd))
})

class IcdCreateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.icd;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createIcd(this.state);
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
                    <label className="">ICD Code: </label>
                    <input 
                        type="text"
                        value={this.state.icd_code}
                        onChange={this.update("icd_code")}
                        className=""
                    />
                </div>

                <div className="">
                    <label className="">Descrption: </label>
                    <input 
                        type="textarea"
                        value={this.state.icd_description}
                        onChange={this.update("icd_description")}
                        className=""
                    />
                </div>

                <button>Submit</button>
            </form>
        )
    }
}

export default connect(mSTP, mDTP)(IcdCreateForm);