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
    console.log(user);


    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    userNow = userdetails[0];


    let { data: projects, error } = await supabase
        .from('newProj')
        .select("*")
        .eq('userid', userNow.id)


    return { userNow, projects };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

export const actions = {
    addProj: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newClass = Object.fromEntries(data.entries()) as any;


        let zero = '0';
        const { data: dt, error: err1 } = await supabase
            .from('newProj')
            .insert([
                { userid: userNow.id, title: newClass.title, description: newClass.description }
            ])


        if (err1) console.log(err1)





        throw redirect(303, '/protected/projects');
    },
}