"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashUpgradeSuccessView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CalabashUpgradeSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.wvt = !1),
      (this.Bvt = !1),
      (this.bvt = !1),
      (this.qvt = 0),
      (this.Gvt = 0),
      (this.Nvt = 0),
      (this.Ovt = 0),
      (this.kvt = 0),
      (this.Fvt = void 0),
      (this.Vvt =
        CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayTime")),
      (this.Hvt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ExpDisplayCloseTime",
      )),
      (this.jvt = (i) => {
        (this.qvt += this.kvt * i),
          this.qvt >= this.Nvt &&
            ((this.qvt = this.Nvt),
            TimerSystem_1.TimerSystem.Remove(this.Fvt),
            this.wvt
              ? (this.GetItem(6).SetUIActive(!0),
                this.GetItem(5).SetUIActive(!1),
                this.UiViewSequence?.PlaySequence("LevelUp"))
              : this.CloseMe()),
          this.Wvt();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  OnStart() {
    var i,
      s = this.OpenParam;
    (this.wvt = s.CurLevel > s.PreLevel),
      (this.Bvt = s.AddExp),
      (this.bvt = !1),
      this.GetItem(6).SetUIActive(!this.Bvt),
      this.GetItem(5).SetUIActive(this.Bvt),
      this.wvt &&
        (this.GetText(3).SetText(s.CurLevel.toString()),
        (i =
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
            s.CurLevel,
          )) && !StringUtils_1.StringUtils.IsEmpty(i.LevelUpDescription)
          ? (this.GetItem(7).SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              i.LevelUpDescription,
            ))
          : this.GetItem(7).SetUIActive(!1)),
      this.Bvt &&
        (this.GetText(0).SetText(s.PreLevel.toString()),
        (this.qvt = s.PreExp),
        (this.Gvt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(
          s.PreLevel,
        )),
        (this.Ovt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(
          s.CurLevel,
        )),
        (this.Nvt = this.wvt ? s.CurExp + this.Gvt : s.CurExp),
        (this.kvt = (this.Nvt - this.qvt) / this.Vvt),
        this.Wvt()),
      this.UiViewSequence.AddSequenceFinishEvent("LevelUp", () => {
        this.CloseMe();
      });
  }
  get Kvt() {
    return this.wvt && this.qvt >= this.Gvt;
  }
  Wvt() {
    var i = this.Kvt ? this.qvt - this.Gvt : this.qvt,
      s = this.Kvt ? this.Ovt : this.Gvt;
    this.GetText(1).SetText(Math.round(i) + "/" + s),
      this.GetSprite(2).SetFillAmount(i / s),
      this.Fvt &&
        s < i &&
        !this.bvt &&
        ((this.bvt = !0), this.UiViewSequence.PlaySequence("Stuck"));
  }
  OnAfterShow() {
    this.Bvt
      ? (this.Fvt = TimerSystem_1.TimerSystem.Forever(
          this.jvt,
          TimerSystem_1.MIN_TIME,
        ))
      : (this.Fvt = TimerSystem_1.TimerSystem.Delay(() => {
          this.CloseMe();
        }, this.Hvt));
  }
  OnBeforeDestroy() {
    this.Fvt &&
      TimerSystem_1.TimerSystem.Has(this.Fvt) &&
      TimerSystem_1.TimerSystem.Remove(this.Fvt);
  }
}
exports.CalabashUpgradeSuccessView = CalabashUpgradeSuccessView;
//# sourceMappingURL=CalabashUpgradeSuccessView.js.map
