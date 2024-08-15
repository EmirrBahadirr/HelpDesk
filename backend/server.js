const express = require("express");// express kütüphanesi
require("dotenv").config(); // bu bazı değişkenleri dışarıdan almamızı sağlıyor ve o değişken sayfası .env 
                            // bu şekilde değişkenleri dışarıda tanımlamış oluyoruz.
const cors = require('cors');

                                              
const mysql = require("mysql2");// mysql kullanmak için kütüphane

const app = express(); // app değişkeni bir web servis oldu

app.use(express.json()); // json dosyası ile işem yapmak için gerekli
app.use(cors());

const PORT = process.env.PORT; // port belirlendi

const options = {                       // burada database e bağlanmak için gerekli değerler option structına girildi
    host : process.env.HOST,
    database : process.env.DATABASE,
    user : process.env.USER,
    password : process.env.PASSWORD,
    connectionLimit : 10,
};

const pool = mysql.createPool(options); // database e bağlandık 

app.get("/ticket/:id", (req, res) => {   // get kullanarak bir istek attık

    const id = req.params.id;
    pool.query('Select * from ticket where id = ?', [id], (error, result) => { // pool bizim databaseimiz ve oraya her datayı çağıran bir query yazdık sonuçlar da olumluysa error değilse result olarak geliyor.
        if (error) {                                    //bu yukarıdaki id querydeki soru işareti yerine geçiyor ve onun yerini alıyor
            console.error(error);                       //bu + konularak string ile yapılırdı ama güvenlik ihlalleri yaratırdı.
            res.send(error);
            return;
        }

        res.send(result); // sonuç printi
    });
});

app.get("/all", (req, res) => {   // get kullanarak bir istek attık
    pool.query('Select * from ticket', (error, result) => { // pool bizim databaseimiz ve oraya her datayı çağıran bir query yazdık sonuçlar da olumluysa error değilse result olarak geliyor.
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }

        res.send(result); // değeri aldık
    });
});

app.post('/ticket', (req, res) => { // postu datayı update etmek için kullanıyoruz
    const ticket = req.body;
    pool.query('Insert into ticket (summary, priority, status) value (?,?,?)',
        [ticket.summary, ticket.priority, ticket.status],
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(error);
                return
            }
            console.log("Database e veri girildi");
            res.send({...ticket, id : result.insertId}); // { } öğesi bize print etmke için fayda sağlayan bir yapı id kısmını biz belirledik
                                        // : result.insertId ise resultu yanlız print ettiğimizde mysql bize soktuğumuz datanın insert edilir
                                        // ken verdiği ıdyi döndürüyor, ...ticket yapısı da bize ticket objesinin tüm değerlerini döndür demek.
        }
        
    );
});

app.put('/ticket/:id', (req ,res) => {
    const id = req.params.id;
    const ticket = req.body;
    pool.query('update ticket set ? where id = ?', [ticket, id], (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }
        res.send({ ...ticket, id });
        console.log("database güncellendi");
    })
})

app.delete("/ticket/:id", (req, res) => {   // silme işlemi için

    const id = req.params.id;
    pool.query('delete from ticket where id = ?', [id], (error, result) => { // pool bizim databaseimiz ve oraya her datayı çağıran bir query yazdık sonuçlar da olumluysa error değilse result olarak geliyor.
        if (error) {                                    //bu yukarıdaki id querydeki soru işareti yerine geçiyor ve onun yerini alıyor
            console.error(error);                       //bu + konularak string ile yapılırdı ama güvenlik ihlalleri yaratırdı.
            res.send(error);
            return;
        }

        res.send({message : "Success"}); 
    });
});



app.listen(PORT, () => { // sunucu aktil olarak dinliyor.
    console.log("Sunucu " + PORT + " portunda ayakta ve dinleme yapıyor...");
})
