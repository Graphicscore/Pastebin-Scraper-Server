$( document ).ready(function() {
    requestStatsInfo();
});

function requestStatsInfo(){
  $.ajax({
  url: "/api/stats",
  success: function( result ) {
    $( "#stat_info" ).html( "<strong>Total count stored : " + result.count + "<br>Total size stored : " + bytesToSize(result.size) + "</strong>" );
  }
});
}

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
