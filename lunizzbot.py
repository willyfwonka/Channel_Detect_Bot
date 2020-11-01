import discord
from discord.utils import get
from discord.ext import commands
import json
import re
import sys

TOKEN_FILE = open('C:/Users/mehme/Desktop/token_deneme.txt', 'r')
TOKEN = TOKEN_FILE.readline()

client = discord.Client()

class Bot(commands.Bot):

    def __init__(self):
        super().__init__(command_prefix="$", pm_help=None, description="The Bot")

    async def on_ready(self):
        print("Bot Hazır ")

    async def on_message(self, message):

        ids = list()
        ids.append(message.author.id)     
           
        if message.author.bot == client.user:
            return
        try:
             
            channels = []
            keywords = []

            if str(message.author.id) != "768417482355900417":               
                with open('C:/Users/mehme/Desktop/bot/test.json', 'r') as json_file: 

                    data = json.load(json_file)
                    y_msg = message.content.lower()              
                    r_y_msg = list(re.split("[ !@#$%^&*()_+-={}[]|:\";'<>?,./ ]", y_msg)) # Yazılan mesaj tek tek liste elemanı olarak atanıyor.
                    
                    for i in data:
                        for y in r_y_msg:                                                   
                            if y in data[i]["keywords"]:   # çıktının hangi kanal ve kannalara ait olacağını belirlemek için keywordsleri bir listeye atıyoruz.
                                if i in channels:                                   
                                    pass                                    
                                else:                                   
                                    channels.append(i)                                
                                if y in keywords:
                                    pass                                                   
                                else:                                                                     
                                    keywords.append(y)                                                                                                    
                            else:
                                continue

                if len(channels) == 1:
                    if str(message.channel.id) == str(data[channels[0]]["channel_id"]):
                        pass
                    else:
                        await message.channel.send("Görünüşe göre sorunu <#{}> Kanalına yazman daha iyi olacaktır. <@{}>".format(str(data[channels[0]]["channel_id"]),message.author.id))
                       
                elif len(channels) > 1:
                    channel_names = ""
                    for i in channels:
                        channel_names += "<#{}> ".format(data[i]["channel_id"])                     
                    await message.channel.send("Sorunu {} Kanallarından birine yazman daha iyi olacaktır. <@{}>".format(channel_names,message.author.id))                                
            else:
                pass
        except:
            print(sys.exc_info()[0])

        


bot = Bot()
bot.run(TOKEN)