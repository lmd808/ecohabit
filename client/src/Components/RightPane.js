import React, { Fragment } from 'react';
import { Paper, Typography } from '@material-ui/core';
import Reminders from './Reminders';
import LineChart from './Chart';
import API from '../Utils/clientauth';
import moment from 'moment';

class RightPane extends React.Component {

    state = {
        chartdata: [],
        dates: [],
        rendered: false
    }

    componentDidMount() {
        this.updateUserData();
    }

    updateUserData() {
        let user = JSON.parse(API.getLocalStorage('eco-user'));
        if (user) {
            let checkinPoints = [];
            let dates = [];
            API.getUserData(user._id)
                .then(res => {
                  let points = res.data;
                  for (let i = 0; i < points.length; i++) {
                      checkinPoints.push(points[i].totalPoints);
                      dates.push(moment(points[i].date).format('MMM D'));
                  }
                  this.setState({ chartdata: checkinPoints, dates: dates, rendered: true });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
        // need else code 
      }
    }

    render() {
        return (
            <Fragment>
                <Paper elevation={3} style={this.props.style}>
                    <Typography style={this.props.header}>
                        Daily Dashboard
                    </Typography>
                    {
                        this.state.rendered === false ?
                        null :
                        <LineChart chartdata={this.state.chartdata} dates={this.state.dates} />
                    }
                </Paper>
                <Paper elevation={3} style={this.props.style}>
                    <Typography style={this.props.header}>
                        Reminders
                    </Typography>
                    <Reminders />
                </Paper>
            </Fragment>
        )
    }
}

export default RightPane;
