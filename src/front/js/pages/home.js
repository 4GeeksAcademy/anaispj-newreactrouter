import React, { useContext } from "react";
import { Context } from "../store/appContext";
import starWarsHome from "../../img/imagenhome.jpg";
import "../../styles/home.css";

export const Home = () => {


	return (
		<div className="text-center mt-5">
			<p>
				<img className="img-fluid" src={starWarsHome} />
			</p>
		</div>
	)};

