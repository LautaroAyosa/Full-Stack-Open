import React from "react";

import Statistic from "./Statistic/Statistic";

const Statistics = (props) => {

    let all = props.good + props.neutral + props.bad

    function average () {
        return (props.good - props.bad) / all
    }
    function positive () {
        let positive = props.good / all * 100;
        return Math.round(positive) + "%"
    }

    return (
        <tbody>
            <Statistic text="Good" value={props.good} />
            <Statistic text="Neutral" value={props.neutral} />
            <Statistic text="Bad" value={props.bad} />
            <Statistic text="All" value={all} />
            <Statistic text="Average" value={average()} />
            <Statistic text="Positive" value={positive()} />
        </tbody>
    )
}

export default Statistics;