"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanTrackedMarksView = void 0);
const UE = require("ue");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const ScanTrackedMarks_1 = require("./ScanTrackedMarks");
class ScanTrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Sct = new Map()),
      (this.Ect = new Set()),
      (this.yct = (t, e) => {
        if (e && !(e.ScanInfos.length <= 0)) {
          const i = EntitySystem_1.EntitySystem.Get(t);
          if (i) {
            this.Ect.add(t);
            const s = i.GetComponent(1)?.Owner;
            const r = e.ScanCompositeConfig.ShowDistance;
            for (const n of e.ScanInfos) {
              const a = n.Color;
              if (n.IconPath.length !== 0) {
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  n.IconPath,
                  UE.LGUISpriteData_BaseObject,
                  (e) => {
                    e &&
                      e.IsValid() &&
                      s &&
                      this.Ect.has(t) &&
                      this.Ict(
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
      (this.Tct = (e) => {
        this.Ect.has(e) && this.Ect.delete(e);
        const t = this.Sct.get(e);
        t && (t.ToClose(), this.Sct.delete(e));
      });
  }
  Initialize(e) {
    super.Initialize(e), this.uje();
  }
  Reset() {
    super.Reset(), this.Lct(), this.Sct.clear();
  }
  Update() {
    for (const [, e] of this.Sct) e.Update();
  }
  Ict(e, t, i, s, r, n, a, o, _) {
    this.Sct.has(e) ||
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
      this.Sct.set(e, t));
  }
  uje() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ScanTrackedStart,
      this.yct,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScanTrackedEnd,
        this.Tct,
      );
  }
  Lct() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ScanTrackedStart,
      this.yct,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScanTrackedEnd,
        this.Tct,
      );
  }
  DestroyOverride() {
    return !0;
  }
}
exports.ScanTrackedMarksView = ScanTrackedMarksView;
// # sourceMappingURL=ScanTrackedMarksView.js.map
