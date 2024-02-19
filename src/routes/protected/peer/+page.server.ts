import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let userNow;
export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();
    console.log("Homer backend");
    // console.log(user);


    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    userNow = userdetails[0];

    let { data: skills, error: err4 } = await supabase
        .from('skills')
        .select('*')


    let { data: userdetailsall, error: err5 } = await supabase
        .from('userdetails')
        .select('*')
    return { userNow, skills, userdetailsall };
}