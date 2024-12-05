import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import * as yup from "yup"
import { TextField } from "@mui/material";
type FormValues={
  User: {
    name: string;
    phone: string;
    email: string;
    adress: {
      city: string;
      streetName: string;
      streetNumber: number;
    };
  }[];
};

const schema = yup.object().shape({
  User: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required"),
      phone: yup.string().min(9, "Phone number must be at least 9 numbers"),
      email: yup.string().email("Invalid email format").required("Email is required"),
      adress: yup.object().shape({
        city: yup.string().required("City is required"),
        streetName: yup.string().required("Street name is required"),
        streetNumber: yup.number().positive("Street number must be positive"),
      }),
    })
  ),
});



export default function AddUser() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      User: [
        {
          name: "",
          phone: "",
          email: "",
          adress: { city: "", streetName: "", streetNumber: 1 },
        },
      ],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "User",
    control,
  });
  const onSubmit = (data: FormValues|any) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <TextField
                  placeholder="name"
                  label="press name"
                  {...register(`User.${index}.name` as const,
                    {  

                    required: true,
                  })}
                  className={errors?.User?.[index]?.name ? "error" : ""} 

                />
                <p>{errors?.User?.[index]?.name?.message}</p>

                <TextField
                  placeholder="phone"
                  type="string"
                 label="press phone"

                  {...register(`User.${index}.phone` as const, {
                    required: true,
                  })}
                  className={errors?.User?.[index]?.phone ? "error" : ""}
                />
                <p>{errors?.User?.[index]?.phone?.message}</p>

                <TextField
                  placeholder="email"
                  type="string"
                  label="press email"
                  {...register(`User.${index}.email` as const, {
                    required: true,
                  })}
                  className={errors?.User?.[index]?.email ? "error" : ""}
                />
                <p>{errors?.User?.[index]?.email?.message}</p>

                <label>adress: </label>
                <TextField
                  placeholder="city"
                  type="string"
                  label="press city"
                  {...register(`User.${index}.adress.city` as const, {
                    required: true,
                  })}
                  className={errors?.User?.[index]?.adress?.city ? "error" : ""}
                />
                <p>{errors?.User?.[index]?.adress?.city?.message}</p>

                <TextField
                  placeholder="streetName"
                  type="string"
                  label="press streetname"
                  {...register(`User.${index}.adress.streetName` as const, {
                    required: true,
                  })}
                  className={
                    errors?.User?.[index]?.adress?.streetName ? "error" : ""
                  }
                />
                 <p>{errors?.User?.[index]?.adress?.streetName?.message}</p>

                <TextField
                  placeholder="streetNumber"
                  type="number"
                  label="enter your streetNumber adress"
                  {...register(`User.${index}.adress.streetNumber` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={
                    errors?.User?.[index]?.adress?.streetNumber ? "error" : ""
                  }
                />
                <p>{errors?.User?.[index]?.adress?.streetNumber?.message}</p>

                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

        {/* <Total control={control} /> */}

        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              phone: "",
              email: "",
              adress: {
                city: "",
                streetName: "",
                streetNumber:1
              },
            })
          }
        >
          APPEND
        </button>
        <input  className="submit" type="submit" value="Send" />
      </form>
    </div>
  );
}
