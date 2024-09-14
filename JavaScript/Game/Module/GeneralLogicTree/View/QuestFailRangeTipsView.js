"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestFailRangeTipsView = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class QuestFailRangeTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.AYt = void 0),
      (this.SPe = void 0),
      (this.mNe = -0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    (this.AYt = this.GetText(0)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    var e = this.OpenParam;
    (this.mNe = e - TimeUtil_1.TimeUtil.GetServerStopTimeStamp()), this.PYt();
  }
  OnTick(e) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.TimeStop ||
      ((this.mNe = Math.max(this.mNe - e * Time_1.Time.TimeDilation, 0)),
      this.PYt(),
      "Loop" !== this.SPe.GetCurrentSequence() &&
        this.SPe.PlayLevelSequenceByName("Loop", !1));
  }
  PYt() {
    var e = this.mNe / 1e3,
      e = Math.floor(e);
    this.AYt.SetText(e.toString());
  }
}
exports.QuestFailRangeTipsView = QuestFailRangeTipsView;
//# sourceMappingURL=QuestFailRangeTipsView.js.map
