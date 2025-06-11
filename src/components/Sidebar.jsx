import React from "react";

function Sidebar({ isOpen }) {
    return (
        <section className={isOpen ? "sidebar-open" : "sidebar"}>
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <h2> Menu</h2>
                </div>
                <nav className="navigation-bar">
                    <ul className="navigation-bar-list">
                        <li>
                            <a href="/" className="home-navigation">Home</a>
                        </li>
                        <li>
                            <a href="/favorites" className="favorites-navigation">Favorites</a>
                        </li>
                        <li>
                            <a href="/watched" className="watched-navigation">Watched</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default Sidebar;
