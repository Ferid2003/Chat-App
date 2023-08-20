# Chat-App
Chat-App is the mix of discord and whatsApp. It let's you talk to someone with messages and it has different tabs resembling discord servers. It has integrated Chat Gpt feature inside of as well. Link to the project: https://musical-gaufre-00a9fe.netlify.app/login

# Tehnologies used

   ## 1) Firebase 
   Firebase was used as a backend. Firebase Authentication is used to log in or register users with email and password, and it also helps them reset password in case they forgot it.
   Firebase storage is used to store mainly messages that contain images and profile pictures.
   And lastly firestore database stores all the messages and user entity information.

  #### Firebase user and message structure
  ![Screenshot_28](https://github.com/Ferid2003/Chat-App/assets/93407470/94dcd665-50a6-47d4-9ca7-f7b175ee367d)

  ![Screenshot_29](https://github.com/Ferid2003/Chat-App/assets/93407470/942b4fba-7800-4ba9-bebf-0b97bf9d1dfc)

  ## 2) React+Vite+Js
  Project was created using vite instead of create react app and it allows for faster workflow. And I used regular js instead of ts.

  ## 3) Npm packages and react libraries
  * This project mainly uses 3 libraries. I used [react-split](https://duckduckgo.com) for splitting screen for chat and sidebar section of the program.
  *  Then used [mui materials](@mui/material) for some designs like switch for changing from dark to light mode.
  * And lastly I used [react-router-dom](react-router-dom) for routing and navigation between different pages of Chat-App.

# Functionality
* Users can create or log into already existing accounts. There is also functionality that allow users who forgot their password to renew it.
* #### Login Page
![Screenshot_13](https://github.com/Ferid2003/Chat-App/assets/93407470/7b8b7063-219f-4c71-9493-f6b81bfffd4d)
* #### Register Page
![Screenshot_14](https://github.com/Ferid2003/Chat-App/assets/93407470/b959e785-7157-4567-8225-e801a9efc770)
* When user logged into their account user can send message and images.
* #### Chat-App main Page
![Screenshot_16](https://github.com/Ferid2003/Chat-App/assets/93407470/72400853-ca3d-4e57-b4e7-de0ddafb2809)
*  ***When sending images, after selecting image please click the send button located in the right of the input***
![InkedScreenshot_17(2)](https://github.com/Ferid2003/Chat-App/assets/93407470/2d212106-ce2f-4140-884c-e6d0ee6c41a0)
* User also can change their username and profile picture through the settings tab. In order to see changes user needs to reload the page or log out and then log into their account.
* #### Settings Page
![Screenshot_20](https://github.com/Ferid2003/Chat-App/assets/93407470/affe25fc-0f4c-4fd1-80cf-b89c852a3e4c)
* Also as I mentioned earlier their is a Chat-Gpt 3.5 version working. Because it is free version the limit might be full when you try it, but I try to keep it running.
* #### Chat-Gpt page
![Screenshot_19](https://github.com/Ferid2003/Chat-App/assets/93407470/fef3a4ee-8c7f-4639-bec8-42e52cfc0e98)
* Help center tab is there for any question regarding this project or any functionality issues. ***Note that this project mainly works on pc because I didn't bother making it scalable for mobile users***
* Project support both dark and light modes. Sometimes it might be bugged. For example sidabar might be black while chat section is light. If this occurs you can simply change the theme and it will work again.
* #### Dark and Light theme images
![Screenshot_23](https://github.com/Ferid2003/Chat-App/assets/93407470/6126d4e5-c560-4502-87e2-78dad9dd3e57)
![Screenshot_24](https://github.com/Ferid2003/Chat-App/assets/93407470/36f22bb7-c005-4861-9809-955de0a6bd14)
![Screenshot_21](https://github.com/Ferid2003/Chat-App/assets/93407470/988a86a8-f9c5-4d61-b92f-acb943bd2c28)
![Screenshot_26](https://github.com/Ferid2003/Chat-App/assets/93407470/129ec1d8-8c5c-43ce-ad7f-c1c3221964f8)
