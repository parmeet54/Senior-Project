import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typorgraphy from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'fixed',
        maxWidth: 500,
        minWidth: 499,
        minHeight: 599,
        maxHeight: 600,
        borderRadius: 12,
        wordwrap: true,
    },
    image:{
        maxWidth: 500,
        minWidth: 499,
        minHeight: 149,
        maxHeight: 150,
        
        padding: 150,
    },
    content:{
        padding:20,
    },
};

class Account extends Component {
    render() {
        const {classes, account: {priceHigh, bio, imageUrl, handel, gender, location, priceLow, age  } } = this.props
        return (
            <Card className={classes.card}>
                <CardMedia
                image = {imageUrl}
                title="ProfilePicture"
                className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typorgraphy variant="h3">{handel}</Typorgraphy>
                    <Typorgraphy variant="body2" color="textSecondary">Location: {location}</Typorgraphy>
                    <Typorgraphy variant="body2" color="textSecondary">Age: {age}</Typorgraphy>
                    <Typorgraphy variant="body2" color="textSecondary">Gender: {gender}</Typorgraphy>
                    <Typorgraphy variant="body2" color="textSecondary">Looking for a place:$ {priceLow} - ${priceHigh}</Typorgraphy>
                    <Typorgraphy variant="body1" wordwrap='true'>{bio}; </Typorgraphy>

                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Account)
