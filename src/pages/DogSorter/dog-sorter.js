import { useEffect, useState } from "react";
import React from "react";
import moment from "moment";
import "antd/dist/antd.css";
import { Table, Button, Space, Card, Row, Col } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import "./style.css";

const data = [
	{
		id: "1",
		name: "Russell",
		breed: "Jack Russell",
		dateOfBirth: "2008-07-14",
		value: 200,
		isFavorite: false,
		colour: ["Seashell"],
		photo:
			"https://res.cloudinary.com/stitch-group/image/upload/v1559561175/dogs/russell.png",
	},
	{
		id: "2",
		name: "Nathan",
		breed: "Labrador",
		dateOfBirth: "2014-06-10",
		value: 120,
		isFavorite: false,
		colour: ["BurlyWood"],
		photo:
			"https://res.cloudinary.com/stitch-group/image/upload/v1559561851/dogs/nathan.png",
	},
	{
		id: "3",
		name: "Rover",
		breed: "Labrador",
		dateOfBirth: "2016-08-25",
		value: 220,
		isFavorite: false,
		colour: ["SaddleBrown"],
		photo:
			"https://res.cloudinary.com/stitch-group/image/upload/v1559561850/dogs/rover.png",
	},
	{
		id: "4",
		name: "George",
		breed: "Dachshund",
		dateOfBirth: "2018-11-14",
		value: 320,
		isFavorite: false,
		colour: ["Black", "Sienna"],
		photo:
			"https://res.cloudinary.com/stitch-group/image/upload/v1559561852/dogs/george.png",
	},
	{
		id: "5",
		name: "Walt",
		breed: "Greyhound",
		dateOfBirth: "2014-07-14",
		value: 70,
		isFavorite: false,
		colour: ["Silver", "Snow"],
		photo:
			"https://res.cloudinary.com/stitch-group/image/upload/v1559561852/dogs/walt.png",
	},
];


function DogSorter() {
	const [sortedInfo, setSortedInfo] = useState({});
	const [breed, setBreedCount] = useState(0);
	const [dogs, setDogs] = useState(data);

	useEffect(() => {
		const breedNumbers = [...new Set(data.map((item) => item.breed))];
		setBreedCount(breedNumbers);
	}, []);


  const columns = [
		{
			title: "Photo",
			dataIndex: "photo",
			key: "photo",
			width: "140px",
			align: "center",
			render: (text) => (
				<img src={text} width="100px" height="100px" alt="dog"></img>
			),
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			sorter: (a, b) => a.name.length - b.name.length,
			sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
			ellipsis: true,
		},
		{
			title: "Breed",
			dataIndex: "breed",
			key: "breed",
			sorter: (a, b) => a.breed.length - b.breed.length,
			sortOrder: sortedInfo.columnKey === "breed" && sortedInfo.order,
			ellipsis: true,
		},
		{
			title: "Colour",
			dataIndex: "colour",
			key: "colour",
			render: (text) => getColourBlock(text),
		},
		{
			title: "Age",
			dataIndex: "dateOfBirth",
			key: "dateOfBirth",
			sorter: (a, b) => moment().diff(moment(a.dateOfBirth, 'YYYY/M/D'), 'years') - moment().diff(moment(b.dateOfBirth, 'YYYY/M/D'), 'years'),
			sortOrder: sortedInfo.columnKey === "dateOfBirth" && sortedInfo.order,
			ellipsis: true,
			render: (text) => moment().diff(moment(text, 'YYYY/M/D'), 'years') + 'years',
		},
		{
			title: "Value",
			dataIndex: "value",
			key: "value",
			sorter: (a, b) => a.value - b.value,
			sortOrder: sortedInfo.columnKey === "value" && sortedInfo.order,
			ellipsis: true,
			render: (text) => `£${text}`,
		},
		{
			title: "Favorite",
			dataIndex: "isFavorite",
			key: "isFavorite",
			render: (text, record) =>
				text ? (
					<Button
						type="text"
						icon={
							<StarFilled
								style={{
									fontSize: "30px",
									color: "#F2C14A",
									backgroundColor: "F2C14A",
								}}
							/>
						}
						onClick={() => handleClick(record)}
					/>
				) : (
					<Button
						type="text"
						icon={
							<StarOutlined
								style={{
									fontSize: "30px",
									color: "#F2C14A",
									backgroundColor: "F2C14A",
								}}
							/>
						}
						onClick={() => handleClick(record)}
					/>
				),
		},
	];

	
	function handleClick(record) {
		const newDogs = dogs.map((dog) => {
			if (dog.id === record.id) {
				return {
					...dog,
					isFavorite: !record.isFavorite,
				};
			}
			return dog;
		});
		setDogs(newDogs);
	}


	function getColourBlock(colourName) {
		const colourList = colourName
			.map((a) => {
				if (colourName.length > 1) {
					return `${a} 50%`;
				}
				return a;
			})
			.join(",");
		console.log("colourList", colourList);
		return (
			<div
				style={{
					height: "100px",
					width: "100px",
					backgroundImage:
						colourName.length > 1
							? `-webkit-linear-gradient(135deg, ${colourList})`
							: "",
					backgroundColor: colourName.length > 1 ? "" : `${colourList}`,
				}}
			></div>
		);
	}

	
	function sortDogs() {
    console.log('sortedInfo',sortedInfo.order)
		setSortedInfo({ order: sortedInfo.order === 'descend' ? 'ascend' : 'descend', columnKey: "name" });
		return null;
	}


	function handleChange(pagination, filters, sorter) {
		setSortedInfo(sorter);
		return null;
	}

	return (
		<>
			<h4 className="title">Dog Sorter</h4>
			<Space style={{ marginBottom: 16 }}>
				<Button onClick={() => sortDogs()} className="btnBlock">
					Sort Dogs
				</Button>
			</Space>
			<Table
				columns={columns}
				dataSource={dogs}
				onChange={handleChange}
				pagination={false}
				bordered
				className="tableBlock"
			/>
			<Card
				size="small"
				title={<strong>Dogs Stats</strong>}
				style={{ width: "100%", marginBottom: "10px" , textAlign:'left'}}
				bordered
				className="cardBlock"
			>
				<Row>
					<Col span={3}>
						<Row className="numberBlock">
							<h4>{data.length}</h4>
						</Row>
						<Row className="numberBlock">
							<h4>TOTAL DOGS</h4>
						</Row>
					</Col>
					<Col span={3}>
						<Row className="numberBlock">
							<h4>{breed.length}</h4>
						</Row>
						<Row className="numberBlock">
							<h4>TOTAL BREADS</h4>
						</Row>
					</Col>
					<Col span={3}>
						<Row className="numberBlock">
							<h4>£{dogs.reduce((total, next) => total + next.value, 0)/dogs.length}</h4>
						</Row>
						<Row className="numberBlock">
							<h4>AVERAGE VALUE</h4>
						</Row>
					</Col>
					<Col span={3}>
						<Row className="numberBlock">
							<h4>{dogs.filter(dog=>dog.isFavorite).length}</h4>
						</Row>
						<Row className="numberBlock">
							<h4>FAVORITES</h4>
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	);
}

export default DogSorter;
