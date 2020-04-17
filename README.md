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
3) Modify the config.json with your products and your email configuration

4) Run and wait
```bash
node index
```

## Note
Try first with a product with stock, and test that you receive the email with the product link. 

## How to get the productId and catalogRefIds for a product
1) Go to the desired product decathlon page.
Example: https://www.decathlon.es/es/p/mancuerna-hexagonal-hex-dumbbell-cross-training-musculacion-15-kg-negro/_/R-p-182851?mc=8399333&c=NEGRO
2) Click the right mouse button and click on "Inspect"
3) Click on "console" tab and write in the blue arrow:
```window.tc_vars.product_id_super_model```
A red number will be displayed, this number is the productId!
4) Now write:
```window.tc_vars.product_id_article[0]``` 
This number is the catalogRefIds

## Important
I tried first with my gmail address, but Google has a feature that blocks this action. For that reason I used an outlook email.


## Donations
Paypal: sudosuberenu@gmail.com
😍 I'm saving to buy this 😍 -> https://www.amazon.es/Samsung-C27R504FHU-Pantalla-para-Curva/dp/B07PBBM8SW/ref=sr_1_4?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=monitor+curvo&qid=1587139759&sr=8-4
