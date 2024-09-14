"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkUiUtils = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MonsterDetectionByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MonsterDetectionByMarkId"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  WorldMapSecondaryUiDefine_1 = require("../../../WorldMap/WorldMapSecondaryUiDefine"),
  MapController_1 = require("../../Controller/MapController"),
  MapDefine_1 = require("../../MapDefine"),
  DynamicEntityMarkItem_1 = require("../../Marks/MarkItem/DynamicEntityMarkItem"),
  FixedSceneGamePlayMarkItem_1 = require("../../Marks/MarkItem/FixedSceneGamePlayMarkItem"),
  SceneGameplayMarkItem_1 = require("../../Marks/MarkItem/SceneGameplayMarkItem"),
  TaskMarkItem_1 = require("../../Marks/MarkItem/TaskMarkItem"),
  TeleportMarkItem_1 = require("../../Marks/MarkItem/TeleportMarkItem"),
  TemporaryTeleportMarkItem_1 = require("../../Marks/MarkItem/TemporaryTeleportMarkItem");
class MarkUiUtils {
  static IsShowGoto(e) {
    if (e instanceof TeleportMarkItem_1.TeleportMarkItem && !e.IsActivity)
      return e.IsLocked;
    if (24 !== e.MarkType) {
      if (e instanceof SceneGameplayMarkItem_1.SceneGameplayMarkItem)
        return (
          void 0 ===
            (r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
              e.MarkConfig.RelativeId,
            )) || r.IsClose
        );
      if (e instanceof FixedSceneGamePlayMarkItem_1.FixedSceneGameplayMarkItem)
        return !0;
    }
    if (e instanceof TaskMarkItem_1.TaskMarkItem) return !0;
    if (25 === e.MarkType) return !0;
    if (e instanceof DynamicEntityMarkItem_1.DynamicEntityMarkItem) {
      var r =
        MonsterDetectionByMarkId_1.configMonsterDetectionByMarkId.GetConfig(
          e.MarkConfigId,
        );
      if (void 0 !== r) {
        r = r.DangerType;
        if (this.O4a.get(r) ?? !1) return !0;
      }
      return "number" == typeof e.TrackTarget
        ? !ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
            e.TrackTarget,
          )
        : !0;
    }
    return (
      (WorldMapSecondaryUiDefine_1.markPanelTypeMap.get(e.MarkType) ??
        WorldMapDefine_1.ESecondaryPanel.GeneralPanel) ===
      WorldMapDefine_1.ESecondaryPanel.GeneralPanel
    );
  }
  static FindNearbyValidGotoMark(e, r) {
    var o =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "QuickTransferRange",
        ) * MapDefine_1.UNIT,
      e = e.FindNearbyMarkItems(r, o);
    for (const [r] of e) {
      if (r instanceof TeleportMarkItem_1.TeleportMarkItem && !r.IsLocked)
        return r;
      if (r instanceof TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem)
        return r;
    }
  }
  static QuickGotoTeleport(o, r, a) {
    const t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (t) {
      const i = () => {
        if (o instanceof TaskMarkItem_1.TaskMarkItem)
          if (0 !== o.NodeId) {
            var r = o.TreeConfigId;
            ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(r) ||
              QuestController_1.QuestNewController.RequestTrackQuest(
                o.TreeConfigId,
                !0,
                1,
                0,
              );
          } else {
            r = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
            let e = !1;
            (e = !!r && r[1] === o.MarkId) ||
              MapController_1.MapController.RequestTrackMapMark(
                12,
                o.MarkId,
                !0,
              );
          }
        else
          o.IsTracked ||
            MapController_1.MapController.RequestTrackMapMark(
              o.MarkType,
              o.MarkId,
              !0,
            );
      };
      let e = !0;
      if (
        (e = r instanceof TeleportMarkItem_1.TeleportMarkItem ? !r.IsLocked : e)
      ) {
        const l = () => {
          r instanceof TemporaryTeleportMarkItem_1.TemporaryTeleportMarkItem &&
            MapController_1.MapController.RequestTeleportToTargetByTemporaryTeleport(
              r.TeleportId,
              a,
            ),
            r instanceof TeleportMarkItem_1.TeleportMarkItem &&
              WorldMapController_1.WorldMapController.TryTeleport(r, a);
        };
        var n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(216);
        n.FunctionMap.set(2, () => {
          var e;
          Vector_1.Vector.DistSquared(t, o.WorldPosition) <=
          Vector_1.Vector.DistSquared(r.WorldPosition, o.WorldPosition)
            ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                223,
              )).FunctionMap.set(2, () => {
                l(), i();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ))
            : (l(), i());
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            n,
          );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Map",
          64,
          "[地图系统]MarkUiUtils->没有玩家坐标，快速前往失败",
          ["markId", r.MarkId],
        );
  }
}
(exports.MarkUiUtils = MarkUiUtils).O4a = new Map([
  [0, !0],
  [1, !0],
  [2, !1],
  [3, !1],
]);
//# sourceMappingURL=MarkUiUtils.js.map
