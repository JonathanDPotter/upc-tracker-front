# UPC Tracker 

This is the front end for my UPC tracking web app.  It will call the API on my back end to store UPCs in a Mongo Atlas database.
I will use this to track which UPCs I have already reported, to where I reported them, and the status of the reported UPCs.

---

## Technologies Used

This app is written in typescript using react.  Global state is handled with redux, and authentication is handled on the back end with jsonwebtoken.  It is styled with tailwind css.

---

## Functionality

When a user first visits the site, if they are not logged in they are redirected to the login page.  They can register on that page if they are not already registered, otherwise they can use their credentials to log in.  Once logged in the user is redirected to the home page where they can see all of the UPC groups that they have created and create new ones.  By clicking on a group name, they can open it up for editing.  Groups can also be deleted entirely from the edit menu.

![image](https://user-images.githubusercontent.com/30156468/171711143-1abdfe24-3fff-45e7-910d-995d3ed8fd24.png)
