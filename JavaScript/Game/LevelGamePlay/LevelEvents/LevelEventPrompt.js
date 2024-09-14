"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPrompt = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  GameplayViewDefine_1 = require("../../../Game/Module/LevelPlay/GameplayView/GameplayViewDefine"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GenericPromptController_1 = require("../../Module/GenericPrompt/GenericPromptController"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPrompt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var i = e;
    if (i) {
      if (3 === r.Type) {
        r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
          r.LevelPlayId,
        );
        if (
          r &&
          "Hang" === r.OnlineType &&
          ModelManager_1.ModelManager.GameModeModel.IsMulti
        )
          return;
      }
      var n = i.TipOption;
      if (n) {
        let e = void 0,
          r = void 0,
          i = 0,
          a = void 0;
        switch (n.Type) {
          case IAction_1.ECommonTipType.TipId:
            (a = n.Id),
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
            (e = n.TidMainText), (i = 4);
            break;
          case IAction_1.ECommonTipType.ChallengeCondition:
            (e = n.TidMainText), (r = n.TidSubText), (i = 0);
            break;
          case IAction_1.ECommonTipType.ChallengeSuccess:
            (e = n.TidMainText), (i = 3);
            break;
          case IAction_1.ECommonTipType.GeneralFloatingTip:
            (e = n.TidMainText), (i = 9);
            break;
          case IAction_1.ECommonTipType.MissionComplete:
            (e = n.TidMainText), (r = n.TidSubText), (i = 7);
            break;
          case IAction_1.ECommonTipType.ReachChallenge:
            (e = n.TidMainText), (i = 5);
            break;
          case IAction_1.ECommonTipType.TriggerDelegation:
            (e = n.TidMainText), (r = n.TidSubText), (i = 6);
            break;
          case IAction_1.ECommonTipType.PrepareCountdown:
            i = 13;
            break;
          case IAction_1.ECommonTipType.EnterInRange:
            var o = n.TidText;
            return o
              ? (((t =
                  new GameplayViewDefine_1.GameplayEnterViewData()).InfoId =
                  "GameplayEnter"),
                (t.TitleId = o),
                void UiManager_1.UiManager.OpenView("GameplayEnterView", t))
              : void 0;
          case IAction_1.ECommonTipType.FirstComplete:
            o = n.TidText;
            return o
              ? (((t =
                  new GameplayViewDefine_1.GameplayFirstPassViewData()).InfoId =
                  "GameplayFirstPass"),
                (t.TitleId = o),
                void UiManager_1.UiManager.OpenView("GameplayFirstPassView", t))
              : void 0;
          case IAction_1.ECommonTipType.RemainStarWarning:
            o = n.WarningText;
            return void GenericPromptController_1.GenericPromptController.ShowPromptByItsType(
              18,
              new LguiUtil_1.TableTextArgNew(o),
            );
          case IAction_1.ECommonTipType.DreamlessWarning:
            var t = n.WarningText;
            return void GenericPromptController_1.GenericPromptController.ShowPromptByItsType(
              20,
              new LguiUtil_1.TableTextArgNew(t),
            );
          case IAction_1.ECommonTipType.PunishReport:
            o = n;
            return void UiManager_1.UiManager.OpenView("PunishReportView", o);
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
//# sourceMappingURL=LevelEventPrompt.js.map
