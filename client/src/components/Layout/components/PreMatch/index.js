import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useDispatch, useSelector } from "react-redux";
// import { getRound } from "~/redux/actions";
import styles from "../Match/Match.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const list = {
    Sun: "Cn",
    Mon: "Th 2",
    Tue: "Th 3",
    Wed: "Th 4",
    Thus: "Th 5",
    Fri: "Th 6",
    Sat: "Th 7",
};

const PreMatch = ({ data, round, lRound, color }) => {
    // console.log(color);
    const checkWeekDay = (time, { code, type }) => {
        const timeNow = new Date();
        const timeMatch = new Date(time);
        if (code === 60 || type === "postponed") return "Tạm hoãn";
        if (
            timeMatch.toDateString() === timeNow.toDateString() &&
            timeMatch.getTime() >= timeNow.getTime()
        ) {
            return `Hôm nay, ${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
        } else if (
            timeMatch.getTime() > timeNow.getTime() &&
            timeMatch.getTime() < timeNow.getTime() + 1209600000
        ) {
            let d =
                timeMatch.getDate() - timeNow.getDate() === 1
                    ? "Ngày mai "
                    : `${Object.values(list)[timeMatch.getDay()]}`;

            return `${d}, ${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
        } else if (timeMatch.getTime() < timeNow.getTime()) {
            return "KT";
        } else
            return `${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
    };
    const checkTime = (time, { code, type }) => {
        const timeMatch = new Date(time);
        const timeNow = new Date();
        if (code === 60 || type === "postponed") {
            return `${
                Object.values(list)[timeMatch.getDay()]
            }, ${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
        }
        if (timeNow.getTime() > timeMatch.getTime()) {
            if (
                timeMatch.getTime() < timeNow.getTime() &&
                timeMatch.getTime() > timeNow.getTime() - 1209600000
            ) {
                let d =
                    timeNow.getDate() - timeMatch.getDate() === 1
                        ? "Hôm qua "
                        : `${Object.values(list)[timeMatch.getDay()]}`;
                return `${d}, ${timeMatch.toLocaleDateString("id-GB", {
                    day: "2-digit",
                    month: "2-digit",
                })}`;
            } else {
                return `${timeMatch.toLocaleDateString("id-GB", {
                    day: "2-digit",
                    month: "2-digit",
                })}`;
            }
        } else
            return timeMatch.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            });
    };
    // const view = useRef();

    return (
        <div className={cx("content-main")}>
            {color !== null && <div className={cx("view")}></div>}
            <div className={cx("table-text")}>
                Ngày thi đấu {round}/{lRound}
            </div>
            <table className={cx("table-wrap")}>
                <tbody className={cx("table-body")}>
                    {data &&
                        data.map((item, index) => {
                            return (
                                <tr key={uuidv4()} className={cx("table-row")}>
                                    <td
                                        status={
                                            item[0].status.code === 100
                                                ? "finished"
                                                : "notstarted"
                                        }
                                        className={cx(
                                            "table-row-match",
                                            "table-match-row_border"
                                        )}
                                    >
                                        <div
                                            className={cx(
                                                "table-row-match-wrap"
                                            )}
                                        >
                                            <table
                                                className={cx(
                                                    "table-row-match-wrap-inner"
                                                )}
                                            >
                                                <tbody
                                                    className={cx(
                                                        "table-match-body"
                                                    )}
                                                >
                                                    {/* contentOfMatch */}
                                                    <tr
                                                        className={cx(
                                                            "table-match-first-row"
                                                        )}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "table-match-logo-format"
                                                            )}
                                                        ></td>
                                                        <td></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-score-format"
                                                            )}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-sparate-format"
                                                            )}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-time-format"
                                                            )}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-no-width"
                                                            )}
                                                        ></td>
                                                    </tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-live-status"
                                                        )}
                                                        colSpan={6}
                                                    ></tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-row-time"
                                                        )}
                                                    >
                                                        <td colSpan={3}></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-row-sperate"
                                                            )}
                                                            rowSpan={5}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-time-detail"
                                                            )}
                                                            rowSpan={5}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "table-match-time-detail-text"
                                                                )}
                                                                style={{
                                                                    color: `${color}`,
                                                                }}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-time-status"
                                                                    )}
                                                                >
                                                                    {checkWeekDay(
                                                                        item[0]
                                                                            .startTimestamp *
                                                                            1000,
                                                                        item[0]
                                                                            .status
                                                                    )}
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "table-match-time-on"
                                                                    )}
                                                                >
                                                                    {checkTime(
                                                                        item[0]
                                                                            .startTimestamp *
                                                                            1000,
                                                                        item[0]
                                                                            .status
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {item[0].status
                                                                .code ===
                                                            100 ? (
                                                                <div
                                                                    className={cx(
                                                                        "table-match-detail-video"
                                                                    )}
                                                                >
                                                                    <a
                                                                        href="https://www.youtube.com/watch?v=Ue76ar1xZWA&feature=onebox"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img
                                                                            src="https://i.ytimg.com/vi/cBeA8BBM0Xk/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADKHNS5_XF51n-zYznTlcRpeQPwQ"
                                                                            alt="hightLight"
                                                                        />
                                                                    </a>
                                                                </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr></tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-row"
                                                        )}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "table-match-img"
                                                            )}
                                                        >
                                                            <div>
                                                                <img
                                                                    src={`https://api.sofascore.app/api/v1/team/${item[0].homeTeam.id}/image`}
                                                                    className={cx(
                                                                        "table-match-img-logo"
                                                                    )}
                                                                    alt="logoOfTeam"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "table-match-team-info"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-score"
                                                                )}
                                                            >
                                                                {item[0].status
                                                                    .code ===
                                                                100
                                                                    ? item[0]
                                                                          .homeScore
                                                                          .current
                                                                    : ``}
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-name"
                                                                )}
                                                            >
                                                                <span>
                                                                    {
                                                                        item[0]
                                                                            .homeTeam
                                                                            .shortName
                                                                    }
                                                                    {"  "}
                                                                </span>
                                                                {item[0]
                                                                    .homeRedCards && (
                                                                    <svg
                                                                        width="6"
                                                                        height="8"
                                                                        viewBox="0 0 6 8"
                                                                        fill="#c1272d"
                                                                    >
                                                                        <rect
                                                                            x="0"
                                                                            y="0"
                                                                            width="6"
                                                                            height="8"
                                                                            rx="1"
                                                                            ry="1"
                                                                        ></rect>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-row"
                                                        )}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "table-match-img"
                                                            )}
                                                        >
                                                            <img
                                                                src={`https://api.sofascore.app/api/v1/team/${item[0].awayTeam.id}/image`}
                                                                className={cx(
                                                                    "table-match-img-logo"
                                                                )}
                                                                alt="logoOfTeam"
                                                            />
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "table-match-team-info"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-score"
                                                                )}
                                                            >
                                                                {item[0].status
                                                                    .code ===
                                                                100
                                                                    ? item[0]
                                                                          .awayScore
                                                                          .current
                                                                    : ``}
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-name"
                                                                )}
                                                            >
                                                                <span>
                                                                    {
                                                                        item[0]
                                                                            .awayTeam
                                                                            .shortName
                                                                    }
                                                                    {"  "}
                                                                </span>
                                                                {item[0]
                                                                    .awayRedCards && (
                                                                    <svg
                                                                        width="6"
                                                                        height="8"
                                                                        viewBox="0 0 6 8"
                                                                        fill="#c1272d"
                                                                    >
                                                                        <rect
                                                                            x="0"
                                                                            y="0"
                                                                            width="6"
                                                                            height="8"
                                                                            rx="1"
                                                                            ry="1"
                                                                        ></rect>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr></tr>
                                                    <tr></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    {item[1] && (
                                        <td
                                            status={
                                                item[1].status.code === 100
                                                    ? "finished"
                                                    : "notstarted"
                                            }
                                            className={cx(
                                                "table-row-match",
                                                "table-match-row_border"
                                            )}
                                        >
                                            <div
                                                className={cx(
                                                    "table-row-match-wrap"
                                                )}
                                            >
                                                <table
                                                    className={cx(
                                                        "table-row-match-wrap-inner"
                                                    )}
                                                >
                                                    <tbody
                                                        className={cx(
                                                            "table-match-body"
                                                        )}
                                                    >
                                                        {/* contentOfMatch */}
                                                        <tr
                                                            className={cx(
                                                                "table-match-first-row"
                                                            )}
                                                        >
                                                            <td
                                                                className={cx(
                                                                    "table-match-logo-format"
                                                                )}
                                                            ></td>
                                                            <td></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-score-format"
                                                                )}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-sparate-format"
                                                                )}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-time-format"
                                                                )}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-no-width"
                                                                )}
                                                            ></td>
                                                        </tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-live-status"
                                                            )}
                                                            colSpan={6}
                                                        ></tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-row-time"
                                                            )}
                                                        >
                                                            <td
                                                                colSpan={3}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-row-sperate"
                                                                )}
                                                                rowSpan={5}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-time-detail"
                                                                )}
                                                                rowSpan={5}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-time-detail-text"
                                                                    )}
                                                                    style={{
                                                                        color: `${color}`,
                                                                    }}
                                                                >
                                                                    <div
                                                                        className={cx(
                                                                            "table-match-time-status"
                                                                        )}
                                                                    >
                                                                        {checkWeekDay(
                                                                            item[1]
                                                                                .startTimestamp *
                                                                                1000,
                                                                            item[0]
                                                                                .status
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className={cx(
                                                                            "table-match-time-on"
                                                                        )}
                                                                    >
                                                                        {checkTime(
                                                                            item[1]
                                                                                .startTimestamp *
                                                                                1000,
                                                                            item[0]
                                                                                .status
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {item[1].status
                                                                    .code ===
                                                                100 ? (
                                                                    <div
                                                                        className={cx(
                                                                            "table-match-detail-video"
                                                                        )}
                                                                    >
                                                                        <a
                                                                            href="https://www.youtube.com/watch?v=Ue76ar1xZWA&feature=onebox"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img
                                                                                src="https://i.ytimg.com/vi/cBeA8BBM0Xk/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADKHNS5_XF51n-zYznTlcRpeQPwQ"
                                                                                alt="hightLight"
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr></tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-row"
                                                            )}
                                                        >
                                                            <td
                                                                className={cx(
                                                                    "table-match-img"
                                                                )}
                                                            >
                                                                <div>
                                                                    <img
                                                                        src={`https://api.sofascore.app/api/v1/team/${item[1].homeTeam.id}/image`}
                                                                        className={cx(
                                                                            "table-match-img-logo"
                                                                        )}
                                                                        alt="logoOfTeam"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-team-info"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-score"
                                                                    )}
                                                                >
                                                                    {item[1]
                                                                        .status
                                                                        .code ===
                                                                    100
                                                                        ? item[1]
                                                                              .homeScore
                                                                              .current
                                                                        : ``}
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-name"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            item[1]
                                                                                .homeTeam
                                                                                .shortName
                                                                        }
                                                                        {"  "}
                                                                    </span>
                                                                    {item[1]
                                                                        .homeRedCards && (
                                                                        <svg
                                                                            width="6"
                                                                            height="8"
                                                                            viewBox="0 0 6 8"
                                                                            fill="#c1272d"
                                                                        >
                                                                            <rect
                                                                                x="0"
                                                                                y="0"
                                                                                width="6"
                                                                                height="8"
                                                                                rx="1"
                                                                                ry="1"
                                                                            ></rect>
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-row"
                                                            )}
                                                        >
                                                            <td
                                                                className={cx(
                                                                    "table-match-img"
                                                                )}
                                                            >
                                                                <img
                                                                    src={`https://api.sofascore.app/api/v1/team/${item[1].awayTeam.id}/image`}
                                                                    className={cx(
                                                                        "table-match-img-logo"
                                                                    )}
                                                                    alt="logoOfTeam"
                                                                />
                                                            </td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-team-info"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-score"
                                                                    )}
                                                                >
                                                                    {item[1]
                                                                        .status
                                                                        .code ===
                                                                    100
                                                                        ? item[1]
                                                                              .awayScore
                                                                              .current
                                                                        : ``}
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-name"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            item[1]
                                                                                .awayTeam
                                                                                .shortName
                                                                        }
                                                                        {"  "}
                                                                    </span>
                                                                    {item[1]
                                                                        .awayRedCards && (
                                                                        <svg
                                                                            width="6"
                                                                            height="8"
                                                                            viewBox="0 0 6 8"
                                                                            fill="#c1272d"
                                                                        >
                                                                            <rect
                                                                                x="0"
                                                                                y="0"
                                                                                width="6"
                                                                                height="8"
                                                                                rx="1"
                                                                                ry="1"
                                                                            ></rect>
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr></tr>
                                                        <tr></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    <tr className={cx("table-row")}></tr>
                    <tr className={cx("table-row")}></tr>
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(PreMatch);
