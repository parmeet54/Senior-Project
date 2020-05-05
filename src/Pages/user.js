//this page is to display the profile of another user in more detail selected by the user of user in more detailed
import React, { Component } from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Account from '../Components/Account';

class user extends Component {
    state = {
        account: null
    }
    //retrieve info of account selected 
    componentDidMount(){
        const handel = this.props.match.params.handel   
        axios.get(`/user/${handel}`)
        .then(res => {
            this.setState({
                account: res.data.user
            })
        })
        //in case of error
        .catch(err => console.log(err));
  }
    render() {
        return (
            //render the profiles as a grid         
            <Grid container spacing={12}>
            <Grid item sm={12} xs={12}>
                {this.state.account === null ? (
                    <p>Loading profile...</p>) :
                    (<Account account={this.state.account}/>)
                }
            </Grid>
      </Grid>
        );
     }
}

export default user;


