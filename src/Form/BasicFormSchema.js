import * as Yup from "yup";

const BasicFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "минимальная длина - 2 символа")
        .required("Required"),
    vendor: Yup.string()
        .min(2, "минимальная длина - 2 символа")
        .required("Required"),
    pack: Yup.number()
        .required("Required"),
    price: Yup.string()
        .min(2, "минимальная длина - 2 символа")
        .required("Required")
});

export default BasicFormSchema;