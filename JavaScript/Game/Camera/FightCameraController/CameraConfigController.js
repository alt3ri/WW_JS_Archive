"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraConfigController = exports.CameraConfig = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  RbTree_1 = require("../../../Core/Container/RbTree"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CameraController_1 = require("../CameraController"),
  FightCameraLogicComponent_1 = require("../FightCameraLogicComponent"),
  CameraControllerBase_1 = require("./CameraControllerBase"),
  DEFAULT_MAX_FADE_TIME = 5,
  noAimGameplayTag = -1036349300;
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
      (this.Tag = "None" === t.Tag.TagName ? void 0 : t.Tag),
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
    var e = CameraController_1.CameraController.GetCameraConfigList(
        this.DataTable,
      ),
      o = e.Num();
    for (let t = 0; t < o; t++) {
      var a,
        r = new CameraConfig(e.Get(t));
      r[h] &&
        (r.Tag && "None" !== r.Tag.TagName
          ? ((a = r.Tag.TagId),
            2 === r.Type
              ? i.has(a)
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Camera",
                    58,
                    "[子镜头]独有镜头配置不允许重复的Tag",
                    ["DT", this.DataTable.GetOuter().GetName()],
                    ["Tag", r.Tag.TagName],
                    ["Type", r.Type],
                  )
                : (i.set(a, r), this.SubValidKeys.add(a))
              : 3 === r.Type &&
                (s.has(a)
                  ? Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Camera",
                      58,
                      "[锁定目标镜头]独有镜头配置不允许重复的Tag",
                      ["DT", this.DataTable.GetOuter().GetName()],
                      ["Tag", r.Tag.TagName],
                      ["Type", r.Type],
                    )
                  : (s.set(a, r), this.FocusValidKeys.add(a))))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 58, "独有镜头配置不允许Tag为None", [
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
      (this.uQa = new Set()),
      (this.Ble = new Set()),
      (this.ble = (t, i) => t.Priority - i.Priority),
      (this.qle = new RbTree_1.RbTree(this.ble)),
      (this.Gle = new Map()),
      (this.AdjustCameraTagMap = new Map()),
      (this.AdjustCameraEntityHandleSet = new Set()),
      (this.Nle = !1),
      (this.Ole = void 0),
      (this.cDn = void 0),
      (this.cQa = (t, i) => {
        i
          ? this.wle.has(t) ||
            ((i = this.Ple.get(t)) &&
              (this.qle.Insert(i),
              this.wle.add(t),
              this.Fle(i),
              Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug("Camera", 58, "SelfTagChanged Insert", [
                "tag",
                i.Tag.TagName,
              ]))
          : (i = this.Ple.get(t)) &&
            this.wle.has(t) &&
            !this.Camera.ContainsTag(t, !0) &&
            (this.qle.Remove(i),
            this.wle.delete(t),
            this.Vle(i),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("Camera", 58, "SelfTagChanged Remove", [
              "tag",
              i.Tag.TagName,
            ]);
      }),
      (this.Hle = void 0),
      (this.jle = ""),
      (this.Wle = (t, i) => {
        i
          ? this.Ble.has(t)
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Camera", 58, "Got config before Tag", [
                "Tag",
                GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
              ])
            : (i = this.xle.get(t)) &&
              0 === i.LockOnParts.length &&
              (this.qle.Insert(i), this.Ble.add(t), this.Fle(i))
          : this.Ble.has(t) &&
            (i = this.xle.get(t)) &&
            (this.qle.Remove(i), this.Vle(i), this.Ble.delete(t));
      }),
      (this.OnChangeRole = (t, i) => {
        if (!(this.AdjustCameraTagMap.size <= 0))
          for (var [s, h] of this.AdjustCameraTagMap)
            this.EnableHookConfig(s, h);
      }),
      (this.JJs = (t) => {
        this.SelfCharacterEntity = t;
      }),
      (this.mDn = (t) => {
        this.FloatCharacterEntity = t;
      }),
      (this.dDn = () => {
        this.FloatCharacterEntity = void 0;
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
      Info_1.Info.IsMobilePlatform()
        ? (this.e1e = "MobileValid")
        : (this.e1e = "PcValid"),
      this.LoadConfig();
  }
  get SelfCharacterEntity() {
    return this.Ole;
  }
  set SelfCharacterEntity(t) {
    if (this.Ole !== t) {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Camera",
            58,
            "CharacterChange",
            ["old", this.Ole?.Id],
            ["new", t?.Id],
          ),
        this.Ole?.Valid)
      ) {
        var i = this.Ole.Entity.GetComponent(190);
        if (i?.Valid)
          for (var [, s] of this.Ple)
            i.RemoveTagAddOrRemoveListener(s.Tag.TagId, this.cQa);
      }
      if (t?.Valid) {
        var h = t.Entity.GetComponent(190);
        if (h?.Valid)
          for (var [, e] of this.Ple)
            h.AddTagAddOrRemoveListener(e.Tag.TagId, this.cQa);
      }
      (this.Ole = t), this.CDn();
    }
  }
  get FloatCharacterEntity() {
    return this.cDn;
  }
  set FloatCharacterEntity(t) {
    if (this.cDn !== t) {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Camera",
            58,
            "FloatCharacterChange",
            ["old", this.cDn?.Id],
            ["new", t?.Id],
          ),
        this.cDn?.Valid)
      ) {
        var i = this.cDn.Entity.GetComponent(190);
        if (i?.Valid)
          for (var [, s] of this.Ple)
            i.RemoveTagAddOrRemoveListener(s.Tag.TagId, this.cQa);
      }
      if (t?.Valid) {
        var h = t.Entity.GetComponent(190);
        if (h?.Valid)
          for (var [, e] of this.Ple)
            h.AddTagAddOrRemoveListener(e.Tag.TagId, this.cQa);
      }
      (this.cDn = t), this.CDn();
    }
  }
  UpdateFocusTargetAndSocket(t, i) {
    let s = !1;
    if (this.Hle === t) this.jle !== i && (s = !0);
    else {
      if (this.Hle?.Valid) {
        var h = this.Hle.GetComponent(190);
        if (h?.Valid)
          for (var [, e] of this.xle)
            h.RemoveTagAddOrRemoveListener(e.Tag.TagId, this.Wle);
      }
      if (t?.Valid) {
        var o = t.GetComponent(190);
        if (o?.Valid)
          for (var [, a] of this.xle)
            o.AddTagAddOrRemoveListener(a.Tag.TagId, this.Wle);
      }
      s = !0;
    }
    (this.Hle = t), (this.jle = i), s && this.i1e();
  }
  Name() {
    return "ConfigController";
  }
  OnStart() {
    super.OnStart(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CameraCharacterChanged,
        this.JJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      );
  }
  UpdateInternal(t) {
    this.UpdateConfig();
  }
  EnableHookConfig(t, i = void 0) {
    var s,
      h = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      e?.Valid &&
        (s = e.Entity.GetComponent(190)) &&
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
      var i = s?.Entity?.GetComponent(190);
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
      var i = s?.Entity?.GetComponent(190);
      i &&
        (i.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)),
        i.RemoveTag(noAimGameplayTag));
    }
    this.AdjustCameraTagMap.delete(t);
  }
  GetCameraConfigByTag(t) {
    return this.Ple.get(t);
  }
  LoadConfig() {
    (this.Rle = CameraController_1.CameraController.GetCameraConfigList()),
      this.Ple.clear(),
      this.xle.clear(),
      this.wle.clear(),
      this.uQa.clear();
    for (var [, t] of this.Gle)
      t.SubValidKeys.clear(), t.FocusValidKeys.clear();
    var i,
      s = this.Rle.Num();
    for (let t = 0; t < s; t++) {
      var h = new CameraConfig(this.Rle.Get(t));
      h[this.e1e] &&
        (0 === h.Type
          ? (this.Ule = h)
          : 1 === h.Type
            ? (this.Ale = h)
            : 2 === h.Type
              ? h.Tag && "None" !== h.Tag.TagName
                ? this.Ple.set(h.Tag.TagId, h)
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Camera",
                    58,
                    "初始化镜头配置[DT_CameraConfigs]失败，子镜头没有正确配置Tag",
                  )
              : 3 === h.Type &&
                ("None" === h.Tag.TagName
                  ? Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Camera",
                      58,
                      "初始化镜头配置[DT_CameraConfigs]失败，战斗目标镜头没有正确配置Tag",
                    )
                  : this.xle.set(h.Tag.TagId, h)));
    }
    (this.Ule && this.Ale) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Camera",
          58,
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
          this.Ole?.Valid)
        ) {
          var s = this.Ole.Entity.GetComponent(190);
          if (s?.Valid)
            for (const a of t.SubValidKeys)
              s.AddTagAddOrRemoveListener(a, this.cQa);
        }
        if (this.Hle?.Valid) {
          var h = this.Hle.GetComponent(190);
          if (h?.Valid)
            for (const r of t.FocusValidKeys)
              h.AddTagAddOrRemoveListener(r, this.Wle);
        }
        if (this.SelfCharacterEntity)
          for (const n of t.SubValidKeys) {
            var e;
            this.Camera.ContainsTag(n, !0) &&
              ((e = this.Ple.get(n)),
              this.qle.Insert(e),
              this.wle.add(n),
              this.Fle(e));
          }
        if (this.Hle)
          for (const C of t.FocusValidKeys) {
            var o;
            this.Camera.TargetContainsTag(C) &&
              ((o = this.xle.get(C)),
              this.qle.Insert(o),
              this.Ble.add(C),
              this.Fle(o));
          }
      }
      ++t.ReferenceCount;
    }
  }
  UnloadCharacterConfig(t) {
    if (t) {
      var i,
        s,
        h = this.Gle.get(t);
      if (h) {
        if ((--h.ReferenceCount, 0 === h.ReferenceCount)) {
          if (this.Ole?.Valid) {
            var e = this.Ole.Entity.GetComponent(190);
            if (e?.Valid)
              for (const a of h.SubValidKeys)
                e.RemoveTagAddOrRemoveListener(a, this.cQa);
          }
          if (this.Hle?.Valid) {
            var o = this.Hle.GetComponent(190);
            if (o?.Valid)
              for (const r of h.FocusValidKeys)
                o.RemoveTagAddOrRemoveListener(r, this.Wle);
          }
          if (this.SelfCharacterEntity)
            for (const n of h.SubValidKeys)
              this.wle.delete(n) &&
                ((i = this.Ple.get(n)), this.qle.Remove(i), this.Vle(i));
          if (this.Hle)
            for (const C of h.FocusValidKeys)
              this.Ble.delete(C) &&
                ((s = this.xle.get(C)), this.qle.Remove(s), this.Vle(s));
          h.RemoveFromConfigs(this.Ple, this.xle), this.Gle.delete(t);
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Camera", 58, "没有加载Camera配置表格", [
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
      var i = this.Camera?.TargetEntity
        ? (this.Camera?.TargetSocketName?.toString() ?? "")
        : "";
      this.UpdateFocusTargetAndSocket(this.Camera.TargetEntity?.Entity, i),
        (t ||= this.Zle) && this.s1e(),
        (this.Zle = !1);
    }
  }
  r1e() {
    var t,
      i,
      s = this.Camera.ContainsTag(1996802261);
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
    for (const h of this.Ble) {
      var t = this.xle.get(h);
      (this.Camera.TargetContainsTag(h) && t.LockOnParts.includes(this.jle)) ||
        (this.qle.Remove(t), this.Ble.delete(h), this.Vle(t));
    }
    for (var [i, s] of this.xle)
      !this.Camera.TargetContainsTag(i) ||
        (0 !== s.LockOnParts.length && !s.LockOnParts.includes(this.jle)) ||
        (this.qle.Insert(s), this.Ble.add(i), this.Fle(s));
  }
  CDn() {
    for (const h of this.wle) {
      var t = this.Ple.get(h);
      this.Camera.ContainsTag(h, !0) ||
        (this.qle.Remove(t),
        this.wle.delete(h),
        this.Vle(t),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Camera", 58, "UpdateSelfConfig Remove", [
            "tag",
            t.Tag.TagName,
          ]));
    }
    for (var [i, s] of this.Ple)
      this.wle.has(i) ||
        (this.Camera.ContainsTag(i, !0) &&
          (this.qle.Insert(s),
          this.wle.add(i),
          this.Fle(s),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Camera", 58, "UpdateSelfConfig Insert", [
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
  s1e() {
    var t;
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
      this.Camera.SetConfigs(
        t.DefaultConfig,
        t.DefaultCurveConfig,
        t.Tag?.TagName ?? "None",
      ),
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
        this.JJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      );
  }
}
exports.CameraConfigController = CameraConfigController;
//# sourceMappingURL=CameraConfigController.js.map
