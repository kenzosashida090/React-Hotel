import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm(newSettings) {
  const {isLoading, error, settings:{min_book_length, max_book_length, max_guest_per_booking,breakfast_price }= {}} = useSettings(); // we se the settings with a default value to avoid the error of undefined while is fetching the settings data
  const {isEditing, updateSettings} = useUpdateSettings()
  if(isLoading ) return <Spinner/>
  function handleUpdate (e, fieldName){
    const {value} = e.target.value
    if(!value) return
    updateSettings({[fieldName]: value})
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={min_book_length} disabled={isEditing} onBlur={e=>handleUpdate(e,'min_book_length')}  />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={max_book_length} disabled={isEditing} onBlur={e=>handleUpdate(e,'max_book_length')}   />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={max_guest_per_booking} disabled={isEditing} onBlur={e=>handleUpdate(e,'max_guest_per_booking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfast_price} disabled={isEditing} onBlur={e=>handleUpdate(e,'breakfast_price')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
