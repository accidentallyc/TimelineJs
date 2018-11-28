(function () {
  class FPSEngine {
    start() {

    }
  }


  if ( 
    typeof module !== 'undefined' && 
    typeof module.exports !== 'undefined') {
    module.exports = FPSEngine;
  }
  else {
    window.FPSEngine = FPSEngine;
  }
})();