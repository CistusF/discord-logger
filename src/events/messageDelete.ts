import { Event } from '../interface/Types';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import Config from '../Config';

const event: Event = {
    once: false,
    execute: async (client, message: Message) => {
        if (!message.guild || message.channel.isVoice() || !message.channel.isThread() || !message.channel.isText()) return;
        if (!message.guild.me?.permissions.has("VIEW_AUDIT_LOG")) return console.log("봇에게 로그를 볼 권한이 없습니다.");
        let channel = message.guild.channels.cache.get(Config.logChannel);
        if (!channel || !channel.isText()) return console.log("로그채널이 삭제된듯 합니다.");
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE'
        });
        const auditLogs = fetchedLogs.entries.first();
        let embed = new MessageEmbed({
            title: "메세지 삭제 감지됨",
            description: message.content,
            author: {
                icon_url: message.author.displayAvatarURL(),
                name: message.member?.nickname ?? message.author.username
            },
            fields: [
                {
                    name: "메세지 삭제 채널 아이디",
                    value: message.channelId,
                    inline: true
                },
                {
                    name: "메세지 삭제 채널 이름",
                    value: message.channel.name,
                    inline: true
                },
                {
                    name: "유저아이디",
                    value: message.author.id,
                    inline: true
                },
                {
                    name: "유저 태그",
                    value: message.author.tag,
                    inline: true
                }
            ]
        });

        message.attachments.forEach(i => {
            embed.fields.push({
                name: i.name + " ||" + i.size + "byte(?)||", value: `파일 타입 : ${i.contentType}\n[프록시 다운 링크](${i.proxyURL})\n[다운 링크](${i.url})`, inline: false
            });
        });

        if (!auditLogs) return channel.send({ embeds: [embed] });

        const { executor, target, extra } = auditLogs;

        function isExtra(ele: any): ele is { count: number, channel: TextChannel } {
            return ele && typeof ele === "object" && 'count' in ele;
        }

        if (!isExtra(extra)) return;
        if (target && message.channelId === extra.channel?.id && target?.valueOf() === message.author?.id && extra.count >= 1 && auditLogs.createdTimestamp > (Date.now() - 5000)) {
            embed.fields.push({
                name: "삭제한 사람 유저아이디",
                value: executor?.id!,
                inline: true
            },
                {
                    name: "삭제한 사람 태그",
                    value: executor?.tag!,
                    inline: true
                })
        }
        channel.send({
            embeds: [embed], files: ["../bulkDeleteLogs.txt"]
        });
    }
};

export default event;