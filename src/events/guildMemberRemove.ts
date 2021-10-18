import { Event } from '../interface/Types';
import Client from '../Class';
import { GuildMember, MessageEmbed } from 'discord.js';
import Config from '../Config';
import moment from 'moment';

const event: Event = {
    once: false,
    execute: async (client: Client, member: GuildMember) => {
        let channel = member.guild.channels.cache.get(Config.logChannel);
        if (!channel || !channel.isText()) return console.log("로그채널이 삭제된듯 합니다.");
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK'
        });
        const auditLogs = fetchedLogs.entries.first();
        let embed = new MessageEmbed({
            title: "유저 나감 확인",
            author: {
                icon_url: member.user.displayAvatarURL(),
                name: member.user.tag
            },
            fields: [
                {
                    name: "닉네임",
                    value: member.nickname ?? member.user.username,
                    inline: true
                },
                {
                    name: "유저 아이디",
                    value: member.id,
                    inline: true
                },
                {
                    name: "계정 생성일",
                    value: "<t:" + moment(member.user.createdAt).unix() + ":F>",
                    inline: true
                },
                {
                    name: "유저 서버 가입일",
                    value: "<t:" + moment(member.joinedAt).unix() + ":R>",
                    inline: false
                },
                {
                    name: "자세한 유저 서버 가입일",
                    value: "<t:" + moment(member.joinedAt).unix() + ":F>",
                    inline: true
                }
            ]
        })
        if (!auditLogs) return channel.send({ embeds: [embed] });;
        const { executor, target } = auditLogs;

        if (target?.valueOf() === member.id && auditLogs.createdTimestamp > (Date.now() - 5000)) {
            embed.title = "유저 킥 확인";
            embed.fields.push(
                {
                    name: "킥한 유저",
                    value: executor!.tag,
                    inline: false
                },
                {
                    name: "킥한 유저 아이디",
                    value: executor!.id,
                    inline: false
                }
            )
        };

        channel.send({ embeds: [embed] });
    }
};

export default event;