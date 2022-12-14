import React from "react";
import Header from "~/components/Layout/components/Header";
import classNames from "classnames/bind";
import styles from "~/components/GlobelStyles/Responesive.scss";
const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className={cx("content", "grid", "wide")}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
