import supabase from "./supabase"

export async function login({email,password}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
    });
  if (error) console.log(error)
  return data
  
}

export async function getCrurentUser(){
  const {data:session} =  await supabase.auth.getSession() //this will seArch for the localstorage if there is a session stored there
  console.log("session", session)
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