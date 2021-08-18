import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DoughnutChart from "../Chart";

import { useQuery, useMutation } from "@apollo/client";
import { SINGLE_TRIP, GET_ME } from "../../utils/queries";
import {
	ADD_EXPENSE,
	DELETE_EXPENSE,
	UPDATE_EXPENSE,
} from "../../utils/mutations";

// material imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const Expenses = params => {
	// const currentUser = useQuery(GET_ME);
	//const currentUser = me?.me || {};
	// console.log(currentUser);
	// const me = currentUser.data.me.username;
	// console.log(me);

	// roadtrip id for all

	const { id: roadtripId } = useParams();

	// mutations and queries
	const { loading, data } = useQuery(SINGLE_TRIP, {
		variables: { id: roadtripId },
	});
	const [deleteExpense] = useMutation(DELETE_EXPENSE);
	const [addExpense] = useMutation(ADD_EXPENSE);
	const [updateExpense] = useMutation(UPDATE_EXPENSE);

	// users

	const users = data.roadtrip.users.map(user => user.username);

	// expenses

	const expenses = data.roadtrip.expenses || [];

	const userObj = {}
	users.forEach(user => {
		userObj[user] = 0;
	})

	expenses.forEach(expense => {
		if (userObj.hasOwnProperty(expense.username)) {
			userObj[expense.username] += expense.cost
		}
	})

	const individualExpense = Object.keys(userObj).map(key => {
		return userObj[key]
	})


	// state for expenses

	const [formState, setFormState] = useState({
		category: "",
		cost: "",
		comment: "",
	});
	const [expenseState, setExpenseState] = useState({ expenseId: "" });

	// modal open and close

	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);

	const handleOpen = async event => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEditOpen = async expenseId => {
		setEditOpen(true);
		handleExpenseState(expenseId);
	};

	const handleEditClose = () => {
		setEditOpen(false);
	};

	function handleExpenseState(expenseId) {
		setExpenseState({ expenseId: expenseId });
	}

	// material UI styles for modal and grid

	const useStyles = makeStyles(theme => ({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary,
			margin: 5,
		},
		modal: {
			width: 400,
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			borderRadius: "12px",
		},
		modalParent: {
			display: "flex",
			justifyContent: "center",
			alignContent: "center",
		},
		form: {
			minWidth: 350,
		},
	}));

	// delete expense

	const handleDelete = async event => {
		try {
			await deleteExpense({
				variables: { expenseId: event.target.id, _id: roadtripId },
			});

			window.location.reload(false);
		} catch (error) {
			console.error(error);
		}
	};

	// form changes

	const handleChange = event => {
		const { name, value } = event.target;

		setFormState({ ...formState, [name]: value });
	};

	const handleFormSubmit = async event => {
		event.preventDefault();

		console.log({
			category: formState.category,
			cost: parseInt(formState.cost),
			comment: formState.comment,
			_id: roadtripId,
		});
		try {
			await addExpense({
				variables: {
					category: formState.category,
					cost: parseInt(formState.cost),
					comment: formState.comment,
					_id: roadtripId,
				},
			});

			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditSubmit = async event => {
		event.preventDefault();

		console.log({
			category: formState.category,
			cost: parseInt(formState.cost),
			comment: formState.comment,
			_id: roadtripId,
			expenseId: expenseState.expenseId,
		});
		try {
			await updateExpense({
				variables: {
					category: formState.category,
					cost: parseInt(formState.cost),
					comment: formState.comment,
					_id: roadtripId,
					expenseId: expenseState.expenseId,
				},
			});
			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	const classes = useStyles();

	if (loading) {
		return <div>Loading...</div>;
	}

	// categories for form

	const categories = ["Gas", "Food", "Accomodations", "Fun", "Misc"];

	// modal body

	const body = (
		<div className={classes.modal}>
			<form className={classes.form} onSubmit={handleFormSubmit}>
				<InputLabel id="categoryList">Choose a Category</InputLabel>
				<Select
					className="modalInput"
					id="categories"
					labelId="categoryList"
					name="category"
					onChange={handleChange}
				>
					{categories.map(category => (
						<MenuItem key={category} value={category}>
							{category}
						</MenuItem>
					))}
				</Select>
				<br></br>
				<Input
					className="modalInput"
					type="number"
					id="cost"
					name="cost"
					placeholder="Cost"
					onChange={handleChange}
				/>
				<br></br>
				<Input
					className="modalInput"
					id="comment"
					name="comment"
					placeholder="Comment"
					onChange={handleChange}
				/>
				<br></br>
				<button className="submitBtn" type="submit">
					Add Expense
				</button>
			</form>
		</div>
	);

	const editBody = (
		<div className={classes.modal}>
			<p> Edit Expense </p>
			<form className={classes.form} onSubmit={handleEditSubmit}>
				<InputLabel id="categoryList">Choose a Category</InputLabel>
				<Select
					className="modalInput"
					id="categories"
					labelId="categoryList"
					name="category"
					onChange={handleChange}
				>
					{categories.map(category => (
						<MenuItem key={category} value={category}>
							{category}
						</MenuItem>
					))}
				</Select>
				<br></br>
				<Input
					className="modalInput"
					type="number"
					id="cost"
					name="cost"
					placeholder="Cost"
					onChange={handleChange}
				/>
				<br></br>
				<Input
					className="modalInput"
					id="comment"
					name="comment"
					placeholder="Comment"
					onChange={handleChange}
				/>
				<br></br>
				<button className="submitBtn" type="submit">
					Update Expense
				</button>
			</form>
		</div>
	);

	return (
		<div className="roadtripCard">
			<h4>Expenses</h4>
			<DoughnutChart data={individualExpense} labels={users} />

			<Grid container>
				{expenses &&
					expenses.map(expense => (
						<div key={expense._id}>
							<Grid className="gridItem" item xs={12} sm={4}>
								<Paper className={classes.paper}>
									<p>User: {expense.username}</p>
									<br></br>
									<p>Cost: ${expense.cost}</p>
									<br></br>
									<p>Category: {expense.category}</p>
									<br></br>
									<p>Comment: {expense.comment}</p>
									<br></br>
									<button
										id={expense._id}
										onClick={() => handleEditOpen(expense._id)}
										className="smallBtn"
									>
										Edit
									</button>
									<Modal
										open={editOpen}
										onClose={handleEditClose}
										className={classes.modalParent}
										aria-labelledby="simple-modal-title"
										aria-describedby="simple-modal-description"
									>
										{editBody}
									</Modal>
									<button
										id={expense._id}
										onClick={handleDelete}
										className="smallBtn"
									>
										Delete
									</button>
								</Paper>
							</Grid>
						</div>
					))}
			</Grid>

			<button type="button" onClick={handleOpen} className="submitBtn">
				Add Expense
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				className={classes.modalParent}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
};

export default Expenses;
