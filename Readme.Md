Steps To run the project

1) Create a MangoDB Atlas Account and get the Authetication ID
ex:"mongodb+srv://<YourID>.mongodb.net/cryptodata"

2) Create Apikey.js in Crypto-Backend and paste the below Code with Your ID
const ID =
"mongodb+srv://<YourID>.mongodb.net/cryptodata";
module.exports={
ID
}
 3) cd to Both Crypto-Backend and Crypto-Listing-App and Run "npm Start"

 4) Additional Tips: install nodemon and paste this code in scripts section in package.json in crypto-backend Folder

    "start":"nodemon server.js"w
