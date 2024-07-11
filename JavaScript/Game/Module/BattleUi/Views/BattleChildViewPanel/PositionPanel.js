"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0,
}),
  (exports.PositionPanel = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
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
    var o, t;
    Global_1.Global.BaseCharacter &&
      ((o =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy),
      ([e, o, t] =
        (this.sZe && this.lZe(o, e),
        [
          (o.X / 100).toFixed(0),
          (o.Y / 100).toFixed(0),
          (o.Z / 100).toFixed(0),
        ])),
      this.nZe.SetText(e + `,${o},` + t));
  }
  lZe(e, o) {
    var t = e.X.toFixed(0),
      r = e.Y.toFixed(0);
    (e = e.Z.toFixed(0)),
      TimeUtil_1.TimeUtil.DateFormat5(new Date()),
      TimeUtil_1.TimeUtil.DateFormat5(
        new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      ),
      (this.pk += o),
      this.pk > this.hZe && ((this.pk = 0), this.UpdateEffectState()),
      (o = `CurPos: X:${t},Y:${e},Z:${r}
        @Wuthering_Wives
        encore.moe`);
    this.rZe.SetText(o);
  }

  UpdateEffectState() {}
}
(exports.PositionPanel = PositionPanel).aYe = void 0;
