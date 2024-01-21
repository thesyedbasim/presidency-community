import supabase from '..';

export async function handleUserLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // handle error
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return data;
}

export async function handleUserSignOut() {
  await supabase.auth.signOut();
}
