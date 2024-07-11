"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TsDecoratorWeatherStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.WeatherStateId = 0),
      (this.CheckType = 0),
      (this.IsInitTsVariables = !1),
      (this.TsWeatherStateId = 0),
      (this.TsCheckType = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsWeatherStateId = this.WeatherStateId),
      (this.TsCheckType = this.CheckType));
  }
  PerformConditionCheckAI(e, t) {
    if (!e.AiController)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables();
    e = ModelManager_1.ModelManager.WeatherModel;
    if (!e) return !1;
    const r = e.CurrentWeatherId;
    switch (this.TsCheckType) {
      case 0:
        return r === this.TsWeatherStateId;
      case 1:
        return r !== this.TsWeatherStateId;
      case 2:
        return r < this.TsWeatherStateId;
      case 3:
        return r <= this.TsWeatherStateId;
      case 4:
        return r > this.TsWeatherStateId;
      case 5:
        return r >= this.TsWeatherStateId;
      default:
        return !1;
    }
  }
}
exports.default = TsDecoratorWeatherStateCheck;
// # sourceMappingURL=TsDecoratorWeatherStateCheck.js.map
