"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelUpView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MapNoteById_1 = require("../../../../Core/Define/ConfigQuery/MapNoteById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  EffectUtil_1 = require("../../../Utils/EffectUtil");
class LevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.rvi = 0),
      (this.WMt = !1),
      (this.KMt = !1),
      (this.QMt = !1),
      (this.rEt = !1),
      (this.XMt = 0),
      (this.$Mt = 0),
      (this.YMt = 0),
      (this.JMt = 0),
      (this.zMt = 0),
      (this.Wft = 0),
      (this.nvi = !1),
      (this.ZMt = void 0),
      (this.eEt =
        CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayTime")),
      (this.tEt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "ExpDisplayCloseTime",
      )),
      (this.iEt = (e) => {
        (this.XMt += this.zMt * e),
          this.XMt >= this.YMt &&
            ((this.XMt = this.YMt),
            TimerSystem_1.TimerSystem.Remove(this.ZMt),
            this.svi()),
          this.oEt();
      }),
      (this.AMe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.LevelUpModel.GetCacheData();
    ModelManager_1.ModelManager.LevelUpModel.ClearCacheData(),
      (this.WMt = e.CurLevel > e.PreLevel),
      (this.KMt = e.AddExp),
      (this.QMt = !1),
      (this.rEt = !1),
      (this.Wft = e.CurLevel),
      (this.nvi = !this.WMt),
      this.GetText(0).SetText((this.KMt ? e.PreLevel : e.CurLevel).toString()),
      (this.XMt = this.KMt ? e.PreExp : e.CurExp),
      (this.JMt =
        ConfigManager_1.ConfigManager.FunctionConfig.GetPlayerLevelConfig(
          e.CurLevel,
        ).PlayerExp),
      (this.$Mt = this.KMt
        ? ConfigManager_1.ConfigManager.FunctionConfig.GetPlayerLevelConfig(
            e.PreLevel,
          ).PlayerExp
        : this.JMt),
      (this.YMt = this.WMt ? e.CurExp + this.$Mt : e.CurExp),
      (this.zMt = (this.YMt - this.XMt) / this.eEt),
      this.oEt(),
      this.WMt &&
        this.UiViewSequence.AddSequenceFinishEvent("LevelUp", () => {
          (this.nvi = !0), this.svi();
        });
  }
  svi() {
    this.nvi && this.XMt >= this.YMt && this.CloseMe();
  }
  OnBeforeShow() {
    this.WMt && this.avi(), this.KMt && this.hvi();
  }
  OnAfterShow() {
    this.KMt
      ? (this.ZMt = TimerSystem_1.TimerSystem.Forever(
          this.iEt,
          TimerSystem_1.MIN_TIME,
        ))
      : (this.ZMt = TimerSystem_1.TimerSystem.Delay(() => {
          this.CloseMe();
        }, this.tEt));
  }
  get lvi() {
    return this.WMt && this.XMt >= this.$Mt;
  }
  oEt() {
    this.ZMt &&
      !this.rEt &&
      this.lvi &&
      ((this.rEt = !0),
      this.GetText(0).SetText(this.Wft.toString()),
      this.UiViewSequence?.PlaySequence("LevelUp"));
    var e = this.rEt ? this.XMt - this.$Mt : this.XMt,
      t = this.rEt ? this.JMt : this.$Mt;
    this.GetText(1).SetText(Math.round(e) + "/" + t),
      this.GetSprite(2).SetFillAmount(e / t),
      this.ZMt &&
        t < e &&
        !this.QMt &&
        ((this.QMt = !0), this.UiViewSequence.PlaySequence("Stuck"));
  }
  OnBeforeDestroy() {
    this.ZMt &&
      TimerSystem_1.TimerSystem.Has(this.ZMt) &&
      TimerSystem_1.TimerSystem.Remove(this.ZMt),
      this._vi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.AMe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkStart,
      this.AMe,
    );
  }
  hvi() {
    if (ModelManager_1.ModelManager.LevelUpModel.CanBreakTipsShowFlag)
      for (const t of MapNoteById_1.configMapNoteById.GetConfig(4)
        .QuestIdList) {
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
        if (2 === e || 1 === e) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "WorldLevelUpgradeNotice",
          ),
            (ModelManager_1.ModelManager.LevelUpModel.CanBreakTipsShowFlag =
              !1);
          break;
        }
      }
  }
  avi() {
    var e, t, i, s;
    Global_1.Global.BaseCharacter &&
      (e = EffectUtil_1.EffectUtil.GetEffectPath("WorldLevelUpEffect")) &&
      0 !== e.length &&
      ((t = (i = Global_1.Global.BaseCharacter).GetTransform()),
      (i = i.CapsuleComponent.CapsuleHalfHeight),
      ((s = t.GetLocation()).Z -= i),
      t.SetLocation(s),
      EffectSystem_1.EffectSystem.IsValid(this.rvi) ||
        ((this.rvi = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
          GlobalData_1.GlobalData.World,
          t,
          e,
          "[LevelUpView.PlayLevelUpEffect]",
        )),
        EffectSystem_1.EffectSystem.IsValid(this.rvi)) ||
        (this.rvi = 0));
  }
  _vi() {
    EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.rvi,
        "[LevelUpView.RecycleEffect]",
        !0,
      ),
      (this.rvi = 0));
  }
}
exports.LevelUpView = LevelUpView;
//# sourceMappingURL=LevelUpView.js.map
