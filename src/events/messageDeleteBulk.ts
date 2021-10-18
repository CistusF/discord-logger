import { Event } from '../interface/Types';
import { Collection, Message, MessageAttachment, MessageEmbed, PartialMessage, Snowflake, TextChannel } from 'discord.js';
import Config from '../Config';
import moment from 'moment';
import { writeFileSync } from 'fs';

const event: Event = {
    once: false,
    execute: async (client, messages: Collection<Snowflake, Message | PartialMessage>) => {
        let message = messages.first();
        if (!message || !message.guild || message.channel.isVoice() || !message.channel.isThread() || !message.channel.isText()) return;
        if (!message.guild.me?.permissions.has("VIEW_AUDIT_LOG")) return console.log("봇에게 로그를 볼 권한이 없습니다.");
        let channel = message.guild.channels.cache.get(Config.logChannel);
        if (!channel || !channel.isText()) return console.log("로그채널이 삭제된듯 합니다.");

        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_BULK_DELETE',
        });

        const auditLogs = fetchedLogs.entries.first();

        let channelMessages: {
            "메세지": string;
            "유저 태그": string;
            "유저 서버 닉네임": string;
            "유저아이디": string;
            "메세지 첨부 파일": Collection<string, MessageAttachment>;
            "메세지 생성일": string;
        }[] = [];

        messages.forEach(m => {
            channelMessages.push({
                "메세지": m.content!,
                "유저 태그": m.author?.tag!,
                "유저 서버 닉네임": m.member?.nickname ?? m.author?.username!,
                "유저아이디": m.author?.id!,
                "메세지 첨부 파일": m.attachments,
                "메세지 생성일": moment(m.createdTimestamp).format("YYYY-MM-DD / HH:mm:ss")
            });
        });
        writeFileSync("../bulkDeleteLogs.txt", JSON.stringify(channelMessages), "utf-8");

        let embed = new MessageEmbed({
            title: "메세지 다중 삭제 감지됨",
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
                }
            ]
        });

        if (!auditLogs) return channel.send({
            embeds: [embed], files: ["../bulkDeleteLogs.txt"]
        });

        const { executor, target, extra } = auditLogs;

        function isExtra(ele: any): ele is { count: number, channel: TextChannel } {
            return ele && typeof ele === "object" && 'count' in ele;
        }

        if (!isExtra(extra)) return;

        if (target && message.channelId === extra.channel?.id && target?.valueOf() === message.author?.id && extra.count >= 1 && auditLogs.createdTimestamp > (Date.now() - 5000)) {
            embed.fields.push(
                {
                    name: "삭제한 사람 유저아이디",
                    value: executor?.id!,
                    inline: true
                },
                {
                    name: "삭제한 사람 태그",
                    value: executor?.tag!,
                    inline: true
                }
            )
        }
        channel.send({
            embeds: [embed], files: ["../bulkDeleteLogs.txt"]
        });
    }
};

export default event;