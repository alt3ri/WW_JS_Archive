"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarqueeModel =
    exports.MarqueeStorageData =
    exports.MarqueeDatas =
    exports.MarqueeData =
    exports.MarqueeContent =
    exports.MarqueeDataEx =
      void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Json_1 = require("../../../Core/Common/Json"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  MARQUEEPLATFORMPC = 1,
  MARQUEEPLATFORMIOS = 2,
  MARQUEEPLATFORMANDROID = 3;
class MarqueeDataEx extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.id = 0),
      (this.contents = void 0),
      (this.timeInterval = 0),
      (this.times = 0),
      (this.startTimeMs = -0),
      (this.endTimeMs = -0),
      (this.whiteList = void 0),
      (this.platform = void 0),
      (this.channel = void 0);
  }
}
exports.MarqueeDataEx = MarqueeDataEx;
class MarqueeContent {
  constructor() {
    (this.language = ""), (this.content = "");
  }
}
exports.MarqueeContent = MarqueeContent;
class MarqueeData {
  constructor() {
    (this.Id = ""),
      (this.WhiteLists = void 0),
      (this.ModifyTime = -0),
      (this.Content = ""),
      (this.Contents = void 0),
      (this.BeginTime = -0),
      (this.EndTime = -0),
      (this.ScrollInterval = 0),
      (this.ScrollTimes = 0),
      (this.ShowInFight = 0),
      (this.ShowInPhotograph = 0),
      (this.Platform = void 0),
      (this.Channel = void 0);
  }
  RefreshContent() {
    if (this.Contents) {
      let e = void 0;
      for (const t of this.Contents.values())
        if (t.language === LanguageSystem_1.LanguageSystem.PackageLanguage) {
          e = t;
          break;
        }
      e && (this.Content = e.content),
        this.Content ||
          (this.Contents && 0 < this.Contents.length
            ? (this.Content = this.Contents[0].content)
            : (this.Content = ""));
    }
  }
  Phrase(e) {
    (this.Id = e.id.toString()),
      (this.EndTime = e.endTimeMs / 1e3),
      (this.BeginTime = e.startTimeMs / 1e3),
      (this.WhiteLists = e.whiteList),
      (this.ScrollInterval = e.timeInterval),
      (this.ScrollTimes = e.times),
      (this.Contents = e.contents),
      this.RefreshContent(),
      (this.Platform = e.platform),
      (this.Channel = e.channel);
  }
  CheckPlatformAndChannelIfShow() {
    let e = "";
    if (
      (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        (e =
          ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId()),
      this.Channel && 0 < this.Channel.length && !this.Channel.includes(e))
    )
      return !1;
    let t = MARQUEEPLATFORMPC;
    return (
      2 === Info_1.Info.PlatformType
        ? (t = MARQUEEPLATFORMIOS)
        : 1 === Info_1.Info.PlatformType && (t = MARQUEEPLATFORMANDROID),
      !(this.Platform && 0 < this.Platform.length && !this.Platform.includes(t))
    );
  }
}
exports.MarqueeData = MarqueeData;
class MarqueeDatas {
  constructor() {
    this.MarqueeDataArray = void 0;
  }
}
exports.MarqueeDatas = MarqueeDatas;
class MarqueeStorageData {
  constructor(e) {
    (this.ScrollingTime = 0), (this.EndTime = 0), (this.EndTime = e);
  }
}
exports.MarqueeStorageData = MarqueeStorageData;
class MarqueeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.$Ai = void 0),
      (this.YAi = new Array()),
      (this.JAi = new Map());
  }
  static get TimerId() {
    return MarqueeModel.zAi;
  }
  static set TimerId(e) {
    MarqueeModel.zAi = e;
  }
  get CurMarquee() {
    return this.$Ai;
  }
  set CurMarquee(e) {
    this.$Ai = e;
  }
  get MarqueeQueue() {
    return this.YAi;
  }
  OnClear() {
    return (
      this.RemoveAllMarqueeData(),
      this.JAi.clear(),
      void 0 !== MarqueeModel.TimerId &&
        (TimerSystem_1.TimerSystem.Remove(MarqueeModel.TimerId),
        (MarqueeModel.TimerId = void 0)),
      !0
    );
  }
  InitMarqueeStorageDataMap() {
    this.JAi =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MarqueeScrollingMap,
      ) ?? new Map();
  }
  AddOrUpdateMarqueeDate(r) {
    if (r.CheckPlatformAndChannelIfShow()) {
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      if (!(r.EndTime <= e)) {
        var t = this.GetScrollingTime(r);
        if (!(t >= r.ScrollTimes)) {
          let t = -1;
          for (let e = 0; e < this.YAi.length; e++)
            this.YAi[e].Id === r.Id && (t = e);
          0 <= t
            ? ((this.YAi[t] = r), 0 === t && (this.$Ai = r))
            : this.YAi.push(r),
            this.ZAi(r),
            this.CleanMarqueeStorageDataMap(e),
            this.ePi();
        }
      }
    }
  }
  CleanMarqueeStorageDataMap(e) {
    var t,
      r,
      i = new Array();
    for ([t, r] of this.JAi) r.EndTime <= e && i.push(t);
    for (const s of i) this.JAi.delete(s);
  }
  UpdateMarqueeStorageDataByDate(e) {
    let t = this.GetMarqueeStorageData(e);
    (t = t || this.ZAi(e)).ScrollingTime++, this.ePi();
  }
  GetScrollingTime(e) {
    return this.GetMarqueeStorageData(e)?.ScrollingTime ?? 0;
  }
  GetMarqueeStorageData(e) {
    return this.JAi.get(e.Id);
  }
  ZAi(e) {
    let t = this.GetMarqueeStorageData(e);
    return (
      t
        ? (t.EndTime = e.EndTime)
        : ((t = new MarqueeStorageData(e.EndTime)), this.JAi.set(e.Id, t)),
      t
    );
  }
  ePi() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MarqueeScrollingMap,
      this.JAi,
    );
  }
  PeekMarqueeData() {
    if (this.YAi && !(this.YAi.length <= 0)) return this.YAi[0];
  }
  GetNextMarquee() {
    if (this.YAi && !(this.YAi.length <= 1)) return this.YAi[1];
  }
  RemoveMarqueeData(t) {
    for (let e = 0; e < this.YAi.length; e++) {
      var r = this.YAi[e];
      if (r.Id === t) return this.YAi.splice(e, 1), r;
    }
  }
  RemoveAllMarqueeData() {
    (this.$Ai = void 0), (this.YAi = new Array());
  }
  SortMarqueeQueue() {
    this.YAi?.sort((e, t) => e.BeginTime - t.BeginTime);
  }
  GetMarqueeDataLeftTime(e) {
    let t = Number(e.EndTime) - TimeUtil_1.TimeUtil.GetServerTime();
    return (t = t <= 0 ? 1 : t);
  }
}
(exports.MarqueeModel = MarqueeModel).zAi = void 0;
//# sourceMappingURL=MarqueeModel.js.map
