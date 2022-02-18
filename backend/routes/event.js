const express = require('express');
const bodyParser = require('body-parser');

const Event = require('../models/events');
const Admin = require('../models/admins');
const fetch = require("cross-fetch");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('',(req,res,next)=>{

  Admin.findById(req.body.admin).then(documents=>{
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      admin: documents.name,
      eventDate: req.body.eventDate,
      eventMonth: req.body.eventMonth,
      currentTime: req.body.currentTime,
      currentAdmin: req.body.currentAdmin
    });
    event.save()
      .then(result => {
        res.status(201).json({
          message: 'Event Created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });


});

router.put("/:id",(req,res,next)=>{
  const event = new Event({
    _id:req.body.id,
    title: req.body.title,
    description: req.body.description,
    admin: req.body.admin,
    eventDate: req.body.eventDate,
    eventMonth: req.body.eventMonth,
    currentTime: req.body.currentTime,
    currentAdmin: req.body.currentAdmin
  });
  Event.updateOne({_id:req.params.id}, event)
    .then(result => {
      res.status(201).json({
        message: 'Event updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('',(req,res,next)=>{
  Event.find()
    .then(documents=>{
      res.status(200).json({
        message: "Languages Listed Successfully",
        events: documents
      });
    });
});

router.get('/:eventDate',(req,res,next)=>{
  let date = req.params.eventDate[0]+ req.params.eventDate[1];
  let month = req.params.eventDate[3]+ req.params.eventDate[4]+ req.params.eventDate[5];
  let tryArray = []
  Event.find({eventMonth: month})
    .then(documents=>{
      tryArray =  documents.filter(x => x.eventDate === date);
      res.status(200).json(tryArray);
    }).catch(err=>{
    res.status(404).json({
      message:"Event not Found"
    });
  });
});

router.get('/upcomingDate/:date',(req,res,next)=>{
  let tomorrow = req.params.date[0] + req.params.date[1];
  let next1 = req.params.date[3] +req.params.date[4];
  let next2 = req.params.date[6] + req.params.date[7];
  let month = req.params.date[9] + req.params.date[10] + req.params.date[11];

  let upcomingArray = [];

  Event.find({eventMonth: month}).then(results=>{
    upcomingArray = results.filter(x => x.eventDate === tomorrow || x.eventDate === next1 || x.eventDate === next2);
    res.status(200).json(upcomingArray);
  }).catch(err=>{
    res.status(404).json({
      message:"Event not Found"
    });
  });


});

router.get('/googleEvents/:google',(req,res,next)=>{
 let overURL= "https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyA9KXE_fHeBmMskNqDlkAmD48bEcVqT73o";

  let googleArray = [];
  fetch(overURL)
    .then(response => response.json())
    .then(data=>{
      googleArray = data.items.filter(x=> x.start.date === req.params.google);
      let googleData =JSON.parse( JSON.stringify(googleArray));
      res.status(200).json({
        message:"Google Event Successfully Found ",
        event: googleData
      });
    })
    .catch(err => {
      console.error(err);
    });

});

router.get('/googleUpcoming/:google',(req,res,next)=>{
  let overURL= "https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyA9KXE_fHeBmMskNqDlkAmD48bEcVqT73o";

  let nextArray = [];
  nextArray = req.params.google.split('-');

  let month = nextArray[1];
  let day = nextArray[2];

  let tomorrow = parseInt(nextArray[2]) +1;
  let next1 = parseInt(nextArray[2]) +2;
  let next2 = parseInt(nextArray[2]) +3;
  let month1 = parseInt(month)+1;

  let tt = '';
  let nn1 = '';
  let nn2 = '';
  let m= month1.toString();
  let mm ='';
  mm = m < 10 ? '0' + m : m;
  let tomorrowDate = '';
  let next1Date = '';
  let next2Date = '';

  if(month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12'){
      if(day === '31'){
        tt = '01';
        nn1 = '02';
        nn2 = '03';
        tomorrowDate = nextArray[0]+ '-' + mm + '-' + tt;
        next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
        next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
      }else if(day === '30'){
        tt = tomorrow.toString();
        nn1 = '01';
        nn2 ='02';
         tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
         next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
         next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
      }else if(day === '29'){
        tt = tomorrow.toString();
        nn1 = next1.toString();
        nn2 = '01';
         tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
         next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
         next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
      }else{
        tt = tomorrow.toString();
        nn1 = next1.toString();
        nn2 = next2.toString();
         tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
         next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
         next2Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn2;
      }
  }else if(month === '04' || month === '06' || month === '09' || month === '11'){
    if(day === '30'){
      tt = '01';
      nn1 = '02';
      nn2 = '03';
       tomorrowDate = nextArray[0]+ '-' + mm + '-' + tt;
       next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
       next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else if(day === '29'){
      tt = tomorrow.toString();
      nn1 = '01';
      nn2 ='02';
       tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
       next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
       next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else if(day === '28'){
      tt = tomorrow.toString();
      nn1 = next1.toString();
      nn2 = '01';
       tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
       next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
       next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else{
      tt = tomorrow.toString();
      nn1 = next1.toString();
      nn2 = next2.toString();
       tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
       next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
       next2Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn2;
    }
  }else{
    if(day === '28'){
      tt = '01';
      nn1 = '02';
      nn2 = '03';
       tomorrowDate = nextArray[0]+ '-' + mm + '-' + tt;
       next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
       next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else if(day === '27'){
      tt = tomorrow.toString();
      nn1 = '01';
      nn2 ='02';
       tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
       next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
       next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else if(day === '26'){
      tt = tomorrow.toString();
      nn1 = next1.toString();
      nn2 = '01';
       tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
       next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
       next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else{
      tt = tomorrow.toString();
      nn1 = next1.toString();
      nn2 = next2.toString();
       tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
       next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
       next2Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn2;
    }
  }

  console.log(tomorrowDate + '----' + next1Date + '----' + next2Date);

  let googleArray = [];
  fetch(overURL)
    .then(response => response.json())
    .then(data=>{
      googleArray = data.items.filter(x=> x.start.date === tomorrowDate || x.start.date === next1Date || x.start.date === next2Date);
      let googleData =JSON.parse( JSON.stringify(googleArray));
      res.status(200).json({
        message:"Google Event Successfully Found ",
        event: googleData
      });
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/modal/:id',(req,res,next)=>{
  Admin.findById(req.params.id)
    .then(documents=>{
      res.status(200).json({
        message: "Admins Listed Successfully",
        adminName: documents.name
      });
    });
});

router.get('/:id',(req,res,next)=>{
  Event.findById(req.params.id).then(event=>{
    if(event){
      res.status(200).json(event);
    }else{
      res.status(404).json({
        message:"Event not Found"
      });
    }
  });
});

router.delete("/:id",(req,res,next)=>{
  Event.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Language Deleted"
    });
  });
});

module.exports = router;
