import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp  from "../authentication/useSignUp.js"
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register, formState,getValues, handleSubmit,reset } = useForm();
  const {errors} = formState
 const {signUp,isLoading} =  useSignUp()
  function onSubmit ({fullName, email,password}){
    signUp({fullName,email,password}, {
      onSettled:() => reset(),
    } )
  }
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input disabled={isLoading} type="text" id="fullName" {...register("fullName",{required:"This field is required"})}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input disabled={isLoading} type="email" id="email" {...register("email",{required:"This field is required", pattern:{value: /\S+@\S+\.\S+/, message:"Please provide a valid email address"}})} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input disabled={isLoading} type="password" id="password"  {...register("password",{required:"This field is required", minLength:{value:8, message:"The password must be at least 8 characters long"}})} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input disabled={isLoading} type="password" id="passwordConfirm"  {...register("passwordConfirm",{required:"This field is required", validate:(value)=> value === getValues().password || "Passwords needs to match" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={reset} disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button  disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
