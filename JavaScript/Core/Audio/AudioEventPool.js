"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioEventPool = void 0);
const UE = require("ue"),
  Log_1 = require("../Common/Log"),
  Time_1 = require("../Common/Time"),
  ResourceSystem_1 = require("../Resource/ResourceSystem");
class AudioEventPoolItem {
  constructor() {
    (this.AudioEvent = void 0), (this.LastActiveTime = 0);
  }
  Destroy() {
    this.AudioEvent &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          57,
          "[Core.AudioSystem] 卸载 AudioEvent",
          ["Event", this.AudioEvent.GetName()],
          ["InactiveTime", Time_1.Time.Now - this.LastActiveTime],
        ),
      (this.AudioEvent = void 0));
  }
}
class AudioEventPool {
  constructor() {
    (this.H6 = 0),
      (this.j6 = 1e4),
      (this.W6 = 6e4),
      (this.K6 = new Map()),
      (this.Fta = []),
      (this.Vta = !1),
      (this.Hta = 0);
  }
  async GetAudioEvent(o) {
    return new Promise((t, i) => {
      const s = this.K6.get(o);
      var e;
      s?.AudioEvent?.IsValid()
        ? ((s.LastActiveTime = Time_1.Time.Now), t(s.AudioEvent))
        : ((e = `/Game/Aki/WwiseAudio/Events/${o}.` + o),
          ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AkAudioEvent, (i) => {
            var e;
            i?.IsValid()
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    57,
                    "[Core.AudioSystem] 加载 AudioEvent",
                    ["Event", o],
                  ),
                s
                  ? ((s.AudioEvent = i), (s.LastActiveTime = Time_1.Time.Now))
                  : (((e = new AudioEventPoolItem()).AudioEvent = i),
                    (e.LastActiveTime = Time_1.Time.Now),
                    this.K6.set(o, e),
                    this.Fta.push(o)),
                t(i))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Audio",
                    57,
                    "[Core.AudioSystem] AudioEvent 加载失败",
                    ["Event", o],
                  ),
                t(void 0));
          }));
    });
  }
  Tick(i) {
    if (this.Vta) {
      let i = this.Hta;
      for (; 0 <= i && i > this.Hta - 5; ) {
        var e = this.Fta[i],
          t = this.K6.get(e);
        t?.AudioEvent?.IsValid()
          ? UE.AkGameplayStatics.IsAudioEventActive(t.AudioEvent)
            ? (t.LastActiveTime = Time_1.Time.Now)
            : Time_1.Time.Now - t.LastActiveTime >= this.W6 &&
              (t.Destroy(), this.K6.delete(e), this.Fta.splice(i, 1))
          : (this.K6.delete(e), this.Fta.splice(i, 1)),
          i--;
      }
      i < 0 ? (this.Vta = !1) : (this.Hta = i);
    } else
      (this.H6 += i),
        this.H6 > this.j6 &&
          ((this.Vta = !0), (this.Hta = this.Fta.length - 1), (this.H6 = 0));
  }
}
exports.AudioEventPool = AudioEventPool;
//# sourceMappingURL=AudioEventPool.js.map
