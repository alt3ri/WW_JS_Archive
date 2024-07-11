"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenSystem = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const OpenSystemConfrimBox_1 = require("./OpenSystem/OpenSystemConfrimBox");
const OpenSystemContributionLevel_1 = require("./OpenSystem/OpenSystemContributionLevel");
const OpenSystemCook_1 = require("./OpenSystem/OpenSystemCook");
const OpenSystemExploreLevel_1 = require("./OpenSystem/OpenSystemExploreLevel");
const OpenSystemExpostulation_1 = require("./OpenSystem/OpenSystemExpostulation");
const OpenSystemFeed_1 = require("./OpenSystem/OpenSystemFeed");
const OpenSystemFixCook_1 = require("./OpenSystem/OpenSystemFixCook");
const OpenSystemForging_1 = require("./OpenSystem/OpenSystemForging");
const OpenSystemGameSysOpen_1 = require("./OpenSystem/OpenSystemGameSysOpen");
const OpenSystemInformationView_1 = require("./OpenSystem/OpenSystemInformationView");
const OpenSystemInstanceEntrance_1 = require("./OpenSystem/OpenSystemInstanceEntrance");
const OpenSystemInstanceFailure_1 = require("./OpenSystem/OpenSystemInstanceFailure");
const OpenSystemLordGym_1 = require("./OpenSystem/OpenSystemLordGym");
const OpenSystemMingSuTi_1 = require("./OpenSystem/OpenSystemMingSuTi");
const OpenSystemRegionQuest_1 = require("./OpenSystem/OpenSystemRegionQuest");
const OpenSystemRogueAbilitySelect_1 = require("./OpenSystem/OpenSystemRogueAbilitySelect");
const OpenSystemRoguelikeActivity_1 = require("./OpenSystem/OpenSystemRoguelikeActivity");
const OpenSystemRogueShop_1 = require("./OpenSystem/OpenSystemRogueShop");
const OpenSystemRoleDescription_1 = require("./OpenSystem/OpenSystemRoleDescription");
const OpenSystemShopView_1 = require("./OpenSystem/OpenSystemShopView");
const OpenSystemSoundAreaPlayInfo_1 = require("./OpenSystem/OpenSystemSoundAreaPlayInfo");
const OpenSystemSynthetic_1 = require("./OpenSystem/OpenSystemSynthetic");
const OpenSystemTrialRoleDescription_1 = require("./OpenSystem/OpenSystemTrialRoleDescription");
const OpenSystemTurntableControl_1 = require("./OpenSystem/OpenSystemTurntableControl");
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
  async Bbn(t, n) {
    const s = this.KDe.get(t.SystemType);
    if (s)
      if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
        const i = s.GetViewName(t, n);
        let e = !1;
        let o = n;
        if (
          (o?.EntityId &&
            i &&
            (EntitySystem_1.EntitySystem.GetComponent(o.EntityId, 178)
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
      ? this.Bbn(e, t)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 37, "[LevelEventOpenSystem]参数类型出错");
  }
  XDe(e, t, n) {
    let s = n?.EntityId;
    s &&
      (s = EntitySystem_1.EntitySystem.Get(s)?.GetComponent(168)) &&
      (t = t.GetViewName(e, n)) &&
      (TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(t),
      s.SetUiOpenPerformance(t, e.BoardId));
  }
}
exports.LevelEventOpenSystem = LevelEventOpenSystem;
// # sourceMappingURL=LevelEventOpenSystem.js.map
