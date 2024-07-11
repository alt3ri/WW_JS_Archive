"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPrompt = void 0);
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const GameplayViewDefine_1 = require("../../../Game/Module/LevelPlay/GameplayView/GameplayViewDefine");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GenericPromptController_1 = require("../../Module/GenericPrompt/GenericPromptController");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPrompt extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    let i;
    e &&
      ((e = Number(e.get("TipId"))),
      isNaN(e)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 17, "Prompt参数只能是纯数字，不合法", [
            "promptId",
            e,
          ])
        : ((i =
            ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
              e,
            ).TypeId),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
            i,
            void 0,
            void 0,
            void 0,
            void 0,
            e,
          )));
  }
  ExecuteNew(e, r) {
    let i = e;
    if (i) {
      if (r.Type === 3) {
        r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
          r.LevelPlayId,
        );
        if (
          r &&
          r.OnlineType === "Hang" &&
          ModelManager_1.ModelManager.GameModeModel.IsMulti
        )
          return;
      }
      const o = i.TipOption;
      if (o) {
        let e = void 0;
        let r = void 0;
        let i = 0;
        let a = void 0;
        switch (o.Type) {
          case IAction_1.ECommonTipType.TipId:
            (a = o.Id),
              (i =
                ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
                  a,
                ).TypeId),
              (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
                  a,
                ).TipsText,
              ));
            break;
          case IAction_1.ECommonTipType.ChallengeFail:
            (e = o.TidMainText), (i = 4);
            break;
          case IAction_1.ECommonTipType.ChallengeCondition:
            (e = o.TidMainText), (r = o.TidSubText), (i = 0);
            break;
          case IAction_1.ECommonTipType.ChallengeSuccess:
            (e = o.TidMainText), (i = 3);
            break;
          case IAction_1.ECommonTipType.GeneralFloatingTip:
            (e = o.TidMainText), (i = 9);
            break;
          case IAction_1.ECommonTipType.MissionComplete:
            (e = o.TidMainText), (r = o.TidSubText), (i = 7);
            break;
          case IAction_1.ECommonTipType.ReachChallenge:
            (e = o.TidMainText), (i = 5);
            break;
          case IAction_1.ECommonTipType.TriggerDelegation:
            (e = o.TidMainText), (r = o.TidSubText), (i = 6);
            break;
          case IAction_1.ECommonTipType.PrepareCountdown:
            i = 13;
            break;
          case IAction_1.ECommonTipType.EnterInRange:
            var n = o.TidText;
            return n
              ? (((t =
                  new GameplayViewDefine_1.GameplayEnterViewData()).InfoId =
                  "GameplayEnter"),
                (t.TitleId = n),
                void UiManager_1.UiManager.OpenView("GameplayEnterView", t))
              : void 0;
          case IAction_1.ECommonTipType.FirstComplete:
            var t;
            var n = o.TidText;
            return n
              ? (((t =
                  new GameplayViewDefine_1.GameplayFirstPassViewData()).InfoId =
                  "GameplayFirstPass"),
                (t.TitleId = n),
                void UiManager_1.UiManager.OpenView("GameplayFirstPassView", t))
              : void 0;
          case IAction_1.ECommonTipType.RemainStarWarning:
            n = o.WarningText;
            return void GenericPromptController_1.GenericPromptController.ShowPromptByItsType(
              18,
              new LguiUtil_1.TableTextArgNew(n),
            );
          default:
            return;
        }
        (e = e && PublicUtil_1.PublicUtil.GetConfigTextByKey(e)),
          (r = r && PublicUtil_1.PublicUtil.GetConfigTextByKey(r)),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
            i,
            void 0,
            void 0,
            [e],
            [r],
            a,
          );
      } else
        (r = e.GeneralTextId),
          (i =
            ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
              r,
            ).TypeId),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
            i,
            void 0,
            void 0,
            void 0,
            void 0,
            r,
          );
    }
  }
}
exports.LevelEventPrompt = LevelEventPrompt;
// # sourceMappingURL=LevelEventPrompt.js.map
