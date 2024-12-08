import React, { useMemo } from "react";
import Slider from "react-slick";
import { Button, Box, useMediaQuery, useTheme } from "@mui/material";

interface QuickAddProps {
	onAddFriend: () => void;
}
const QuickAddCarousel: React.FC<QuickAddProps> = ({ onAddFriend }) => {
	const theme = useTheme();
	const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
	const isLgScreen = useMediaQuery(theme.breakpoints.up("md"));

	const { slidesToShow, slidesToScroll } = useMemo(() => {
		if (isLgScreen) {
			return { slidesToShow: 7, slidesToScroll: 6 };
		} else if (isMdScreen) {
			return { slidesToShow: 5, slidesToScroll: 4 };
		} else {
			return { slidesToShow: 3, slidesToScroll: 1 };
		}
	}, [isLgScreen, isMdScreen]);

	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow,
		slidesToScroll,
	};

	const handleAddFriend = () => {
		if (onAddFriend) onAddFriend();
	};

	const profiles = [
		{ id: 1, image: "https://picsum.photos/200", name: "John Doe" },
		{ id: 2, image: "https://picsum.photos/200", name: "Jane Doe" },
		{ id: 3, image: "https://picsum.photos/200", name: "Alexis Karkut" },
		{ id: 1, image: "https://picsum.photos/200", name: "Lil Man" },
		{ id: 2, image: "https://picsum.photos/200", name: "Woman" },
		{ id: 3, image: "https://picsum.photos/200", name: "Emily Brown" },
	];

	return (
		<Box sx={{ width: "90%", margin: "0 auto" }}>
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
						<Button onClick={handleAddFriend} variant="contained">
							Add
						</Button>
					</Box>
				))}
			</Slider>
		</Box>
	);
};

export default QuickAddCarousel;
