import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let userNow;
let friendNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.friendid);
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

    let { data: userdetails1, error: err1 } = await supabase
        .from('userdetails')
        .select("*")
        .eq('id', params.friendid)
    console.log(err1);

    friendNow = userdetails1[0];


    return { userNow, friendNow };

}