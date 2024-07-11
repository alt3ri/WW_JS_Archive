"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraConfigController = exports.CameraConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const RbTree_1 = require("../../../Core/Container/RbTree");
const CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const PlatformController_1 = require("../../Module/Platform/PlatformController");
const CameraController_1 = require("../CameraController");
const FightCameraLogicComponent_1 = require("../FightCameraLogicComponent");
const CameraControllerBase_1 = require("./CameraControllerBase");
const DEFAULT_MAX_FADE_TIME = 5;
const noAimGameplayTag = -1036349300;
class CameraConfig {
  constructor(t) {
    (this.Type = 0),
      (this.Tag = void 0),
      (this.PcValid = !1),
      (this.MobileValid = !1),
      (this.Priority = 0),
      (this.EnableModifyCamera = !1),
      (this.EnableAdjustCamera = !1),
      (this.EnableAutoCamera = !1),
      (this.EnableFocusCamera = !1),
      (this.EnableSidestepCamera = !1),
      (this.EnableClimbCamera = !1),
      (this.FadeInTime = -0),
      (this.FadeOutTime = -0),
      (this.IsOpenMainLoop = !1),
      (this.IsResetDefaultConfig = !1),
      (this.IsUniqueFade = !1),
      (this.Type = t.Type),
      (this.Tag = t.Tag.TagName === "None" ? void 0 : t.Tag),
      (this.PcValid = t.PC生效),
      (this.MobileValid = t.手机生效),
      (this.Priority = t.优先级),
      (this.EnableModifyCamera = t.启用Modify镜头),
      (this.EnableAdjustCamera = t.启用技能修正镜头),
      (this.EnableAutoCamera = t.启用自动镜头),
      (this.EnableFocusCamera = t.启用锁定镜头),
      (this.EnableSidestepCamera = t.启用移动自动镜头),
      (this.EnableClimbCamera = t.启用攀爬镜头),
      (this.FadeInTime = t.淡入时间),
      (this.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
        t.淡入曲线,
      )),
      (this.FadeOutTime = t.淡出时间),
      (this.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(
        t.淡出曲线,
      )),
      (this.LockOnParts =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TArrayToArray(
          t.锁定点名称,
        )),
      (this.DefaultConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.基础,
        )),
      (this.DefaultCurveConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.基础曲线配置,
        )),
      (this.AdjustConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.技能修正,
        )),
      (this.CurveAdjustConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.技能修正曲线配置,
        )),
      (this.AutoConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.自动镜头,
        )),
      (this.CurveAutoConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.自动镜头曲线配置,
        )),
      (this.FocusConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.锁定镜头,
        )),
      (this.CurveFocusConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.锁定镜头曲线配置,
        )),
      (this.InputConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.镜头输入,
        )),
      (this.CurveInputConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.镜头输入曲线配置,
        )),
      (this.ModifyConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.Modify镜头,
        )),
      (this.CurveModifyConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.Modify镜头曲线配置,
        )),
      (this.GuideConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.引导镜头,
        )),
      (this.CurveGuideConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.引导镜头曲线配置,
        )),
      (this.ExploreConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.跑图镜头,
        )),
      (this.CurveExploreConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.跑图镜头曲线配置,
        )),
      (this.DialogueConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.对话镜头,
        )),
      (this.CurveDialogueConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.对话镜头曲线配置,
        )),
      (this.ClimbConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.攀爬镜头,
        )),
      (this.CurveClimbConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.攀爬镜头曲线配置,
        )),
      (this.SidestepConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(
          t.移动自动镜头,
        )),
      (this.CurveSidestepConfig =
        FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(
          t.移动自动镜头曲线配置,
        )),
      (this.IsOpenMainLoop = t.是否开启主镜头缓入缓出),
      (this.IsResetDefaultConfig = t.是否重置默认配置),
      (this.IsUniqueFade = t.是否独立过渡时间);
  }
}
exports.CameraConfig = CameraConfig;
class DtCameraConfig {
  constructor(t) {
    (this.DataTable = t),
      (this.ReferenceCount = 0),
      (this.SubValidKeys = new Set()),
      (this.FocusValidKeys = new Set());
  }
  SetToConfigs(i, s, h) {
    const e = CameraController_1.CameraController.GetCameraConfigList(
      this.DataTable,
    );
    const o = e.Num();
    for (let t = 0; t < o; t++) {
      var a;
      const r = new CameraConfig(e.Get(t));
      r[h] &&
        (r.Tag && r.Tag.TagName !== "None"
          ? ((a = r.Tag.TagId),
            r.Type === 2
              ? i.has(a)
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Camera",
                    6,
                    "独有镜头配置不允许重复的Tag",
                    ["DT", this.DataTable.GetOuter().GetName()],
                    ["Tag", r.Tag.TagName],
                  )
                : (i.set(a, r), this.SubValidKeys.add(a))
              : r.Type === 3 &&
                (s.has(a) ? s.get(a).add(r) : s.set(a, new Set([r])),
                this.FocusValidKeys.add(a)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 6, "独有镜头配置不允许Tag为None", [
              "DT",
              this.DataTable.GetOuter().GetName(),
            ]));
    }
  }
  RemoveFromConfigs(t, i) {
    for (const s of this.SubValidKeys) t.delete(s);
    for (const h of this.FocusValidKeys) i.delete(h);
    this.SubValidKeys.clear(), this.FocusValidKeys.clear();
  }
}
class CameraConfigController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t),
      (this.Rle = void 0),
      (this.Ule = void 0),
      (this.Ale = void 0),
      (this.Ple = new Map()),
      (this.xle = new Map()),
      (this.wle = new Set()),
      (this.Ble = new Set()),
      (this.ble = (t, i) => t.Priority - i.Priority),
      (this.qle = new RbTree_1.RbTree(this.ble)),
      (this.Gle = new Map()),
      (this.AdjustCameraTagMap = new Map()),
      (this.AdjustCameraEntityHandleSet = new Set()),
      (this.Nle = !1),
      (this.Ole = void 0),
      (this.kle = (t, i, s) => {
        let h;
        i === 0 && s > 0
          ? this.wle.has(t)
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Camera", 6, "Got config before Tag", [
                "Tag",
                GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
              ])
            : (h = this.Ple.get(t)) &&
              (this.qle.Insert(h),
              this.wle.add(t),
              this.Fle(h),
              Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug("Camera", 6, "SelfTagChanged Insert", [
                "tag",
                h.Tag.TagName,
              ])
          : i > 0 &&
            s === 0 &&
            (h = this.Ple.get(t)) &&
            this.wle.has(t) &&
            (this.qle.Remove(h),
            this.wle.delete(t),
            this.Vle(h),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("Camera", 6, "SelfTagChanged Remove", [
              "tag",
              h.Tag.TagName,
            ]);
      }),
      (this.Hle = void 0),
      (this.jle = ""),
      (this.Wle = (t, i, s) => {
        if (i === 0 && s > 0)
          if (this.Ble.has(t))
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Camera", 6, "Got config before Tag", [
                "Tag",
                GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
              ]);
          else {
            var h = this.xle.get(t);
            if (h)
              for (const e of h)
                e.LockOnParts.length === 0 &&
                  (this.qle.Insert(e), this.Ble.add(t), this.Fle(e));
          }
        else if (i > 0 && s === 0) {
          h = this.xle.get(t);
          if (h && this.Ble.has(t)) {
            for (const o of h) this.qle.Remove(o), this.Vle(o);
            this.Ble.delete(t);
          }
        }
      }),
      (this.OnChangeRole = (t, i) => {
        if (!(this.AdjustCameraTagMap.size <= 0))
          for (const [s, h] of this.AdjustCameraTagMap)
            this.EnableHookConfig(s, h);
      }),
      (this.X6s = (t) => {
        this.SelfCharacterEntity = t;
      }),
      (this.Kle = !1),
      (this.Qle = !1),
      (this.Xle = DEFAULT_MAX_FADE_TIME),
      (this.$le = void 0),
      (this.Yle = !1),
      (this.Jle = DEFAULT_MAX_FADE_TIME),
      (this.zle = void 0),
      (this.AutoCamera = !0),
      (this.AdjustCamera = !0),
      (this.ModifyCamera = !0),
      (this.FocusCamera = !0),
      (this.SidestepCamera = !0),
      (this.ClimbCamera = !0),
      (this.Zle = !0),
      (this.e1e = void 0),
      (this.DebugSubCameraModifications = void 0),
      PlatformController_1.PlatformController.IsPc()
        ? (this.e1e = "PcValid")
        : PlatformController_1.PlatformController.IsMobile()
          ? (this.e1e = "MobileValid")
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 6, "Error Platform"),
      this.LoadConfig();
  }
  get SelfCharacterEntity() {
    return this.Ole;
  }
  set SelfCharacterEntity(t) {
    this.Ole !== t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Camera",
          6,
          "CharacterChange",
          ["old", this.Ole?.Id],
          ["new", t?.Id],
        ),
      this.Ole &&
        this.Ole?.Entity?.Valid &&
        EventSystem_1.EventSystem.HasWithTarget(
          this.Ole?.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.kle,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Ole.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.kle,
        ),
      t?.Valid &&
        !EventSystem_1.EventSystem.HasWithTarget(
          t.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.kle,
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          t.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.kle,
        ),
      (this.Ole = t),
      this.t1e());
  }
  UpdateFocusTargetAndSocket(t, i) {
    let s = !1;
    this.Hle === t
      ? this.jle !== i && (s = !0)
      : (this.Hle &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Hle,
            EventDefine_1.EEventName.OnGameplayTagChanged,
            this.Wle,
          ),
        t &&
          !EventSystem_1.EventSystem.HasWithTarget(
            t,
            EventDefine_1.EEventName.OnGameplayTagChanged,
            this.Wle,
          ) &&
          EventSystem_1.EventSystem.AddWithTarget(
            t,
            EventDefine_1.EEventName.OnGameplayTagChanged,
            this.Wle,
          ),
        (s = !0)),
      (this.Hle = t),
      (this.jle = i),
      s && this.i1e();
  }
  Name() {
    return "ConfigController";
  }
  OnStart() {
    super.OnStart(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraCharacterChanged,
        this.X6s,
      );
  }
  UpdateInternal(t) {
    this.UpdateBreakModifyInfo(), this.UpdateConfig();
  }
  EnableHookConfig(t, i = void 0) {
    let s;
    const h = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      e?.Valid &&
        (s = e.Entity.GetComponent(185)) &&
        (void 0 === i || s.HasTag(i) || s.AddTag(i),
        s.HasTag(h) && s.RemoveTag(h),
        s.AddTag(h),
        CameraController_1.CameraController.FightCamera.LogicComponent.CameraConfigController.AdjustCameraEntityHandleSet.add(
          e,
        ));
    this.AdjustCameraTagMap.set(t, i);
  }
  DisableHookConfig(t = void 0) {
    void 0 !== t &&
      (this.o1e(IAction_1.EAdjustPlayerCamera.Basic, t),
      this.o1e(IAction_1.EAdjustPlayerCamera.Horizontal, t),
      this.o1e(IAction_1.EAdjustPlayerCamera.Dialog, t),
      this.o1e(IAction_1.EAdjustPlayerCamera.Fixed, t),
      this.o1e(IAction_1.EAdjustPlayerCamera.AxisLock, t));
    for (const s of this.AdjustCameraEntityHandleSet) {
      const i = s?.Entity?.GetComponent(185);
      i &&
        (i.RemoveTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            IAction_1.EAdjustPlayerCamera.Basic,
          ),
        ),
        i.RemoveTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            IAction_1.EAdjustPlayerCamera.Horizontal,
          ),
        ),
        i.RemoveTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            IAction_1.EAdjustPlayerCamera.Dialog,
          ),
        ),
        i.RemoveTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            IAction_1.EAdjustPlayerCamera.Fixed,
          ),
        ),
        i.RemoveTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            IAction_1.EAdjustPlayerCamera.AxisLock,
          ),
        ),
        i.RemoveTag(noAimGameplayTag));
    }
    this.AdjustCameraEntityHandleSet.clear(), this.AdjustCameraTagMap.clear();
  }
  DisableHookConfigByType(t) {
    for (const s of this.AdjustCameraEntityHandleSet) {
      const i = s?.Entity?.GetComponent(185);
      i && i.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
    }
  }
  GetCameraConfigByTag(t) {
    return this.Ple.get(t);
  }
  LoadConfig() {
    (this.Rle = CameraController_1.CameraController.GetCameraConfigList()),
      this.Ple.clear(),
      this.xle.clear(),
      this.wle.clear();
    for (const [, t] of this.Gle)
      t.SubValidKeys.clear(), t.FocusValidKeys.clear();
    let i;
    const s = this.Rle.Num();
    for (let t = 0; t < s; t++) {
      const h = new CameraConfig(this.Rle.Get(t));
      h[this.e1e] &&
        (h.Type === 0
          ? (this.Ule = h)
          : h.Type === 1
            ? (this.Ale = h)
            : h.Type === 2
              ? h.Tag && h.Tag.TagName !== "None"
                ? this.Ple.set(h.Tag.TagId, h)
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Camera",
                    15,
                    "初始化镜头配置[DT_CameraConfigs]失败，子镜头没有正确配置Tag",
                  )
              : h.Type === 3 &&
                (h.Tag.TagName === "None"
                  ? Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Camera",
                      15,
                      "初始化镜头配置[DT_CameraConfigs]失败，战斗目标镜头没有正确配置Tag",
                    )
                  : this.xle.has(h.Tag.TagId)
                    ? this.xle.get(h.Tag.TagId).add(h)
                    : this.xle.set(h.Tag.TagId, new Set([h]))));
    }
    (this.Ule && this.Ale) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Camera",
          15,
          "初始化镜头配置[DT_CameraConfigs]失败，基础镜头/战斗镜头未配置",
        ));
    for ([, i] of this.Gle) i.SetToConfigs(this.Ple, this.xle, this.e1e);
    (this.Nle = !1),
      this.qle.Clear(),
      this.qle.Insert(this.Ule),
      (this.Zle = !0),
      this.Fle(this.Ule),
      this.UpdateConfig();
  }
  LoadCharacterConfig(i) {
    if (i) {
      let t = this.Gle.get(i);
      if (!t) {
        if (
          ((t = new DtCameraConfig(i)).SetToConfigs(
            this.Ple,
            this.xle,
            this.e1e,
          ),
          this.Gle.set(i, t),
          this.SelfCharacterEntity)
        )
          for (const h of t.SubValidKeys) {
            var s;
            this.Camera.ContainsTag(h) &&
              ((s = this.Ple.get(h)),
              this.qle.Insert(s),
              this.wle.add(h),
              this.Fle(s));
          }
        if (this.Hle)
          for (const e of t.FocusValidKeys)
            if (this.Camera.TargetContainsTag(e))
              for (const o of this.xle.get(e))
                this.qle.Insert(o), this.Ble.add(e), this.Fle(o);
      }
      ++t.ReferenceCount;
    }
  }
  UnloadCharacterConfig(t) {
    if (t) {
      let i;
      const s = this.Gle.get(t);
      if (s) {
        if ((--s.ReferenceCount, s.ReferenceCount === 0)) {
          if (this.SelfCharacterEntity)
            for (const h of s.SubValidKeys)
              this.wle.delete(h) &&
                ((i = this.Ple.get(h)), this.qle.Remove(i), this.Vle(i));
          if (this.Hle)
            for (const e of s.FocusValidKeys)
              if (this.Ble.delete(e))
                for (const o of this.xle.get(e))
                  this.qle.Remove(o), this.Vle(o);
          s.RemoveFromConfigs(this.Ple, this.xle), this.Gle.delete(t);
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Camera", 6, "没有加载Camera配置表格", [
            "DT",
            t.GetOuter().GetName(),
          ]);
    }
  }
  UpdateConfig() {
    if (this.Camera.Character) {
      let t = !1;
      this.r1e() && (t = !0),
        (this.SelfCharacterEntity = this.Camera.CharacterEntityHandle);
      const i = this.Camera?.TargetEntity
        ? this.Camera?.TargetSocketName?.toString() ?? ""
        : "";
      this.UpdateFocusTargetAndSocket(this.Camera.TargetEntity?.Entity, i),
        (t ||= this.Zle) &&
          (ModelManager_1.ModelManager.CameraModel.CameraDebugToolEnabled &&
            this.n1e(),
          this.s1e()),
        (this.Zle = !1);
    }
  }
  r1e() {
    let t;
    let i;
    const s = this.Camera.ContainsTag(1996802261);
    return (
      s !== this.Nle &&
      ((t = this.Nle ? this.Ale : this.Ule),
      (i = s ? this.Ale : this.Ule),
      this.qle.Remove(t),
      this.qle.Insert(i),
      this.Vle(t),
      this.Fle(i),
      (this.Nle = s),
      !0)
    );
  }
  i1e() {
    for (const s of this.Ble)
      for (const h of this.xle.get(s))
        (this.Camera.TargetContainsTag(s) &&
          h.LockOnParts.includes(this.jle)) ||
          (this.qle.Remove(h), this.Ble.delete(s), this.Vle(h));
    for (const [t, i] of this.xle)
      if (this.Camera.TargetContainsTag(t))
        for (const e of i)
          (e.LockOnParts.length !== 0 && !e.LockOnParts.includes(this.jle)) ||
            (this.qle.Insert(e), this.Ble.add(t), this.Fle(e));
  }
  t1e() {
    for (const h of this.wle) {
      const t = this.Ple.get(h);
      this.Camera.ContainsTag(h) ||
        (this.qle.Remove(t),
        this.wle.delete(h),
        this.Vle(t),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 6, "UpdateSelfConfig Remove", [
            "tag",
            t.Tag.TagName,
          ]));
    }
    for (const [i, s] of this.Ple)
      this.wle.has(i) ||
        (this.Camera.ContainsTag(i) &&
          (this.qle.Insert(s),
          this.wle.add(i),
          this.Fle(s),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Camera", 6, "UpdateSelfConfig Insert", [
            "tag",
            s.Tag.TagName,
          ]));
  }
  Fle(t) {
    t.FadeInTime > this.Xle ||
      ((this.Kle || (this.Camera.Fading && this.Camera.IsUniqueFade)) &&
        !t.IsUniqueFade) ||
      ((this.Qle = !0),
      (this.Zle = !0),
      (this.Kle = t.IsUniqueFade),
      (this.Xle = t.FadeInTime),
      (this.$le = t.FadeInCurve));
  }
  Vle(t) {
    t.FadeOutTime > this.Jle ||
      ((this.Kle || (this.Camera.Fading && this.Camera.IsUniqueFade)) &&
        !t.IsUniqueFade) ||
      ((this.Yle = !0),
      (this.Zle = !0),
      (this.Kle = t.IsUniqueFade),
      (this.Jle = t.FadeOutTime),
      (this.zle = t.FadeOutCurve));
  }
  a1e() {
    return this.Qle && this.Yle ? this.Xle <= this.Jle : this.Qle;
  }
  n1e() {
    const s = new Map();
    const i = [];
    const a = (this.qle.ForEach((t) => (i.push(t), !0)), new Set());
    const h = (h, e, t, i) => {
      const o = new Map();
      i.forEach((t, i) => {
        var i = h + "." + e.GetConfigMapValue(i);
        const s = !a.has(i);
        o.set(i, { Value: t, IsEffect: s }), s && a.add(i);
      }),
        o.size > 0 &&
          (s.has(t) ? s.set(t, new Map([...s.get(t), ...o])) : s.set(t, o));
    };
    for (let t = i.length - 1; t >= 0; t--) {
      const e = i[t];
      h("FightCameraLogicComponent", this.Camera, e, e.DefaultConfig),
        h(
          "CameraFocusController",
          this.Camera.CameraFocusController,
          e,
          e.FocusConfig,
        ),
        h(
          "CameraInputController",
          this.Camera.CameraInputController,
          e,
          e.InputConfig,
        ),
        h(
          "CameraModifyController",
          this.Camera.CameraModifyController,
          e,
          e.ModifyConfig,
        ),
        h(
          "CameraAdjustController",
          this.Camera.CameraAdjustController,
          e,
          e.AdjustConfig,
        ),
        h(
          "CameraSidestepController",
          this.Camera.CameraSidestepController,
          e,
          e.SidestepConfig,
        ),
        h(
          "CameraAutoController",
          this.Camera.CameraAutoController,
          e,
          e.AutoConfig,
        ),
        h(
          "CameraGuideController",
          this.Camera.CameraGuideController,
          e,
          e.GuideConfig,
        ),
        h(
          "CameraRunningController",
          this.Camera.CameraRunningController,
          e,
          e.ExploreConfig,
        ),
        h(
          "CameraDialogueController",
          this.Camera.CameraDialogueController,
          e,
          e.DialogueConfig,
        ),
        h(
          "CameraClimbController",
          this.Camera.CameraClimbController,
          e,
          e.ClimbConfig,
        );
    }
    this.DebugSubCameraModifications = s;
  }
  s1e() {
    let t;
    this.h1e(),
      this.l1e(),
      this.qle.ForEach((t) => (this._1e(t), !0)),
      this.Camera.ApplyConfig(),
      this.Camera.Initialized &&
        ((t = this.a1e()),
        this.Camera.StartFade(
          t ? this.Xle : this.Jle,
          t ? this.$le : this.zle,
          !0,
          !1,
          !1,
          !1,
          !0,
          !0,
          !0,
          this.Kle,
        )),
      (this.Kle = !1),
      (this.Qle = !1),
      (this.Yle = !1),
      (this.Xle = DEFAULT_MAX_FADE_TIME),
      (this.Jle = DEFAULT_MAX_FADE_TIME);
  }
  o1e(t, i) {
    t = this.GetCameraConfigByTag(
      GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t),
    );
    t && (t.FadeOutTime = i);
  }
  h1e() {
    this.AutoCamera || this.Camera.CameraAutoController.Unlock(this),
      this.ModifyCamera || this.Camera.CameraModifyController.Unlock(this),
      this.AdjustCamera || this.Camera.CameraAdjustController.Unlock(this),
      this.FocusCamera || this.Camera.CameraFocusController.Unlock(this),
      this.SidestepCamera || this.Camera.CameraSidestepController.Unlock(this),
      this.ClimbCamera || this.Camera.CameraClimbController.Unlock(this),
      (this.AutoCamera = !0),
      (this.ModifyCamera = !0),
      (this.AdjustCamera = !0),
      (this.FocusCamera = !0),
      (this.SidestepCamera = !0),
      (this.ClimbCamera = !0),
      (this.Camera.CameraCollision.IsOpenBlend = !0);
  }
  _1e(t) {
    t.IsResetDefaultConfig &&
      (this.Camera.ResetDefaultConfig(),
      this.Camera.CameraFocusController.ResetDefaultConfig(),
      this.Camera.CameraInputController.ResetDefaultConfig(),
      this.Camera.CameraModifyController.ResetDefaultConfig(),
      this.Camera.CameraAdjustController.ResetDefaultConfig(),
      this.Camera.CameraSidestepController.ResetDefaultConfig(),
      this.Camera.CameraAutoController.ResetDefaultConfig(),
      this.Camera.CameraGuideController.ResetDefaultConfig(),
      this.Camera.CameraRunningController.ResetDefaultConfig(),
      this.Camera.CameraDialogueController.ResetDefaultConfig(),
      this.Camera.CameraClimbController.ResetDefaultConfig()),
      this.Camera.SetConfigs(t.DefaultConfig, t.DefaultCurveConfig),
      this.Camera.CameraFocusController.SetConfigs(
        t.FocusConfig,
        t.CurveFocusConfig,
      ),
      this.Camera.CameraInputController.SetConfigs(
        t.InputConfig,
        t.CurveInputConfig,
      ),
      this.Camera.CameraModifyController.SetConfigs(
        t.ModifyConfig,
        t.CurveModifyConfig,
      ),
      this.Camera.CameraAdjustController.SetConfigs(
        t.AdjustConfig,
        t.CurveAdjustConfig,
      ),
      this.Camera.CameraSidestepController.SetConfigs(
        t.SidestepConfig,
        t.CurveSidestepConfig,
      ),
      this.Camera.CameraAutoController.SetConfigs(
        t.AutoConfig,
        t.CurveAutoConfig,
      ),
      this.Camera.CameraGuideController.SetConfigs(
        t.GuideConfig,
        t.CurveGuideConfig,
      ),
      this.Camera.CameraRunningController.SetConfigs(
        t.ExploreConfig,
        t.CurveExploreConfig,
      ),
      this.Camera.CameraDialogueController.SetConfigs(
        t.DialogueConfig,
        t.CurveDialogueConfig,
      ),
      this.Camera.CameraClimbController.SetConfigs(
        t.ClimbConfig,
        t.CurveClimbConfig,
      ),
      t.EnableAutoCamera ||
        (this.Camera.CameraAutoController.Lock(this), (this.AutoCamera = !1)),
      t.EnableModifyCamera ||
        (this.Camera.CameraModifyController.Lock(this),
        (this.ModifyCamera = !1)),
      t.EnableAdjustCamera ||
        (this.Camera.CameraAdjustController.Lock(this),
        (this.AdjustCamera = !1)),
      t.EnableFocusCamera ||
        (this.Camera.CameraFocusController.Lock(this), (this.FocusCamera = !1)),
      t.EnableSidestepCamera ||
        (this.Camera.CameraSidestepController.Lock(this),
        (this.SidestepCamera = !1)),
      t.EnableClimbCamera ||
        (this.Camera.CameraClimbController.Lock(this), (this.ClimbCamera = !1)),
      (this.Camera.CameraCollision.IsOpenBlend = t.IsOpenMainLoop);
  }
  l1e() {
    this.Camera.ResetDefaultConfig(),
      this.Camera.CameraFocusController.ResetDefaultConfig(),
      this.Camera.CameraInputController.ResetDefaultConfig(),
      this.Camera.CameraModifyController.ResetDefaultConfig(),
      this.Camera.CameraAdjustController.ResetDefaultConfig(),
      this.Camera.CameraSidestepController.ResetDefaultConfig(),
      this.Camera.CameraAutoController.ResetDefaultConfig(),
      this.Camera.CameraGuideController.ResetDefaultConfig(),
      this.Camera.CameraRunningController.ResetDefaultConfig(),
      this.Camera.CameraDialogueController.ResetDefaultConfig(),
      this.Camera.CameraClimbController.ResetDefaultConfig();
  }
  CheckIfInAdjustCamera() {
    return (
      !(this.AdjustCameraTagMap.size <= 0) &&
      this.AdjustCameraTagMap.has(IAction_1.EAdjustPlayerCamera.Fixed)
    );
  }
  OnEnd() {
    super.OnEnd(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CameraCharacterChanged,
        this.X6s,
      );
  }
}
exports.CameraConfigController = CameraConfigController;
// # sourceMappingURL=CameraConfigController.js.map
