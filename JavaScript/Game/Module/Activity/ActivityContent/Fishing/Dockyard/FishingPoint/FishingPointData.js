"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TempFishingPointData = exports.FishingPointData = void 0);
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../../Common/TimeUtil");
class FishingPointData {
  constructor() {
    (this.Id = 0),
      (this.PbEntityId = 0),
      (this.SceneId = 0),
      (this.GamePlayId = 0),
      (this.CurrentCount = 0),
      (this.MaxCount = 0),
      (this.LastUpdateTime = 0),
      (this.NextUpdateTime = 0),
      (this.Interacted = !1);
  }
  Refresh(t) {
    (this.Id = t.s5n),
      (this.PbEntityId = t.A5n),
      (this.GamePlayId = t.fDs),
      (this.CurrentCount = t.EDs),
      0 === this.CurrentCount &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FishingPointFinish,
          this.Id,
        ),
      (this.MaxCount = t.zT_),
      (this.LastUpdateTime = MathUtils_1.MathUtils.LongToNumber(t.JT_)),
      (this.NextUpdateTime = MathUtils_1.MathUtils.LongToNumber(t.ZT_)),
      (this.Interacted = t.FD_);
  }
  IsValid() {
    return this.NextUpdateTime >= TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
}
exports.FishingPointData = FishingPointData;
class TempFishingPointData {
  constructor() {
    (this.Id = 0),
      (this.CreatureDataId = 0),
      (this.GamePlayId = 0),
      (this.SceneId = 0),
      (this.CurrentCount = 0),
      (this.MaxCount = 0);
  }
  Refresh(t) {
    (this.Id = t.v9n),
      (this.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(t.F4n)),
      (this.GamePlayId = t.fDs),
      (this.CurrentCount = t.EDs),
      (this.MaxCount = t.zT_);
  }
}
exports.TempFishingPointData = TempFishingPointData;
//# sourceMappingURL=FishingPointData.js.map
