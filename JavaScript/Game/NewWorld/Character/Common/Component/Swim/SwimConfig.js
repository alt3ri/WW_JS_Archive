"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SwimConfig = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  SwimBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/SwimBuffById"),
  SwimById_1 = require("../../../../../../Core/Define/ConfigQuery/SwimById"),
  ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase"),
  NORMAL_SWIM_CONFIG_ID = 0,
  NO_INPUT_CONFIG_ID = 1,
  FAST_SWIM_CONFIG_ID = 3;
class SwimConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.UZo = void 0),
      (this.AZo = void 0),
      (this.PZo = void 0),
      (this.xZo = void 0);
  }
  OnInit() {
    return (
      (this.UZo = new Map()),
      (this.AZo = BigInt(0)),
      (this.PZo = BigInt(0)),
      (this.xZo = BigInt(0)),
      this.InitSwimBuffConfig(),
      !0
    );
  }
  OnClear() {
    return (
      (this.UZo = void 0),
      (this.AZo = void 0),
      (this.PZo = void 0),
      !(this.xZo = void 0)
    );
  }
  GetSwimConfigByRoleBodyId(i) {
    var e = this.UZo.get(i);
    return (
      e ||
      ((e = SwimById_1.configSwimById.GetConfig(i)) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 58, "以下身高没有配置游泳", [
            "RoleBody",
            i,
          ])),
      this.UZo.set(i, e),
      e)
    );
  }
  GetSwimBuffId(i, e) {
    return i ? (e ? this.PZo : this.AZo) : this.xZo;
  }
  InitSwimBuffConfig() {
    var i = SwimBuffById_1.configSwimBuffById.GetConfig(NORMAL_SWIM_CONFIG_ID);
    i
      ? ((this.AZo = BigInt(i.BuffId)),
        (i = SwimBuffById_1.configSwimBuffById.GetConfig(NO_INPUT_CONFIG_ID))
          ? ((this.xZo = BigInt(i.BuffId)),
            (i =
              SwimBuffById_1.configSwimBuffById.GetConfig(FAST_SWIM_CONFIG_ID))
              ? (this.PZo = BigInt(i.BuffId))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Movement",
                  58,
                  "游泳Buff表没有配置Id为3的基础配置",
                ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              58,
              "游泳Buff表没有配置Id为1的基础配置",
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Movement", 58, "游泳Buff表没有配置Id为0的基础配置");
  }
}
exports.SwimConfig = SwimConfig;
//# sourceMappingURL=SwimConfig.js.map
