import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
	label: string;
	loading?: boolean;
	onClick?: () => void;
	endIcon?: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
}

export const Button = ({
	label,
	loading,
	onClick,
	endIcon,
	type,
}: ButtonProps) => {
	return (
		<MUIButton
			variant="contained"
			loading={loading}
			onClick={onClick}
			endIcon={endIcon}
			type={type}
			sx={{ textTransform: "none" }}
		>
			<span className="leading-none font-normal">{label}</span>
		</MUIButton>
	);
};
