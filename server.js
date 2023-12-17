const express = require('express');
const mongoose = require('mongoose');
const Registeruser=require('./model');
const middleware = require('./middleware');
const Msgmodel=require('./MsgModel')
const jwt= require('jsonwebtoken');
const cors =require('cors')
const app = express();
const bcrypt=require('bcrypt')


app.use (express.json());
app.use(cors({origin:"*"}));

app.post('/register', async (req, res) => {
    try {
        const { username, email, password,confirmpassword } = req.body;
        let exist = await Registeruser.findOne({email})
        if (exist) {
        return res.status(400).send('user already exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('passwords are not matching');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new Registeruser({
            username,
            email,
            password: hashedPassword,
            confirmpassword:hashedPassword,
        });
        await newUser.save();
        res.status(200).send({ message: 'Registered Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})


app.post('/login',  async (req, res) => {
    try {
        const { email, password } = req.body;
        let exist = await Registeruser.findOne({ email });
        if (!exist) {
            return res.status(400).json({ error: 'User Not Found' });
        }
        const passwordMatch = await bcrypt.compare(password, exist.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: exist.id
            }
        };
        const token = jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('user not found');
        }
        res.json(exist);
    }
        catch(err){
            console.log(err)
            return res.status(500).send('server error') 
        
    }
})

app.get('/',(req,res)=>{
    res.send('hello world')
})


mongoose
  .connect('mongodb+srv://admin:12345@cluster1.hbpzlns.mongodb.net/Mynew_db?retryWrites=true&w=majority')
  .then(() => console.log('DB connected'))
  .catch((err) => console.error(err));

app.listen(5000,()=>{
    console.log('Server running....')
})
app.post('/addmsg',middleware,async(req,res)=>{
  try{
    const{text}=req.body;
    const exist= await Registeruser.findById(req.user.id);
    let newmsg = new Msgmodel({
        user:req.user.id,
        username:exist.username,
        text
    })
    await newmsg.save();
    let allmsg= await Msgmodel.find();
    return res.json(allmsg)
  }
  catch(err){
    console.log(err);
    return res.status(500).send('server error')
  }

})

app.get('/getmsg',middleware,async(req,res)=>{
    try{
        let allmsg = await Msgmodel.find();
        return res.json(allmsg)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server error')
    }
})


app.delete('/deletemsg/:msgId', middleware, async (req, res) => {
    try {
        const msgId = req.params.msgId;
        
        const msg = await Msgmodel.findById(msgId);
        if (!msg) {
            return res.status(404).send('Message not found');
        }

        if (msg.user.toString() !== req.user.id) {
            return res.status(403).send('You do not have permission to delete this message');
        }

        await Msgmodel.findByIdAndDelete(msgId);

        res.status(200).send('Message deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

