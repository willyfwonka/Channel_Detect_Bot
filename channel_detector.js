const { time } = require('console');
const { KeyObject } = require('crypto');
const Discord = require('discord.js');
const dotenv = require('dotenv');
const client = new Discord.Client();
const fs = require('fs');
const { PassThrough } = require('stream');
// Environment Variables
let messageIDMatcher = {};Object.keys(messageIDMatcher).length

dotenv.config({
    path: "./config/config.env",
  });
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
                // modz                    lunizzers            vips                  interfazes              droids              botun rolü
let priviliged = ["605125919643926617", "605126315166924830", "605141526636396565", "701051279388049438", "605133230135312386"]
// let priviliged = ["799269621051424808"];
let botid = "772549756853420042";
let priv_channel = ["605130756729077762"]
let lunizzid = ["<@!181008524590055424>","<@181008524590055424>"]
let silinecek = "";
client.on('message', msg => {
  var date = new Date();
  if(Object.keys(messageIDMatcher).length > 0){
    for (i in messageIDMatcher){
      if((date.getTime() - messageIDMatcher[i]["timestamp"]) >= 60*1000){
        delete messageIDMatcher[i];
      }
    }
  }
  if(msg.author.id === botid){
    let temp = msg.content.split(" ");
    messageIDMatcher[msg.id] = {
      "msgid" : temp[temp.length-1],
      "timestamp": date.getTime()
    }
    temp.pop();
    msg.edit(temp.join(" "));
    msg.react("👍");
  }
  let channel_list = [];
  let keyword_list = [];
  let keywords = fs.readFileSync('test.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    return data;
  });

  let dictkw = JSON.parse(keywords);
  let userroles = msg.member.roles.cache.toJSON();
  let priviliged_user_flag = false;
  for (i in userroles){
    for (j in priviliged){
    if (priviliged[j] === userroles[i]["id"]){
      priviliged_user_flag = true;
    }
    }
  }
  let channel_flag = false;
  for (i in priv_channel){
    if(priv_channel[i] === msg.channel.id){
      channel_flag = true;
    }
  }
  if(botid === msg.author.id){
    return;
  }
  else if(priviliged_user_flag){
	return;
  }else {
    if(channel_flag){
      let channelsinmessage = [];
      let lunizzflag = false;
      for (i in lunizzid){
        if(msg.content.includes(lunizzid[i])){
          lunizzflag = true;
        }
      }
      let temp = msg.content.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi," ");
      temp = temp.toLowerCase();
      temp = temp.split(" ");
      let channel_chooser = false;
      for (i in dictkw){
        for (j in dictkw[i]["keywords"]){
          for (k in temp){
            if(dictkw[i]["keywords"][j] === temp[k]){
              let isExist = false;
              if(channel_list.length === 0){
                channel_list.push(dictkw[i]["channel_id"]);
                channel_chooser = true;
              }else{
                for(l in channel_list){
                  if(channel_list[l] === temp[k]){
                    isExist = true;
                  }
                }
                if(!isExist){
                  channel_list.push(JSON.parse(keywords)[i]["channel_id"]);
                  channel_chooser = true;
                }else{
                  return;
                }
              }
            }
          }
        }
      }
      if(lunizzflag){
        msg.channel.send("> "+ msg.content.replace("<@!181008524590055424>","Lunizz").replace("<@181008524590055424>","Lunizz") +" \nDostum bu etiketin işe yarayacağına gerçekten emin misin? <@"+msg.author.id+"> . Mesajın kendini imha etmesini istiyorsan 👍 'a basabilirsin. " + msg.id)
      }else if (channel_chooser){
        if(channel_list.length === 1){
          msg.channel.send("> "+msg.content+" \nGörünüşe göre sorunu <#" + channel_list[0]+"> kanalına yazman daha iyi olacaktır. <@"+msg.author.id+"> . Mesajın kendini imha etmesini istiyorsan 👍 'a basabilirsin. " + msg.id);
        }else{
          let temp_text = "";
          for (i in channel_list){
            temp_text += "<#" + channel_list[i] + "> ";
          }
          msg.channel.send("> "+msg.content+" \nGörünüşe göre sorunu " + temp_text +"kanallarından birine yazman daha iyi olacaktır. <@"+msg.author.id+"> . Mesajın kendini imha etmesini istiyorsan 👍 'a basabilirsin. " + msg.id);
        }
      }
    }
    }
});

client.on('messageReactionAdd',msg => {
  if(msg.users.cache.lastKey() === botid){
    return;
  }
  // if (msg.message.reactions.cache.get("👍").count === 1){
  //   return;
  // }
  else{
    let temp = msg.message.content.split(" ")[msg.message.content.split(" ").length-1];
    if (temp === "✅"){
      return;
    }else if (msg.message.author.id === botid){
      if (typeof messageIDMatcher[msg.message.id] === "undefined"){
        return;
      }else{
        msg.message.channel.fetch(messageIDMatcher[msg.message.id]["msgid"])
        .then(message => {
          for (i in msg.users.cache.array()){
            if(message.messages.cache.get(messageIDMatcher[msg.message.id]["msgid"]).author.id === msg.users.cache.array()[i].id){
              msg.message.edit(msg.message.content + " ✅");
              message.messages.cache.get(messageIDMatcher[msg.message.id]["msgid"]).delete();
              return;
            }
          }
          for (i in msg.users.cache.array()){
            msg.message.guild.members.fetch(msg.users.cache.array()[i].id)
            .then(message => {
              for (i in priviliged){
                for (k in message._roles){
                  if(message._roles[k] === priviliged[i]){
                    msg.message.edit(msg.message.content + " ✅");
                    msg.message.channel.fetch(messageIDMatcher[msg.message.id]["msgid"])
                    .then(message => {
                      message.messages.cache.get(messageIDMatcher[msg.message.id]["msgid"]).delete();
                    })
                    .catch(err => console.log(err));
                    return;
                  }
                }
              }
            })
            .catch(err => console.log(err));
          }
        })
        .catch(console.error);
      }
    }
  }
})
client.login(process.env.DISCORD_TOKEN);
