"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralLogicTreeUtil = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  QuestChapterById_1 = require("../../../Core/Define/ConfigQuery/QuestChapterById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LguiUtil_1 = require("../Util/LguiUtil");
class GeneralLogicTreeUtil {
  static GetEntityConfigPosition(e, r) {
    let t = void 0;
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e, r);
    return (t = e
      ? Vector_1.Vector.Create(
          e.Transform?.Pos.X ?? 0,
          e.Transform?.Pos.Y ?? 0,
          e.Transform?.Pos.Z ?? 0,
        )
      : t);
  }
  static GetEntityConfigRotator(e) {
    let r = void 0;
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
    return (r = e
      ? Rotator_1.Rotator.Create(
          e.Transform?.Rot?.Y ?? 0,
          e.Transform?.Rot?.Z ?? 0,
          e.Transform?.Rot?.X ?? 0,
        )
      : r);
  }
  static GetEntityConfigTransform(e) {
    let r = void 0;
    var t,
      o,
      e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
    return (
      e &&
        ((t = Rotator_1.Rotator.Create(
          e.Transform?.Rot?.Y ?? 0,
          e.Transform?.Rot?.Z ?? 0,
          e.Transform?.Rot?.X ?? 0,
        )),
        (o = Vector_1.Vector.Create(
          e.Transform?.Pos.X ?? 0,
          e.Transform?.Pos.Y ?? 0,
          e.Transform?.Pos.Z ?? 0,
        )),
        (e = Vector_1.Vector.Create(
          e.Transform?.Scale?.X ?? 1,
          e.Transform?.Scale?.Y ?? 1,
          e.Transform?.Scale?.Z ?? 1,
        )),
        (r = Transform_1.Transform.Create(t.Quaternion(), o, e))),
      r
    );
  }
  static GetPlayerLocation() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      e = e.Entity.GetComponent(3);
      if (e) return e.ActorLocationProxy;
    }
  }
  static GetNodeConfig(e, r, t) {
    let o = void 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        o = ModelManager_1.ModelManager.QuestNewModel.GetQuestNodeConfig(r, t);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        o = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(
          r,
          t,
        );
    }
    return o;
  }
  static GetLogicTreeContainer(e, r) {
    let t = void 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r);
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
        t =
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            r,
          );
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        t =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
    }
    return t;
  }
  static OpenQuestChapterView(e, r, t) {
    var o;
    e &&
      ((o =
        ModelManager_1.ModelManager.QuestNewModel.GetShowQuestChapterIdFromConfig(
          r,
        )) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            18,
            "任务没有配章节ID，章节内容显示不对找策划同学补上章节Id，目前章节提示需要读取“r.任务章节”的ID来显示内容",
            ["出问题的任务Id", r],
          )),
      (r =
        ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionFromConfig(
          r,
        )),
      GeneralLogicTreeUtil.OpenChapterViewV2(e.ChapterState, o, !1, r),
      KuroSdkReport_1.KuroSdkReport.OnChapterStart(o, e.ChapterState));
  }
  static OpenChapterViewV2(e, r, t = !1, o) {
    var a = QuestChapterById_1.configQuestChapterById.GetConfig(r);
    let i = 0,
      n = new LguiUtil_1.TableTextArgNew(a.ActName);
    var l = [r.toString()],
      s = {};
    if ("UiView_TaskTips_Prefab" === a?.PrefabName) {
      switch (e) {
        case 2:
          (i = t ? 16 : 10), o && l.push(o);
          break;
        case 0:
          i = t ? 16 : 10;
          break;
        case 1:
          i = t ? 17 : 11;
          var _ =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "QuestChapterFinish",
            );
          l.push(_);
      }
      if (!i)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 18, "配置了客户端还未支持的状态", [
            "ChapterState",
            e,
          ])
        );
    } else if ("UiView_BattleDeclarationRed" === a?.PrefabName)
      (n = new LguiUtil_1.TableTextArgNew(a.ChapterNum)), (i = 24);
    else if ("UiView_BattleDeclarationWhite" === a?.PrefabName)
      (n = new LguiUtil_1.TableTextArgNew(a.ChapterNum)), (i = 25);
    else if ("UiView_TasktipsA_Prefab" === a?.PrefabName)
      switch (((i = 26), (s.ChapterState = e))) {
        case 2:
          o && l.push(o);
          break;
        case 1:
          var c =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "QuestChapterFinish",
            );
          l.push(c);
      }
    (s.ResumeTimeDilation = t),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        i,
        n,
        void 0,
        [],
        l,
        void 0,
        void 0,
        s,
        void 0,
        t,
      ),
      KuroSdkReport_1.KuroSdkReport.OnChapterStart(r, e);
  }
}
exports.GeneralLogicTreeUtil = GeneralLogicTreeUtil;
//# sourceMappingURL=GeneralLogicTreeUtil.js.map
