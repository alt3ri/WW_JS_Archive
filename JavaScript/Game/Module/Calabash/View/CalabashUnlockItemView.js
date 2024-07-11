"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashUnlockItemView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const GameModeController_1 = require("../../../World/Controller/GameModeController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CalabashController_1 = require("../CalabashController");
class CalabashUnlockItemView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Tvt = 0),
      (this.Lvt = void 0),
      (this.Dvt = void 0),
      (this.Rvt = new CustomPromise_1.CustomPromise()),
      (this.Uvt = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 11, "跳转到鸣域终端收集页签", [
            "目标幻象Id",
            this.Dvt.MonsterId,
          ]),
          this.CloseViewOrShowNextData(),
          CalabashController_1.CalabashController.JumpToCalabashCollectTabView(
            this.Dvt.MonsterId,
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
      (this.BtnBindInfo = [[5, this.Uvt]]);
  }
  async OnBeforeStartAsync() {
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Rvt.SetResult(!0);
    }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime),
      await this.Rvt.Promise;
  }
  OnBeforeCreate() {
    this.Lvt = this.OpenParam;
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
    (this.Lvt =
      ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift()),
      this.Og();
  }
  Og() {
    var e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
        this.Lvt[0],
      );
    var e =
      ((this.Dvt =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
          e.MonsterId,
        )),
      ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
        this.Dvt.MonsterInfoId,
      ));
    var e =
      ((this.Tvt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd),
      this.GetText(3).ShowTextNew(e.Name),
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.Lvt[0],
      ));
    this.SetTextureByPath(e.IconMiddle, this.GetTexture(1), this.Info?.Name),
      this.Avt(),
      this.Pqe();
  }
  Avt() {
    var e = this.Lvt[2];
    var e =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
        e,
      ).UnlockVisionQuality;
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  Pqe() {
    const e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
        this.Lvt[0],
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      e.GetPhantomSkillInfoByLevel().SimplyDescription,
    );
  }
  CloseViewOrShowNextData() {
    ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length > 0
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Calabash", 11, "刷新下个声骸数据"),
        this.Refresh())
      : this.CloseMe();
  }
  OnTick(e) {
    this.Tvt <= 0 ||
      ((this.Tvt -= e), this.Tvt <= 0 && this.CloseViewOrShowNextData());
  }
}
exports.CalabashUnlockItemView = CalabashUnlockItemView;
// # sourceMappingURL=CalabashUnlockItemView.js.map
