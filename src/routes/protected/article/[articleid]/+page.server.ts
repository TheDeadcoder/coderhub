import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let articleNow;
let userNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.articleid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();
    // console.log(user);


    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    userNow = userdetails[0];


    let { data: blog, error: err1 } = await supabase
        .from('blog')
        .select("*")
        .eq('id', params.articleid)

    articleNow = blog[0];





    return { articleNow, userNow };

}