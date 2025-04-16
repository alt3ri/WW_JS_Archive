"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardPanelUtil = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  FishingDefine_1 = require("../FishingDefine");
class DockyardPanelUtil {
  static RotateItemGridData(r, e) {
    var o = r.length,
      a = r[0].length,
      i = [];
    for (let t = 0; t < a; t++) {
      i[t] = [];
      for (let e = o - 1; 0 <= e; e--) i[t].push(r[e][t]);
    }
    return e === Protocol_1.Aki.Protocol.mR_.Proto_DirectionUp
      ? [i, Protocol_1.Aki.Protocol.mR_.Proto_No]
      : [i, e + 1];
  }
  static RotateOriginalPosData(r, e) {
    var o = r.length,
      a = r[0].length,
      i = [];
    if (e === Protocol_1.Aki.Protocol.mR_.Proto_No)
      for (let t = 0; t < o; t++) {
        i[t] = [];
        for (let e = 0; e < a; e++) i[t].push(r[t][e]);
      }
    else if (e === Protocol_1.Aki.Protocol.mR_.Proto_DirectionDown)
      for (let t = 0; t < a; t++) {
        i[t] = [];
        for (let e = o - 1; 0 <= e; e--) i[t].push(r[e][t]);
      }
    else if (e === Protocol_1.Aki.Protocol.mR_.Proto_DirectionLeft)
      for (let t = 0; t < o; t++) {
        i[t] = [];
        for (let e = 0; e < a; e++) i[t].push(r[o - 1 - t][a - 1 - e]);
      }
    else
      for (let t = 0; t < a; t++) {
        i[t] = [];
        for (let e = 0; e < o; e++) i[t].push(r[e][a - 1 - t]);
      }
    return i;
  }
  static CreateAndDeepCopyItemRangePos(e) {
    var t = {
      RowStartIndex: -1,
      RowEndIndex: -1,
      ColStartIndex: -1,
      ColEndIndex: -1,
    };
    return DockyardPanelUtil.DeepCopyItemRangePos(t, e), t;
  }
  static DeepCopyItemRangePos(e, t) {
    (e.RowStartIndex = t.RowStartIndex),
      (e.RowEndIndex = t.RowEndIndex),
      (e.ColStartIndex = t.ColStartIndex),
      (e.ColEndIndex = t.ColEndIndex);
  }
  static CalculateOriginalPivot(e, t) {
    var r = Vector2D_1.Vector2D.Create();
    return (
      e === t || Math.abs(e - t) % 2 == 0
        ? r.Set(0.5, 0.5)
        : t % 2 == 1
          ? r.Set((t / 2 - 0.5) / t, 0.5)
          : r.Set(0.5, (e / 2 - 0.5) / e),
      r
    );
  }
  static CreateFishingItemInfo(e, t, r) {
    var o = Protocol_1.Aki.Protocol.CR_.create(),
      e =
        ((o.b9n = e.IncId),
        (o.L8n = e.ItemId),
        (o.ATs = e.Quality),
        (o.M8n = e.Size),
        (o.MBs = e.Price),
        (o.MXl = e.Cup),
        (o.EXl = t),
        Protocol_1.Aki.Protocol.gR_.create());
    return (e.iPs = r.ColIndex), (e.rPs = r.RowIndex), (o.l8n = e), o;
  }
  static GetTexturePathByCup(e) {
    return 0 === e
      ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          FishingDefine_1.SILVER_CUP_ICON,
        )
      : 1 === e
        ? ""
        : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            FishingDefine_1.GOLD_CUP_ICON,
          );
  }
}
exports.DockyardPanelUtil = DockyardPanelUtil;
//# sourceMappingURL=DockyardPanelUtil.js.map
