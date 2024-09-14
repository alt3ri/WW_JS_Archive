"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenSystem = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  OpenSystemActivity_1 = require("./OpenSystem/OpenSystemActivity"),
  OpenSystemChasingMoonMain_1 = require("./OpenSystem/OpenSystemChasingMoonMain"),
  OpenSystemConfrimBox_1 = require("./OpenSystem/OpenSystemConfrimBox"),
  OpenSystemContributionLevel_1 = require("./OpenSystem/OpenSystemContributionLevel"),
  OpenSystemCook_1 = require("./OpenSystem/OpenSystemCook"),
  OpenSystemDigitalScreen_1 = require("./OpenSystem/OpenSystemDigitalScreen"),
  OpenSystemExploreLevel_1 = require("./OpenSystem/OpenSystemExploreLevel"),
  OpenSystemExpostulation_1 = require("./OpenSystem/OpenSystemExpostulation"),
  OpenSystemFeed_1 = require("./OpenSystem/OpenSystemFeed"),
  OpenSystemFixCook_1 = require("./OpenSystem/OpenSystemFixCook"),
  OpenSystemForging_1 = require("./OpenSystem/OpenSystemForging"),
  OpenSystemGameSysOpen_1 = require("./OpenSystem/OpenSystemGameSysOpen"),
  OpenSystemInformationView_1 = require("./OpenSystem/OpenSystemInformationView"),
  OpenSystemInstanceEntrance_1 = require("./OpenSystem/OpenSystemInstanceEntrance"),
  OpenSystemInstanceFailure_1 = require("./OpenSystem/OpenSystemInstanceFailure"),
  OpenSystemLordGym_1 = require("./OpenSystem/OpenSystemLordGym"),
  OpenSystemMingSuTi_1 = require("./OpenSystem/OpenSystemMingSuTi"),
  OpenSystemPhotographView_1 = require("./OpenSystem/OpenSystemPhotographView"),
  OpenSystemRegionQuest_1 = require("./OpenSystem/OpenSystemRegionQuest"),
  OpenSystemRogueAbilitySelect_1 = require("./OpenSystem/OpenSystemRogueAbilitySelect"),
  OpenSystemRoguelikeActivity_1 = require("./OpenSystem/OpenSystemRoguelikeActivity"),
  OpenSystemRogueSettlement_1 = require("./OpenSystem/OpenSystemRogueSettlement"),
  OpenSystemRogueShop_1 = require("./OpenSystem/OpenSystemRogueShop"),
  OpenSystemRoleDescription_1 = require("./OpenSystem/OpenSystemRoleDescription"),
  OpenSystemShopView_1 = require("./OpenSystem/OpenSystemShopView"),
  OpenSystemSoundAreaPlayInfo_1 = require("./OpenSystem/OpenSystemSoundAreaPlayInfo"),
  OpenSystemSynthetic_1 = require("./OpenSystem/OpenSystemSynthetic"),
  OpenSystemTrialRoleDescription_1 = require("./OpenSystem/OpenSystemTrialRoleDescription"),
  OpenSystemTurntableControl_1 = require("./OpenSystem/OpenSystemTurntableControl");
class LevelEventOpenSystem extends LevelGeneralBase_1.LevelEventBase {
  constructor(e) {
    super(e),
      (this.WDe = void 0),
      (this.KDe = new Map()),
      (this.QDe = (e) => {
        e === this.WDe &&
          (this.FinishExecute(!0),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CloseView,
            this.QDe,
          ));
      }),
      (this.KDe = new Map()),
      this.KDe.set("Shop", new OpenSystemShopView_1.OpenSystemShopView(this)),
      this.KDe.set(
        "InformationView",
        new OpenSystemInformationView_1.OpenSystemInformationView(this),
      ),
      this.KDe.set(
        "InstanceEntrance",
        new OpenSystemInstanceEntrance_1.OpenSystemInstanceEntrance(this),
      ),
      this.KDe.set(
        "MingSuTi",
        new OpenSystemMingSuTi_1.OpenSystemMingSuTi(this),
      ),
      this.KDe.set("Cook", new OpenSystemCook_1.OpenSystemCook(this)),
      this.KDe.set("FixCook", new OpenSystemFixCook_1.OpenSystemFixCook(this)),
      this.KDe.set(
        "Synthetic",
        new OpenSystemSynthetic_1.OpenSystemSynthetic(this),
      ),
      this.KDe.set("Forging", new OpenSystemForging_1.OpenSystemForging(this)),
      this.KDe.set(
        "Expostulation",
        new OpenSystemExpostulation_1.OpenSystemExpostulation(this),
      ),
      this.KDe.set(
        "RoleDescription",
        new OpenSystemRoleDescription_1.OpenSystemRoleDescription(this),
      ),
      this.KDe.set(
        "TrialRoleDescription",
        new OpenSystemTrialRoleDescription_1.OpenSystemTrialRoleDescription(
          this,
        ),
      ),
      this.KDe.set(
        "RogueAbilitySelect",
        new OpenSystemRogueAbilitySelect_1.OpenSystemRogueAbilitySelect(this),
      ),
      this.KDe.set(
        "TurntableControl",
        new OpenSystemTurntableControl_1.OpenSystemTurntableControl(this),
      ),
      this.KDe.set(
        "GameSysOpen",
        new OpenSystemGameSysOpen_1.OpenSystemGameSysOpen(this),
      ),
      this.KDe.set(
        "InstanceFailure",
        new OpenSystemInstanceFailure_1.OpenSystemInstanceFailure(this),
      ),
      this.KDe.set("FeedingPets", new OpenSystemFeed_1.OpenSystemFeed(this)),
      this.KDe.set(
        "SoundAreaPlayInfo",
        new OpenSystemSoundAreaPlayInfo_1.OpenSystemSoundAreaPlayInfo(this),
      ),
      this.KDe.set(
        "RogueShop",
        new OpenSystemRogueShop_1.OpenSystemRogueShop(this),
      ),
      this.KDe.set(
        "ContributionLevel",
        new OpenSystemContributionLevel_1.OpenSystemContributionLevel(this),
      ),
      this.KDe.set(
        "RegionQuest",
        new OpenSystemRegionQuest_1.OpenSystemRegionQuest(this),
      ),
      this.KDe.set(
        "LordChallenge",
        new OpenSystemLordGym_1.OpenSystemLordGym(this),
      ),
      this.KDe.set(
        "ExploreLevelView",
        new OpenSystemExploreLevel_1.OpenSystemExploreLevel(this),
      ),
      this.KDe.set(
        "RogueActivityIntroduce",
        new OpenSystemRoguelikeActivity_1.OpenSystemRoguelikeActivity(this),
      ),
      this.KDe.set(
        "RogueRandomEvent",
        new OpenSystemRogueAbilitySelect_1.OpenSystemRogueEventSelect(this),
      ),
      this.KDe.set(
        "ConfirmBox",
        new OpenSystemConfrimBox_1.OpenSystemConfrimBox(this),
      ),
      this.KDe.set(
        "ActivityIntroduce",
        new OpenSystemActivity_1.OpenSystemActivity(this),
      ),
      this.KDe.set(
        "Photograph",
        new OpenSystemPhotographView_1.OpenSystemPhotographView(this),
      ),
      this.KDe.set(
        "RogueSettlement",
        new OpenSystemRogueSettlement_1.OpenSystemRogueSettlement(this),
      ),
      this.KDe.set(
        "DigitalScreen",
        new OpenSystemDigitalScreen_1.OpenSystemDigitalScreen(this),
      ),
      this.KDe.set(
        "ChasingMoonMain",
        new OpenSystemChasingMoonMain_1.OpenSystemChasingMoonMain(this),
      );
  }
  OnReset() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CloseView,
      this.QDe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.QDe,
      );
  }
  async d2n(t, n) {
    var s = this.KDe.get(t.SystemType);
    if (s)
      if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
        var i = s.GetViewName(t, n);
        let e = !1;
        var o = n;
        if (
          (o?.EntityId &&
            i &&
            (EntitySystem_1.EntitySystem.GetComponent(o.EntityId, 182)
              ?.CanInteraction ||
              (TsInteractionUtils_1.TsInteractionUtils.RegisterWaitOpenViewName(
                i,
              ),
              (e = !0))),
          this.IsAsync)
        )
          s.ExecuteOpenView(t, n),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                37,
                "[LevelEventOpenSystem]行为打开界面,异步",
                ["SystemType", t.SystemType],
              );
        else {
          o = await s.ExecuteOpenView(t, n);
          if (
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                37,
                "[LevelEventOpenSystem]行为打开界面,同步",
                ["SystemType", t.SystemType],
                ["IsSuccess", o],
              ),
            !o)
          )
            return (
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelEvent",
                  37,
                  "[LevelEventOpenSystem] 执行打开界面失败算直接完成",
                  ["OpenSystemType", t.SystemType],
                ),
              e &&
                TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
              LevelLoadingController_1.LevelLoadingController.CloseLoading(0),
              void this.FinishExecute(!0)
            );
        }
        (this.WDe = i),
          this.WDe
            ? (this.XDe(t, s, n),
              this.IsAsync
                ? (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "LevelEvent",
                      37,
                      "[LevelEventOpenSystem] 节点行为配置为异步算直接完成",
                      ["OpenSystemType", t.SystemType],
                    ),
                  e &&
                    TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
                  LevelLoadingController_1.LevelLoadingController.CloseLoading(
                    0,
                  ),
                  this.FinishExecute(!0))
                : EventSystem_1.EventSystem.Add(
                    EventDefine_1.EEventName.CloseView,
                    this.QDe,
                  ))
            : (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelEvent",
                  37,
                  "[LevelEventOpenSystem] 没有对应界面名算直接完成",
                  ["OpenSystemType", t.SystemType],
                ),
              e &&
                TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
              LevelLoadingController_1.LevelLoadingController.CloseLoading(0),
              this.FinishExecute(!0));
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelEvent",
            37,
            "[LevelEventOpenSystem] 还未WorldDoneAndLoadingClosed算直接完成",
            ["OpenSystemType", t.SystemType],
          ),
          this.FinishExecute(!0);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiCommon", 11, "系统类型对应的处理方法未注册", [
          "OpenSystemType",
          t.SystemType,
        ]);
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, t) {
    e
      ? this.d2n(e, t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 37, "[LevelEventOpenSystem]参数类型出错");
  }
  XDe(t, n, s) {
    n = n.GetViewName(t, s);
    if (n)
      if ("Photograph" === t.SystemType)
        TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(n);
      else {
        let e = void 0;
        s = s?.EntityId;
        (e = s ? EntitySystem_1.EntitySystem.Get(s)?.GetComponent(172) : e) &&
          (TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(n),
          e.SetUiOpenPerformance(n, t.BoardId));
      }
  }
}
exports.LevelEventOpenSystem = LevelEventOpenSystem;
//# sourceMappingURL=LevelEventOpenSystem.js.map
