import React from 'react';
import { connect } from 'react-redux';
import { fetchIcds } from '../../actions/icd_actions';

const mSTP = (state) => {

    return {
        icds: state.entities.icd,
    }
}

const mDTP = dispatch => { 

    return {
        fetchIcds: () => dispatch(fetchIcds())
    }
}

class IcdIndex extends React.Component{
    constructor(props){
        super(props);
    
    }

    componentDidMount(){
        this.props.fetchIcds();
    }

    render(){
                
        const icdList = Object.values(this.props.icds).map(icd =>
            <li key={icd.id} className="">
                {icd.icd_code}
                {icd.icd_description}
            </li>
        )

        return(
            <ul className="">
                {icdList}
            </ul>
        )
    }
} 

export default connect(mSTP, mDTP)(IcdIndex)