import React from "react";
import Slider from "react-slick";
import { Button, Box } from "@mui/material";

const QuickAddCarousel: React.FC = () => {
	const profiles = [
		{ id: 1, image: "https://picsum.photos/200", name: "John Doe" },
		{ id: 2, image: "https://picsum.photos/200", name: "Jane Smith" },
		{ id: 3, image: "https://picsum.photos/200", name: "Emily Brown" },
		{ id: 1, image: "https://picsum.photos/200", name: "John Doe" },
		{ id: 2, image: "https://picsum.photos/200", name: "Jane Smith" },
		{ id: 3, image: "https://picsum.photos/200", name: "Emily Brown" },
	];

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};

	return (
		<Box sx={{ width: "90%", margin: ".5rem auto" }}>
			<Slider {...settings}>
				{profiles.map((profile) => (
					<Box
						key={profile.id}
						sx={{
							padding: ".5rem",
							textAlign: "center",
						}}
					>
						<img
							src={profile.image}
							alt={profile.name}
							style={{
								width: "100px",
								height: "100px",
								margin: "0 auto",
							}}
						/>
						<p>{profile.name}</p>
						<Button variant="contained">Add</Button>
					</Box>
				))}
			</Slider>
		</Box>
	);
};

export default QuickAddCarousel;
