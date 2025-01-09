import { IconButton as MUIIconButton } from "@mui/material";

interface IconButtonProps {
	onClick: () => void;
	icon: string;
	color?: string;
	size?: string;
	className?: string;
}

export const IconButton = ({
	onClick,
	icon,
	color,
	size,
	className,
}: IconButtonProps) => {
	return (
		<div className={`${className ? " " + className : ""}`}>
			<MUIIconButton onClick={onClick} style={{ aspectRatio: 1 / 1 }}>
				<span
					className={`material-symbols-outlined ${color} aspect-square ${size}`}
				>
					{icon}
				</span>
			</MUIIconButton>
		</div>
	);
};
