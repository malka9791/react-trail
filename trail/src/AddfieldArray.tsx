import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { TextField } from "@mui/material";
import { useState } from "react";
type FormValues = {
  Adress: {
    city: string;
    streetName: string;
    streetNumber: number;
  }[];
};

const schema = yup.object().shape({
  //     name: yup.string().required("Name is required"),
  //     phone: yup.string().min(9, "Phone number must be at least 9 numbers"),
  //     email: yup.string().email("Invalid email format").required("Email is required"),
  //     adress: yup.object().shape({
  Adress: yup.array().of(
    yup.object().shape({
      city: yup.string().required("City is required"),
      streetName: yup.string().required("Street name is required"),
      streetNumber: yup.number().positive("Street number must be positive"),
      //   }),
    })
  ),
});

export default function AddUser() {
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [email, SetEmail] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Adress: [
        {
          city: "",
          streetName: "",
          streetNumber: 1,
        },
      ],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "Adress",
    control,
  });
  const onSubmit = (data: FormValues | any) => console.log(data);

  return (
    <div>
      <TextField
        placeholder="name"
        label="press name"
        value={name}
        onChange={({ target }) => SetName(target.value)}
      />
      <TextField
        placeholder="phone"
        label="press phone"
        value={phone}
        onChange={({ target }) => SetPhone(target.value)}
      />
      <TextField
        placeholder="email"
        label="press email"
        value={email}
        onChange={({ target }) => SetEmail(target.value)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>adress: </label>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <TextField
                  placeholder="city"
                  type="string"
                  label="press city"
                  {...register(`Adress.${index}.city` as const, {
                    required: true,
                  })}
                  className={errors?.Adress?.[index]?.city ? "error" : ""}
                />
                <p>{errors?.Adress?.[index]?.city?.message}</p>

                <TextField
                  placeholder="streetName"
                  type="string"
                  label="press streetname"
                  {...register(`Adress.${index}.streetName` as const, {
                    required: true,
                  })}
                  className={errors?.Adress?.[index]?.streetName ? "error" : ""}
                />
                <p>{errors?.Adress?.[index]?.streetName?.message}</p>

                <TextField
                  placeholder="streetNumber"
                  type="number"
                  label="enter your streetNumber adress"
                  {...register(`Adress.${index}.streetNumber` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={
                    errors?.Adress?.[index]?.streetNumber ? "error" : ""
                  }
                />
                <p>{errors?.Adress?.[index]?.streetNumber?.message}</p>

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
              city: "",
              streetName: "",
              streetNumber: 1,
            })
          }
        >
          APPEND
        </button>
        <input className="submit" type="submit" value="Send" />
      </form>
    </div>
  );
}
