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
    INIT_STATE,
    // NEWS_REQUEST,
    // NEWS_SUCCESS,
    // NEWS_FAIL,
    CLEAR_ERROR,
    CHANGE_NATION,
} from "~/redux/containts";
export const sportReducer = (
    state = {
        matchs: [],
        loadingPre: false,
        charts: [],
        statistics: [],
        loading: true,
        nation: "england",
    },
    action
) => {
    const { type, payload } = action;
    console.log(type);
    switch (type) {
        case CHANGE_NATION:
            return {
                matchs: [],
                loadingPre: false,
                charts: [],
                statistics: [],
                loading: true,
                nation: payload.nation,
            };
        case MATCH_TIME_ON_REQUEST:
            return {
                ...state,
                loading: true,
                matchs: [],
            };
        case MATCH_TIME_ON_SUCCESS:
            return {
                ...state,
                loading: false,
                matchs: payload.data,
            };
        case MATCH_TIME_ON_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.err,
            };
        case STATISTIC_REQUEST:
            return {
                ...state,
                loading: true,
                statistics: [],
            };
        case STATISTIC_SUCCESS:
            return {
                ...state,
                loading: false,
                statistics: payload.data,
            };
        case STATISTIC_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.err,
            };
        case CHARTS_REQUEST:
            return {
                ...state,
                loading: true,
                charts: [],
            };
        case CHARTS_SUCCESS:
            return { ...state, loading: false, charts: payload.data };
        case CHARTS_FAIL:
            return { ...state, loading: false, error: payload.err };
        case ROUND_MATCH_REQUEST:
            return {
                ...state,
                loadingPre: true,
            };
        case ROUND_MATCH_FAIL:
            return {
                ...state,
                loadingPre: false,
                error: payload.err,
            };
        case ROUND_MATCH_SUCCESS:
            return {
                ...state,
                loadingPre: false,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                errr: null,
            };
        case INIT_STATE:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
