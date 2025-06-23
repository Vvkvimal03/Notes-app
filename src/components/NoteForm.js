import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { 
  TextField, 
  Button, 
  Box,
  InputAdornment
} from "@mui/material";
import { 
  Title as TitleIcon,
  Description as DescriptionIcon,
  DateRange as DateIcon,
 

} from "@mui/material";
import { Save } from "@mui/icons-material";

const validationSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  date: yup
    .string()
    .required("Date is required"),
});

const NoteForm = ({ onSubmit, initial, onCancel }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0]
    }
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title || "",
        description: initial.description || "",
        date: initial.date || new Date().toISOString().split('T')[0]
      });
    } else {
      reset({
        title: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initial, reset]);

  const handleFormSubmit = (data) => {
    const noteData = {
      ...data,
      ...(initial && { id: initial.id })
    };
    onSubmit(noteData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Note Title"
            error={!!errors.title}
            helperText={errors.title?.message}
            className="bg-gray-50/50 rounded-lg"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <TitleIcon className="text-gray-400" />
            //     </InputAdornment>
            //   ),
            //   className: "rounded-lg",
            // }}
            slotProps={{
              input: {
                className: "focus:border-teal-500 hover:border-teal-400 border-gray-300"
              }
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            multiline
            rows={4}
            label="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
            className="bg-gray-50/50 rounded-lg"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start" className="self-start mt-4">
            //       <DescriptionIcon className="text-gray-400" />
            //     </InputAdornment>
            //   ),
            //   className: "rounded-lg",
            // }}
            slotProps={{
              input: {
                className: "focus:border-teal-500 hover:border-teal-400 border-gray-300"
              }
            }}
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="date"
            label="Date"
            error={!!errors.date}
            helperText={errors.date?.message}
            className="bg-gray-50/50 rounded-lg"
            InputLabelProps={{ shrink: true }}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <DateIcon className="text-gray-400" />
            //     </InputAdornment>
            //   ),
            //   className: "rounded-lg",
            // }}
            slotProps={{
              input: {
                className: "focus:border-teal-500 hover:border-teal-400 border-gray-300"
              }
            }}
          />
        )}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 normal-case px-6"
        >
          {/* <CancelIcon className="mr-2" /> */}
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:transform-none disabled:opacity-50 normal-case px-6"
        >
          <Save className="mr-2" />
          {initial ? "Update Note" : "Create Note"}
        </Button>
      </div>
    </Box>
  );
};

export default NoteForm;
