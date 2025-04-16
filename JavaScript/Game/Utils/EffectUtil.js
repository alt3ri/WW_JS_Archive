"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectUtil = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  EffectConfigById_1 = require("../../Core/Define/ConfigQuery/EffectConfigById"),
  DataTableUtil_1 = require("../../Core/Utils/DataTableUtil"),
  EffectSystem_1 = require("../Effect/EffectSystem"),
  GlobalData_1 = require("../GlobalData");
class EffectUtil {
  static GetEffectPath(e) {
    return EffectConfigById_1.configEffectConfigById.GetConfig(e).Path;
  }
  static SpawnUiEffect(e, t, f = new UE.TransformDouble(), i) {
    e = EffectUtil.GetEffectPath(e);
    return EffectSystem_1.EffectSystem.SpawnEffect(
      GlobalData_1.GlobalData.World,
      f,
      e,
      t,
      void 0,
      1,
    );
  }
  static GetPreviewReplaceEffectPath(e) {
    var t = e,
      f =
        UE.KuroEditorUtilityLibrary.GetAssetViewerSettings()?.Profiles.Get(
          0,
        )?.EffectReplaceDataTable;
    if (f) {
      f = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(f);
      if (f.length)
        for (const r of f) {
          var i = r.NewEffect?.ToAssetPathName();
          if (i?.length && "None" !== i)
            if (r.OldEffect?.ToAssetPathName() === t)
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    4,
                    "[Game.AnimNotify]预览找到替换列表的资源，替换为",
                    ["NewPath", i],
                  ),
                i
              );
        }
    }
    return e;
  }
}
exports.EffectUtil = EffectUtil;
//# sourceMappingURL=EffectUtil.js.map
