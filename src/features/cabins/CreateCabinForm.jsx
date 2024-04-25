/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";

const RFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;


function CreateCabinForm({cabinToEdit ={}}) {
  const {id:editId, ...editValues} = cabinToEdit // to rename a single propetie we spread the entire cabinToEdit object and the we spread the value that we want to rename
  const isEditSession = Boolean(editId) // We create this constant to cerify if we want to edit a cabin or create a form this will return a boolean value
  const {register, handleSubmit,reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {}, // if we want to update a cabin we pass the default values of the cabin that we cant too edit
  }); // react-hook-form
  console.log("cabin to edit",cabinToEdit)
  const {errors} = formState // get the errors from the form
  const queryClient = useQueryClient(); // Get the isntance of the queryClient to re render whenever whe create a new cabin 
  const {mutate:createCabin,isLoading: isCreating} = useMutation({ //Create a mutation to create a new cabin
    mutationFn: createEditCabin,
    onSuccess: ()=> {
      toast.success("New cabin successfully created")
      queryClient.invalidateQueries({queryKey:["cabin"]}) // invalidateQueries trigger a new render and updated the ui
      reset();
    },
    onError: (error)=> toast.error(error.message)
  })
  const {mutate:editCabin,isLoading: isEditing} = useMutation({ //Create a mutation to create a new cabin
    mutationFn: ({newCabin,id})=>createEditCabin(newCabin,id), // to accept more than one argument unlike the createCabin
    onSuccess: ()=> {
      toast.success("Cabin successfully edited")
      queryClient.invalidateQueries({queryKey:["cabin"]}) // invalidateQueries trigger a new render and updated the ui
      reset();
    },
    onError: (error)=> toast.error(error.message)
  })
  const isWorking = isCreating || isEditing
  function onSubmit(data) { //the react hook form will pass an argument with all the data input inside the function
    const image = typeof data.image === "string" ? data.image : data.image[0] // making sure that we return a string on the image file
    //mutate(data) 
    //console.log("holaa",data) //to handle the image file we spread out the object and select the file on the object
    if(isEditSession) editCabin({newCabin:{...data,image},id:editId })
    else createCabin({...data, image:data.image[0]}) //to handle the image file we spread out the object and select the file on the object

  }
  function onError(errors) {

  }
  //1) The first step that we follow is to register all the form inputs
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError )}> {/** we can pass two fn to the handleSubmit, the onSubmit handler  and the handleError */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register("name",
          {
            required:"This field is required", 
            min:{ value:1, message:"Capacity should be at least one"}
          } //Validating all the inputs with the hook form
        )} />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.max_capacity?.message}>
        <Input disabled={isWorking} type="number" id="max_capacity" {...register("max_capacity",{required:"This field is required"})}  />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input disabled={isWorking} type="number" id="regular_price" {...register("regular_price",{required:"This field is required"})}  />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register("discount",
          {
            required:"This field is required",
            validate: (value) => value <= getValues().regular_price || "Discount should be less than the regular price", 
            /** WE can write our own validate fns, if the condition isnt true will trigger the message error */
          
          })}   />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register("description",{required:"This field is required"})}  />
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
       
        <FileInput disabled={isWorking} id="image" accept="image/*" {...register("image",{required: isEditSession ? false : "This field is required"})}  />
      </FormRow>

      <RFormRow label="button">
        {/* type is an HTML attribute! */}
        <Button disabled={isWorking}  variation="secondary" type="reset">{/*type="reset"  resets the form but it will not work as a suibmit bnutton */}
          Cancel
        </Button>
        <Button disabled={isWorking}>{ isEditSession ? "Edit Cabin" : "Add cabin"  }</Button>
      </RFormRow>
    </Form>
  );
}

export default CreateCabinForm;
