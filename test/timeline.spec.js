const TimelineJs = require("../lib/Timeline.js");
describe("TimelineJs", () => {
  let timeline;

  beforeEach(() => { timeline = new TimelineJs; });

  const sayHello = ( currentTime ) => {
    return
  }

  describe("Ticker Events", () => {
    xit("Should have the events called back at the correct time", async () => { 
      const  callbackStub = {
        call1 : Function.prototype,
        call2 : Function.prototype,
        call3 : Function.prototype,
      };

      spyOn( callbackStub, "call1");
      spyOn( callbackStub, "call2");
      spyOn( callbackStub, "call3");

      timeline.fps = 10;
      timeline.at(100,  callbackStub.call1 );
      timeline.at(200,  callbackStub.call2 );
      timeline.at(300,  callbackStub.call3 );

      expect(callbackStub.call1).not.toHaveBeenCalled();
      expect(callbackStub.call2).not.toHaveBeenCalled();
      expect(callbackStub.call3).not.toHaveBeenCalled();

      timeline.start();

      await pause(101);
      expect(callbackStub.call1).toHaveBeenCalledWith(100);
      expect(callbackStub.call2).not.toHaveBeenCalled();
      expect(callbackStub.call3).not.toHaveBeenCalled();

      await pause(201);
      expect(callbackStub.call2).toHaveBeenCalledWith(200);
      expect(callbackStub.call3).not.toHaveBeenCalled();

      await pause(301);
      expect(callbackStub.call3).toHaveBeenCalledWith(300);
    });
  });
}); 