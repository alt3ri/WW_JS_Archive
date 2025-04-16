"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPrompt = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  GameplayViewDefine_1 = require("../../../Game/Module/LevelPlay/GameplayView/GameplayViewDefine"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPrompt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, i) {
    var t = e;
    if (t) {
      if (3 === i.Type) {
        i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
          i.LevelPlayId,
        );
        if (
          i &&
          "Hang" === i.OnlineType &&
          ModelManager_1.ModelManager.GameModeModel.IsMulti
        )
          return;
      }
      var o = t.TipOption;
      if (o) {
        let e = void 0,
          i = void 0,
          a = 0,
          r = void 0,
          n = void 0;
        switch (o.Type) {
          case IAction_1.ECommonTipType.TipId:
            (r = o.Id),
              (a =
                ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
                  r,
                ).TypeId),
              (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
                  r,
                ).TipsText,
              ));
            break;
          case IAction_1.ECommonTipType.ChallengeFail:
            (e = o.TidMainText), (a = 4);
            break;
          case IAction_1.ECommonTipType.ChallengeCondition:
            (e = o.TidMainText), (i = o.TidSubText), (a = 0);
            break;
          case IAction_1.ECommonTipType.ChallengeSuccess:
            (e = o.TidMainText), (a = 3);
            break;
          case IAction_1.ECommonTipType.GeneralFloatingTip:
            (e = o.TidMainText), (a = 9);
            break;
          case IAction_1.ECommonTipType.MissionComplete:
            (e = o.TidMainText), (i = o.TidSubText), (a = 7);
            break;
          case IAction_1.ECommonTipType.ReachChallenge:
            (e = o.TidMainText), (a = 5);
            break;
          case IAction_1.ECommonTipType.TriggerDelegation:
            (e = o.TidMainText), (i = o.TidSubText), (a = 6);
            break;
          case IAction_1.ECommonTipType.PrepareCountdown:
            a = 13;
            break;
          case IAction_1.ECommonTipType.EnterInRange:
            var l = o.TidText;
            return l
              ? (((_ =
                  new GameplayViewDefine_1.GameplayEnterViewData()).InfoId =
                  "GameplayEnter"),
                (_.TitleId = l),
                void UiManager_1.UiManager.OpenView("GameplayEnterView", _))
              : void 0;
          case IAction_1.ECommonTipType.FirstComplete:
            l = o.TidText;
            return l
              ? (((_ =
                  new GameplayViewDefine_1.GameplayFirstPassViewData()).InfoId =
                  "GameplayFirstPass"),
                (_.TitleId = l),
                void UiManager_1.UiManager.OpenView("GameplayFirstPassView", _))
              : void 0;
          case IAction_1.ECommonTipType.RemainStarWarning:
            a = 18;
            l = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(l);
            break;
          case IAction_1.ECommonTipType.DreamlessWarning:
            a = 20;
            var _ = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(_);
            break;
          case IAction_1.ECommonTipType.PunishReport:
            l = o;
            return void UiManager_1.UiManager.OpenView("PunishReportView", l);
          case IAction_1.ECommonTipType.WhiteCatWarning:
            a = 22;
            _ = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(_);
            break;
          case IAction_1.ECommonTipType.BlackCatWarning:
            a = 23;
            l = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(l);
            break;
          case IAction_1.ECommonTipType.SlashAndTowerTip:
            _ = o.WarningText;
            return void EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ShipTowerBattleTip,
              _,
            );
          case IAction_1.ECommonTipType.BadBuKingChallengeTip:
            l = o.WarningText;
            return void EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ShowBadDangoTip,
              l,
            );
          default:
            return;
        }
        (e = e && PublicUtil_1.PublicUtil.GetConfigTextByKey(e)),
          (i = i && PublicUtil_1.PublicUtil.GetConfigTextByKey(i)),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
            a,
            n,
            void 0,
            [e],
            [i],
            r,
            void 0,
            void 0,
            t.Duration,
          );
      } else
        (i = e.GeneralTextId),
          (t =
            ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
              i,
            ).TypeId),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
            t,
            void 0,
            void 0,
            void 0,
            void 0,
            i,
          );
    }
  }
}
exports.LevelEventPrompt = LevelEventPrompt;
//# sourceMappingURL=LevelEventPrompt.js.map
