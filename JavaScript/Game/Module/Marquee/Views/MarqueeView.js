"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarqueeView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const MarqueeController_1 = require("../MarqueeController");
const TARGETPOSITIONOFFSET = 10;
class MarqueeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.tAi = 0),
      (this.iAi = void 0),
      (this.oAi = void 0),
      (this.UBt = void 0),
      (this.rAi = 0),
      (this.nAi = void 0),
      (this.unt = 0),
      (this.sAi = void 0),
      (this.aAi = !0),
      (this.hAi = () => {
        ModelManager_1.ModelManager.MarqueeModel.CurMarquee &&
          (ModelManager_1.ModelManager.MarqueeModel.CurMarquee.RefreshContent(),
          this.hke(ModelManager_1.ModelManager.MarqueeModel.CurMarquee));
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
      this.hAi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TextLanguageChange,
      this.hAi,
    );
  }
  OnStart() {
    const e = ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData();
    e &&
      ((ModelManager_1.ModelManager.MarqueeModel.CurMarquee = e),
      (this.oAi = this.GetItem(1)),
      (this.iAi = this.GetText(0)),
      this.hke(e),
      (this.UBt = this.GetSprite(2)),
      (this.tAi = this.oAi.GetWidth() / 2 + this.UBt.GetWidth()),
      (this.rAi = this.tAi),
      this.iAi.SetAnchorOffsetX(this.rAi),
      (this.unt =
        CommonParamById_1.configCommonParamById.GetIntConfig("marquee_speed")));
  }
  OnTick() {
    const e = ModelManager_1.ModelManager.MarqueeModel.CurMarquee;
    if (e && MarqueeController_1.MarqueeController.CheckCurMarqueeValid(e)) {
      e.Content !== this.sAi?.Content && this.hke(e);
      const i = TimeUtil_1.TimeUtil.GetServerTime();
      const t = ModelManager_1.ModelManager.MarqueeModel.GetNextMarquee();
      if (t && t.BeginTime <= i)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Marquee", 9, "下一条跑马灯到播放时间"),
          MarqueeController_1.MarqueeController.CloseMarqueeView();
      else {
        if (
          this.rAi <
          this.tAi -
            this.oAi.GetWidth() -
            (this.iAi.GetWidth() + this.UBt.GetWidth()) -
            TARGETPOSITIONOFFSET
        ) {
          if ((this.nAi || (this.nAi = i), !(i > this.nAi + e.ScrollInterval)))
            return void (
              this.aAi && (this.RootItem?.SetUIActive(!1), (this.aAi = !1))
            );
          (this.rAi = this.tAi),
            this.iAi.SetAnchorOffsetX(this.rAi),
            ModelManager_1.ModelManager.MarqueeModel.UpdateMarqueeStorageDataByDate(
              e,
            ),
            (this.nAi = void 0),
            this.aAi || (this.RootItem?.SetUIActive(!0), (this.aAi = !0));
        }
        (this.rAi -= this.unt), this.iAi.SetAnchorOffsetX(this.rAi);
      }
    } else MarqueeController_1.MarqueeController.CloseMarqueeView();
  }
  hke(i) {
    let t = (this.sAi = i).Content.replace(/\r\n/g, " ");
    if (t.includes("{EndTime}")) {
      var i =
        ModelManager_1.ModelManager.MarqueeModel.GetMarqueeDataLeftTime(i);
      var i = Math.ceil(i / 60);
      const r =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "ShopMinuteText",
        );
      let e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r);
      (e = e.replace("{0}", i.toString())), (t = t.replace("{EndTime}", e));
    }
    this.iAi.SetText(t);
  }
}
exports.MarqueeView = MarqueeView;
// # sourceMappingURL=MarqueeView.js.map
