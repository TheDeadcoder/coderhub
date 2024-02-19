import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let classNow;
let userNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.classid);
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const {
        data: { user }
    } = await supabase.auth.getUser();
    //console.log("Homer backend");
    // console.log(user);


    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    userNow = userdetails[0];


    let { data: classes, error: err1 } = await supabase
        .from('classes')
        .select("*")
        .eq('id', params.classid)
    classNow = classes[0];


    let { data: studclass, error: err3 } = await supabase
        .from('studclass')
        .select("*")
        .eq('cid', classNow.id)


    let { data: allcodes, error } = await supabase
        .from('classcodes')
        .select("*")
        .eq('cid', classNow.id)



    return { classNow, studclass, userNow, allcodes };

}
export const actions = {
    upload: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newCode = Object.fromEntries(data.entries()) as any;


        const { data: dt, error: err1 } = await supabase
            .from('classcodes')
            .insert([
                { ownerid: userNow.id, title: newCode.title, cid: classNow.id }
            ]).select()


        if (err1) console.log(err1)
        throw redirect(303, `/protected/class/${classNow.id}/editor`);
    },
    // deleteRequest: async ({ url, locals: { supabase, getSession } }) => {
    //     const requestid = url.searchParams.get("id")
    //     console.log("ami request delete korte chai ", requestid);

    //     if (!requestid) {
    //         return fail(400, { message: "Invalid request" })
    //     }

    //     const { error: err } = await supabase
    //         .from('studclass')
    //         .delete()
    //         .eq("id", requestid)

    //     if (err) console.log(err)
    //     else throw redirect(303, '/trainerverified/classes');

    // },
    // ApproveRequest: async ({ url, locals: { supabase, getSession } }) => {
    //     const requestid = url.searchParams.get("id")
    //     console.log("ami request approve korte chai ", requestid);

    //     if (!requestid) {
    //         return fail(400, { message: "Invalid request" })
    //     }


    //     const { data, error: err } = await supabase
    //         .from('studclass')
    //         .update({ joined: true })
    //         .eq("id", requestid)


    //     if (err) return fail(400, { message: "Invalid request" })
    //     else throw redirect(303, '/trainerverified/classes');

    // },

}