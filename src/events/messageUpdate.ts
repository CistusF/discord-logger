import { Event } from '../interface/Types';
import Client from '../Class';
import { Message, MessageEmbed, PartialMessage } from 'discord.js';
import Config from '../Config';

const event: Event = {
    once: false,
    execute: (client: Client, oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) => {
        if (oldMessage.author?.bot) return;
        let embed = new MessageEmbed({
            title: "메세지 수정 감지",
            author: {
                icon_url: oldMessage.author?.displayAvatarURL()!,
                name: oldMessage.author?.tag!
            },
            description: oldMessage.content ?? "없음"
        });
        switch (newMessage.content?.length ?? 0 > 1024) {
            case false:
                embed.fields.push(
                    {
                        name: "수정된 메세지",
                        value: newMessage.content ?? "메세지 없음",
                        inline: false
                    }
                )
                break;
            case true:
                embed.fields.push(
                    {
                        name: "수정된 메세지",
                        value: newMessage.content?.slice(0, 1024)!,
                        inline: false
                    },
                    {
                        name: "짤린 메세지",
                        value: newMessage.content?.slice(1024, newMessage.content.length)!,
                        inline: false
                    }
                )
                break;
        }
        embed.fields.push(
            {
                name: "유저 아이디",
                value: oldMessage.author?.id!,
                inline: true
            },
            {
                name: "채널 아이디",
                value: oldMessage.channelId,
                inline: true
            },
            {
                name: "채널",
                value: "<#" + oldMessage.channelId + ">",
                inline: true
            }
        )
        oldMessage.attachments.forEach(i => {
            embed.fields.push({
                name: i.name + " ||" + i.size + "byte(?)||", value: `파일 타입 : ${i.contentType}\n[프록시 다운 링크](${i.proxyURL})\n[다운 링크](${i.url})`, inline: false
            });
        });
        let channel = oldMessage.guild?.channels.cache.get(Config.logChannel);
        if (!channel || !channel?.isText()) return console.log("로그채널이 삭제된듯 합니다");
        channel?.send({ embeds: [embed] });
    }
};

export default event;