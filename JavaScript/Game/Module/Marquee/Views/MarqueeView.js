"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarqueeView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  MarqueeController_1 = require("../MarqueeController"),
  TARGETPOSITIONOFFSET = 10;
class MarqueeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.tPi = 0),
      (this.iPi = void 0),
      (this.oPi = void 0),
      (this.xbt = void 0),
      (this.rPi = 0),
      (this.nPi = void 0),
      (this.Ist = 0),
      (this.sPi = void 0),
      (this.aPi = !0),
      (this.hPi = () => {
        ModelManager_1.ModelManager.MarqueeModel.CurMarquee &&
          (ModelManager_1.ModelManager.MarqueeModel.CurMarquee.RefreshContent(),
          this.T2e(ModelManager_1.ModelManager.MarqueeModel.CurMarquee));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UISprite],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TextLanguageChange,
      this.hPi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TextLanguageChange,
      this.hPi,
    );
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData();
    e &&
      ((ModelManager_1.ModelManager.MarqueeModel.CurMarquee = e),
      (this.oPi = this.GetItem(1)),
      (this.iPi = this.GetText(0)),
      this.T2e(e),
      (this.xbt = this.GetSprite(2)),
      (this.tPi = this.oPi.GetWidth() / 2 + this.xbt.GetWidth()),
      (this.rPi = this.tPi),
      this.iPi.SetAnchorOffsetX(this.rPi),
      (this.Ist =
        CommonParamById_1.configCommonParamById.GetIntConfig("marquee_speed")));
  }
  OnTick() {
    var e = ModelManager_1.ModelManager.MarqueeModel.CurMarquee;
    if (e && MarqueeController_1.MarqueeController.CheckCurMarqueeValid(e)) {
      e.Content !== this.sPi?.Content && this.T2e(e);
      var i = TimeUtil_1.TimeUtil.GetServerTime(),
        t = ModelManager_1.ModelManager.MarqueeModel.GetNextMarquee();
      if (t && t.BeginTime <= i)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Marquee", 9, "下一条跑马灯到播放时间"),
          MarqueeController_1.MarqueeController.CloseMarqueeView();
      else {
        if (
          this.rPi <
          this.tPi -
            this.oPi.GetWidth() -
            (this.iPi.GetWidth() + this.xbt.GetWidth()) -
            TARGETPOSITIONOFFSET
        ) {
          if ((this.nPi || (this.nPi = i), !(i > this.nPi + e.ScrollInterval)))
            return void (
              this.aPi && (this.RootItem?.SetUIActive(!1), (this.aPi = !1))
            );
          (this.rPi = this.tPi),
            this.iPi.SetAnchorOffsetX(this.rPi),
            ModelManager_1.ModelManager.MarqueeModel.UpdateMarqueeStorageDataByDate(
              e,
            ),
            (this.nPi = void 0),
            this.aPi || (this.RootItem?.SetUIActive(!0), (this.aPi = !0));
        }
        (this.rPi -= this.Ist), this.iPi.SetAnchorOffsetX(this.rPi);
      }
    } else MarqueeController_1.MarqueeController.CloseMarqueeView();
  }
  T2e(i) {
    let t = (this.sPi = i).Content.replace(/\r\n/g, " ");
    if (t.includes("{EndTime}")) {
      var i =
          ModelManager_1.ModelManager.MarqueeModel.GetMarqueeDataLeftTime(i),
        i = Math.ceil(i / 60),
        r =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ShopMinuteText",
          );
      let e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
      (e = e.replace("{0}", i.toString())), (t = t.replace("{EndTime}", e));
    }
    this.iPi.SetText(t);
  }
}
exports.MarqueeView = MarqueeView;
//# sourceMappingURL=MarqueeView.js.map
