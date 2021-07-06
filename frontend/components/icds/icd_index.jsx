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
        this.state = {
            search: ""
        }
        this.update = this.update.bind(this);
        this.getLocalStorage = this.getLocalStorage.bind(this);
        this.searchIcd = this.searchIcd.bind(this);
    }

    componentDidMount(){
        this.props.fetchIcds();
        this.getLocalStorage();
    }

    getLocalStorage(){
        const localData = localStorage.getItem("search")
        return localData ?
            this.setState({
                search: localData
            }) : ""
    }

    searchIcd(searchKey, icdsList){
        const AutoComplete = require('trie-autocomplete');
        const trie = new AutoComplete(); 
        for (const icd of icdsList){
            trie.add(icd.icd_code.toString());
        }

        const search = searchKey.split(' ').map(word => word.toUpperCase()).join(" ")
        const possibleicds = {};
        const results = trie.suggest(search);
        for (let i = 0; i < results.length; i++){
            possibleicds[results[i]] = true
        }
        
        const icdListByOrder = Object.values(this.props.icds).sort((a,b)=>a.icd_code - b.icd_code);

        return icdListByOrder.map(icd => 
            (possibleicds[icd.icd_code]) ?
            <li key={icd.id} className="icd-index-ul-li">
                <span className="icd-index-ul-li-span-1">
                    {icd.icd_code}
                </span>
                <span className="icd-index-ul-li-span-2">
                    {icd.icd_description}
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
                "search", e.currentTarget.value
            )
        }
    }

    render(){
        const icdSearch = (
            <input 
                type="text" 
                placeholder="ICD CODE"
                onChange={this.update()}
                value={this.state.search}
            />
        )

        let searchKey = this.state.search
        const containedIcds = this.searchIcd(searchKey, Object.values(this.props.icds))
           
        // const icdList = Object.values(this.props.icds).map(icd =>
        //     <li key={icd.id} className="">
        //         {icd.icd_code}
        //         {icd.icd_description}
        //     </li>
        // )

        return(
            <div>
                {icdSearch}
                <ul className="">
                    {containedIcds}
                </ul>
            </div>
            
        )
    }
} 

export default connect(mSTP, mDTP)(IcdIndex)