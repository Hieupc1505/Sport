import {
    MATCH_TIME_ON_REQUEST,
    MATCH_TIME_ON_SUCCESS,
    MATCH_TIME_ON_FAIL,
    CHARTS_REQUEST,
    CHARTS_SUCCESS,
    CHARTS_FAIL,
    STATISTIC_REQUEST,
    STATISTIC_SUCCESS,
    STATISTIC_FAIL,
    ROUND_MATCH_REQUEST,
    ROUND_MATCH_FAIL,
    ROUND_MATCH_SUCCESS,
    CLEAR_ERROR,
    INIT_STATE,
    CHANGE_NATION,
} from "~/redux/containts";

import axios from "axios";

export const getMatchTime = (nation) => async (dispatch) => {
    try {
        dispatch({ type: MATCH_TIME_ON_REQUEST });
        const { data } = await axios.get(`/api/sports/${nation}/match`);
        dispatch({
            type: MATCH_TIME_ON_SUCCESS,
            payload: { data },
        });
    } catch (err) {
        dispatch({
            type: MATCH_TIME_ON_FAIL,
            payload: {
                err: err.response.data.mes,
            },
        });
    }
};
export const getRound = (nation, roundId) => async (dispatch) => {
    try {
        dispatch({ type: ROUND_MATCH_REQUEST });
        const { data } = await axios.get(
            `/api/sports/${nation}/rounds/${roundId}`
        );
        dispatch({
            type: ROUND_MATCH_SUCCESS,
        });

        return data;
    } catch (err) {
        dispatch({
            type: ROUND_MATCH_FAIL,
            payload: {
                err: err.response.data.mes,
            },
        });
    }
};
export const getCharts = (nation, id) => async (dispatch) => {
    try {
        dispatch({ type: CHARTS_REQUEST });
        const data = await axios.get(`/api/sports/${nation}/charts/${id}`);
        dispatch({
            type: CHARTS_SUCCESS,
            payload: {
                ...data,
            },
        });
    } catch (err) {
        dispatch({
            type: CHARTS_FAIL,
            payload: {
                err: err.response.data.mes,
            },
        });
    }
};

export const getTopPlayers = (nation) => async (dispatch) => {
    try {
        dispatch({ type: STATISTIC_REQUEST });
        const { data } = await axios.get(`/api/sports/${nation}/top-players`);
        dispatch({
            type: STATISTIC_SUCCESS,
            payload: { data },
        });
    } catch (err) {
        dispatch({
            type: STATISTIC_FAIL,
            payload: { err: err.response.data.mes },
        });
    }
};

export const initState = () => async (dispatch) => {
    dispatch({ type: INIT_STATE });
};
export const changeNation = (nation) => async (dispatch) => {
    dispatch({
        type: CHANGE_NATION,
        payload: { nation },
    });
};
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
