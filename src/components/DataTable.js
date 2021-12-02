import React from "react";
import axios from "axios";

import "./datatable.css";

import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const DataTable = () => {
	const [product, setProduct] = useState([]);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const getApi = async () => {
		try {
			const data = await axios.get(
				"https://staging-backend.esyms-api.com/esyms/website/product/front-condition?categoryId=&name=%20"
			);
			console.log(data.data.results);
			setProduct(data.data.results.docs);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getApi();
	}, []);

	return (
		<div>
			<h1>DATA TABLE</h1>
			<div>
				<input
					className="data"
					type="text"
					placeholder="Search here"
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</div>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell>Product Price</StyledTableCell>
							<StyledTableCell>Product ID</StyledTableCell>
							<StyledTableCell>Special Price</StyledTableCell>
							<StyledTableCell>Rating</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{product
							.filter((item) => {
								if (search == "") {
									return item;
								} else if (
									item.price.toString().includes(search.toLocaleLowerCase())
								) {
									return item;
								}
							})
							.map((item) => {
								return (
									<StyledTableRow>
										<StyledTableCell component="th" scope="row">
											{item._id}
										</StyledTableCell>
										<StyledTableCell>{item.price}</StyledTableCell>
										<StyledTableCell>{item.productId}</StyledTableCell>
										<StyledTableCell>{item.specialPrice}</StyledTableCell>
										<StyledTableCell>{item.rating}</StyledTableCell>
									</StyledTableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default DataTable;
