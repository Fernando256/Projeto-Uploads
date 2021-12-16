$(function() {
    $('input[name="daterange"]').daterangepicker({
      open: 'left',
      locale: {
        format: 'DD/MM/YYYY'
      }
    }, function(start, end) {
      console.log("A new date selection was made: " + start.format('DD-MM-YYYY') + ' to ' + end.format('DD-MM-YYYY'));
    });
  });