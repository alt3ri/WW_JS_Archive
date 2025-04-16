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
      (this.WMt = !1),
      (this.KMt = !1),
      (this.QMt = !1),
      (this.XMt = 0),
      (this.$Mt = 0),
      (this.YMt = 0),
      (this.JMt = 0),
      (this.zMt = 0),
      (this._Ct = void 0),
      (this.eEt =
        CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayTime")),
      (this.tEt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ExpDisplayCloseTime",
      )),
      (this.iEt = (i) => {
        (this.XMt += this.zMt * i),
          this.XMt >= this.YMt &&
            ((this.XMt = this.YMt),
            this.xHe(),
            this.WMt
              ? (this.GetItem(6).SetUIActive(!0),
                this.GetItem(5).SetUIActive(!1),
                this.UiViewSequence?.PlaySequence("LevelUp"))
              : this.CloseMe()),
          this.oEt();
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
      t = this.OpenParam;
    (this.WMt = t.CurLevel > t.PreLevel),
      (this.KMt = t.AddExp),
      (this.QMt = !1),
      this.GetItem(6).SetUIActive(!this.KMt),
      this.GetItem(5).SetUIActive(this.KMt),
      this.WMt &&
        (this.GetText(3).SetText(t.CurLevel.toString()),
        (i =
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
            t.CurLevel,
          )) && !StringUtils_1.StringUtils.IsEmpty(i.LevelUpDescription)
          ? (this.GetItem(7).SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              i.LevelUpDescription,
            ))
          : this.GetItem(7).SetUIActive(!1)),
      this.KMt &&
        (this.GetText(0).SetText(t.PreLevel.toString()),
        (this.XMt = t.PreExp),
        (this.$Mt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(
          t.PreLevel,
        )),
        (this.JMt = ModelManager_1.ModelManager.CalabashModel.GetMaxExpByLevel(
          t.CurLevel,
        )),
        (this.YMt = this.WMt ? t.CurExp + this.$Mt : t.CurExp),
        (this.zMt = (this.YMt - this.XMt) / this.eEt),
        this.oEt()),
      this.UiViewSequence.AddSequenceFinishEvent("LevelUp", () => {
        this.xHe(), this.CloseMe();
      });
  }
  get rEt() {
    return this.WMt && this.XMt >= this.$Mt;
  }
  oEt() {
    var i = this.rEt ? this.XMt - this.$Mt : this.XMt,
      t = this.rEt ? this.JMt : this.$Mt;
    this.GetText(1).SetText(Math.round(i) + "/" + t),
      this.GetSprite(2).SetFillAmount(i / t),
      this._Ct &&
        t < i &&
        !this.QMt &&
        ((this.QMt = !0), this.UiViewSequence.PlaySequence("Stuck"));
  }
  xHe() {
    this._Ct &&
      (TimerSystem_1.TimerSystem.Remove(this._Ct), (this._Ct = void 0));
  }
  OnAfterPlayStartSequence() {
    this.KMt
      ? (this._Ct = TimerSystem_1.TimerSystem.Forever(
          this.iEt,
          TimerSystem_1.MIN_TIME,
        ))
      : (this._Ct = TimerSystem_1.TimerSystem.Delay(() => {
          this.xHe(), this.CloseMe();
        }, this.tEt));
  }
}
exports.CalabashUpgradeSuccessView = CalabashUpgradeSuccessView;
//# sourceMappingURL=CalabashUpgradeSuccessView.js.map
