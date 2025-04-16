"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SeamlessTravelPostProcess = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  DEFAULT_TRANSITION_POSTPROCESS_PRIORITY = 9999;
class SeamlessTravelPostProcess {
  constructor() {
    (this.Hte = void 0),
      (this.nx = void 0),
      (this.rh1 = void 0),
      (this.oh1 = void 0),
      (this.nh1 = !1),
      (this.CurrentBlendStatus = 0),
      (this.sh1 = 0),
      (this.ah1 = 0),
      (this.hh1 = void 0),
      (this.lh1 = void 0);
  }
  get IsInit() {
    return this.nh1;
  }
  get IsActive() {
    return 0 !== this.CurrentBlendStatus;
  }
  Init(t, s) {
    (this.Hte = Global_1.Global.BaseCharacter?.CharacterActorComponent),
      this.Hte
        ? ((this.CurrentBlendStatus = 0),
          (this.nx = t),
          this.IsInit
            ? s(!0)
            : ((this.sh1 =
                this.nx.EffectExpandTime *
                MathUtils_1.MathUtils.SecondToMillisecond),
              (this.ah1 =
                this.nx.EffectCollapseTime *
                MathUtils_1.MathUtils.SecondToMillisecond),
              (this.oh1 = this.nx.TransitionWeatherDaPath),
              this._h1((t) => {
                (this.nh1 = !0), s(t);
              })))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Teleport",
            39,
            "[无缝传送PPV]初始化失败，无效的ActorComp",
            ["ActorName", Global_1.Global.BaseCharacter?.GetName()],
          );
  }
  _h1(i) {
    (this.rh1 = ActorSystem_1.ActorSystem.Get(
      UE.KuroPostProcessVolume.StaticClass(),
      this.Hte?.ActorTransform ?? MathUtils_1.MathUtils.DefaultTransformDouble,
    )),
      this.rh1.IsValid()
        ? (GlobalData_1.GlobalData.IsPlayInEditor &&
            this.rh1.SetActorLabel("SeamlessTravelPostProcessVolume"),
          (this.rh1.BlendWeight = 0),
          (this.rh1.bUnbound = !0),
          (this.rh1.bEnabled = !1),
          (this.rh1.Priority = DEFAULT_TRANSITION_POSTPROCESS_PRIORITY),
          UE.KuroRenderingRuntimeBPPluginBPLibrary.MarkWorldPostProcessPriorityDirty(
            this.rh1,
          ),
          this.oh1?.length
            ? ResourceSystem_1.ResourceSystem.LoadAsync(
                this.oh1,
                UE.KuroWeatherDataAsset,
                (t, s) => {
                  t
                    ? (this.rh1?.SetWeatherDataAsset(t), i(!0))
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Teleport",
                          39,
                          "[无缝传送PPV] 加载DA失败",
                          ["path", s],
                          [
                            "ActorName",
                            Global_1.Global.BaseCharacter?.GetName(),
                          ],
                        ),
                      i(!1));
                },
              )
            : i(!0))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Teleport", 39, "[无缝传送PPV] 创建PPV失败", [
              "ActorName",
              Global_1.Global.BaseCharacter?.GetName(),
            ]),
          i(!1));
  }
  Tick(t) {
    if (this.IsInit && this.rh1?.IsValid() && this.IsActive && this.Hte) {
      var s,
        i = this.rh1.BlendWeight;
      switch (this.CurrentBlendStatus) {
        case 2:
          (this.rh1.BlendWeight = MathUtils_1.MathUtils.Clamp(
            i + t / this.sh1,
            0,
            1,
          )),
            this.rh1.D_K2_SetActorLocation(
              this.Hte.ActorLocation,
              !1,
              void 0,
              !0,
            ),
            (this.rh1.bEnabled = 0 < this.rh1.BlendWeight),
            this.rh1.PostModify(),
            1 !== i &&
              1 === this.rh1.BlendWeight &&
              ((s = this.hh1),
              (this.hh1 = void 0),
              (this.CurrentBlendStatus = 1),
              s?.(!0));
          break;
        case 3:
          (this.rh1.BlendWeight = MathUtils_1.MathUtils.Clamp(
            i - t / this.ah1,
            0,
            1,
          )),
            this.rh1.D_K2_SetActorLocation(
              this.Hte.ActorLocation,
              !1,
              void 0,
              !0,
            ),
            (this.rh1.bEnabled = 0 < this.rh1.BlendWeight),
            this.rh1.PostModify(),
            0 !== i &&
              0 === this.rh1.BlendWeight &&
              ((s = this.lh1),
              (this.lh1 = void 0),
              (this.CurrentBlendStatus = 0),
              s?.(!0));
      }
    }
  }
  Destroy() {
    this.rh1?.IsValid() &&
      ((this.rh1.BlendWeight = 0),
      (this.rh1.bUnbound = !1),
      (this.rh1.bEnabled = !1),
      (this.rh1.Priority = 0),
      ActorSystem_1.ActorSystem.Put(
        "SeamlessTravelPostProcess.Destroy",
        this.rh1,
      )),
      (this.rh1 = void 0),
      (this.Hte = void 0),
      (this.nx = void 0),
      (this.CurrentBlendStatus = 0),
      (this.hh1 = void 0),
      (this.lh1 = void 0);
  }
  AppearEffect(t) {
    this.IsInit && this.rh1?.IsValid()
      ? ((this.hh1 = t), (this.CurrentBlendStatus = 2))
      : t(!1);
  }
  DisappearEffect(t) {
    this.IsInit && this.rh1?.IsValid()
      ? ((this.lh1 = t), (this.CurrentBlendStatus = 3))
      : t(!1);
  }
}
exports.SeamlessTravelPostProcess = SeamlessTravelPostProcess;
//# sourceMappingURL=SeamlessTravelPostProcess.js.map
