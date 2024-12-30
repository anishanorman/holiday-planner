import { useState } from "react";
import { useNavigate } from "react-router";
import { getFriendlyDateRange, getTimeAgo } from "../../utils/dates";
import { Holiday } from "../../utils/types";

export const HolidayCard = ({ holiday }: { holiday: Holiday }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const navigate = useNavigate();

    const dateRange = getFriendlyDateRange(holiday.startDate, holiday.endDate);

    const handleCardClick = () => {
        navigate(`/holidays/${holiday.id}`);
    };

    const showEditButton = isHovered ? "block" : "hidden";

    return (
        <div
            className="w-96 shadow-lg rounded bg-gray-100 hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={holiday.image.url}
                alt={holiday.image.alt}
                className="h-52 w-full object-top object-cover aspect-auto rounded-t"
            />
            <div className="p-4 relative">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 my-2">{dateRange}</p>
                    <a
                        href={`/holidays/edit/${holiday.id}`}
                        className={`text-gray-500 ${showEditButton} hover:scale-[1.2] transition-transform`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-lg material-icons">edit</span>
                    </a>
                </div>

                <h3 className="text-xl font-bold mb-2">{holiday.title}</h3>

                <p>
                    {holiday.numberOfCities}{" "}
                    {holiday.numberOfCities > 1 ? "locations" : "location"}
                </p>

                <div className="mt-4 flex gap-6"></div>
                <p className="text-sm text-gray-400">
                    Last edited {getTimeAgo(holiday.lastEdited)}
                </p>
            </div>
        </div>
    );
};
