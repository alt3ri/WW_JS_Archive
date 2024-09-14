"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillCdController = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil");
class SkillCdController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(25328, this.uQe),
      Net_1.Net.Register(16179, this.cQe),
      !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(25328), Net_1.Net.UnRegister(16179), !0;
  }
  static OnTick(e) {
    this.IsPause() ||
      (SkillCdController.gW.Start(),
      ModelManager_1.ModelManager.SkillCdModel.Tick(
        e * Time_1.Time.TimeDilation,
      ),
      SkillCdController.gW.Stop());
  }
  static Pause(e, t) {
    var r = this.IsPause(),
      t =
        ((this.mQe = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
          this.mQe,
          !t,
          e,
        )),
        this.IsPause());
    r !== t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharSkillCdPauseStateChanged,
        t,
      );
  }
  static IsPause() {
    return 0 !== this.mQe;
  }
}
((exports.SkillCdController = SkillCdController).gW =
  Stats_1.Stat.Create("SkillCdTick")),
  (SkillCdController.mQe = 0),
  (SkillCdController.uQe = (e) => {
    ModelManager_1.ModelManager.SkillCdModel?.HandlePlayerSkillInfoPbNotify(e);
  }),
  (SkillCdController.cQe = (e) => {
    ModelManager_1.ModelManager.SkillCdModel?.HandlePassiveSkillNotify(e);
  });
//# sourceMappingURL=SkillCdController.js.map
