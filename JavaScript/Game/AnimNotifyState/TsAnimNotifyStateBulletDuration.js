"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
class TsAnimNotifyStateBulletDuration extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.BulletIds = void 0),
      (this.LocationOffsets = void 0),
      (this.RotatorOffsets = void 0),
      (this.BulletEntityIdsMap = void 0),
      (this.UeTransform = void 0),
      (this.ArrayPreviewActor = void 0),
      (this.PreviewActor = void 0);
  }
  Constructor() {
    (this.BulletEntityIdsMap = void 0),
      (this.ArrayPreviewActor = void 0),
      (this.PreviewActor = void 0);
  }
  K2_NotifyBegin(i, t, e) {
    this.Initialize();
    var r = i.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var s = r.CharacterActorComponent?.Entity;
      if (s?.Valid) {
        var o = s
            .GetComponent(207)
            ?.CreateAnimNotifyContent(t.GetName(), this.exportIndex),
          a = s
            .GetComponent(39)
            ?.GetCurrentMontageCorrespondingSkillId()
            ?.toString(),
          h = this.BulletIds.Num(),
          l = this.LocationOffsets.Num(),
          n = [];
        for (let e = 0; e < h; e++) {
          let t = void 0,
            i = (l > e && (t = this.LocationOffsets.Get(e)), void 0);
          l > e && (i = this.RotatorOffsets.Get(e)),
            n.push(
              BulletUtil_1.BulletUtil.CreateBulletFromAN(
                r,
                this.BulletIds.Get(e),
                this.UeTransform,
                a,
                !1,
                o,
                void 0,
                t,
                i,
              ),
            );
        }
        this.BulletEntityIdsMap.set(i, n);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Bullet",
            57,
            "No Entity for TsBaseCharacter",
            ["Name", r.GetName()],
            ["location", r.D_K2_GetActorLocation()],
          );
    }
    var u = this.BulletIds,
      d = u.Num();
    if (!(d <= 0)) {
      t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(r.GetWorld());
      if (2 === t || 4 === t) {
        var s = UE.KismetSystemLibrary.GetOuterObject(this),
          v = UE.KismetSystemLibrary.GetPathName(s),
          c =
            ((this.ArrayPreviewActor = new Array(d)),
            (0, puerts_1.$ref)(this.PreviewActor));
        for (let t = 0; t < d; t++)
          UE.BPL_BulletPreview_C.ShowBulletPreview(
            v,
            new UE.FName(u.Get(t)),
            r,
            i,
            r.GetWorld(),
            c,
          ),
            (this.PreviewActor = (0, puerts_1.$unref)(c)),
            (this.ArrayPreviewActor[t] = this.PreviewActor);
        this.PreviewActor = void 0;
      }
    }
    return !1;
  }
  K2_NotifyEnd(t, i) {
    var e = t.GetOwner();
    if (
      (e instanceof TsBaseCharacter_1.default &&
        (e.CharacterActorComponent?.Entity?.Valid
          ? ((this.BulletEntityIdsMap.get(t) ?? []).forEach((t) => {
              ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(
                t,
                !1,
                0,
              );
            }),
            this.BulletEntityIdsMap.delete(t))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Test",
              6,
              "No Entity for TsBaseCharacter",
              ["Name", e.GetName()],
              ["location", e.D_K2_GetActorLocation()],
            )),
      this.ArrayPreviewActor)
    ) {
      for (const r of this.ArrayPreviewActor) r.K2_DestroyActor();
      this.ArrayPreviewActor = void 0;
    }
    return !1;
  }
  Initialize() {
    this.BulletEntityIdsMap || (this.BulletEntityIdsMap = new Map()),
      this.UeTransform || (this.UeTransform = new UE.TransformDouble());
  }
  GetNotifyName() {
    return "创建子弹";
  }
}
exports.default = TsAnimNotifyStateBulletDuration;
//# sourceMappingURL=TsAnimNotifyStateBulletDuration.js.map
