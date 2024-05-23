import supabase, { supabaseUrl } from "./supabase"

export async function signUp ({fullName:full_name, email, password }) {

  const {data,error} = await supabase.auth.signUp({email,password, options:{
    data: {
      full_name,
      avatar:""
    },
  }})
  if(error) throw new Error(error.message);
  return data;
}
export async function login({email,password}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
    });
  if (error) console.log(error)
  return data
  
}

export async function getCurrentUser(){
  const {data:session} =  await supabase.auth.getSession() //this will seArch for the localstorage if there is a session stored there
  if(!session) return null

  //Its more secure to fetch the user dat aagain insted of getting diorectlty from the session constant

  const {data,err} = await supabase.auth.getUser()

  if(err) throw new Error(err.message)
  return data?.user
}

export async function logout (){
  const {error} = await supabase.auth.signOut()
  if(error) throw new Error(error.message)
}

export async function updateCurrentUser ({password, full_name,avatar}){
  //1. Update password OR full_name
  let updateData;
  if(password) updateData = {password}
  else if(full_name) updateData = {data:{full_name}}
  const {data, updateError} = await supabase.auth.updateUser(updateData)
  if(updateError) throw new Error(updateError.message)

  if(!avatar) return data
  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const {error} = await supabase.storage.from("avatars").upload(fileName, avatar)
  if(error) throw new Error(error.message)
  //3. Update avatar in the user

  const {data:updatedUser, error: error2} = await supabase.auth.updateUser({data:{
    avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
  }})

  if(error2) throw new Error(error2.message)

  return updatedUser
}

