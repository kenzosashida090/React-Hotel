import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {
  let { data:cabins, error } = await supabase.from('cabins').select('*');
  if(error) {
    console.log(error)

    throw new Error("Cabins could not be loaded")
  }
  return cabins
}

export async function deleteCabin(id) {
  const {data,error} = await supabase.from("cabins").delete().eq("id",id)
  if(error){
    throw new Error("Cabin could not be deleted")
  }

  return data
}


export async function createEditCabin(newCabin, id){

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);   //Verify if whe are updating a cabin, if the image starts with the same url of the image 

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/",""); //unique file name, if there is an "\" supabase will detect this and create a folder so we need to replace it
  //Create image PATH
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  //1. Create cabin and specifie the path of the url image
  let query = supabase.from("cabins") // common tecnique to separate  between creating or editing a cabin

  if(!id) { // if there is no id that means that we want to create a cabin
    query = query.insert([{...newCabin, image: imagePath}]) // to apply the imagePath into the newCabin Object, to return the actual data of that row we use .select().single()
  }
  //A) If we want to edit
  if(id) {
    query = query.update({...newCabin, image:imagePath}).eq("id",id)
  }
  const {data, error} = await query.select().single();
  if(error){
    throw new Error("Cabin could not be created")
  }
  //2. Upload image, bucket
  if (hasImagePath) return data
  const {error: imageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)

  //3. Delete the cabin if there is an error with the uploading image
  if (imageError) {
    await supabase.from("cabins").delete().eq("id",data.id)
    throw new Error("Cabin image could not be uploaded and the cabin was not created")
  }
  return data
}