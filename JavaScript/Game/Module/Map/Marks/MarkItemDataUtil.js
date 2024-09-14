"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemDataUtil = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class MarkItemDataUtil {
  static TransformMarkTypeToClient(o) {
    return this._Ga.get(o) ?? 0;
  }
  static GetMarkIcon(o) {
    var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o);
    if (r)
      switch (r.ObjectType) {
        case 10:
        case 19:
          var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
            r.RelativeId,
          );
          return !e || e.IsClose ? r.LockMarkPic : r.UnlockMarkPic;
        default:
          return r.LockMarkPic;
      }
  }
}
(exports.MarkItemDataUtil = MarkItemDataUtil)._Ga = new Map([
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_None, 0],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_Custom, 9],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.aTs, 12],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TemporaryTeleport, 15],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_SoundBox, 16],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint, 17],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.O7n, 18],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_CalmingWindBell, 21],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_EnrichmentArea, 22],
  [Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_EnrichmentAreaChild, 23],
]);
//# sourceMappingURL=MarkItemDataUtil.js.map
