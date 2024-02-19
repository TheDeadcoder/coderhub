import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';


let userNow;
let projNow;
export const load = async ({ params, locals: { supabase, getSession } }) => {
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


    let { data: project, error } = await supabase
        .from('newProj')
        .select("*")
        .eq('id', params.projectid)

    projNow = project[0]


    let { data: commits, error: err2 } = await supabase
        .from('commits')
        .select("*")
        .eq('projectid', projNow.id)


    return { userNow, projNow, commits };
}