import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const SFormRow = styled.div`
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

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const {register, handleSubmit,reset, getValues, formState} = useForm(); // react-hook-form
  const {errors} = formState // get the errors from the form
  const queryClient = useQueryClient(); // Get the isntance of the queryClient to re render whenever whe create a new cabin 
  const {mutate,isLoading} = useMutation({ //Create a mutation to create a new cabin
    mutationFn: createCabin,
    onSuccess: ()=> {
      toast.success("New cabin successfully created")
      queryClient.invalidateQueries({queryKey:["cabin"]}) // invalidateQueries trigger a new render and updated the ui
      reset();
    },
    onError: (error)=> toast.error(error.message)
  })
  function onSubmit(data) { //the react hook form will pass an argument with all the data input inside the function

    mutate(data)
  }
  function onError(errors) {

  }
  //1) The first step that we follow is to register all the form inputs
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError )}> {/** we can pass two fn to the handleSubmit, the onSubmit handler  and the handleError */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name",
          {
            required:"This field is required", 
            min:{ value:1, message:"Capacity should be at least one"}
          } //Validating all the inputs with the hook form
        )} />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.max_capacity?.message}>
        <Input type="number" id="max_capacity" {...register("max_capacity",{required:"This field is required"})}  />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input type="number" id="regular_price" {...register("regular_price",{required:"This field is required"})}  />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount",
          {
            required:"This field is required",
            validate: (value) => value <= getValues().regular_price || "Discount should be less than the regular price", 
            /** WE can write our own validate fns, if the condition isnt true will trigger the message error */
          
          })}   />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description",{required:"This field is required"})}  />
      </FormRow>

      <SFormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" type="file" {...register("image",{required:"This field is required"})}  />
      </SFormRow>

      <SFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">{/*type="reset"  resets the form but it will not work as a suibmit bnutton */}
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </SFormRow>
    </Form>
  );
}

export default CreateCabinForm;
