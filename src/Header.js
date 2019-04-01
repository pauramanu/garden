import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<span className="navbar-brand">Garden</span>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;