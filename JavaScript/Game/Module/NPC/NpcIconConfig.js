"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcIconConfig = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  NpcHeadInfoById_1 = require("../../../Core/Define/ConfigQuery/NpcHeadInfoById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  NpcIconDefine_1 = require("./NpcIconDefine");
class NpcIconConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.pGi = new Map()),
      (this.ult = void 0),
      (this.vGi = void 0),
      (this.MGi = ""),
      (this.EGi = 0),
      (this.SGi = 0),
      (this.yGi = 0),
      (this.IGi = 0),
      (this.TGi = 0),
      (this.LGi = 0);
  }
  get NpcIconHeadInfoLimitMinDistanceSquared() {
    return this.yGi;
  }
  get NpcIconHeadInfoLimitMaxDistanceSquared() {
    return this.TGi;
  }
  OnInit() {
    return (
      this.GetNpcIconHeadInfoLimitMinDistance(),
      this.GetNpcIconHeadInfoLimitMaxDistance(),
      !0
    );
  }
  GetHeadStateScaleValue(e) {
    return (
      this.ult ||
        (this.ult = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH,
          UE.CurveFloat,
        )),
      this.ult ? this.ult.GetFloatValue(e) : 1
    );
  }
  GetDialogScaleValue(e) {
    return (
      this.vGi ||
        (this.vGi = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH,
          UE.CurveFloat,
        )),
      this.vGi ? this.vGi.GetFloatValue(e) : 1
    );
  }
  GetNpcIconSocketName() {
    return (
      this.MGi ||
        (this.MGi =
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "npcicon_socketname",
          )),
      this.MGi
    );
  }
  GetNpcIconLocationOffsetZ() {
    return (
      this.EGi ||
        (this.EGi = CommonParamById_1.configCommonParamById.GetIntConfig(
          "npcicon_location_offsetz",
        )),
      this.EGi
    );
  }
  GetNpcIconHeadInfoLimitMinDistance() {
    return (
      this.SGi ||
        ((this.SGi = CommonParamById_1.configCommonParamById.GetIntConfig(
          "npc_headinfo_limit_min_distance",
        )),
        (this.yGi = this.SGi * this.SGi)),
      this.SGi
    );
  }
  GetNpcIconHeadInfoLimitMaxDistance() {
    return (
      this.IGi ||
        ((this.IGi = CommonParamById_1.configCommonParamById.GetIntConfig(
          "npc_headinfo_limit_max_distance",
        )),
        (this.TGi = this.IGi * this.IGi)),
      this.IGi
    );
  }
  GetNpcIconHeadInfoNameLimitDistance() {
    return (
      this.LGi ||
        (this.LGi = CommonParamById_1.configCommonParamById.GetIntConfig(
          "npc_headinfo_name_limit_distance",
        )),
      this.LGi
    );
  }
  GetNpcHeadInfo(e) {
    var i = NpcHeadInfoById_1.configNpcHeadInfoById.GetConfig(e);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Test",
            11,
            "查找不到对应的NPC头顶信息数据，检查一下NPC头顶信息表格",
            ["ID", e],
          )),
      i
    );
  }
  OnClear() {
    return (
      this.pGi.clear(),
      (this.MGi = void 0),
      (this.EGi = void 0),
      (this.SGi = void 0),
      (this.IGi = void 0),
      (this.LGi = void 0),
      (this.ult = void 0),
      !(this.vGi = void 0)
    );
  }
}
exports.NpcIconConfig = NpcIconConfig;
//# sourceMappingURL=NpcIconConfig.js.map
