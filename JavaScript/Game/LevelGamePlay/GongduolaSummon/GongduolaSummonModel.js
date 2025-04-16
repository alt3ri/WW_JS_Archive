"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GongduolaSummonModel = exports.SummonPointInfo = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ModelManager_1 = require("../../Manager/ModelManager");
class SummonPointInfo {
  constructor() {
    (this.Key = ""), (this.Pos = Vector_1.Vector.Create());
  }
}
exports.SummonPointInfo = SummonPointInfo;
class GongduolaSummonModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CancelSummonAmPath =
        "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_CancelSummon.AM_CancelSummon"),
      (this.SummonAmPath =
        "/Game/Aki/Character/NPC/AlienNPC/Level_B/SB1Gongduola3/BaseAnim/AM_Summon.AM_Summon"),
      (this.Q_c =
        "/Game/Aki/Data/Level/SummonGongduola/DA_SummonGongduolaConfig.DA_SummonGongduolaConfig"),
      (this.Ai1 = new Map()),
      (this.Znl = -1),
      (this.SummonedActorComp = void 0),
      (this.SummonLocation = void 0),
      (this.SummonRotation = void 0),
      (this.SummonGravityDir = void 0),
      (this.SummonConfig = void 0),
      (this.BanInputReason = "SummonGongduola Ban Input"),
      (this.X_c = 0),
      (this.IsLoaded = !1);
  }
  OnInit() {
    var o = (0, puerts_1.$ref)("");
    let e = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.SummonGongduolaConfigExportPath,
    );
    if (
      (PublicUtil_1.PublicUtil.IsUseTempData() ||
        (e = (0, PublicUtil_1.getConfigPath)(
          IGlobal_1.globalConfigTemp.SummonGongduolaConfigExportPath,
        )),
      UE.KuroStaticLibrary.LoadFileToString(o, e),
      (o = (0, puerts_1.$unref)(o)),
      StringUtils_1.StringUtils.IsNothing(o))
    )
      return !1;
    o = JSON.parse(o);
    if (!o) return !1;
    for (const n of o.Configs) {
      var r = n.LevelId,
        t = new Map();
      for (const s of n.SummonPoints) {
        var i = new SummonPointInfo();
        (i.Key = s.Id),
          i.Pos.FromConfigVector(s.Position),
          t.has(s.Gravity) || t.set(s.Gravity, []),
          t.get(s.Gravity).push(i);
      }
      this.Ai1.set(r, t);
    }
    return (
      (this.Znl = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SummonGongduolaRadius",
      )),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Q_c,
        UE.BP_SummonGongduolaConfig_C,
        (o) => {
          o?.IsValid()
            ? ((this.SummonConfig = o),
              (this.X_c = this.SummonConfig.ResummonDistance),
              (this.IsLoaded = !0))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SummonGongdola",
                31,
                "[GongduolaSummonModel] Load Config DA Failed",
              );
        },
      ),
      !0
    );
  }
  GetSummonPointInfo(o) {
    var e = ModelManager_1.ModelManager.GameModeModel?.MapConfig.MapId;
    return e ? (this.Ai1.get(e)?.get(o) ?? []) : [];
  }
  GetRadiusSquared() {
    return this.Znl * this.Znl;
  }
  GetResummonDistanceSquared() {
    return this.X_c * this.X_c;
  }
}
exports.GongduolaSummonModel = GongduolaSummonModel;
//# sourceMappingURL=GongduolaSummonModel.js.map
