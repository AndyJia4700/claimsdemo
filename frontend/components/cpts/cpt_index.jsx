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
        this.state = {
            search: ""
        }
        this.update = this.update.bind(this);
        this.getLocalStorage = this.getLocalStorage.bind(this);
        this.searchCpt = this.searchCpt.bind(this);    
    }

    componentDidMount(){
        this.props.fetchCpts();
        this.getLocalStorage();
    }

    getLocalStorage(){
        const localData = localStorage.getItem("searchCpt")
        return localData ?
            this.setState({
                search: localData
            }) : ""
    }

    searchCpt(searchKey, cptsList){
        const AutoComplete = require('trie-autocomplete');
        const trie = new AutoComplete(); 
        for (const cpt of cptsList){
            // debugger
            trie.add(cpt.cpt_code.toString());
        }

        const search = searchKey.split(' ').map(word => word.toUpperCase()).join(" ")
        const possiblecpts = {};
        const results = trie.suggest(search);
        for (let i = 0; i < results.length; i++){
            possiblecpts[results[i]] = true
        }
        
        const cptListByOrder = Object.values(this.props.cpts).sort((a,b)=>a.cpt_code - b.cpt_code);

        return cptListByOrder.map(cpt => 
            (possiblecpts[cpt.cpt_code]) ?
            <li key={cpt.id} className="cpt-index-ul-li">
                <span className="cpt-index-ul-li-span-1">
                    {cpt.cpt_code}
                </span>
                <span className="cpt-index-ul-li-span-2">
                    {cpt.cpt_description}
                </span>
                <span className="cpt-index-ul-li-span-2">
                    {cpt.billed_amount}
                </span>
            </li> : null 
        )
    }

    update(){
        return e => {
            this.setState({
                search: e.currentTarget.value
            }),
            localStorage.setItem(
                "searchCpt", e.currentTarget.value
            )
        }
    }

    render(){

        const cptSearch = (
            <input 
                type="text" 
                placeholder="CPT CODE"
                onChange={this.update()}
                value={this.state.search}
            />
        )

        let searchKey = this.state.search
        const containedCpts = this.searchCpt(searchKey, Object.values(this.props.cpts))
                
        // const cptListByOrder = Object.values(this.props.cpts).sort((a,b)=>a.cpt_code - b.cpt_code);
        // const cptList = cptListByOrder.map(cpt =>
        //     <li key={cpt.id} className="">
        //         {cpt.cpt_code}
        //         {cpt.cpt_description}
        //         {cpt.billed_amount}
        //     </li>
        // )

        return(
            <div>
                {cptSearch}
                <ul className="">
                    {containedCpts}
                    {/* {cptList} */}
                </ul>
            </div>
        )
    }
} 

export default connect(mSTP, mDTP)(CptIndex)