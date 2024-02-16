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
    console.log("messenger backend");
    // console.log(user);


    let { data: userdetails, error: err } = await supabase
        .from('userdetails')
        .select("*")
        .eq('email', user.email)
    console.log(err);
    userNow = userdetails[0];



    let { data: friends1, error: err1 } = await supabase
        .from('friends')
        .select("*")
        .eq('user1', userNow.id)

    const friendwithName = await Promise.all(friends1.map(async (frienditem) => {
        let { data: username, error: pendingError } = await supabase
            .from('userdetails')
            .select("*")
            .eq('id', frienditem.user2);

        if (pendingError) {
            console.error(pendingError.message);
        }

        frienditem.user2 = username[0];
        return {
            frienditem
        };
    }));

    let { data: friends2, error: err2 } = await supabase
        .from('friends')
        .select("*")
        .eq('user2', userNow.id)

    const friendwithName2 = await Promise.all(friends2.map(async (frienditem) => {
        let { data: username, error: pendingError } = await supabase
            .from('userdetails')
            .select("*")
            .eq('id', frienditem.user1);

        if (pendingError) {
            console.error(pendingError.message);
        }
        frienditem.user1 = frienditem.user2;
        frienditem.user2 = username[0];
        return {
            frienditem
        };
    }));

    if (err1) console.log(err1)
    if (err2) console.log(err2)


    return { userNow, friendwithName, friendwithName2 };
}