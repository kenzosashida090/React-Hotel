import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {
  const {isLoading, error, settings:{min_book_length, max_book_length, max_guest_per_booking,breakfast_price }= {}} = useSettings(); // we se the settings with a default value to avoid the error of undefined while is fetching the settings data
  if(isLoading) return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={min_book_length}  />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={max_book_length}   />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={max_guest_per_booking}   />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfast_price}   />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
