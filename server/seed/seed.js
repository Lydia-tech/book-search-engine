const { ObjectId } = require('mongodb');
const { Mongoose } = require('mongoose');
require('dotenv').config();


const db= require('../config/connection');
const User = require('../models/User');

const users = [
    {
      _id: new ObjectId('5d378db94e84753160e08b30'),
      username: 'Bob Smith',
      email: 'bobbys@gmail.com',
      password: 'strongpassword1234',
      savedBooks:   [
          {
              bookId: "hHUsHOHqVzEC",
              title: "Cat in the hat",
              author: ["James Surowiecki"],
              image: "http://books.google.com/books/content?id=hHUsHOHqVzEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
              link: "https://www.googleapis.com/books/v1/volumes/hHUsHOHqVzEC",
              description: "In this fascinating book, New Yorker business columnist James Surowiecki explores a deceptively simple idea: Large groups of people are smarter than an elite few, no matter how brilliant—better at solving problems, fostering innovation, coming to wise decisions, even predicting the future. With boundless erudition and in delightfully clear prose, Surowiecki ranges across fields as diverse as popular culture, psychology, ant biology, behavioral economics, artificial intelligence, military history, and politics to show how this simple idea offers important lessons for how we live our lives, select our leaders, run our companies, and think about our world."
          }
      ]
    }
    // {
    //     _id: new ObjectId('5d378db94e84753160e08b31')  
    // },
    // {
    //     _id: new ObjectId('5d378db94e84753160e08b32') 
    // }
]
const seed = async () => {
    try {
        console.log(`[seed]: running...`);

        const dbConnect = await db();
        dbConnect();
        for (const user of users) {
            await User.create(user);
        }
        console.log('[seed]: success')
    } catch(err) {
    throw new Error('failed to seed database')
    }
}
seed();


// db.once('open', async () => {
//     await  User.deleteMany({});

//     const bookDataArr = [];
//     const userDataArr = [];
//     for (let i = 0; i < 20; i++) {
//         const title = faker.savedBooks.title.paragraph(1);
//         const author = faker.savedBooks.author.lastName(1);
//         const description = faker.savedBooks.description.paragraph(5);
//         const image = faker.savedBooks.image.imageUrl();
//         const link = faker.savedBooks.link.slug(title.length ?? 6);
//         const bookId = faker.savedBooks.bookId.id();
//         bookDataArr.push({ title, author, description, image, link, bookId });
//     }
//     for (let i=0; i<20; i++) {
//         const username = faker.username.userName();
//         const password = faker.password.password();
//         const email = faker.email.email();
//         const savedBooks = bookDataArr.slice(0,5);
//         userDataArr.push({ username, password, email, savedBooks })
//     }
//     await User.collection.insertMany(userDataArr);
//     console.log(`[seeded]`);
//     process.exit(0);
// })
