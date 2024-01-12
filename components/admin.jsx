import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container">
			<h2 className="mt-5">Admin home page</h2>
			<hr />
			<nav className="nav flex-column">
				<Link to={"/create-quiz"} className="nav-link">
					Add new question
				</Link>
				<Link to={"/all-quizzes"} className="nav-link">
					Manage existing questions
				</Link>
			</nav>
		</section>
	)
}

export default Admin