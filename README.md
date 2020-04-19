# decathlonscript
Script to receive an email when a product/products have stock

## Pro Steps: Docker
If you want to avoid install node and so on, follow these steps:
1) Modify the config.json with your products and your email configuration
2) Run ```docker build -t decathlonscript . ``` and THAT'S ALL.

## Human Steps
1) Make sure you have node installed
```bash
node --version
```
2) Run
```bash
npm install
```
3) Modify the config.json with your products, your email configuration and Telegram token

4) Run and wait
```bash
node index
```
## Bot telegram
GITHUB Node t_elegram bot api: https://github.com/yagop/node-telegram-bot-api

1) Tutorial create bot in telegram in many languages
https://github.com/yagop/node-telegram-bot-api/blob/master/doc/tutorials.md

2) Once the telegram bot is created in the configuration file put the token

3) Util bot commands
Update list of products
``` /update_products link_product``` 
``` /update_products https://www.amazon.es/Habitdesign-0F4586A-Comedor-Extensible-Canadian/dp/B0764CDHX3/ref=redir_mobile_desktop?ie=UTF8&aaxitk=Jo3pfthdzs94ZBGhw4sqQw&hsa_cr_id=4090700380602&ref_=sb_s_sparkle``` 

<b>IMPORTANT</b> only amazon o decathlon providers links.

Update interval time 
``` /update_time time```
``` /update_time 60000``` 1 minute interval

<b>IMPORTANT</b> time in miliseconds.
