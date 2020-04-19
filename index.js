process.env["NTBA_FIX_319"] = 1;
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const nodemailer = require('nodemailer');
const moment = require('moment');
const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio')
const request = require('request');
const fs = require('fs')
const config = require('./config/config.json')
var { products, email, token , user_id, time, providers} = config;
const bot = new TelegramBot(token, {polling: true});

//API
//const PURCHASE_URL = "https://www.decathlon.es/es/ajax/rest/model/atg/commerce/order/purchase/CartModifierActor/addItemToOrder";

const transporter = nodemailer.createTransport({
	    host: email.host,
	    port: 587,
	    secure: false,
	    auth: {
	      user: email.from,
	      pass: email.password
	    }
	  });

// User registered telegram
bot.onText(/^\/start/, (msg) => {
	if(msg.chat.type.toString().toLowerCase() == "private"){
		var fich = fs.readFileSync("config/config.json"); 

        // Definition to the JSON type 
		var fich_parse = JSON.parse(fich);
		fich_parse['user_id'] = msg.chat.id
		//rewrite json file
		fs.writeFileSync('config/config.json', JSON.stringify(fich_parse),'utf8', 4, (err) => {
			if (err) throw err;
		});
		bot.sendMessage(msg.chat.id, "Bienvenido "+ msg.chat.first_name + " ya he registrado tu usuario ahora recibirar los productos que esten en stock")
	}
})
// Update time response
bot.onText(/^\/update_time (.+)/, (msg, match) => {
	if(msg.chat.type.toString().toLowerCase() == "private"){
		var fich = fs.readFileSync("config/config.json"); 
  
        // Definition to the JSON type 
		var fich_parse = JSON.parse(fich);
		if(user_id == msg.chat.id){
			fich_parse['time'] = parseInt(match[1])
			//rewrite json file
			fs.writeFileSync('config/config.json', JSON.stringify(fich_parse),'utf8', 4, (err) => {
				if (err) throw err;
			});
			bot.sendMessage(msg.chat.id, "Se ha actualizado correctamente el tiempo")
		}

	}
})
bot.onText(/^\/update_products (.+)/, (msg, match) => {
	if(msg.chat.type.toString().toLowerCase() == "private"){
		var fich = fs.readFileSync("config/config.json"); 
  
        // Definition to the JSON type 
		var fich_parse = JSON.parse(fich);
		if(user_id == msg.chat.id){
			new_link = match[1]
			type_link = new_link.split('.')
			has_found_provider = false
			if(providers.indexOf(type_link[1]) != -1){
				has_found_provider = providers[providers.indexOf(type_link[1])]
			}
			if(!has_found_provider){
				bot.sendMessage(msg.chat.id, "Ahora mismo no puedo guardar el producto de esa paǵina")

			}else{
				products.push({
					"type": has_found_provider, 
					"link": new_link,
					"outOfStock": true
				})
				fich_parse['products'] = products
				//rewrite json file
				fs.writeFileSync('config/config.json', JSON.stringify(fich_parse),'utf8', 4, (err) => {
					if (err) throw err;
				});
				bot.sendMessage(msg.chat.id, "Se ha añadido correctamente el nuevo producto")
			}
			
		}
	}
})

async function init() {
	for (let i = 0; i < products.length; i++) {
		const product = products[i];
		if(product.outOfStock){
			request(product.link, function (error, response, body) {
				if (!error && response.statusCode==200) {
					var $ = cheerio.load(body);
					var no_stock_answer = ""
					var title = ""
					type = "AMAZON"
					if(product.type == "amazon"){
						no_stock_answer = $('#outOfStock').html();
						title = $('title').html();
					}else{
						no_stock_answer = $('div.stock-notification__invite--active').html();
						title = $('h1').html();
						type = "DECATHLON"
					}
				
					
					if(no_stock_answer){
						if(user_id > 0){
							bot.sendMessage(user_id, 'Aún no hay stock de ' + title, {parse_mode: "HTML"});
						}
					} else {
						product.outOfStock = false
						let info = transporter.sendMail({
							from: email.from, // sender address
							to: email.to, // list of receivers
							subject: "YA HAY STOCK EN "+ type + " ✔", // Subject line
							text: `HAY UNIDADES DE ${title}`, // plain text body
							html: `<b>HAY UNIDADES DE ${title}</b> 
							<p> CORRE INSENSATO!! </p>
							<p>	LINK: <a href="${product.link}">${product.link}</a> </p>`
						})
						if(user_id > 0){
							bot.sendMessage(user_id,'YA HAY STOCK EN <b>'+ type +'</b>\n<b>HAY UNIDADES DE ' + title + '</b>\n CORRE INSENSATO!! \n LINK: <a href="' + product.link + '">' + product.link + '</a> ', {parse_mode: "HTML"});
						}
					}	
					
				} 
			});	
		}
	}
}

setInterval(function () {
	init()
}, time);