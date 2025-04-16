"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LguiUtil = exports.TableTextArgNew = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  GlobalData_1 = require("../../GlobalData"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  PC_KEY_ID = "PcKeyId=",
  GAMEPAD_KEY_ID = "GamepadKeyId=",
  ACTION_ID_KEY = "ActionId=",
  SKILL_ID_KEY = "SkillId=",
  ROLE_ID_KEY = "RoleId=",
  EXPLORE_ID_KEY = "ExploreId=",
  PHANTOM_ID_KEY = "PhantomId=",
  ICON_ID_KEY = "IconId=",
  PC_KEY_ID_MATCH = PC_KEY_ID + "[0-9]+",
  GAMEPAD_KEY_ID_MATCH = GAMEPAD_KEY_ID + "[0-9]+",
  ACTION_ID_MATCH = ACTION_ID_KEY + "[0-9]+",
  SKILL_ID_MATCH = SKILL_ID_KEY + "[0-9]+",
  ROLE_ID_MATCH = ROLE_ID_KEY + "[0-9]+",
  EXPLORE_ID_MATCH = EXPLORE_ID_KEY + "[0-9]+",
  PHANTOM_ID_MATCH = PHANTOM_ID_KEY + "[0-9]+",
  ICON_ID_MATCH = ICON_ID_KEY + "[0-9]+",
  pcKeyFormatRegex = new RegExp(`{<${PC_KEY_ID_MATCH}>}`, "g"),
  gamepadFormatRegex = new RegExp(`{<${GAMEPAD_KEY_ID_MATCH}>}`, "g"),
  actionFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}>}`, "g"),
  skillFormatRegex = new RegExp(
    `{<${ACTION_ID_MATCH}><${SKILL_ID_MATCH}>}`,
    "g",
  ),
  dtSkillFormatRegex = new RegExp(
    `{<${ACTION_ID_MATCH}><${ROLE_ID_MATCH}><${SKILL_ID_MATCH}>}`,
    "g",
  ),
  exploreFormatRegex = new RegExp(
    `{<${ACTION_ID_MATCH}><${EXPLORE_ID_MATCH}>}`,
    "g",
  ),
  phantomFormatRegex = new RegExp(
    `{<${ACTION_ID_MATCH}><${PHANTOM_ID_MATCH}>}`,
    "g",
  ),
  iconFormatRegex = new RegExp(`{<${ICON_ID_MATCH}>}`, "g"),
  pcKeyIdFormatRegex = new RegExp("" + PC_KEY_ID_MATCH, "g"),
  gamepadIdFormatRegex = new RegExp("" + GAMEPAD_KEY_ID_MATCH, "g"),
  actionIdFormatRegex = new RegExp("" + ACTION_ID_MATCH, "g"),
  skillIdFormatRegex = new RegExp("" + SKILL_ID_MATCH, "g"),
  exploreIdFormatRegex = new RegExp("" + EXPLORE_ID_MATCH, "g"),
  phantomIdFormatRegex = new RegExp("" + PHANTOM_ID_MATCH, "g"),
  iconIdFormatRegex = new RegExp("" + ICON_ID_MATCH, "g");
class TableTextArgNew {
  constructor(t, ...e) {
    (this.TextKey = t), (this.Params = e);
  }
}
exports.TableTextArgNew = TableTextArgNew;
class LguiUtil {
  static async LoadPrefabByResourceIdAsync(
    t,
    e,
    r = GlobalData_1.GlobalData.World,
  ) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    return LguiUtil.LoadPrefabByAsync(t, e, r);
  }
  static async LoadPrefabByAsync(t, r, o = GlobalData_1.GlobalData.World) {
    const i = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.PrefabAsset, (t, e) => {
        t = UE.LGUIBPLibrary.LoadPrefabWithAsset(o, t, r);
        i.SetResult(t);
      }),
      i.Promise
    );
  }
  static CopyItem(t, e) {
    return this.DuplicateActor(t.GetOwner(), e).GetComponentByClass(
      UE.UIItem.StaticClass(),
    );
  }
  static DuplicateActor(t, e) {
    var r, o;
    return Stats_1.Stat.Enable
      ? ((r = Stats_1.Stat.CreateNoFlameGraph(
          "LGUI DuplicateActor " + LguiUtil.GetActorFullPath(t),
        )).Start(),
        (o = UE.LGUIBPLibrary.DuplicateActor(t, e)),
        r.Stop(),
        o)
      : UE.LGUIBPLibrary.DuplicateActor(t, e);
  }
  static SetLocalText(t, e, ...r) {
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(e);
    this.SetLocalTextNew(t, e, ...r);
  }
  static SetLocalTextNew(e, t, ...r) {
    e &&
      (e.Clear(),
      r.forEach((t) => {
        "number" == typeof t
          ? Number.isInteger(t)
            ? e.AddIntArgs(t)
            : e.AddFloatArgs(t)
          : t instanceof TableTextArgNew
            ? e.AddFormatTableInfoNew(t.TextKey)
            : e.AddStringArgs(t);
      }),
      e.ShowTextNew(t));
  }
  static TrySetLocalTextNew(t, e, ...r) {
    StringUtils_1.StringUtils.IsEmpty(e)
      ? t?.SetUIActive(!1)
      : (t?.SetUIActive(!0), this.SetLocalTextNew(t, e, ...r));
  }
  static ReplaceWildCard(t) {
    var e;
    t?.IsValid()
      ? t.GetRichText()
        ? ((e = t.GetText()),
          (e = LguiUtil.ConvertToPcKeyIconRichText(e)),
          (e = LguiUtil.ConvertToGamepadKeyIconRichText(e)),
          (e = LguiUtil.ConvertToActionIconRichText(e)),
          (e = LguiUtil.ConvertToDataTableSkillIconRichText(e)),
          (e = LguiUtil.ConvertToSkillIconRichText(e)),
          (e = LguiUtil.ConvertToToExploreIconRichText(e)),
          (e = LguiUtil.ConvertToToPhantomIconRichText(e)),
          (e = LguiUtil.ConvertToToPlatformIconRichText(e)),
          t.SetText(e))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LguiUtil",
            10,
            "替换富文本图标失败，因为此文本不是富文本",
            ["uiText", t.GetText()],
          )
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "替换富文本时，UiText已经失效");
  }
  static ConvertToPcKeyIconRichText(t) {
    var e = t.match(pcKeyFormatRegex);
    if (!e) return t;
    let r = t;
    for (const i of e) {
      var o = this.qGo(i, pcKeyIdFormatRegex);
      r = this.GGo(r, i, o);
    }
    return r;
  }
  static ConvertToGamepadKeyIconRichText(t) {
    var e = t.match(gamepadFormatRegex);
    if (!e) return t;
    let r = t;
    for (const i of e) {
      var o = this.qGo(i, gamepadIdFormatRegex);
      r = this.NGo(t, i, o);
    }
    return r;
  }
  static ConvertToActionIconRichText(t) {
    var e = t.match(actionFormatRegex);
    if (!e) return t;
    let r = t;
    for (const a of e) {
      var o = this.qGo(a, actionIdFormatRegex),
        i = `{<${ACTION_ID_KEY}${o}>}`;
      r = this.OGo(r, i, o);
    }
    return r;
  }
  static ConvertToDataTableSkillIconRichText(t) {
    var e = t.match(dtSkillFormatRegex);
    if (!e) return t;
    var r = Info_1.Info.IsInTouch();
    let o = t;
    for (const a of e) {
      var i = this.qGo(a, actionIdFormatRegex);
      r || (o = this.OGo(o, a, i));
    }
    return o;
  }
  static ConvertToSkillIconRichText(t) {
    var e = t.match(skillFormatRegex);
    if (!e) return t;
    var r = Info_1.Info.IsInTouch();
    let o = t;
    for (const _ of e) {
      var i = this.qGo(_, actionIdFormatRegex),
        a = this.qGo(_, skillIdFormatRegex);
      o = r ? this.kGo(o, _, a) : this.OGo(o, _, i);
    }
    return o;
  }
  static ConvertToToExploreIconRichText(t) {
    var e = t.match(exploreFormatRegex);
    if (!e) return t;
    var r = Info_1.Info.IsInTouch();
    let o = t;
    for (const _ of e) {
      var i = this.qGo(_, actionIdFormatRegex),
        a = this.qGo(_, exploreIdFormatRegex);
      o = r ? this.FGo(o, _, a) : this.OGo(o, _, i);
    }
    return o;
  }
  static ConvertToToPhantomIconRichText(t) {
    var e = t.match(phantomFormatRegex);
    if (!e) return t;
    var r = Info_1.Info.IsInTouch();
    let o = t;
    for (const _ of e) {
      var i = this.qGo(_, actionIdFormatRegex),
        a = this.qGo(_, phantomIdFormatRegex);
      o = r ? this.VGo(o, _, a) : this.OGo(o, _, i);
    }
    return o;
  }
  static ConvertToToPlatformIconRichText(t) {
    var e = t.match(iconFormatRegex);
    if (!e) return t;
    let r = t;
    for (const i of e) {
      var o = this.qGo(i, iconIdFormatRegex);
      r = this.HGo(r, i, o);
    }
    return r;
  }
  static GGo(t, e, r) {
    var o =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigById(r);
    if (o) {
      o = o.KeyIconPath;
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return t.replace(e, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "按键配置了空的图标路径", [
          "pcKeyId",
          r,
        ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应Pc按键配置", ["pcKeyId", r]);
  }
  static NGo(t, e, r) {
    var o =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfigById(
        r,
      );
    if (o) {
      o = o.KeyIconPath;
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return t.replace(e, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "按键配置了空的图标路径", [
          "gamepadKeyId",
          r,
        ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应Gamepad按键配置", [
          "pcKeyId",
          r,
        ]);
  }
  static kGo(t, e, r) {
    var o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(r);
    if (o) {
      var o = o.Icon,
        i = `<texture=${o}>`;
      if (!StringUtils_1.StringUtils.IsEmpty(o)) return t.replace(e, i);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "技能配置了空的图标路径", [
          "skillId",
          r,
        ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应技能", ["skillId", r]);
  }
  static OGo(t, e, r) {
    var o =
      InputSettingsManager_1.InputSettingsManager.GetActionBindingByConfigId(r);
    if (o) {
      o =
        InputSettingsManager_1.InputSettingsManager.CheckGetActionKeyIconPath(
          o,
        );
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return t.replace(e, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "Action配置了空的图标路径", [
          "actionId",
          r,
        ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应ActionBinding", [
          "actionId",
          r,
        ]);
  }
  static FGo(t, e, r) {
    var o =
      ModelManager_1.ModelManager.RouletteModel.GetExploreDataBySkillId(r);
    if (o) {
      o = o.BattleViewIcon;
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return t.replace(e, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "探索幻象图标路径为空", [
          "phantomId",
          r,
        ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应探索幻象", ["phantomId", r]);
  }
  static VGo(t, e, r) {
    var o =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
        r,
      );
    if (o) {
      o = o.GetPhantomSkillInfoByLevel();
      if (o) {
        o = o.BattleViewIcon;
        if (!StringUtils_1.StringUtils.IsEmpty(o))
          return t.replace(e, `<texture=${o}>`);
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("LguiUtil", 10, "战斗幻象图标路径为空", [
            "phantomId",
            r,
          ]);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("LguiUtil", 10, "找不到对应战斗幻象技能", [
            "phantomId",
            r,
          ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应战斗幻象", ["phantomId", r]);
  }
  static HGo(e, r, o) {
    var i =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetPlatformIconConfig(
        o,
      );
    if (i) {
      let t = i.IconPath;
      if (
        (Info_1.Info.IsInTouch() && (t = i.MobileIconPath),
        !StringUtils_1.StringUtils.IsEmpty(t))
      )
        return (i = `<texture=${t}>`), e.replace(r, i);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "多端图标路径为空", ["iconId", o]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应多端平台图标配置", [
          "iconId",
          o,
        ]);
  }
  static qGo(t, e) {
    t = t.match(e)[0];
    if (t) return (e = t.split("=")[1]), Number(e);
  }
  static GetActorFullPath(t) {
    var e = (0, puerts_1.$ref)("");
    return (
      UE.LGUIBPLibrary.GetFullPathOfActor(GlobalData_1.GlobalData.World, t, e),
      (0, puerts_1.$unref)(e)
    );
  }
  static ScreenShot(t, e) {
    return UE.BlueprintPathsLibrary.ProjectUserDir() + t;
  }
  static ResetShot() {}
  static ClearAttachChildren(e) {
    for (let t = e.AttachChildren.Num() - 1; 0 <= t; t--)
      UE.LGUIBPLibrary.DeleteActor(e.AttachChildren.Get(t).GetOwner());
  }
  static LoadAndSetText(o, i, a, _) {
    LguiUtil.ClearAttachChildren(o);
    const n = new Array(a.length),
      g = new Array(a.length);
    let s = 0;
    a.forEach((t, r) => {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.PrefabAsset, (t, e) => {
        (g[r] = t),
          (++s >= a.length || s >= a.length) &&
            (g.forEach((t, e) => {
              var t = UE.LGUIBPLibrary.LoadPrefabWithAsset(
                  GlobalData_1.GlobalData.World,
                  t,
                  o,
                ),
                r = t.GetComponentByClass(UE.UIItem.StaticClass());
              r && (r.SetPivot(Vector2D_1.Vector2D.ZeroVector), (n[e] = t));
            }),
            o.SetText(i),
            _) &&
            _(n);
      });
    });
  }
  static SetActorIsPermanent(t, e, r) {
    t
      ? t.IsValid()
        ? UE.KuroStaticLibrary.SetActorPermanent(t, e, r)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("LguiUtil", 10, "无缝切换传入Actor异常,Actor IsValid")
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 10, "无缝切换传入Actor异常,Actor为空");
  }
  static GetChildActorByHierarchyIndex(t, e = 0) {
    t = t.GetUIItem();
    if (t) return t.GetAttachUIChild(e)?.GetOwner();
  }
  static GetComponentsRegistry(t) {
    return t?.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
  }
  static ConvertPointerPositionToLguiCenterPosition(t, e) {
    var r,
      o,
      i = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    i &&
      ((r = UiLayer_1.UiLayer.UiRootItem.GetWidth()),
      (o = UiLayer_1.UiLayer.UiRootItem.GetHeight()),
      e.Set(t.X, t.Y),
      (t = i.ConvertPositionFromViewportToLGUICanvas(e.ToUeVector2D())),
      e.FromUeVector2D(t),
      (e.X = MathCommon_1.MathCommon.Clamp(e.X, 0, r)),
      (e.Y = MathCommon_1.MathCommon.Clamp(e.Y, 0, o)),
      (e.X -= r / 2),
      (e.Y -= o / 2));
  }
  static ConvertPointerPositionToLguiPosition(t, e) {
    var r,
      o,
      i = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    i &&
      ((r = UiLayer_1.UiLayer.UiRootItem.GetWidth()),
      (o = UiLayer_1.UiLayer.UiRootItem.GetHeight()),
      e.Set(t.X, t.Y),
      (t = i.ConvertPositionFromViewportToLGUICanvas(e.ToUeVector2D())),
      e.FromUeVector2D(t),
      (e.X = MathCommon_1.MathCommon.Clamp(e.X, 0, r)),
      (e.Y = MathCommon_1.MathCommon.Clamp(e.Y, 0, o)));
  }
}
exports.LguiUtil = LguiUtil;
//# sourceMappingURL=LguiUtil.js.map
