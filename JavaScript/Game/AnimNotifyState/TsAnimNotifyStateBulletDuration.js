"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GlobalData_1 = require("../GlobalData"),
  BulletController_1 = require("../NewWorld/Bullet/BulletController"),
  BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
class TsAnimNotifyStateBulletDuration extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.BulletIds = void 0),
      (this.LocationOffsets = void 0),
      (this.BulletEntityIds = void 0),
      (this.IsInitialize = !1),
      (this.UeTransform = void 0),
      (this.ArrayPreviewActor = void 0),
      (this.PreviewActor = void 0);
  }
  K2_NotifyBegin(e, t, i) {
    this.Initialize();
    var r = e.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var s = r.CharacterActorComponent?.Entity;
      if (s?.Valid) {
        var s = s.GetComponent(33),
          o =
            (s?.SetCurSkillAnIndex(this.exportIndex),
            s?.GetCurrentMontageCorrespondingSkillId()?.toString()),
          a = this.BulletIds.Num(),
          l = this.LocationOffsets.Num();
        for (let e = 0; e < a; e++) {
          let t = void 0;
          l > e && (t = this.LocationOffsets.Get(e)),
            this.BulletEntityIds.push(
              BulletUtil_1.BulletUtil.CreateBulletFromAN(
                r,
                this.BulletIds.Get(e),
                this.UeTransform,
                o,
                !1,
                void 0,
                t,
              ),
            );
        }
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Bullet",
            58,
            "No Entity for TsBaseCharacter",
            ["Name", r.GetName()],
            ["location", r.K2_GetActorLocation()],
          );
    }
    var h = this.BulletIds,
      u = h.Num();
    if (!(u <= 0)) {
      s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(r.GetWorld());
      if (2 === s || 4 === s) {
        var s = UE.KismetSystemLibrary.GetOuterObject(this),
          n = UE.KismetSystemLibrary.GetPathName(s),
          _ =
            ((this.ArrayPreviewActor = new Array(u)),
            (0, puerts_1.$ref)(this.PreviewActor));
        for (let t = 0; t < u; t++)
          UE.BPL_BulletPreview_C.ShowBulletPreview(
            n,
            new UE.FName(h.Get(t)),
            r,
            e,
            r.GetWorld(),
            _,
          ),
            (this.PreviewActor = (0, puerts_1.$unref)(_)),
            (this.ArrayPreviewActor[t] = this.PreviewActor);
        this.PreviewActor = void 0;
      }
    }
    return !1;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (
      (t instanceof TsBaseCharacter_1.default &&
        (t.CharacterActorComponent?.Entity?.Valid
          ? this.BulletEntityIds.forEach((t) => {
              BulletController_1.BulletController.DestroyBullet(t, !1, 0);
            })
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Test",
              6,
              "No Entity for TsBaseCharacter",
              ["Name", t.GetName()],
              ["location", t.K2_GetActorLocation()],
            )),
      this.ArrayPreviewActor)
    ) {
      for (const i of this.ArrayPreviewActor) i.K2_DestroyActor();
      this.ArrayPreviewActor = void 0;
    }
    return !1;
  }
  Initialize() {
    (this.IsInitialize && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.BulletEntityIds = []),
      (this.UeTransform = new UE.Transform()),
      (this.IsInitialize = !0));
  }
  GetNotifyName() {
    return "创建子弹";
  }
}
exports.default = TsAnimNotifyStateBulletDuration;
//# sourceMappingURL=TsAnimNotifyStateBulletDuration.js.map
