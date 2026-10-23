/**
 * WEDDING WISHES GOOGLE APPS SCRIPT
 * For Meng Senghor & Korng Chanvicheka Wedding Invitation
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Name columns in Row 1:
 *    A1: Date | B1: Name | C1: Message
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code and click Save
 * 5. Click Deploy > New deployment (or Manage deployments > Edit > New version) > Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL and paste it into js/config.js (wishesApiUrl)
 * 
 * Note to clear test wishes:
 * You can simply open your Google Sheet in Google Drive and delete Row 2 and Row 3.
 */

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Clear all wishes if requested: ?action=clear
  if (e && e.parameter && e.parameter.action === 'clear') {
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "All wishes cleared" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var wishes = [];
  
  // Read from Row 2 downwards (skip header row 1)
  for (var i = 1; i < data.length; i++) {
    var dateVal = data[i][0];
    var name = data[i][1];
    var message = data[i][2];
    var timeFormatted = dateVal ? Utilities.formatDate(new Date(dateVal), "Asia/Phnom_Penh", "dd/MM/yyyy HH:mm") : "ថ្មីៗនេះ";
    
    if (name && message) {
      var nameStr = name.toString().trim();
      var msgStr = message.toString().trim();
      
      // Filter out test wishes
      if (nameStr === "តេស្តភ្ញៀវ") continue;
      if (nameStr === "Vicheka" && msgStr.indexOf("សូមឱ្យមានសុភមង្គល ត្រជាក់ត្រជុំ និងទ្រព្យសម្បត្តិហូរហៀរ") !== -1) continue;

      wishes.push({
        name: nameStr,
        message: msgStr,
        time: timeFormatted
      });
    }
  }
  
  // Newest wishes first
  wishes.reverse();
  
  return ContentService.createTextOutput(JSON.stringify(wishes))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var contents = e.postData.contents;
    var parsed = JSON.parse(contents);
    
    // Clear all wishes if requested via POST action: "clear"
    if (parsed.action === 'clear') {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "All wishes cleared" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append new row: Date, Name, Message
    sheet.appendRow([new Date(), parsed.name, parsed.message]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
