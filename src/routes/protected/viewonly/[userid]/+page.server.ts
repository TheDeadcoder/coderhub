import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

let userNow;
let viewUserNow;

export const load = async ({ params, locals: { supabase, getSession } }) => {
    console.log(params.userid);
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
        .eq('id', params.userid)
    console.log(err1);

    viewUserNow = userdetails1[0];


    let { data: friends1, error: err3 } = await supabase
        .from('friends')
        .select("*")
        .eq('user1', userNow.id)
        .eq('user2', viewUserNow.id)

    let { data: friends2, error: err4 } = await supabase
        .from('friends')
        .select("*")
        .eq('user2', userNow.id)
        .eq('user1', viewUserNow.id)

    let friend;
    if (friends1) friend = friends1; else friend = friends2


    let { data: friendspending, error } = await supabase
        .from('friendspending')
        .select("*")
        .eq('user2', viewUserNow.id)
        .eq('user1', userNow.id)

    let { data: friendspendingmy, error: err6 } = await supabase
        .from('friendspending')
        .select("*")
        .eq('user1', viewUserNow.id)
        .eq('user2', userNow.id)



    //suru
    let { data: past, error: err9 } = await supabase
        .from('past')
        .select("*")
        .eq('userid', viewUserNow.id)


    let { data: present, error: err10 } = await supabase
        .from('present')
        .select("*")
        .eq('userid', viewUserNow.id)


    let { data: certificates, error: err11 } = await supabase
        .from('certificates')
        .select("*")
        .eq('userid', viewUserNow.id)


    let { data: skills, error: err12 } = await supabase
        .from('skills')
        .select("*")
        .eq('userid', viewUserNow.id)

    return { userNow, viewUserNow, friendspending, friend, friendspendingmy, past, present, certificates, skills };

}

export const actions = {
    addfriend: async ({ request, locals: { supabase, getSession } }) => {

        const { data: dt, error: err } = await supabase
            .from('friendspending')
            .insert([
                { user1: userNow.id, user2: viewUserNow.id },
            ])
            .select()


        if (err) console.log(err)

        else throw redirect(303, `/protected/viewonly/${viewUserNow.id}`);
    },
    acceptfriend: async ({ request, locals: { supabase, getSession } }) => {

        const { data: dt, error: err } = await supabase
            .from('friends')
            .insert([
                { user1: userNow.id, user2: viewUserNow.id },
            ])
            .select()




        const { error: err2 } = await supabase
            .from('friendspending')
            .delete()
            .eq('user1', viewUserNow.id)
            .eq('user2', userNow.id)




        if (err) console.log(err)
        if (err2) console.log(err2)

        else throw redirect(303, `/protected/communicate/${viewUserNow.id}/chat`);
    },


}