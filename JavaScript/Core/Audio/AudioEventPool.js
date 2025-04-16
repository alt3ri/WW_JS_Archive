"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioEventPool = void 0);
const UE = require("ue"),
  Log_1 = require("../Common/Log"),
  Time_1 = require("../Common/Time"),
  ResourceSystem_1 = require("../Resource/ResourceSystem");
class AudioEventPoolItem {
  constructor(e, i) {
    (this.AudioEvent = void 0),
      (this.LastActiveTime = 0),
      (this.AudioEvent = e),
      (this.LastActiveTime = i ?? Time_1.Time.Now);
  }
  UpdateEvent(e) {
    e && (this.AudioEvent = e), (this.LastActiveTime = Time_1.Time.Now);
  }
  Destroy() {
    this.AudioEvent &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          56,
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
      (this.ctl = new Map()),
      (this.Fta = []),
      (this.Vta = !1),
      (this.Hta = 0);
  }
  PreloadAudioEvent(i) {
    var e;
    this.ctl.has(i) ||
      ((e = `/Game/Aki/WwiseAudio/Events/${i}.` + i),
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AkAudioEvent, (e) => {
        e?.IsValid()
          ? this.ctl.has(i) ||
            (this.ctl.set(i, e),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Core.AudioEventPool] 预加载 AudioEvent",
                ["Event", i],
              ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Audio",
              42,
              "[Core.AudioEventPool] AudioEvent 加载失败",
              ["Event", i],
            );
      }));
  }
  ReleaseAudioEvent(e) {
    this.ctl.has(e) &&
      (this.ctl.delete(e), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Audio",
        42,
        "[Core.AudioEventPool] 预加载内容卸载 AudioEvent",
        ["Event", e],
      );
  }
  async GetAudioEvent(s) {
    return new Promise((t, e) => {
      const o = this.K6.get(s);
      var i;
      o?.AudioEvent?.IsValid()
        ? ((o.LastActiveTime = Time_1.Time.Now), t(o.AudioEvent))
        : ((i = `/Game/Aki/WwiseAudio/Events/${s}.` + s),
          ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AkAudioEvent, (e) => {
            var i;
            e?.IsValid()
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    56,
                    "[Core.AudioSystem] 加载 AudioEvent",
                    ["Event", s],
                  ),
                o
                  ? o.UpdateEvent(e)
                  : ((i = new AudioEventPoolItem(e)),
                    this.K6.set(s, i),
                    this.Fta.push(s)),
                t(e))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Audio",
                    56,
                    "[Core.AudioSystem] AudioEvent 加载失败",
                    ["Event", s],
                  ),
                t(void 0));
          }));
    });
  }
  Tick(e) {
    if (this.Vta) {
      let e = this.Hta;
      for (; 0 <= e && e > this.Hta - 5; ) {
        var i = this.Fta[e],
          t = this.K6.get(i);
        t?.AudioEvent?.IsValid()
          ? UE.AkGameplayStatics.IsAudioEventActive(t.AudioEvent)
            ? (t.LastActiveTime = Time_1.Time.Now)
            : Time_1.Time.Now - t.LastActiveTime >= this.W6 &&
              (t.Destroy(), this.K6.delete(i), this.Fta.splice(e, 1))
          : (this.K6.delete(i), this.Fta.splice(e, 1)),
          e--;
      }
      e < 0 ? (this.Vta = !1) : (this.Hta = e);
    } else
      (this.H6 += e),
        this.H6 > this.j6 &&
          ((this.Vta = !0), (this.Hta = this.Fta.length - 1), (this.H6 = 0));
  }
}
exports.AudioEventPool = AudioEventPool;
//# sourceMappingURL=AudioEventPool.js.map
