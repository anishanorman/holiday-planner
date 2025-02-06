import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
	label: string;
	loading?: boolean;
	onClick?: () => void;
	endIcon?: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
	color?:
		| "inherit"
		| "primary"
		| "secondary"
		| "success"
		| "error"
		| "info"
		| "warning";
	fullWidth?: boolean;
	variant?: "contained" | "outlined" | "text";
	className?: string;
}

export const Button = ({
	label,
	loading,
	onClick,
	endIcon,
	type,
	color,
	fullWidth,
	variant,
	className
}: ButtonProps) => {
	return (
		<MUIButton
			variant={variant || "contained"}
			loading={loading}
			onClick={onClick}
			endIcon={endIcon}
			type={type}
			color={color}
			fullWidth={fullWidth}
			className={className}
			sx={{ textTransform: "none" }}
		>
			<span className="leading-none font-normal">{label}</span>
		</MUIButton>
	);
};
