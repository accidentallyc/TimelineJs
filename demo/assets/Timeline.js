(function () {
  // TimelineJs.RxSec = /^(\d+)\s*(?:s|sec|secs|second|seconds)$/;
  // TimelineJs.RxMin = /^(\d+)\s*(?:m|min|mins|minute|minutes)$/;
  // TimelineJs.RxHr = /^(\d+)\s*(?:h|hr|hrs|hour|hours)$/;

  const TLRx = {
    HHMMSS : /^\d+:\d+(:\d+)?$/g,
    Shorthand :/\d+\s*(\w+)/g,
  };

  const TLUtils = {

  };


  class TimelineJs {
    constructor() {
      this._events = {};
      this._onTick = Function.prototype;
    }

    start() {
      this._engine.start();
    }

    getMsTime(_timeMs_) {
      const fps = this._engine._frameDelta;
      const timeMs = Math.round(_timeMs_ / fps) * fps;
      return timeMs;
    }

    getEventFromMs(timeMs) {
      return (this._events[timeMs] = this._events[timeMs] || []);
    }

    onTick(callback) {
      this._onTick = callback;
      return this;
    }


    at(time, callback){
      const type = typeof time;

      switch(type) {
        case 'number':
          this.atMs(time, callback);
          break;
        case 'string':
          // 00:00:00
          if( time.match(TLRx.HHMMSS) ) {
            this.atHHMMSS(time, callback);
            break;
          }
          // 0hrs 0min
          else if (time.match(TLRx.Shorthand)) {
            this.atTime(time, callback);
            break;
          }
        default:
          throw new Error(`at(${time}) received a string with an unknown format`);
      }

      return this;
    }

    atMs(_timeMs_,callback) {
      const timeMs = this.getMsTime(_timeMs_);
      this
        .getEventFromMs(timeMs)
        .push(callback);

      return this;
    }

    atHHMMSS(timeStr,callback) {
      // const timeStr = 
    }

    // or at shorthand
    atTime(timeStr, callback) {
      const terms = timeStr.match(TLRx.Shorthand);
      let finalValue = 0;
      for (let i = terms.length - 1; i >= 0; i--) {
        const [term,value,unit] = terms[i].match(/(\d+)(\w+)/);
        switch(unit) {
          case 's':
          case 'sec':
          case 'secs':
          case 'second':
          case 'seconds':
            finalValue += value * 1000
            break;
          case 'm':
          case 'min': 
          case 'mins': 
          case 'minute':
          case 'minutes':
            finalValue += value * 1000 * 60
            break;
          case 'h':
          case 'hr':
          case 'hrs':
          case 'hour':
          case 'hours':
            finalValue += value * 1000 * 60 * 60;
            break;
        }
      }
      return this.atMs(finalValue, callback);
    }

    _handleTick (timeElapsed) {
      const events = this._events[timeElapsed];
      if( events ) {
        for (var i = events.length - 1; i >= 0; i--) {
          events[i].call(this,timeElapsed);
        }
      }

      this._onTick.call(this,timeElapsed);
    }


    setFps (fps) {
      this._engine.setFps(fps);
      return this;
    }

    setEngine(engine) { 
      this._engine = engine;  
      this._engine.setCallback(this._handleTick.bind(this));
      return this;
    }
  }

  TimelineJs.STOP = function () {
    this._engine.stop();
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