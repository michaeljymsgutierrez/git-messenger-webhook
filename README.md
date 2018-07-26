# Git Messenger Chatbot <img src="https://i.imgur.com/7CRqZuu.png" alt="gitmessengerchatbot" width="130px"/>
A simple git chatbot event notification for facebook messenger.

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

_sample_
`http://182.232.34.23:3005/integrate/webhook/1818601588228287`

![](https://trello-attachments.s3.amazonaws.com/5b568bf81a598416b36ec0f1/5b59e9b1f98a6837c9ee0d16/808997dac14c5b122d1aed9ee21a820c/Kapture_2018-07-26_at_23.31.40.gif)


6. Try it yourself :)

![](https://trello-attachments.s3.amazonaws.com/5b568bf81a598416b36ec0f1/5b59b9bf9b23ab49b9af608f/e997ca16ec25ebb6420f1c1e4a73142b/Kapture_2018-07-25_at_12.37.29.gif)


