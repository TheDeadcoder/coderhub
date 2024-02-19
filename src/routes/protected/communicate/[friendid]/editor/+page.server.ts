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

    const { data: relatedDocIds, error: relationError } = await supabase
        .from('userdocumentrelation')
        .select('docid')
        .in('userid', [userNow.id, friendNow.id]);

    const { data: userADocIds, error: userAError } = await supabase
        .from('userdocumentrelation')
        .select('docid')
        .eq('userid', userNow.id);
    if (userAError) {
        console.error('Error fetching documents for user A:', userAError);
        return;
    }

    // Fetch document IDs where user B has edit access
    const { data: userBDocIds, error: userBError } = await supabase
        .from('userdocumentrelation')
        .select('docid')
        .eq('userid', friendNow.id);
    if (userBError) {
        console.error('Error fetching documents for user B:', userBError);
        return;
    }

    // Extract doc IDs into arrays
    const docIdsA = userADocIds.map(doc => doc.docid);
    const docIdsB = userBDocIds.map(doc => doc.docid);

    // Find common doc IDs
    const docIds = docIdsA.filter(id => docIdsB.includes(id));

    // Now, use those IDs to fetch documents
    const { data: allcodes, error: err4 } = await supabase
        .from('documents')
        .select('*')
        // Ensure we have docIds to search for, otherwise, this query will fail
        .in('id', docIds.length > 0 ? docIds : [null])
        .in('ownerid', [userNow.id, friendNow.id]);
    return { userNow, friendNow, allcodes };

}
export const actions = {
    upload: async ({ request, locals: { supabase, getSession } }) => {
        const data = await request.formData();
        //console.log("amar add class form holo", data);

        let newCode = Object.fromEntries(data.entries()) as any;


        const { data: dt, error: err1 } = await supabase
            .from('documents')
            .insert([
                { ownerid: userNow.id, title: newCode.title }
            ]).select()


        if (err1) console.log(err1)

        console.log(dt)


        const { data: dtt, error: err3 } = await supabase
            .from('userdocumentrelation')
            .insert([
                { userid: userNow.id, docid: dt[0].id },
                { userid: friendNow.id, docid: dt[0].id },
            ])
            .select()

        if (err3) console.log(err3)
        throw redirect(303, `/protected/communicate/${friendNow.id}/editor`);
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