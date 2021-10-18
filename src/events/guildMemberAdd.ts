import { Event } from '../interface/Types';
import Client from '../Class';
import { GuildMember, MessageEmbed } from 'discord.js';
import Config from '../Config';
import moment from 'moment';

const event: Event = {
    once: false,
    execute: (client: Client, member: GuildMember) => {
        let channel = member.guild.channels.cache.get(Config.logChannel);
        if (!channel || !channel.isText()) return console.log("로그채널이 삭제된듯 합니다.");
        let embed = new MessageEmbed({
            title: "유저 서버 입장 확인",
            author: {
                icon_url: member.avatarURL()!,
                name: member.user.tag
            },
            fields: [
                {
                    name: "유저 아이디",
                    value: member.id,
                    inline: true
                },
                {
                    name: "봇 여부",
                    value: member.user.bot ? "O" : "X",
                    inline: true
                },
                {
                    name: "계정 생성일",
                    value: "<t:" + moment(member.user.createdAt).unix() + ":R>",
                    inline: true
                },
                {
                    name: "자세한 계정 생성일",
                    value: "<t:" + moment(member.user.createdAt).unix() + ":F>"
                },
            ],
            timestamp: new Date()
        })
        channel.send({ embeds: [embed] });
    }
};

export default event;