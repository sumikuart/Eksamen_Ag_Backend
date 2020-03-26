const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 6464
const mongoose = require('mongoose')
const myRoutes = express.Router();
const multer = require('multer');

app.use(cors());
app.use(bodyparser.json())

app.listen(PORT, function(){
    console.log('Server is running on: ' + PORT)  
})


//*************************************************************** */ Database connection håndtering. 
mongoose.connect('mongodb://127.0.0.1:27017/eksamen_animalcare_group', { useNewUrlParser: true, useUnifiedTopology:true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log('mongodb connection complete')
})

app.use('',myRoutes);

//*************************************************************** */ Set up Models
let aboutmodel = require('./model/about.model.js');
let volunteersmodel = require('./model/volunteers.model.js');
let newslettermodel = require('./model/newsletter.model.js');
let adoptmodel = require('./model/adopt.model.js');
let animalsmodel = require('./model/animals.model.js');
let adminsmodel = require('./model/admin.model.js');

//*************************************************************** */ About Håndtering. 
// hent
myRoutes.route('/get/about').get(function(req,res){
    aboutmodel.find({},function(err, about){
        if(err) {
            console.log(err)
        } else {
            res.json(about)
        }
        
    })
})

// Opdatere

myRoutes.route('/edit/about/:id').post(function(req,res){
        aboutmodel.findById(req.params.id, function(err, about){
        if (!about) {
            res.status(400).send('data not found')
        } else {
            about.id = req.body.id
            about.title_1 = req.body.title_1
            about.content_1 = req.body.content_1
            about.title_2 = req.body.title_2
            about.content_2 = req.body.content_2
            about.title_3 = req.body.title_3
            about.content_3 = req.body.content_3

            about.save().then(about => {  
                res.json('About Update')
            }).catch(err => {
                res.status(400).send("update fail.")
            })
        }
    })
});

//*************************************************************** */ Volunteers Håndtering. 

myRoutes.route('/get/volunteers').get(function(req,res){
    volunteersmodel.find({},function(err, volunteers){
        if(err) {
            console.log(err)
        } else {
            res.json(volunteers)
        }
        
    })
})

//*************************************************************** */ NewsLetter Håndtering. 

myRoutes.route('/get/newslettermail').get(function(req,res){
    newslettermodel.find({},function(err, newsletter){
        if(err) {
            console.log(err)
        } else {
            res.json(newsletter)
        }
        
    })
})

myRoutes.route('/add/newslettermail').post(function(req,res){
    let newemail = new newslettermodel(req.body);

    newemail.save().then(user =>{
        res.status(200).json({'email':' Added'})
    }).catch(err => {
        res.status(400).send('add new email Fail')
    })
})

//*************************************************************** */ Adopt Håndtering. 

myRoutes.route('/get/adopt').get(function(req,res){
    adoptmodel.find({},function(err, adopt){
        if(err) {
            console.log(err)
        } else {
            res.json(adopt)
        }
        
    })
})

//*************************************************************** */ Animals Håndtering. 

//---------------------------hent animal
// Alle Dyr
myRoutes.route('/get/animals').get(function(req,res){
    animalsmodel.find({},function(err, adopt){
        if(err) {
            console.log(err)
        } else {
            res.json(adopt)
        }
        
    })
})


//---------------------------detaljer animal

//detaljeVisning Håndtering. 
myRoutes.route('/get/animal/:id').get(function(req,res){
    let animal_id = req.params.id;

    animalsmodel.find({"_id": animal_id}  ,function(err, currentAnimal){
        if(err){
            console.log('hej')
        } else {
            res.json(currentAnimal)
        }
    })
})


//---------------------------opdater animal

//opdatere animal
myRoutes.route('/edit/animal/:id').post(function(req,res){
    animalsmodel.findById(req.params.id, function(err, animal){
    if (!animal) {
        res.status(400).send('data not found')
    } else {
        animal.id = req.body.id
        animal.title = req.body.title
        animal.content = req.body.content
        animal.image = req.body.image
        animal.daysInCare = req.body.daysInCare
        animal.age = req.body.age
        animal.sex = req.body.sex
        animal.details = req.body.details

        animal.save().then(animal => {  
            res.json('Animal Update')
        }).catch(err => {
            res.status(400).send("update fail.")
        })
    }
})
});


//---------------------------opret animal

// SET UP UPLOADE: 
// først hvor den skal gemmes og hvordan navent skal være
var storagevar = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets/animals');
    },
    filename: function (req, file, cb){
        cb(null,file.originalname)
    }
});

// Sætter vi uploade single functionen op. den høre til singeluploade.component:
var upload = multer({ storage:storagevar}).single('file');

// forbinder med frontend omkring Billeder:
app.post('/add/animalImage', function(req, res){
    upload(req, res, function(err){
        if(err){
            console.log('An error has accurd in single upload post function');
            return res.status(500).json(err)
        }

        return res.status(200).send(req.file)
    })
})

// forbinder med frontend omkring resten af data:
myRoutes.route('/add/Animal').post(function(req, res){

    let animalData = new animalsmodel(req.body);

    animalData.save().then(n => {
        res.status(200).json('Animal Added')
    }).catch(err => {
        res.status(400).send('an Error has accured in -add Animal- ')
    })
})


//---------------------------Delete animal

myRoutes.delete('/delete/animal/:id', function(req, res){
    animalsmodel.findByIdAndRemove(req.params.id, (err, user) => {
        if(err){
            console.log('An Error has accurd in -delete/animal/id-  endpoint');
            return res.status(500).send('an Error has accured in status(500) in-delete/animal/id- endpoint(delete part)')
        }

        const response ={
            massage: "Animal is deleted",
            id:user._id
        }

        return res.status(200).send(response)
    })
})



//*************************************************************** */ Admin Håndtering. 
myRoutes.route('/get/admin').get(function(req,res){
    adminsmodel.find({},function(err, admin){
        if(err) {
            console.log(err)
        } else {
            res.json(admin)
        }
        
    })
})

