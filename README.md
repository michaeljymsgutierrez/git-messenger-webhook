# Git Messenger Webhook <img src="https://i.imgur.com/7CRqZuu.png" alt="gitmessengerchatbot" width="130px"/>

A simple git webhook event notification for facebook messenger.


- [x] Github Webhook
- [x] Gitlab Webhook

1. _**clone**_ this repo and do _**npm install**_
![](https://i.imgur.com/ltOWyLO.gif )


2. install _**pm2**_ package `npm install pm2 -g`
3. create _**.env**_  file and type
```
  EMAIL: "facebookemail@gmail.com" //fb email
  PASSWORD: "facebookpassword"     //fb password
  TITLE: Chatbot Name              //chatbot name
  WEBHOOK_PORT="3005"              //preferred port
  ```
4. Start _**pm2**_ process and then _**save**_
  `pm2 start webhook.js --name webhook-name` & 
  `pm2 save`
  

![](https://i.imgur.com/oTwelow.gif)

5. Go to webhook __**Settings->Integrations->URL**__

`http://yourserverip:port/integrate/webhook/messengerGroupChatID`
- Group Chat ID shown on the parameter of messenger.com when you select the specific groupchat.


_sample_
`http://182.232.34.23:3005/integrate/webhook/1818601588228287` or 
`http://gitmessengerchatbot.com:3005/integrate/webhook/1818601588228287`

![](https://i.imgur.com/v392OCO.gif)


6. Try it yourself :smiley:

![](https://i.imgur.com/aXNIesX.gif)


