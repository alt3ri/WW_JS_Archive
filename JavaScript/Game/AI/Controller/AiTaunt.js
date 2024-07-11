"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiTaunt = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TAUNT_VALUE = 1e9;
class AiTaunt {
  constructor(t) {
    (this.Bte = t),
      (this.Lre = void 0),
      (this.Dre = void 0),
      (this.Rre = void 0),
      (this.Ure = (t, i, s) => {
        t
          ? (-1 !== this.Dre && this.Lre.RemoveHateListForTaunt(this.Dre),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                58,
                "[AiTaunt]设置新的嘲讽对象：",
                ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
                ["嘲讽者", i],
              ),
            this.Lre.AddNewHateListForTaunt(i, TAUNT_VALUE),
            (this.Dre = i),
            (this.Rre = s))
          : s === this.Rre &&
            (this.Are(), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "AI",
              58,
              "[AiTaunt]嘲讽时效结束：",
              ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
              ["嘲讽者", i],
            );
      }),
      (this.xre = (t, i) => {
        -1 !== this.Dre &&
          t !== this.Dre &&
          (this.ClearCurrentTauntAndGe(), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "AI",
            58,
            "[AiTaunt]更高机制使之仇恨目标更改，嘲讽结束：",
            ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
          );
      });
  }
  Init(t) {
    (this.Lre = t), (this.Dre = -1), (this.Rre = void 0), this.BindEvent();
  }
  Tick() {
    if (this.Dre && -1 !== this.Dre) {
      let t = !0;
      var i,
        s = EntitySystem_1.EntitySystem.Get(this.Dre);
      (t =
        s?.Active &&
        ((i = s.GetComponent(158))?.Valid && !i.IsInGame && (t = !1),
        (i = s.GetComponent(185))?.Valid || (t = !1),
        !i.HasTag(1008164187))
          ? t
          : !1) ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            58,
            "[AiTaunt]嘲讽施加者目前失效或者死亡，导致嘲讽结束：",
            ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id],
            ["嘲讽者", this.Dre],
          ),
        this.ClearCurrentTauntAndGe());
    }
  }
  Clear() {
    this.ClearCurrentTauntAndGe(),
      (this.Lre = void 0),
      (this.Dre = void 0),
      (this.Rre = void 0),
      this.UnBindEvent();
  }
  Are() {
    this.Dre && this.Lre && this.Lre.RemoveHateListForTaunt(this.Dre),
      (this.Dre = -1),
      (this.Rre = void 0);
  }
  Reset(t) {
    this.Clear(), this.Init(t);
  }
  ClearCurrentTauntAndGe() {
    this.Bte.CharAiDesignComp.Entity.GetComponent(157)?.RemoveBuffByHandle(
      this.Rre,
    ),
      this.Are();
  }
  BindEvent() {
    this.Bte.CharAiDesignComp.Valid &&
      (EventSystem_1.EventSystem.AddWithTarget(
        this.Bte.CharAiDesignComp.Entity,
        EventDefine_1.EEventName.AiTauntAddOrRemove,
        this.Ure,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Bte.CharAiDesignComp.Entity,
        EventDefine_1.EEventName.AiHateTargetChanged,
        this.xre,
      ));
  }
  UnBindEvent() {
    var t = this.Bte.CharAiDesignComp?.Entity;
    t &&
      (EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.AiTauntAddOrRemove,
        this.Ure,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          t,
          EventDefine_1.EEventName.AiTauntAddOrRemove,
          this.Ure,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        t,
        EventDefine_1.EEventName.AiHateTargetChanged,
        this.xre,
      )) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        t,
        EventDefine_1.EEventName.AiHateTargetChanged,
        this.xre,
      );
  }
}
exports.AiTaunt = AiTaunt;
//# sourceMappingURL=AiTaunt.js.map
