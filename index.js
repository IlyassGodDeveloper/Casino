
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const pretty = require("pretty-ms");
const moment = require("moment");
const prefix = "$"
let gamesTime = 15000;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7284318",
  password: "QHZT9eF8VU"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

bot.login("NTYwODkyODI0NzYxOTI1NjMy.XLAHmg.ywKozzG85diAxCZWwrC8KpUN5Uw");
  const dailies = require("./dailies.json")
  const sql = require("sqlite");
  sql.open("./edited.sqlite");
  
  const done = {};
let done1 = {};
let done2 = {};
  bot.on('ready', () =>{
	  console.log(`On Know`)
  })
bot.on('message' , message => {
  if(message.channel.type == "dm") return console.log(message.author.username+` => type this (${message.content}) in Dm`);
  if(message.author.bot) return;


  // T E X T - S Y S T E M //
  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}" AND guildId ="${message.guild.id}"`).then(rowguild => {
  if(!row || !rowguild) {
 sql.run(`INSERT INTO scores (
   userId, winNu ,
   loseNu,gamesNu,
   pointsFkk,points3oasm,
   pointslogo,pointsimoje,
   pointssr3h,pointsa3lam,
   xp , credit,
   level , like,
   ane , background,
   vcpoints, vclevel,
   guildId, xpguild
   ) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,?,?,?,?,?,?,?,?, ?, ? , ?)`, [message.author.id,0,0,0,0,0,0,0,0,0,0,0,1,0,'$عني','default', 1, 0, message.guild.id, 0]);
    } else {

  }
}).catch((e) => {
	console.log(e);
	sql.run(`CREATE TABLE IF NOT EXISTS scores 
	(userId TEXT,
	winNu INTEGER,
	loseNu INTEGER,
	gamesNu INTEGER,
	pointsFkk INTEGER,
	points3oasm INTEGER,
	pointslogo INTEGER,
	pointsimoje INTEGER ,
	pointssr3h INTEGER,
	pointsa3lam INTEGER,
	xp INTEGER,
	credit INTEGER,
	level INTEGER,
	like INTEGER,
	ane TEXT,
	background TEXT,
	vcpoints INTEGER,
	vclevel INTEGER,
  guildId TEXT, 
  xpguild INTEGER
	)`).then(() => {
	sql.run(`INSERT INTO scores (
	userId, winNu ,
	loseNu,gamesNu,
	pointsFkk,points3oasm,
	pointslogo,pointsimoje,
	pointssr3h,pointsa3lam,
	xp , credit,
	level , like,
	ane , background,
	vcpoints, vclevel, guildId, xpguild
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,'$set-info' ,'default', 1, 0, message.guild.id, 0]);
	});
	});
}).catch((e) => {
	console.log(e);
	sql.run(`CREATE TABLE IF NOT EXISTS scores 
	(userId TEXT,
	winNu INTEGER,
	loseNu INTEGER,
	gamesNu INTEGER,
	pointsFkk INTEGER,
	points3oasm INTEGER,
	pointslogo INTEGER,
	pointsimoje INTEGER ,
	pointssr3h INTEGER,
	pointsa3lam INTEGER,
	xp INTEGER,
	credit INTEGER,
	level INTEGER,
	like INTEGER,
	ane TEXT,
	background TEXT,
	vcpoints INTEGER,
	vclevel INTEGER,
  guildId TEXT,
  xpguild INTEGER
	)`).then(() => {
	sql.run(`INSERT INTO scores (
	userId, winNu ,
	loseNu,gamesNu,
	pointsFkk,points3oasm,
	pointslogo,pointsimoje,
	pointssr3h,pointsa3lam,
	xp , credit,
	level , like,
	ane , background,
	vcpoints, vclevel, guildId, xpguild
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,'$set-info' ,'default', 1, 0, message.guild.id, 0]);
	});
	});
//////////////////////////// C O M M A N D S /////////////////////////////////////////////////////////////
sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => { 
sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}" AND guildId ="${message.guild.id}"`).then(rowguild => { 
    if(message.channel.type == "dm") return;
    if(message.author.bot) return;




if(message.content.startsWith(prefix + "daily")  || message.content.startsWith(prefix + "هدية") ) {
  let cooldown = 8.64e+7
  let lastDaily = dailies[message.author.id]
  if(lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0){
  let timeObj = (cooldown - (Date.now() - lastDaily));
  message.channel.send(`**:stopwatch: |  ${message.author.username}, هناك مدة زمنية محددة للحصول علي هدية جديدة :  \`${pretty(timeObj, {verbose:true})}\`**`)
}
  else {
  const amount = 500
  dailies[message.author.id] = Date.now();
  sql.run(`UPDATE scores SET credit = ${row.credit + amount} WHERE userId = ${message.author.id}`);
  message.channel.send(`**:atm: | ${message.author.username}, لقد أستلمت : \`${amount}\` كـهدية يومية **`)
    
  fs.writeFile("./dailies.json", JSON.stringify(dailies, null, 2), (err) => {
    if(err) console.log(err)
  });
}
  }

if(message.content.startsWith(prefix + "credits") || message.content.startsWith(prefix + "credit") ) {
  if(message.mentions.users.size < 1) {
    if(row) {
    return message.channel.send(`**:credit_card:  | ${message.author.username}, لديك :  ` + "``$"+ `${row.credit} ` + "``" + ` من الكريديت **`).catch(error => message.channel.send(`**:white_check_mark: | تم تفعيل حسابك البنكي **`));
    } else {return message.channel.send(`**:credit_card:  | ${message.author.username}, لديك :  ` + "``$"+ `0 ` + "``" + ` من الكريديت**`)}
  } else {
    let transferto = message.mentions.users.first();
    if(transferto.bot) return message.channel.send(`**:robot:  |  ${message.author.username}, البوتات لا تمتلك ليفيل وكريديت . :wink:**`);
    if(transferto.id === message.author.id) return message.channel.send(`من جدك ؟`);
    if(transferto) { if(!row) {return message.channel.send(`**:x: | ${transferto.username}, لا يوجد حساب كريديت بنكي لهذا الشخص **`)}}
    let transfer = message.content.split(" ").slice(2).join("")
    if(row.credit < transfer) return message.channel.send(`**:thinking: | ${message.author.username}, ليس لديك المال الكافي لذلك**`)
    sql.get(`SELECT * FROM scores WHERE userId ="${transferto.id}"`).then(row1 => {
    if(!transfer) {
 if(!row1) { 
   return message.channel.send(`**:credit_card: | ${transferto.username}, لديك : ` + "``$"+ `0 ` + "``" + ` من الكريديت**`)
   }
 return message.channel.send(`**:credit_card:  |  ${transferto.username}, لديك : ` + "``$" + `${row1.credit} ` + "``" + ` من الكريديت**`);
    }
    if(isNaN(transfer)) {
 return message.channel.send("**:x: | يرجي أدخال رقم صحيح **")
    }
  if(transfer < 1) return message.channel.send(`**:x: | يرجي أدخال رقم صحيح **`)
  if(!row1) {
    sql.run(`UPDATE scores SET credit = ${row.credit - parseInt(transfer)} WHERE userId = ${message.author.id}`); 
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId, credit)").then(() => {
 sql.run("INSERT INTO scores (userId, credit) VALUES (?, ?)", [transferto.id, parseInt(transfer)]);
 message.channel.send(` **➡  |  تمت عملية التحويل  
 🕊 |  ${transferto} : ${message.author.username}, لقد قمت بأرسال  ` +"$`"+transfer+"`"+` لـ ** `)
 bot.users.find("id", `${transferto.id}`).send(`**:atm: | تمت عملية التحويل** \`\`\`\n لقد حولت : ${transfer}  لـ  ${message.author.username} . (ID: ${message.author.id})\`\`\``)
 bot.channels.get("550305753488031764").send(`ايدي المرسل : \`${transferto.id}\`
 اسم المستقبل : \`${transferto.username}\`
 ايدي المستقبل : \`${message.author.id}\`
 اسم المرسل : \`${message.author.username}\`
 المبلغ : \`${transfer}\`
 `);

 });
    }


      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let fourth = Math.floor(Math.random() * 9);
      let num = `${first}${second}${third}${fourth}`;
      
    
      message.channel.send(`➡  | لتحويل مبلغ : ${transfer}
الى : ${transferto}
يرجاء كتابة الرقم التالي: \`\`\`${num}\`\`\``).then(m => {
  message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors:['time'] }).then(collected => { 

    let c = collected.first();
    if(c.content === num) {
      m.delete();
      c.delete();

        message.channel.send(` **➡  |  تمت عملية التحويل  
🕊 |  ${transferto} : ${message.author.username}, لقد قمت بأرسال  ` +"$`"+transfer+"`"+` لـ ** `)
    bot.users.find("id", `${transferto.id}`).send(`**:atm: | تمت عملية التحويل** \`\`\`\n لقد أستملت : ${transfer}  من ${message.author.username} . (ID: ${message.author.id})\`\`\``)
    bot.channels.get("550305753488031764").send(`ايدي المرسل : \`${transferto.id}\`
    اسم المستقبل : \`${transferto.username}\`
    ايدي المستقبل : \`${message.author.id}\`
    اسم المرسل : \`${message.author.username}\`
    المبلغ : \`${transfer}\`
    `);
    sql.run(`UPDATE scores SET credit = ${row.credit - parseInt(transfer)} WHERE userId = ${message.author.id}`);
    sql.run(`UPDATE scores SET credit = ${row1.credit + parseInt(transfer)} WHERE userId = ${transferto.id}`);
  
  } else {
    m.delete();
    message.channel.send(`خطأأ`);
}
        })
      })
    })
}
}



 

  if(message.content.startsWith("Mgive") ) {
         const devs = ['272004278082600960','537147937583529994'];
		 if (!devs.includes(message.author.id)) return;
    let args = message.content.split(/[ ]+/);
    if(!args[1]) return message.reply("**يجب ادخال رقم اما سالب او موجب**")
    if(isNaN(args[1])) return message.reply("**لايمكن تحويل كلمات او احرف**")
     if(!args[1].startsWith("+")) return message.reply("**يجب ادخال رقم موجب**")
    sql.run(`UPDATE scores SET credit = ${row.credit + args[1]} WHERE userId = ${message.author.id}`);
    message.reply("**Done**..")
       
       }
       
       // !args[1].startsWith("-")
       if(message.content.startsWith("$خذ") ) {
         const devs = ['516618898850709504','515096989369761802'];;
         if (!devs.includes(message.author.id)) return;
         let args = message.content.split(/[ ]+/);
         if(!args[1]) return message.reply("**يجب ادخال رقم  سالب**")
         if(isNaN(args[1])) return message.reply("**لايمكن تحويل كلمات او احرف**")
          if(!args[1].startsWith("-")) return message.reply("**يجب ادخال رقم موجب**")
         sql.run(`UPDATE scores SET credit = ${row.credit + args[1]} WHERE userId = ${message.author.id}`);
         message.reply("**Done**..")
            
            }
            if(message.content.startsWith("$black-cr") ) {
              const devs = ['272004278082600960','475396751549792277','515096989369761802'];
              if (!devs.includes(message.author.id)) return;

              let transferto1 = message.mentions.users.first();
          
              let transfer1 = message.content.split(" ").slice(2).join("")
              sql.run(`UPDATE scores SET credit = ${row.credit - transfer1} WHERE userId = ${transferto1.id}`);
              message.reply("**Done**..")

            }

            sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => { 
                if(message.content.startsWith(prefix+"em") || message.content.startsWith(prefix+"ايموجي") ) {
                    message.channel.stopTyping(false);
                const e = JSON.parse(fs.readFileSync('./emoji.json', 'utf8'));
                const w = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","aa","bb","cc","dd","ee","ff","gg","hh","ii","jj","kk","ll","mm","nn","oo","pp","qq","rr","ss","tt","uu","vv","ww","xx","yy","zz"]
                var c = `${w[Math.floor(Math.random() * w.length)]}`
                
                    //----
                    const embed = new Discord.RichEmbed()
                .setColor('0bbaba')
                .setTitle(`** ابحث عن الايموجي القادم ! :mag_right:  **`)
                .setFooter(`امامك 15 ثانية فقط !`)
                
                message.channel.sendEmbed(embed).then((mm12) => {setTimeout(()=>{  mm12.edit(new Discord.RichEmbed()
                .setColor('0bbaba')
                .setTitle(`** هل تذكره ؟؟ **`)
                .setThumbnail("https://cdn.discordapp.com/attachments/384692091256700928/447522745304219658/iReHvIZ.png")
                .setFooter(`امامك 15 ثانية فقط !`))
                },2555)
                })
                message.channel.stopTyping(true);
                
                 var mm1=setTimeout(() =>{
                     const embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setDescription(" :stopwatch: | ` انتهى الوقت `")
                message.channel.sendEmbed(embed);
                
                    },gamesTime);
                
                 const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { max: 1, time: gamesTime, errors: ['time'] });
                collector.on('collect', r  => {
                if (r.content.startsWith(e[c].ans)){
                const embed = new Discord.RichEmbed()
                .setDescription('✅ | **``صح عليك``** \n `+150 Credit` \n \n `لقد اتممت الاجابة في :'+`${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}`+" ثانية`")
                .setColor('RANDOM')
                 message.channel.send(embed).then(()=>{clearTimeout(mm1)})
                
                 sql.run(`UPDATE scores SET credit = ${row.credit + 150} WHERE userId = ${message.author.id}`);
                 return;
                } else {
                  const embed = new Discord.RichEmbed()
                  .setDescription('❌ | **``الاجابة خاطئة``** ')
                  .setColor('RANDOM')
                   message.channel.send(embed).then(()=>{clearTimeout(mm1)})
                }
                })
                 }
                })
                

                if(message.content.startsWith(prefix+"le") || message.content.startsWith(prefix+"فكك") ){
                    x = ['القسطنطينية','فلسطين','يوتيوب','بوت','دسكورد','سيرفر','اسبوت','بروبوت','العربية','الأجانب','عبارات','فورتنايت','ببجي موبايل','نينتي ناين','الميااه','قدمين','السيرفرات','الدول','لبنان','سوريا','مصر','الجزائر','العباسيون','الحمدانيون','السيرفر روعة','افضل بوت اسبوت','كريديت اس بوت','الغرب و الشرق','العهد السلجوقي','الحاكم','انه مربى لذيذ و جيد','المحترفون العرب','اكو عرب بالطيارة','فككني انا','السيرفر قمد'];
                    x2 = ['ا ل ق س ط ن ط ي ن ي ة','ف ل س ط ي ن','ي و ت ي و ب','ب و ت','د س ك و ر د','س ي ر ف ر','ا س ب و ت','ب ر و ب و ت','ا ل ع ر ب ي ة','ا ل أ ج ا ن ب','ع ب ا ر ا ت','ف و ر ت ن ا ي ت','ب ب ج ي م و ب ا ي ل','ن ي ن ت ي ن ا ي ن','ا ل م ي ا ا ه','ق د م ي ن','ا ل س ي ر ف ر ا ت','ا ل د و ل','ل ب ن ا ن','س و ر ي ا','م ص ر','ا ل ج ز ا ئ ر','ا ل ع ب ا س ي و ن','ا ل ح م د ا ن ي و ن','ا ل س ي ر ف ر ر و ع ة','ا ف ض ل ب و ت ا س ب و ت','ك ر ي د ي ت ا س ب و ت','ا ل غ ر ب و ا ل ش ر ق','ا ل ع ه د ا ل س ل ج و ق ي','ا ل ح ا ك م','ا ن ه م ر ب ى ل ذ ي ذ و ج ي د','ا ل م ح ت ر ف و ن ا ل ع ر ب','ا ك و ع ر ب ب ا ل ط ي ا ر ة','ف ك ك ن ي ا ن ا','ا ل س ي ر ف ر ق م د'];
                    var x3 = Math.floor(Math.random()*x.length)
                    
                    var fkkemb = new Discord.RichEmbed()
                    .setAuthor(`📋 M!Bot Games | فكك`, message.guild.iconURL)
                    .setTitle(`**\`${x[x3]}\`**`) 
                    .setFooter(message.author.username, message.author.avatarURL)
                        
                    message.channel.send(fkkemb)
                    message.channel.stopTyping();
           
                 var mm1=setTimeout(() =>{
                const embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setDescription(" :stopwatch: | ` انتهى الوقت `")
                message.channel.sendEmbed(embed);
                if(row.pointsFkk <= 0 )return;
                    },gamesTime);
                
                 const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { max: 1, time: gamesTime, errors: ['time'] });
                collector.on('collect', r  => {
                if (r.content == x2[x3]){
                const embed = new Discord.RichEmbed()
                .setDescription('✅ | **``صح عليك``** \n `+100 Credits` \n \n `لقد اتممت الاجابة في :'+`${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}`+" ثانية`")
                .setColor('RANDOM')
                 message.channel.send(embed).then(()=>{clearTimeout(mm1)})
                
                 sql.run(`UPDATE scores SET credit = ${row.credit + 100} WHERE userId = ${message.author.id}`);
                 return;
                } else {
                  const embed = new Discord.RichEmbed()
                  .setDescription('❌ | **``الاجابة خاطئة``**')
                  .setColor('RANDOM')
                   message.channel.send(embed).then(()=>{clearTimeout(mm1)})
                }
                })
                
                }
                if (message.content.startsWith(prefix+"fa") || message.content.startsWith(prefix+"سرعة") ) {
                    y = ['دًيسكًَورد','الله اكًبًر','سبًحاًن الله','بسًًًًًًًم الله','مًًًًًصر','السعًًًًًًًودُُُُُُية','الًَُبرمجة حًَُياتي','ذهب محًُمد الى الًُمدرسة','اًن الله يًُحب المؤمًُنين','اينًَُشتاين','بريطاًَنيا','ابو بًَكر الصديق','كريستًُيانو','مُيسي','نيُمار','ديبٍالا','فيسٍبوك موٍقع تواصل اجتًماعي','تويتر موقع تواصل اجتٍماعي','انًُستجرام يحًًُبه الجميع','السيزون السابع فوًُرتنايت','فورتًُنايت','مصطفى جًُيم اوفر','لاست مًُودد'];
                    y2 = ['ديسكورد','الله اكبر','سبحان الله','بسم الله','مصر','السعودية','البرمجة حياتي','ذهب محمد الى المدرسة','ان الله يحب المؤمنين','اينشتاين','بريطانيا','ابو بكر الصديق','كريستيانو','ميسي','نيمار','ديبالا','فيسبوك موقع تواصل اجتماعي','تويتر موقع تواصل اجتماعي','انستجرام يحبه الجميع','السيزون السابع فورتنايت','فورتنايت','مصطفى جيم اوفر','لاست مودد'];
                    var y3 = Math.floor(Math.random()*y.length)
                    
                    var fastem = new Discord.RichEmbed()
                    .setAuthor(`📋 M!Bot Games | اسرع كتابة`, message.guild.iconURL)
                    .setTitle(`**\`${y[y3]}\`**`) 
                    .setDescription(`اكتبها بلا حركات`)
                    .setFooter(message.author.username, message.author.avatarURL)
                        
                    message.channel.send(fastem)
                    message.channel.stopTyping();
           
                 var mm1=setTimeout(() =>{
                const embed1 = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setDescription(" :stopwatch: | ` انتهى الوقت `")
                message.channel.sendEmbed(embed1);
                if(row.pointsFkk <= 0 )return;
                    },gamesTime);
                
                 const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { max: 1, time: gamesTime, errors: ['time'] });
                collector.on('collect', r  => {
                if (r.content == y2[y3]){
                const embed2 = new Discord.RichEmbed()
                .setDescription('✅ | **``صح عليك``** \n `+100 Credits` \n \n `لقد اتممت الاجابة في :'+`${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}`+" ثانية`")
                .setColor('RANDOM')
                 message.channel.send(embed2).then(()=>{clearTimeout(mm1)})
                
                 sql.run(`UPDATE scores SET credit = ${row.credit + 100} WHERE userId = ${message.author.id}`);
                 return;
                } else {
                  const embed3 = new Discord.RichEmbed()
                  .setDescription('❌ | **``الاجابة خاطئة``** ')
                  .setColor('RANDOM')
                   message.channel.send(embed3).then(()=>{clearTimeout(mm1)})
                }
                })
                
                }

                if (message.content == prefix+"ma" || message.content == prefix+"حساب") {
                  m = ['13*10','(50/10)*1','25*3','90/2','9/9','5-4+3-2+1','15/5','50*3','(5*2)+(2*3)','1111*1','2*9*1','((10+10)*0)+20','11+9+1','(5+5+5+5*1)+2','(15*2)+1','(39+1)*0','(22+1+3)*2','(5-4)-1','(9*2)+1','10-8','100/10','999+1.5','5+1+9','2*2'];
                  m2 = ['130','5','75','45','1','3','3','150','16','1111','18','20','21','22','31','0','52','0','19','2','10','1000.5','15','4'];
                  var m3 = Math.floor(Math.random()*m.length)
                  
                  var mathem = new Discord.RichEmbed()
                  .setAuthor(`📋 M!Bot Games | رياضيات`, message.guild.iconURL)
                  .setTitle(`**\`${m[m3]}\`**`) 
                  .setFooter(message.author.username, message.author.avatarURL)
                      
                  message.channel.send(mathem)
                  message.channel.stopTyping();
         
               var mm1=setTimeout(() =>{
              const embed5 = new Discord.RichEmbed()
              .setColor(0xff0000)
              .setDescription(" :stopwatch: | ` انتهى الوقت `")
              message.channel.sendEmbed(embed5);
              if(row.pointsFkk <= 0 )return;
                  },gamesTime);
              
               const collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { max: 1, time: gamesTime, errors: ['time'] });
              collector.on('collect', r  => {
              if (r.content == m2[m3]){
              const embed6 = new Discord.RichEmbed()
              .setDescription('✅ | **``صح عليك``** \n `+100 Credits` \n \n `لقد اتممت الاجابة في :'+`${moment(r.createdTimestamp - message.createdTimestamp).format(`ss`)}`+" ثانية`")
              .setColor('RANDOM')
               message.channel.send(embed6).then(()=>{clearTimeout(mm1)})
              
               sql.run(`UPDATE scores SET credit = ${row.credit + 100} WHERE userId = ${message.author.id}`);
               return;
              } else {
                const embed7 = new Discord.RichEmbed()
                .setDescription('❌ | **``الاجابة خاطئة``** ')
                .setColor('RANDOM')
                 message.channel.send(embed7).then(()=>{clearTimeout(mm1)})
              }
              })
              
              }



                if(message.content.startsWith(prefix + "casino")) {
                  if(row.credit < 999) return message.reply(`**:x: | ليس لديك المبلغ المطلوب للعب هذه اللعبة**`);

                  let micas = ['-','+' , '-', '-', '-', '-', '-','+', '-', '-']
                  let micas1 = `${micas[Math.floor(Math.random() * micas.length)]}`
                  let first = Math.floor(Math.random() * 9);
                      let second = Math.floor(Math.random() * 9);
                      let third = Math.floor(Math.random() * 9);
                      let num = `${micas1}${first}${second}${third}`;
            
                      var casino = new Discord.RichEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL)
                      .setTitle(`** :moneybag: , Casino**`)
                      .setDescription(`**كم بكتابه اي شيء عشوائي**`)
                      .setFooter('**M!bot**')

                      message.channel.send(casino).then(m => {
            
                      message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors:['time'] }).then(collected => {
            
                        let c = collected.first();
                        if(c.content === num) {
            
                   
                        } else {
                          message.channel.send(`**لقد حصلــت على \`${num}\` كرديت**`)
                          sql.run(`UPDATE scores SET credit = ${row.credit + num} WHERE userId = ${message.author.id}`);

                        }
                      
            
              
            });
            })
            }         
              

})
})
});
