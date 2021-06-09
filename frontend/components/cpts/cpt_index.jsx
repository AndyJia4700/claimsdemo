import React from 'react';
import { connect } from 'react-redux';
import { fetchCpts } from '../../actions/cpt_actions';

const mSTP = (state) => {

    return {
        cpts: state.entities.cpt,
    }
}

const mDTP = dispatch => { 

    return {
        fetchCpts: () => dispatch(fetchCpts())
    }
}

class CptIndex extends React.Component{
    constructor(props){
        super(props);
    
    }

    componentDidMount(){
        this.props.fetchCpts();
    }

    render(){
            console.log(this.props.cpts);
        
        // const cptListByOrder = Object.values(this.props.cpts).sort((a,b)=>a.cpt_code - b.cpt_code);
        // const cptList = cptListByOrder.map(cpt =>

        const cptList = Object.values(this.props.cpts).map(cpt =>
            <li key={cpt.id} className="">
                {cpt.cpt_code}
                {cpt.cpt_description}
                {cpt.billed_amount}
            </li>
        )

        return(
            <ul className="">
                {cptList}
            </ul>
        )
    }
} 

export default connect(mSTP, mDTP)(CptIndex)