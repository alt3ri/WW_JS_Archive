"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class FishingQteController extends ControllerBase_1.ControllerBase {
  static OpenGameplay(e, r) {
    var o = e.GetComponent(0).GetPbDataId(),
      a = e.GetComponent(0).GetCreatureDataId(),
      t = (e) => {
        e
          ? (UiManager_1.UiManager.OpenView("FishingQteView"), r?.(e))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("LevelPlay", 37, "[FishingQte] 无法进入捕鱼玩法");
      };
    "FishingPoint" ===
    e.GetComponent(0).GetBaseInfo()?.Category?.FishingMechanismType
      ? ModelManager_1.ModelManager.FishingQteModel.GameplayStart(o, a).then(t)
      : t(
          ModelManager_1.ModelManager.FishingQteModel.GameplayStartByTempFishPoint(
            a,
          ),
        );
  }
  static FishingGetRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.Hv_.create();
    (r.F4n = e),
      Net_1.Net.Call(26831, r, (e) => {
        var r;
        e
          ? (r = e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)
            ? (ModelManager_1.ModelManager.FishingQteModel.SetTempGetDataListFromServer(
                e.bMs,
                0,
              ),
              ModelManager_1.ModelManager.FishingQteModel.SetTempGetDataListFromServer(
                e.YP_,
                1,
              ),
              ModelManager_1.ModelManager.FishingQteModel.SetTempGetDataListFromServer(
                e.GBs,
                2,
              ),
              o?.(r, e.bMs.length))
            : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17789,
              ),
              o?.(!1))
          : o?.(!1);
      });
  }
  static OpenFishingSuccessView(e, r) {
    UiManager_1.UiManager.OpenView("FishingQteSuccessView", e, r);
  }
}
exports.FishingQteController = FishingQteController;
//# sourceMappingURL=FishingQteController.js.map
