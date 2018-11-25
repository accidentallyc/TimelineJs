(function () {
  class TimelineJs {
    start() {}
    at(){}
  }


  if ( 
    typeof module !== 'undefined' && 
    typeof module.exports !== 'undefined') {
    module.exports = TimelineJs;
  }
  else {
    window.TimelineJs = TimelineJs;
  }
})();