import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
	const {store, actions} = useContext(Context);



	return (
		<footer>
			<div className="footer-content mt-5">
				<div className="copyright">DESIGNED BY
					<a href="https://www.linkedin.com/in/anaispjimenez">ANAIS JIMENEZ</a> ©2024
				</div>
				<div className="find-me">
					<span className="follow">FOLLOW ME:
					</span> <span className="mx-1"><a href="https://www.linkedin.com/in/anaispjimenez">
						<i className="fa-brands fa-linkedin">
						</i> LinkedIn</a></span>
					<span className="mx-2"><a href="https://github.com/anaispj">
						<i className="fa-brands fa-github">
						</i> GitHub</a></span>
				</div>
			</div>
		</footer>
	)
};
