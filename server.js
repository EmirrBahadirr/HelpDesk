const express = require("express");// express kütüphanesi
require("dotenv").config(); // bu bazı değişkenleri dışarıdan almamızı sağlıyor ve o değişken sayfası .env 
                            // bu şekilde değişkenleri dışarıda tanımlamış oluyoruz.
const mysql = require("mysql2");// mysql kullanmak için kütüphane

const app = express(); // app değişkeni bir web servis oldu

const PORT = process.env.PORT; // port belirlendi

const options = {                       // burada database e bağlanmak için gerekli değerler option structına girildi
    host : process.env.HOST,
    database : process.env.DATABASE,
    user : process.env.USER,
    password : process.env.PASSWORD,
    connectionLimit : 10,
};

console.log("Options :" , options); 

const pool = mysql.createPool(options); // database e bağlandık 

app.get("/", (req, res) => {   // get kullanarak bir istek attık
    pool.query('Select * from test', (error, result) => { // pool bizim databaseimiz ve oraya her datayı çağıran bir query yazdık sonuçlar da olumluysa error değilse result olarak geliyor.
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }

        res.send(result); // değeri aldık
    });
});

app.listen(PORT, () => { // sunucu aktil olarak dinliyor.
    console.log("Sunucu " + PORT + " portunda ayakta ve dinleme yapıyor...");
})
