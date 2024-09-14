"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsCurrencyItem = void 0);
const puerts_1 = require("puerts"),
  TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem"),
  CommonCurrencyItem_1 = require("../../../../../../Common/CommonCurrencyItem"),
  MoonChasingDefine_1 = require("../../MoonChasingDefine");
class BusinessTipsCurrencyItem extends CommonCurrencyItem_1.CommonCurrencyItem {
  constructor() {
    super(...arguments),
      (this.TweenerChangeDelegate = void 0),
      (this.CurrencyCountTweener = void 0),
      (this.GOe = void 0),
      (this.Owa = (e) => {
        this.RefreshCountText(e.toString());
      });
  }
  OnStart() {
    super.OnStart(),
      (this.TweenerChangeDelegate = (0, puerts_1.toManualReleaseDelegate)(
        this.Owa,
      ));
  }
  AddEventListener() {}
  RemoveEventListener() {}
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.xHe();
  }
  PlayReduceTweener(e, s) {
    void 0 !== this.GOe && this.xHe();
    let t = 0,
      i = e;
    const r = MoonChasingDefine_1.BUSINESS_TIPS_CURRENCY_TWEEN_TIME;
    this.GOe = TimerSystem_1.TimerSystem.Forever((e) => {
      t = Math.min(t + e, r);
      e = i + Math.floor((s - i) * (e / r) * Math.random());
      (i = e),
        this.RefreshCountText(e.toString()),
        t >= r && (this.RefreshCountText(s.toString()), this.xHe());
    }, TimerSystem_1.MIN_TIME);
  }
  xHe() {
    this.GOe &&
      TimerSystem_1.TimerSystem.Has(this.GOe) &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
}
exports.BusinessTipsCurrencyItem = BusinessTipsCurrencyItem;
//# sourceMappingURL=BusinessTipsCurrencyItem.js.map
