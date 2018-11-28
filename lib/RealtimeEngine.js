(function () {
  class RealtimeEngine {
    constructor () {
      this.setFps(12);
      this._timeElapsed = 0;
      this._running = false;
    }

    setCallback(callback) { this._callback = callback; }
    runCallbacks(...args) { this._callback(...args); }

    start() {
      this._running = true;
      this.next();
    }

    stop() {
      this._running = false;
    }

    setFps(fps) {
      this._fps = fps;
      this._frameDelta = Math.round(1000 / fps);
    }


    next() {
      if( !this._running ) return;
      setTimeout(() => {

        this.runCallbacks(this._timeElapsed);
        this._timeElapsed += this._frameDelta;
        
        this.next();
      }, this._frameDelta);
    }
  }


  if ( 
    typeof module !== 'undefined' && 
    typeof module.exports !== 'undefined') {
    module.exports = RealtimeEngine;
  }
  else {
    window.RealtimeEngine = RealtimeEngine;
  }
})();