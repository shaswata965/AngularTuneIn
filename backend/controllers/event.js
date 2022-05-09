const Admin = require("../models/admins");
const Event = require("../models/events");
const fetch = require("cross-fetch");
const Actor = require("../models/actors");

exports.createEvent = (req,res,next)=>{

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
};

exports.updateEvent = (req,res,next)=>{
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
};

exports.getEvent = (req,res,next)=>{
  Event.find()
    .then(documents=>{
      res.status(200).json({
        message: "Languages Listed Successfully",
        events: documents
      });
    });
};

exports.eventDate = (req,res,next)=>{
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
};

exports.upcomingDate = (req,res,next)=>{
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
};

exports.googleDate = (req,res,next)=>{
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

};

exports.googleUpcoming  = (req,res,next)=>{
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
      tt = '0' + tomorrow.toString();
      nn1 = '01';
      nn2 ='02';
      tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
      next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
      next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else if(day === '29'){
      tt = '0' + tomorrow.toString();
      nn1 = '0' + next1.toString();
      nn2 = '01';
      tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
      next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
      next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else{
      tt = '0' + tomorrow.toString();
      nn1 = '0' + next1.toString();
      nn2 = '0' + next2.toString();
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
      tt = '0' + tomorrow.toString();
      nn1 = '01';
      nn2 ='02';
      tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
      next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
      next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else if(day === '28'){
      tt = '0' + tomorrow.toString();
      nn1 = '0' + next1.toString();
      nn2 = '01';
      tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
      next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
      next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else{
      tt = '0' + tomorrow.toString();
      nn1 = '0' + next1.toString();
      nn2 = '0' + next2.toString();
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
      tt = '0' + tomorrow.toString();
      nn1 = '01';
      nn2 ='02';
      tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
      next1Date = nextArray[0]+ '-' + mm + '-' + nn1;
      next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else if(day === '26'){
      tt = '0' + tomorrow.toString();
      nn1 = '0' + next1.toString();
      nn2 = '01';
      tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
      next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
      next2Date = nextArray[0]+ '-' + mm + '-' + nn2;
    }else{
      tt = '0' + tomorrow.toString();
      nn1 = '0' + next1.toString();
      nn2 = '0' + next2.toString();
      tomorrowDate = nextArray[0]+ '-' + nextArray[1] + '-' + tt;
      next1Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn1;
      next2Date = nextArray[0]+ '-' + nextArray[1] + '-' + nn2;
    }
  }

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
};

exports.getEventAdmin = (req,res,next)=>{
  Admin.findById(req.params.id)
    .then(documents=>{
      res.status(200).json({
        message: "Admins Listed Successfully",
        adminName: documents.name
      });
    });
};

exports.findEvent = (req,res,next)=>{
  Event.findById(req.params.id).then(event=>{
    if(event){
      res.status(200).json(event);
    }else{
      res.status(404).json({
        message:"Event not Found"
      });
    }
  });
};

exports.birthdayEvent = (req,res,next)=>{
  let day = req.params.eventDate[0]+req.params.eventDate[1];
  let mm = req.params.eventDate[3]+req.params.eventDate[4]+req.params.eventDate[5];
  let month ='';
  switch(mm){
    case 'Jan':
      month = '01';
      break;
    case 'Feb':
      month = '02';
      break;
    case 'Mar':
      month = '03';
      break;
    case 'Apr':
      month = '04';
      break;
    case 'May':
      month = '05';
      break;
    case 'Jun':
      month = '06';
      break;
    case 'Jul':
      month = '07';
      break;
    case 'Aug':
      month = '08';
      break;
    case 'Sep':
      month = '09';
      break;
    case 'Oct':
      month = '10';
      break;
    case 'Nov':
      month = '11';
      break;
    case 'Dec':
      month = '12';
  }
  let actorArray = [];

  Actor.find({birthMonth: month}).then(result=>{
    if(result){
      actorArray = result.filter(x=> x.birthDay === day);
      res.status(200).json(actorArray);
    }else{
      res.status(404).json({
        message:"Actor not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });

};

exports.upcomingBirthday = (req,res,next)=>{
  let d1 = req.params.eventDate[0]+req.params.eventDate[1];
  let d2 = req.params.eventDate[3]+req.params.eventDate[4];
  let d3 = req.params.eventDate[6]+req.params.eventDate[7];
  let mm = req.params.eventDate[9]+req.params.eventDate[10]+req.params.eventDate[11];
  let month ='';
  switch(mm){
    case 'Jan':
      month = '01';
      break;
    case 'Feb':
      month = '02';
      break;
    case 'Mar':
      month = '03';
      break;
    case 'Apr':
      month = '04';
      break;
    case 'May':
      month = '05';
      break;
    case 'Jun':
      month = '06';
      break;
    case 'Jul':
      month = '07';
      break;
    case 'Aug':
      month = '08';
      break;
    case 'Sep':
      month = '09';
      break;
    case 'Oct':
      month = '10';
      break;
    case 'Nov':
      month = '11';
      break;
    case 'Dec':
      month = '12';
  }
  let actorArray = [];

  Actor.find({birthMonth: month}).then(result=>{
    if(result){
      actorArray = result.filter(x=> x.birthDay === d1 || x.birthDay === d2 || x.birthDay === d3);
      res.status(200).json(actorArray);
    }else{
      res.status(404).json({
        message:"Actor not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });

};

exports.deleteEvent = (req,res,next)=>{
  Event.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Language Deleted"
    });
  });
};
