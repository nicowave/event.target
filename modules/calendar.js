import React from 'react';
// let events = [{}]

class Calendar extends React.Component  {
   constructor(props){
     super(props)

     this.state = {
        events: [
          {
             title: 'All Day Event link: "google.com"',
             start: '2017-05-01',
             allDay: false
          },
          {
             title: 'Long Event',
             start: '2017-05-07',
             end: '2017-05-10',
             allDay: false
          },
          {
             id: 999,
             title: 'Repeating Event',
             start: '2017-05-09T16:00:00',
             url:'http://google.com/',
             allDay: false
          }
        ]
     }

 }


   render(){
     return (
       <div className="container">
        <div id="calendar"></div>
        <hr></hr>
        <div id="listCal"> </div>
       </div>
     )
   }
   componentDidMount() {
    $('#calendar').fullCalendar({
         header: {
             left:   'prev,next',
             center: 'title',
             right:  'month,agendaWeek'
         },
         defaultView: 'month',
         views: {
            listDay: { buttonText: 'list day' },
            listWeek: { buttonText: 'list week' }
         },
         editable: true,
         navLinks: true,
         events: this.state.events,
         editable: true,
         eventClick: function(calEvent, jsEvent, view) {
            //modal perhaps with desciption and location
          alert('Event: ' + calEvent.title);
          alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          // change the border color just for fun
          $(this).css('border-color', 'red');

}
    })
    $('#listCal').fullCalendar({
         header: false,
         defaultView: 'listMonth',
         editable: true,
         navLinks: true,
         events: this.state.events,
         editable: true,
    })

   }

}


export default Calendar;
