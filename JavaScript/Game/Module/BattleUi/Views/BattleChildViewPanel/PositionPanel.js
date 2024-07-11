"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PositionPanel = void 0);
const UE = require("ue");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class PositionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.rZe = void 0),
      (this.nZe = void 0),
      (this.sZe = !0),
      (this.hZe = 500),
      (this.pk = 0),
      (this.ShowPlayerPosition = () => {
        (this.sZe = !this.sZe), this.rZe.SetUIActive(this.sZe);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    (this.rZe = this.GetText(0)),
      (this.nZe = this.GetText(1)),
      this.rZe.SetUIActive(this.sZe);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ShowPlayerPosition,
      this.ShowPlayerPosition,
    );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShowPlayerPosition,
      this.ShowPlayerPosition,
    );
  }
  OnBeforeDestroy() {
    this.rZe = void 0;
  }
  OnTickBattleChildViewPanel(e) {
    let t, i;
    Global_1.Global.BaseCharacter &&
      ((t =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy),
      ([e, t, i] =
        (this.sZe && this.lZe(t, e),
        [
          (t.X / 100).toFixed(0),
          (t.Y / 100).toFixed(0),
          (t.Z / 100).toFixed(0),
        ])),
      this.nZe.SetText(e + `,${t},` + i));
  }
  lZe(e, t) {
    const i = e.X.toFixed(0);
    const s = e.Y.toFixed(0);
    var e = e.Z.toFixed(0);
    const n = TimeUtil_1.TimeUtil.DateFormat5(new Date());
    const o = TimeUtil_1.TimeUtil.DateFormat5(
      new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()),
    );
    var t =
      ((this.pk += t),
      this.pk > this.hZe && ((this.pk = 0), this.UpdateEffectState()),
      `Pos: ${i},${s},${e}
CTime:${n} STime:${o}
GTime:` + ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString);
    this.rZe.SetText(t);
  }

  UpdateEffectState() {}
}
(exports.PositionPanel = PositionPanel).aYe = void 0;
// # sourceMappingURL=PositionPanel.js.map
