import React from "react";

import Statistic from "./Statistic/Statistic";

const Statistics = (props) => {

    let all = props.good + props.neutral + props.bad

    function average () {
        if ( all === 0 ) {
        return "Waiting for input...";
        } else {
        return (props.good - props.bad) / all
        }

    }
    function positive () {
        if ( all === 0 ) {
        return "Waiting for input...";
        } else {
        let positive = props.good / all * 100;
        return Math.round(positive) + "%"
        }
    }

    if (all === 0 ) {
        return "No feedback given";
    } else {
        return (
            <table>
                <Statistic text="Good" value={props.good} />
                <Statistic text="Neutral" value={props.neutral} />
                <Statistic text="Bad" value={props.bad} />
                <Statistic text="All" value={all} />
                <Statistic text="Average" value={average()} />
                <Statistic text="Positive" value={positive()} />
            </table>
        )
    }
}

export default Statistics;