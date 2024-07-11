"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleNetController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  REQUEST_TIME_GAP = 2e3;
class BattleNetController {
  static async RequestCaptureEntity(e) {
    var t = Time_1.Time.Now;
    if (t - this.C0r < REQUEST_TIME_GAP) return !1;
    this.C0r = t;
    var r,
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(t)
      ? (((r = Protocol_1.Aki.Protocol.Jus.create()).J4n =
          MathUtils_1.MathUtils.NumberToLong(t)),
        !(
          !(r = await Net_1.Net.CallAsync(10338, r)) ||
          (0 !== r.A9n &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Level", 30, "幻象收复失败", ["ErrCode", r.A9n]),
            1))
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            30,
            "[CreatureController.RequestCaptureEntity] 请求幻象收复失败, Entity为空。",
            ["CreatureDataId", t],
            ["EntityId", e],
          ),
        !1);
  }
}
(exports.BattleNetController = BattleNetController).C0r = 0;
//# sourceMappingURL=BattleNetController.js.map
