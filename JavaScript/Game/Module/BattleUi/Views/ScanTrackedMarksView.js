"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanTrackedMarksView = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  ScanTrackedMarks_1 = require("./ScanTrackedMarks");
class ScanTrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.wmt = new Map()),
      (this.Bmt = new Set()),
      (this.bmt = (t, e) => {
        if (e && !(e.ScanInfos.length <= 0)) {
          var i = EntitySystem_1.EntitySystem.Get(t);
          if (i) {
            this.Bmt.add(t);
            const s = i.GetComponent(1)?.Owner,
              r = e.ScanCompositeConfig.ShowDistance;
            for (const n of e.ScanInfos) {
              const a = n.Color;
              if (0 !== n.IconPath.length) {
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  n.IconPath,
                  UE.LGUISpriteData_BaseObject,
                  (e) => {
                    e &&
                      e.IsValid() &&
                      s &&
                      this.Bmt.has(t) &&
                      this.qmt(
                        t,
                        e,
                        0,
                        "",
                        void 0,
                        s,
                        Vector_1.Vector.Create(n.Offset),
                        a,
                        r,
                      );
                  },
                );
                break;
              }
            }
          }
        }
      }),
      (this.Gmt = (e) => {
        this.Bmt.has(e) && this.Bmt.delete(e);
        var t = this.wmt.get(e);
        t && (t.ToClose(), this.wmt.delete(e));
      });
  }
  Initialize(e) {
    super.Initialize(e), this.yWe();
  }
  Reset() {
    super.Reset(), this.Nmt(), this.wmt.clear();
  }
  Update() {
    for (var [, e] of this.wmt) e.Update();
  }
  qmt(e, t, i, s, r, n, a, o, _) {
    this.wmt.has(e) ||
      ((t = new ScanTrackedMarks_1.ScanTrackedMarks(
        this.RootItem,
        t,
        i,
        s,
        r,
        n,
        a,
        o,
        _,
      )),
      this.wmt.set(e, t));
  }
  yWe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ScanTrackedStart,
      this.bmt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScanTrackedEnd,
        this.Gmt,
      );
  }
  Nmt() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ScanTrackedStart,
      this.bmt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScanTrackedEnd,
        this.Gmt,
      );
  }
  DestroyOverride() {
    return !0;
  }
}
exports.ScanTrackedMarksView = ScanTrackedMarksView;
//# sourceMappingURL=ScanTrackedMarksView.js.map
