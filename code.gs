function myFunction() {
  
  const WEEKDAY = ["อาทิตย์.", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
  const calendar = CalendarApp.getCalendarById("");
  const token = ""; // Line Token 
  var url = "https://notify-api.line.me/api/notify";
  
  let nowDtime = new Date();
  let dtime = Utilities.formatDate(nowDtime, 'Asia/Bangkok', `(${WEEKDAY[nowDtime.getDay()]})dd/MM`);
  var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  var event = calendar.getEventsForDay(today);
  var msg = "";

  if (event.length === 0) {
    msg = "วันนี้ไม่มีกิจกรรม";
  }
  else {
    msg += "📣📣วันนี้ " + dtime + " มีทั้งหมด " + String(event.length) + " กิจกรรม ได้แก่\n\n";
    msg += sendMessage(event);
  }
  var jsonData = {
    message: msg
  }
  var options =
  {
    "method": "post",
    "contentType": "application/x-www-form-urlencoded",
    "payload": jsonData,
    "headers": { "Authorization": "Bearer " + token }
  };
  var response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText('UTF-8'));
}

function sendMessage(events) {
  var msg = "";
  events.forEach(function (event, index) {
    var title = event.getTitle();
    var eventDescription = event.getDescription();
    var start = event.getStartTime().getHours() + ":" + ("0" + event.getStartTime().getMinutes()).slice(-2);
    var end = event.getEndTime().getHours() + ":" + ("0" + event.getEndTime().getMinutes()).slice(-2);
    if (event.isAllDayEvent()) {
      msg += String(index + 1) + ") " + "เวลา : " + " ทั้งวัน" + "\n 🔥เรื่อง : " + title + "\n" + "🔥รายละเอียด :" + eventDescription + "\n\n";
      return msg;
    }
    msg += String(index + 1) + ") " + "เวลา : " + start + " - " + end + " น." + "\n🔥เรื่อง : " + title + "\n" + "🔥รายละเอียด :" + eventDescription + "\n\n";
  });
  return msg;
}
