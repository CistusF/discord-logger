import { Message, Awaitable } from 'discord.js';
import Client from '../Class';

export interface Command {
    name?: string;
    description: string;
    usage?: string;
    dm: boolean;
    management: boolean;
    type?: string;
    run: (client: Client, message: Message, args: string[]) => void;
};

export interface Event {
    once: boolean;
    execute: (client: Client, ...args: any) => void;
};