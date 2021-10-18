import { Event } from '../interface/Types';
import Client from '../Class';
import config from '../Config';
import { REST } from '@discordjs/rest';

const event: Event = {
    once: true,
    execute: async (client: Client) => {
        console.log(client.user?.tag + ' 으로 로그인 하였습니다.');
    }
};

export default event;