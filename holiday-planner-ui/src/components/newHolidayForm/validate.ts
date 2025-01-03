import { NewHolidayFormValues } from "./NewHolidayForm";


export const validate = (values: NewHolidayFormValues) => {
    const errors: { [key: string]: string } = {};

    if (!values.title) errors.title = "Title is required";
    if (!values.startDate) errors.startDate = "Start date is required";
    if (!values.endDate) errors.endDate = "End date is required";
    if (!values.selectedImage) errors.selectedImage = "Image selection is required";

    const startDate = values.startDate ? new Date(values.startDate) : null;
    const endDate = values.endDate ? new Date(values.endDate) : null;

    if (startDate && isNaN(startDate.getTime())) {
        errors.startDate = "Start date is not a valid date";
    }

    if (endDate && isNaN(endDate.getTime())) {
        errors.endDate = "End date is not a valid date";
    }

    if (startDate && endDate && startDate > endDate) {
        errors.endDate = "End date must be after start date";
    }

    return errors;
};
