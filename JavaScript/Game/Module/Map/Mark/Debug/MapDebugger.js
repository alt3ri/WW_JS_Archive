"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapDebugger = void 0);
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  MapLogger_1 = require("../../Misc/MapLogger"),
  MarkUiUtils_1 = require("../Misc/MarkUiUtils");
class MapDebugger {
  static L3c(e, a) {
    const r = a.MarkItemEntity.GetComponent(18)?.EntityId ?? 0;
    var e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(e, a),
      i = a.MarkItemEntity.GetComponent(15)?.MapMarkConfig,
      t = a.MarkItemEntity.GamePlay.IsHide;
    let $ = "";
    if (t) {
      if (void 0 !== a.MarkItemEntity.GetComponent(14))
        $ =
          ModelManager_1.ModelManager.LevelPlayReportModel.GetLevelPlayHideReason(
            a.MarkItemEntity.GetComponent(15).MapMarkConfig.RelativeDungeonId,
            a.MarkItemEntity.GetComponent(15).MapMarkConfig.RelativeId,
          );
      else {
        const r = a.MarkItemEntity.GetComponent(18).EntityId ?? 0;
        $ = ModelManager_1.ModelManager.MapModel.GetMarkHideReason(a.MapId, r);
      }
      StringUtils_1.StringUtils.IsEmpty($) && ($ = "PlayPointClearDesc_Text");
    }
    return `
        ------------------------标记信息Start--------------------

        标记Id:${a.MarkId}

        标记类型Type:${a.MarkType}

        地图类型Type:${a.MapType}

        地图Id:${a.MapId}

        副本Id:${a.InstanceDungeonId}

        追踪区域Id(不一定有值):${a.TrackAreaId}

        归属迷雾FogHide:${i?.FogHide}

        区域Id:${ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(a.MapId, r)?.AreaId ?? 0}

        区域名字:${ModelManager_1.ModelManager.MapModel.GetMarkAreaText(a.MapId, r)}

        分层地图Id:${a.GetMultiMapId()}

        是否分层标记:${a.IsMultiMap()}

        世界坐标X:${a.WorldPosition.X},
        世界坐标Y:${a.WorldPosition.Y},
        世界坐标Z:${a.WorldPosition.Z}

        Ui坐标X:${a.UiPosition.X},
        Ui坐标Y:${a.UiPosition.Y},
        Ui坐标Z:${a.UiPosition.Z}

        重力方向:${a.MarkItemEntity.GamePlay.Gravity}

        是否在对应的重力面:${a.MarkItemEntity.GamePlay.InGravityLayer}

        配置Id:${i?.MarkId}

        玩法Id:${i?.RelativeId}

        玩法绑定的副本Id:${a.MarkItemEntity.GetComponent(15)?.MapMarkConfig?.RelativeDungeonId}

        绑定的实体Id:${r}

        绑定的二级弹窗类型:${WorldMapDefine_1.ESecondaryPanel[a.GetSecondaryUiType()]}

        玩法是否被清场:${t}

        清场原因:${ConfigManager_1.ConfigManager.TextConfig.GetMultiText($ ?? "")}

        传送点被锁或被禁用:${a.MarkItemEntity.GamePlay.IsTeleportLocked}

        玩法状态:${a.MarkItemEntity.GamePlay.GamePlayState}

        附近可前往的标记信息-MarkId:${e?.MarkId}

        ------------------------标记信息End------------------`;
  }
  static PrintMarkItemDumpInfo(e, a) {
    MapLogger_1.MapLogger.Error(63, "地图调试信息->当前标记ItemDump信息", [
      "标记信息",
      MapDebugger.L3c(e, a),
    ]);
  }
  static PrintTrackDataInfo(e, a) {
    a = `
        ------------------------追踪信息Start--------------------

        TrackSource:${a.TrackSource}

        MarkType:${a.MarkType}

        TrackId:${a.Id}

        IconPath:${a.IconPath}

        TrackTarget:${a.TrackTarget}

        TrackInstanceId:${a.TrackInstanceId}

        TrackAutoCancelDistance:${a.TrackAutoCancelDistance}

        IsSubTrack:${a.IsSubTrack}

        TrackHideDis:${a.TrackHideDis}

        ShowGroupId:${a.ShowGroupId}

        TrackType:${a.TrackType}

        AutoHideTrack:${a.AutoHideTrack}

        PrefabPath:${a.PrefabPath}

        Offset:${a.Offset}

        IsInTrackRange:${a.IsInTrackRange}

        AreaId:${a.AreaId}

        MultiMapId:${a.MultiMapId}

        ------------------------追踪信息End------------------`;
    MapLogger_1.MapLogger.Error(63, "地图调试信息->" + e, ["追踪信息", a]);
  }
}
exports.MapDebugger = MapDebugger;
//# sourceMappingURL=MapDebugger.js.map
