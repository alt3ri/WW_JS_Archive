"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LensFlareManager = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  RenderDataManager_1 = require("../../Data/RenderDataManager"),
  materialHaloName = new UE.FName("DynamicMaterial_LensFlareHalo"),
  materialGhostName = new UE.FName("DynamicMaterial_LensFlareGhost"),
  materialGlareName = new UE.FName("DynamicMaterial_LensFlareGlare"),
  meshHaloName = new UE.FName("StaticMesh_LensFlareHalo"),
  meshGhostName = new UE.FName("StaticMesh_LensFlareGhost"),
  meshGlareName = new UE.FName("StaticMesh_LensFlareGlare"),
  materialParameterColorTintName = new UE.FName("ColorTint"),
  materialParameterRampIndexName = new UE.FName("RampSample"),
  materialDensityName = new UE.FName("LensflareDensity"),
  actorName = new UE.FName("LensFlareActor"),
  actorFolderWp = new UE.FName("AlwaysLoad/LensFlare"),
  actorFolderPl = new UE.FName("GI/LensFlare");
class WorldLensFlareInfo {
  constructor() {
    (this.World = void 0),
      (this.LensFlareConfig = void 0),
      (this.LensFlareColorTint = void 0),
      (this.LensFlareRamp = 0),
      (this.LensFlareActor = void 0),
      (this.HaloComponent = void 0),
      (this.GhostComponent = void 0),
      (this.GlareComponent = void 0),
      (this.HaloMaterialDynamic = void 0),
      (this.GhostMaterialDynamic = void 0),
      (this.GlareMaterialDynamic = void 0);
  }
}
class LensFlareManager {
  constructor() {
    (this.WorldLensFlareInfos = void 0),
      (this.Slr = 1.5),
      (this.Elr = 0.05),
      (this.ylr = 0.5),
      (this.Ilr = 0.1),
      (this.MW = 5),
      (this.Tlr = 0.01),
      (this.Llr = 0),
      (this.cY = !1),
      (this.SetEnabledFunction = () => {
        this.cY = !0;
      }),
      (this.SetDisabledFunction = () => {
        this.cY = !1;
      });
  }
  static Get() {
    return (
      this.Me || ((this.Me = new LensFlareManager()), this.Me.Init()), this.Me
    );
  }
  Init() {
    (this.cY = !0), (this.WorldLensFlareInfos = []);
  }
  InitGameLogic() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ClearWorld,
      this.SetDisabledFunction,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.SetEnabledFunction,
      );
  }
  Tick(t, i, e, r, s) {
    t = this.GetCurrentInfo(t);
    if (t)
      if (this.cY) {
        if (
          (1 ===
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
              t.World,
            ) &&
            ((n =
              UE.KuroLensflareRenderingSystem.GetKuroLensflareSceneSampleResult()),
            t.HaloMaterialDynamic?.SetScalarParameterValue(
              materialDensityName,
              n,
            ),
            t.GhostMaterialDynamic?.SetScalarParameterValue(
              materialDensityName,
              n,
            ),
            t.GlareMaterialDynamic?.SetScalarParameterValue(
              materialDensityName,
              n,
            )),
          (this.Llr = this.Llr - 1),
          !(0 < this.Llr))
        ) {
          this.Llr = this.MW;
          let a = e;
          if (
            ((a =
              a ||
              RenderDataManager_1.RenderDataManager.Get().GetGlobalLensFlareConfig()),
            t.LensFlareActor && !t.LensFlareActor.IsValid() && this.Reset(t),
            t.LensFlareActor || this.ResetLensFlareConfig(t, a, r, s),
            t.LensFlareActor)
          ) {
            var n = this.Slr * i;
            t.LensFlareConfig !== a
              ? ((t.LensFlareColorTint.R = Math.max(
                  0,
                  t.LensFlareColorTint.R - n,
                )),
                (t.LensFlareColorTint.G = Math.max(
                  0,
                  t.LensFlareColorTint.G - n,
                )),
                (t.LensFlareColorTint.B = Math.max(
                  0,
                  t.LensFlareColorTint.B - n,
                )),
                (t.LensFlareColorTint.A = Math.max(
                  0,
                  t.LensFlareColorTint.A - n,
                )),
                t.LensFlareColorTint.GetMax() < this.Elr &&
                  this.ResetLensFlareConfig(t, a, r.op_Multiply(this.Elr), s))
              : ((t.LensFlareColorTint.R = Math.min(
                  t.LensFlareColorTint.R + n,
                  r.R,
                )),
                (t.LensFlareColorTint.G = Math.min(
                  t.LensFlareColorTint.G + n,
                  r.G,
                )),
                (t.LensFlareColorTint.B = Math.min(
                  t.LensFlareColorTint.B + n,
                  r.B,
                )),
                (t.LensFlareColorTint.A = Math.min(
                  t.LensFlareColorTint.A + n,
                  r.A,
                )));
            let e = 1;
            (e = Info_1.Info.IsGameRunning() ? this.GetFacingSun() : e) <
              this.Tlr ||
            t.LensFlareColorTint.IsAlmostBlack() ||
            void 0 === t.LensFlareConfig
              ? this.SetLensFlareVisible(t, !1)
              : (this.SetLensFlareVisible(t, !0),
                t.LensFlareActor &&
                  this.UpdateLensFlare(
                    t,
                    t.LensFlareColorTint.op_Multiply(e),
                    t.LensFlareRamp,
                  ));
          }
        }
      } else t.LensFlareActor && this.Reset(t);
  }
  GetCurrentInfo(e) {
    if (e?.IsValid()) {
      var a = e.GetWorld();
      if (a) {
        let e = void 0;
        for (const t of this.WorldLensFlareInfos)
          if (t.World === a) return (e = t);
        return (
          ((e = new WorldLensFlareInfo()).LensFlareColorTint =
            new UE.LinearColor()),
          (e.World = a),
          this.WorldLensFlareInfos.push(e),
          e
        );
      }
    }
  }
  Reset(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Render", 26, "LensFlare重置"),
      (e.LensFlareConfig = void 0),
      e.LensFlareActor &&
        UE.KuroRenderingRuntimeBPPluginBPLibrary.DestroyGITransientActor(
          e.World,
          actorName,
        ),
      (e.LensFlareActor = void 0),
      (e.HaloComponent = void 0),
      (e.GhostComponent = void 0),
      (e.GlareComponent = void 0),
      (e.HaloMaterialDynamic = void 0),
      (e.GhostMaterialDynamic = void 0),
      (e.GlareMaterialDynamic = void 0);
  }
  ResetLensFlareConfig(e, a, t, i) {
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Render", 26, "LensFlare配置刷新", [
          "配置名",
          a ? a.GetName() : "None",
        ]),
      (e.LensFlareConfig = a),
      (e.LensFlareColorTint = t),
      (e.LensFlareRamp = i),
      a)
    ) {
      t = e.World;
      if (!e.LensFlareActor) {
        i = new UE.Transform();
        if (
          (UE.KuroRenderingRuntimeBPPluginBPLibrary.IsWorldPartitionWorld(t)
            ? (e.LensFlareActor =
                UE.KuroRenderingRuntimeBPPluginBPLibrary.CreateGITransientActor(
                  t,
                  actorName,
                  !0,
                  !0,
                  actorFolderWp,
                ))
            : (e.LensFlareActor =
                UE.KuroRenderingRuntimeBPPluginBPLibrary.CreateGITransientActor(
                  t,
                  actorName,
                  !0,
                  !0,
                  actorFolderPl,
                )),
          !e.LensFlareActor)
        )
          return;
        (e.HaloComponent = e.LensFlareActor.AddComponentByClass(
          UE.StaticMeshComponent.StaticClass(),
          !1,
          i,
          !1,
          meshHaloName,
        )),
          (e.HaloComponent.bSelectable = !1),
          e.HaloComponent.SetCollisionEnabled(0),
          (e.HaloComponent.bReceivesDecals = !1),
          (e.HaloComponent.CastShadow = !1),
          (e.GhostComponent = e.LensFlareActor.AddComponentByClass(
            UE.StaticMeshComponent.StaticClass(),
            !1,
            i,
            !1,
            meshGhostName,
          )),
          (e.GhostComponent.bSelectable = !1),
          e.GhostComponent.SetCollisionEnabled(0),
          (e.GhostComponent.bReceivesDecals = !1),
          (e.GhostComponent.CastShadow = !1),
          (e.GlareComponent = e.LensFlareActor.AddComponentByClass(
            UE.StaticMeshComponent.StaticClass(),
            !1,
            i,
            !1,
            meshGlareName,
          )),
          (e.GlareComponent.bSelectable = !1),
          e.GlareComponent.SetCollisionEnabled(0),
          (e.GlareComponent.bReceivesDecals = !1),
          (e.GlareComponent.CastShadow = !1);
      }
      a.StaticMeshHalo && a.MaterialHalo
        ? ((e.HaloComponent.StaticMesh = a.StaticMeshHalo),
          (e.HaloMaterialDynamic =
            UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
              t,
              a.MaterialHalo,
              materialHaloName,
            )),
          e.HaloComponent.SetMaterial(0, e.HaloMaterialDynamic),
          e.HaloComponent.SetVisibility(!0))
        : ((e.HaloMaterialDynamic = void 0), e.HaloComponent.SetVisibility(!1)),
        a.StaticMeshGhost && a.MaterialGhost
          ? ((e.GhostComponent.StaticMesh = a.StaticMeshGhost),
            (e.GhostMaterialDynamic =
              UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
                t,
                a.MaterialGhost,
                materialGhostName,
              )),
            e.GhostComponent.SetMaterial(0, e.GhostMaterialDynamic),
            e.GhostComponent.SetVisibility(!0))
          : ((e.GhostMaterialDynamic = void 0),
            e.GhostComponent.SetVisibility(!1)),
        a.StaticMeshGlare && a.MaterialGlare
          ? ((e.GlareComponent.StaticMesh = a.StaticMeshGlare),
            (e.GlareMaterialDynamic =
              UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
                t,
                a.MaterialGlare,
                materialGlareName,
              )),
            e.GlareComponent.SetMaterial(0, e.GlareMaterialDynamic),
            e.GlareComponent.SetVisibility(!0))
          : ((e.GlareMaterialDynamic = void 0),
            e.GlareComponent.SetVisibility(!1));
    }
  }
  SetLensFlareVisible(e, a) {
    e.LensFlareActor &&
      (e.HaloComponent.SetVisibility(a),
      e.GhostComponent.SetVisibility(a),
      e.GlareComponent.SetVisibility(a));
  }
  UpdateLensFlare(e, a, t) {
    e.HaloMaterialDynamic?.SetVectorParameterValue(
      materialParameterColorTintName,
      a,
    ),
      e.GhostMaterialDynamic?.SetVectorParameterValue(
        materialParameterColorTintName,
        a,
      ),
      e.GhostMaterialDynamic?.SetScalarParameterValue(
        materialParameterRampIndexName,
        t + 0.5,
      ),
      e.GlareMaterialDynamic?.SetVectorParameterValue(
        materialParameterColorTintName,
        a,
      );
  }
  GetFacingSun() {
    var e =
        RenderDataManager_1.RenderDataManager.Get().GetCurrentCameraForward(),
      a = RenderDataManager_1.RenderDataManager.Get().GetMainLightVector();
    return e && a
      ? ((e = -e.DotProduct(a)),
        (a = this.ylr - e),
        MathUtils_1.MathUtils.Clamp(1 - a / this.Ilr, 0, 1))
      : 1;
  }
}
((exports.LensFlareManager = LensFlareManager).Rlr = void 0),
  (LensFlareManager.Dlr = void 0),
  (LensFlareManager.Ulr = void 0);
//# sourceMappingURL=LensFlareManager.js.map
