# Git Messenger Chatbot
A simple git chatbot event notification for facebook messenger.

- [x] Github Webhook
- [x] Gitlab Webhook

1. _**clone**_ this repo and do _**npm install**_
![](https://i.imgur.com/ltOWyLO.gif )


2. install _**pm2**_ package ```npm install pm2 -g```
3. create _**.env**_  file with
```
  EMAIL: "facebookemail@gmail.com" 
  PASSWORD: "facebookpassword"
  TITLE: Chatbot Name
  WEBHOOK_PORT="3005"
  ```
4. Start _**pm2**_ process and then _**save**_
  ```pm2 start webhook.js --name webhook-name```
  ```pm2 save```
  

![](https://i.imgur.com/oTwelow.gif)





