import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { postHoliday } from "../../api/HolidayService";
import { Image } from "../../utils/types";
import { DateField } from "./fields/DateField";
import { ImageField } from "./fields/ImageField";
import { TextField } from "./fields/TextField";
import { validate } from "./validate";

export interface NewHolidayFormValues {
	title: string;
	startDate: string;
	endDate: string;
	imageQuery: string;
	selectedImage: Image;
}

export const NewHolidayForm = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center bg-white px-16 py-10 rounded-lg shadow-lg">
			<h2 className="text-2xl font-medium mb-4">Create new holiday</h2>
			<Formik<NewHolidayFormValues>
				initialValues={{
					title: "",
					startDate: "",
					endDate: "",
					imageQuery: "",
					selectedImage: {
						photographer: "Nubia Navarro (nubikini)",
						photographerUrl: "https://www.pexels.com/@nubikini",
						src: "https://images.pexels.com/photos/386000/pexels-photo-386000.jpeg?auto=compress&cs=tinysrgb&h=350",
						alt: "A toy van on a sandy beach evokes summer travel and vacation vibes.",
					},
				}}
				validate={validate}
				validateOnChange={false}
				validateOnBlur={false}
				validateOnMount={false}
				onSubmit={(values) => {
					postHoliday(values).then((response) => {
						navigate(`/holidays/${response.id}`);
					});
				}}
			>
				{({ values, setFieldValue, touched, errors, setFieldError }) => (
					<Form className="flex flex-col gap-6 items-center">
						<div className="flex flex-col gap-6 w-full">
							<div>
								<TextField
									name="title"
									label="Title"
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title ? errors.title : ""}
									onFocus={() => setFieldError("title", "")}
								/>
							</div>

							<div className="flex items-center">
								<DateField name="startDate" label="Start Date" />
								<p className="mx-8">to</p>
								<DateField name="endDate" label="End Date" />
							</div>
						</div>

						<ImageField
							name="image"
							values={values}
							setFieldValue={setFieldValue}
						/>

						<button
							type="submit"
							className="bg-cyan-600 text-white px-10 py-1 rounded-full hover:bg-cyan-700"
						>
							Create!
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
