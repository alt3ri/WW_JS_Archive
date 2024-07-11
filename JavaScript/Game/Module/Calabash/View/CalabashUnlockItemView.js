"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashUnlockItemView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  GameModeController_1 = require("../../../World/Controller/GameModeController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CalabashController_1 = require("../CalabashController");
class CalabashUnlockItemView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.GMt = 0),
      (this.NMt = void 0),
      (this.OMt = void 0),
      (this.kMt = new CustomPromise_1.CustomPromise()),
      (this.FMt = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 11, "跳转到鸣域终端收集页签", [
            "目标幻象Id",
            this.OMt.MonsterId,
          ]),
          this.CloseViewOrShowNextData(),
          CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
            this.OMt.MonsterId,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[5, this.FMt]]);
  }
  async OnBeforeStartAsync() {
    TimerSystem_1.TimerSystem.Delay(() => {
      this.kMt.SetResult(!0);
    }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime),
      await this.kMt.Promise;
  }
  OnBeforeCreate() {
    this.NMt = this.OpenParam;
  }
  OnStart() {
    this.GetButton(5).RootUIComp.SetRaycastTarget(
      !GameModeController_1.GameModeController.IsInInstance(),
    ),
      this.GetText(6).SetUIActive(
        !GameModeController_1.GameModeController.IsInInstance(),
      );
  }
  OnBeforeShow() {
    this.Og();
  }
  Refresh() {
    (this.NMt =
      ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift()),
      this.Og();
  }
  Og() {
    var e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
          this.NMt[0],
        ),
      e =
        ((this.OMt =
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
            e.MonsterId,
          )),
        ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
          this.OMt.MonsterInfoId,
        )),
      e =
        ((this.GMt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd),
        this.GetText(3).ShowTextNew(e.Name),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.NMt[0],
        ));
    this.SetTextureByPath(e.IconMiddle, this.GetTexture(1), this.Info?.Name),
      this.VMt(),
      this.Pqe();
  }
  VMt() {
    var e = this.NMt[2],
      e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
          e,
        ).UnlockVisionQuality;
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  Pqe() {
    var e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
        this.NMt[0],
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      e.GetPhantomSkillInfoByLevel().SimplyDescription,
    );
  }
  CloseViewOrShowNextData() {
    0 < ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 11, "刷新下个声骸数据"),
        this.Refresh())
      : this.CloseMe();
  }
  OnTick(e) {
    this.GMt <= 0 ||
      ((this.GMt -= e), this.GMt <= 0 && this.CloseViewOrShowNextData());
  }
}
exports.CalabashUnlockItemView = CalabashUnlockItemView;
//# sourceMappingURL=CalabashUnlockItemView.js.map
