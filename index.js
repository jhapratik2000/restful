const express=require('express');
const app=express();
const path=require('path');
const { v4: uuid}=require('uuid');



app.get('/tacos',(req,res)=>
{
    res.send("GET /tacos response")
})

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

const comments=[
    {
        id:uuid(),
        username:'Todd',
        comment:'lol that is so funny!'
    },
        {
            id:uuid(),
            username:'Skyler',
            comment:'I like to go birdwatching with my dog'
        },
        {
            id:uuid(),
            username:'Sk8erBoi',
            comment:'Plzz delete your account,Todd'

        },
        {
            id:uuid(),
            username:'onlysaywoof',
            comment:'woof woof woof'
        }
    
]



app.patch('/comments/:id',(req,res)=>
{
   const {id}=req.params;
   
  const newcomment= req.body.comment
   const foundcomment=comments.find(c=>c.id===id)
   foundcomment.comment=newcomment;
res.redirect('/comments')


res.send('we are updating')

})
app.get('/comments',(req,res)=>
{
    res.render('comments/index',{comments})
})

app.post('/comments',(req,res)=>
{
    console.log(req.body);
    const {username,comment}=req.body;
    comments.push({username,comment,id:uuid()})

   res.redirect('/comments');

})
app.get('/comments/new',(req,res)=>
{
    res.render('comments/new')
})
app.get('/comments/:id',(req,res)=>
{
const {id}=req.params;
const comment=comments.find(c=>c.id===id)
res.render('comments/show',{comment});
})
app.get('/comments/:id/edit',(req,res)=>
{
    const {id}=req.params;

    const comment=comments.find(c=>c.id===id);
    res.render('comments/edit',{comment});


})




app.post('/tacos',(req,res)=>
{
    const {meat,qty}=req.body;
    
    //console.log(req.body)
    //res.send("POST /tacos response")
    res.send(`OK,here are your ${qty} ${meat} tacos `)
    
})

app.listen(3000,()=>
{
    console.log("ON PORT 3000!!!")

})