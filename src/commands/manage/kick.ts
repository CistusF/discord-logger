import { MessageEmbed } from 'discord.js';
import { Command } from '../../interface/Types';

const command: Command = {
    description: "유저를 서버에서 내보냅니다.",
    usage: "@홍길동#1234",
    dm: false,
    management: true,
    run: (client, message, args) => {
        if (!message.mentions.members) return message.reply("서버에서 추방할 유저를 명령어와 함께 언급해주세요!");
        
        let members: string[] = [];
        
        message.mentions.members.forEach(m => {
            members.push(m.nickname ?? m.user.username);
            m.kick("Kick by Bot");
        });

        let embed = new MessageEmbed({
            title: "서버에서 추방된 유저들",
            description: members.join(" ,")
        });
        
        message.reply({ content: "유저들을 추방했습니다.", embeds: [embed] });
    }
};

export default command;