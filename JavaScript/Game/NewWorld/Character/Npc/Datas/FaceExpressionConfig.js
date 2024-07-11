"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FaceExpressionConfig = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  FaceExpressionDataById_1 = require("../../../../../Core/Define/ConfigQuery/FaceExpressionDataById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase"),
  IGlobal_1 = require("../../../../../UniverseEditor/Interface/IGlobal"),
  PublicUtil_1 = require("../../../../Common/PublicUtil");
class FaceExpressionConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.fer = void 0), (this.per = !1);
  }
  OnInit() {
    return (this.fer = new Map()), !0;
  }
  OnClear() {
    return !(this.fer = void 0);
  }
  GetFaceExpressionConfig(i) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = FaceExpressionDataById_1.configFaceExpressionDataById.GetConfig(
        i,
        !1,
      );
      if (!r || !r.FaceExpression) return;
      let e = void 0;
      return (
        r.MaleVariant && (e = JSON.parse(r.MaleVariant)),
        {
          Id: r.Id,
          FaceExpression: JSON.parse(r.FaceExpression),
          MaleVariant: e,
        }
      );
    }
    return this.ver(), this.fer.get(i);
  }
  ver() {
    if (!this.per) {
      this.per = !0;
      let e = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.FaceExpressionConfigPath,
      );
      if (
        (PublicUtil_1.PublicUtil.IsUseTempData() ||
          (e = (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfigTemp.FaceExpressionConfigPath,
          )),
        UE.BlueprintPathsLibrary.FileExists(e))
      ) {
        var i = (0, puerts_1.$ref)(""),
          i =
            (UE.KuroStaticLibrary.LoadFileToString(i, e),
            (i = (0, puerts_1.$unref)(i)),
            JSON.parse(i));
        for (const r of i) r && !this.fer.has(r.Id) && this.fer.set(r.Id, r);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            51,
            "[FaceExpressionConfig] 不存在FaceExpressionConfig.json文件。",
            ["Path", e],
          );
    }
  }
}
exports.FaceExpressionConfig = FaceExpressionConfig;
//# sourceMappingURL=FaceExpressionConfig.js.map
