function getOrdinalSuffix(day: number): string {
	return day % 10 === 1 && day !== 11
		? "st"
		: day % 10 === 2 && day !== 12
		? "nd"
		: day % 10 === 3 && day !== 13
		? "rd"
		: "th";
}

export const getFriendlyDate = (date: string) => {
	const parsedDate = new Date(date);

	const day = parsedDate.getDate();
	const ordinal = getOrdinalSuffix(day);
	const month = parsedDate.toLocaleString("default", { month: "short" });
	const year = parsedDate.getFullYear();

	return `${day}${ordinal} ${month} ${year}`;
};

export const getFriendlyDateRange = (startDate: string, endDate: string) => {
	return `${getFriendlyDate(startDate)} - ${getFriendlyDate(endDate)}`;
};

export const getTimeAgo = (date: string) => {
	const parsedDate = new Date(date);
	const now = new Date();
	const diff = now.getTime() - parsedDate.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days < 30) {
		return `${days} day${days !== 1 ? "s" : ""} ago`;
	}

	const months = Math.floor(days / 30);

	if (months < 12) {
		return `${months} month${months !== 1 ? "s" : ""} ago`;
	}

	const years = Math.floor(months / 12);

	return `${years} year${years !== 1 ? "s" : ""} ago`;
};
