import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import TokenServerImport from 'agora-token';
const { RtcRole, RtcTokenBuilder } = TokenServerImport; // CJS module import
import type { PageServerLoadEvent } from '../$types';

let userNow, friendNow;
export async function load(event: PageServerLoadEvent) {
    const { params, url } = event;
    let uid = url.searchParams.get('uid');
    try {
        const channel = new URLSearchParams(params).get('relationid');
        console.log("video call", channel, uid);

        if (!channel) {
            throw error(400, 'channel is required');
        }



        if (!uid) {
            uid = '0';
        }



        const token = RtcTokenBuilder.buildTokenWithUid(
            publicEnv.PUBLIC_APP_ID,
            env.APP_CERTIFICATE,
            channel,
            parseInt(uid),
            RtcRole.PUBLISHER,
            600,
            600
        );
        const {
            data: { user }
        } = await event.locals.supabase.auth.getUser();

        console.log("call", user);


        let { data: userdetails, error: err } = await event.locals.supabase
            .from('userdetails')
            .select("*")
            .eq('email', user.email)
        console.log(err);
        userNow = userdetails[0];


        let { data: friends, error } = await event.locals.supabase
            .from('friends')
            .select("*")
            .eq('id', channel)

        let lookFor;
        if (friends[0].user1 === userNow.id) {
            lookFor = friends[0].user2;
        }
        else {
            lookFor = friends[0].user1;
        }

        let { data: userdetails2, error: err2 } = await event.locals.supabase
            .from('userdetails')
            .select("*")
            .eq('id', lookFor)

        friendNow = userdetails2[0]

        console.log(token, uid, channel)
        return { token, uid, channel, userNow, friendNow };
    } catch (e) {
        console.log("bugggg");
        throw error(400, `json expected: ${JSON.stringify(e)}`);

    }
}