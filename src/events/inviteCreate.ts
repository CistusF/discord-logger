import { Event } from '../interface/Types';
import Client from '../Class';
import { Invite, MessageEmbed } from 'discord.js';
import Config from '../Config';
import moment from 'moment';

const event: Event = {
    once: false,
    execute: (client: Client, invite: Invite) => {
        let channel = client.guilds.cache.get(invite.guild?.id!)?.channels.cache.get(Config.logChannel);
        if (!channel || !channel.isText()) return console.log("로그채널이 삭제된듯 합니다.");
        let embed = new MessageEmbed({
            title: "초대링크 생성 감지",
            author: {
                icon_url: invite.inviter?.displayAvatarURL(),
                name: invite.inviter?.username
            },
            fields: [
                {
                    name: "생성자 유저 아이디",
                    value: invite.inviter?.id!,
                    inline: true
                },
                {
                    name: "초대 채널",
                    value: invite.channel.name!,
                    inline: true
                },
                {
                    name: "초대 채널",
                    value: invite.channel.id,
                    inline: true
                },
                {
                    name: "초대 코드",
                    value: invite.code,
                    inline: true
                },
                {
                    name: "초대 코드 유효 기간",
                    value: "<t:" + moment(invite.expiresAt).unix() + ":R>",
                    inline: true
                },
                {
                    name: "초대 코드 최대 사용 횟수",
                    value: invite.maxUses + "회",
                    inline: true
                }
            ]
        });
        channel.send({ embeds: [embed] });
    }
};

export default event;