import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';


let userNow;
export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    const {
        data: { user }
    } = await supabase.auth.getUser();
    console.log("New post add er backend");
    console.log(user);


    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    userNow = userdetails[0];


    return { userNow };
}
export const actions = {
    create: async (event) => {
        console.log("Ami blog er backend e asi");
        const data = await event.request.formData();
        let newBlog = Object.fromEntries(data.entries()) as any;
        console.log(newBlog)


        const { data: dt, error: err1 } = await event.locals.supabase
            .from('blog')
            .insert([
                { userid: userNow.id, title: newBlog.title, description: newBlog.description, timetoread: newBlog.timetoread, tags: newBlog.tags, content: newBlog.content, createdat: new Date() },
            ])
            .select()


        if (err1) console.log(err1)
        else throw redirect(303, '/protected/community');
    }
} satisfies Actions;