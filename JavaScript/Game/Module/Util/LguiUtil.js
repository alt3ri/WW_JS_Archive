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
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  GlobalData_1 = require("../../GlobalData"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
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
  constructor(e, ...t) {
    (this.TextKey = e), (this.Params = t);
  }
}
exports.TableTextArgNew = TableTextArgNew;
class LguiUtil {
  static async LoadPrefabByResourceIdAsync(
    e,
    t,
    r = GlobalData_1.GlobalData.World,
  ) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    return LguiUtil.LoadPrefabByAsync(e, t, r);
  }
  static async LoadPrefabByAsync(e, r, o = GlobalData_1.GlobalData.World) {
    const i = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, (e, t) => {
        e = UE.LGUIBPLibrary.LoadPrefabWithAsset(o, e, r);
        i.SetResult(e);
      }),
      i.Promise
    );
  }
  static CopyItem(e, t) {
    return this.DuplicateActor(e.GetOwner(), t).GetComponentByClass(
      UE.UIItem.StaticClass(),
    );
  }
  static DuplicateActor(e, t) {
    return Stats_1.Stat.Enable && 0, UE.LGUIBPLibrary.DuplicateActor(e, t);
  }
  static SetLocalText(e, t, ...r) {
    t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(t);
    this.SetLocalTextNew(e, t, ...r);
  }
  static SetLocalTextNew(t, e, ...r) {
    t &&
      (t.Clear(),
      r.forEach((e) => {
        "number" == typeof e
          ? Number.isInteger(e)
            ? t.AddIntArgs(e)
            : t.AddFloatArgs(e)
          : e instanceof TableTextArgNew
            ? t.AddFormatTableInfoNew(e.TextKey)
            : t.AddStringArgs(e);
      }),
      t.ShowTextNew(e));
  }
  static ReplaceWildCard(e) {
    var t;
    e?.IsValid()
      ? e.GetRichText()
        ? ((t = e.GetText()),
          (t = LguiUtil.ConvertToPcKeyIconRichText(t)),
          (t = LguiUtil.ConvertToGamepadKeyIconRichText(t)),
          (t = LguiUtil.ConvertToActionIconRichText(t)),
          (t = LguiUtil.ConvertToDataTableSkillIconRichText(t)),
          (t = LguiUtil.ConvertToSkillIconRichText(t)),
          (t = LguiUtil.ConvertToToExploreIconRichText(t)),
          (t = LguiUtil.ConvertToToPhantomIconRichText(t)),
          (t = LguiUtil.ConvertToToPlatformIconRichText(t)),
          e.SetText(t))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LguiUtil",
            8,
            "替换富文本图标失败，因为此文本不是富文本",
            ["uiText", e.GetText()],
          )
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "替换富文本时，UiText已经失效");
  }
  static ConvertToPcKeyIconRichText(e) {
    var t = e.match(pcKeyFormatRegex);
    if (!t) return e;
    let r = e;
    for (const i of t) {
      var o = this.qGo(i, pcKeyIdFormatRegex);
      r = this.GGo(r, i, o);
    }
    return r;
  }
  static ConvertToGamepadKeyIconRichText(e) {
    var t = e.match(gamepadFormatRegex);
    if (!t) return e;
    let r = e;
    for (const i of t) {
      var o = this.qGo(i, gamepadIdFormatRegex);
      r = this.NGo(e, i, o);
    }
    return r;
  }
  static ConvertToActionIconRichText(e) {
    var t = e.match(actionFormatRegex);
    if (!t) return e;
    let r = e;
    for (const a of t) {
      var o = this.qGo(a, actionIdFormatRegex),
        i = `{<${ACTION_ID_KEY}${o}>}`;
      r = this.OGo(r, i, o);
    }
    return r;
  }
  static ConvertToDataTableSkillIconRichText(e) {
    var t = e.match(dtSkillFormatRegex);
    if (!t) return e;
    var r = Info_1.Info.IsInTouch();
    let o = e;
    for (const a of t) {
      var i = this.qGo(a, actionIdFormatRegex);
      r || (o = this.OGo(o, a, i));
    }
    return o;
  }
  static ConvertToSkillIconRichText(e) {
    var t = e.match(skillFormatRegex);
    if (!t) return e;
    var r = Info_1.Info.IsInTouch();
    let o = e;
    for (const _ of t) {
      var i = this.qGo(_, actionIdFormatRegex),
        a = this.qGo(_, skillIdFormatRegex);
      o = r ? this.kGo(o, _, a) : this.OGo(o, _, i);
    }
    return o;
  }
  static ConvertToToExploreIconRichText(e) {
    var t = e.match(exploreFormatRegex);
    if (!t) return e;
    var r = Info_1.Info.IsInTouch();
    let o = e;
    for (const _ of t) {
      var i = this.qGo(_, actionIdFormatRegex),
        a = this.qGo(_, exploreIdFormatRegex);
      o = r ? this.FGo(o, _, a) : this.OGo(o, _, i);
    }
    return o;
  }
  static ConvertToToPhantomIconRichText(e) {
    var t = e.match(phantomFormatRegex);
    if (!t) return e;
    var r = Info_1.Info.IsInTouch();
    let o = e;
    for (const _ of t) {
      var i = this.qGo(_, actionIdFormatRegex),
        a = this.qGo(_, phantomIdFormatRegex);
      o = r ? this.VGo(o, _, a) : this.OGo(o, _, i);
    }
    return o;
  }
  static ConvertToToPlatformIconRichText(e) {
    var t = e.match(iconFormatRegex);
    if (!t) return e;
    let r = e;
    for (const i of t) {
      var o = this.qGo(i, iconIdFormatRegex);
      r = this.HGo(r, i, o);
    }
    return r;
  }
  static GGo(e, t, r) {
    var o =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigById(r);
    if (o) {
      o = o.KeyIconPath;
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return e.replace(t, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "按键配置了空的图标路径", ["pcKeyId", r]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应Pc按键配置", ["pcKeyId", r]);
  }
  static NGo(e, t, r) {
    var o =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfigById(
        r,
      );
    if (o) {
      o = o.KeyIconPath;
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return e.replace(t, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "按键配置了空的图标路径", [
          "gamepadKeyId",
          r,
        ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应Gamepad按键配置", [
          "pcKeyId",
          r,
        ]);
  }
  static kGo(e, t, r) {
    var o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(r);
    if (o) {
      var o = o.Icon,
        i = `<texture=${o}>`;
      if (!StringUtils_1.StringUtils.IsEmpty(o)) return e.replace(t, i);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "技能配置了空的图标路径", ["skillId", r]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应技能", ["skillId", r]);
  }
  static OGo(e, t, r) {
    var o =
      InputSettingsManager_1.InputSettingsManager.GetActionBindingByConfigId(r);
    if (o) {
      o =
        InputSettingsManager_1.InputSettingsManager.CheckGetActionKeyIconPath(
          o,
        );
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return e.replace(t, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "Action配置了空的图标路径", [
          "actionId",
          r,
        ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应ActionBinding", [
          "actionId",
          r,
        ]);
  }
  static FGo(e, t, r) {
    var o =
      ModelManager_1.ModelManager.RouletteModel.GetExploreDataBySkillId(r);
    if (o) {
      o = o.BattleViewIcon;
      if (!StringUtils_1.StringUtils.IsEmpty(o))
        return e.replace(t, `<texture=${o}>`);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "探索幻象图标路径为空", ["phantomId", r]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应探索幻象", ["phantomId", r]);
  }
  static VGo(e, t, r) {
    var o =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
        r,
      );
    if (o) {
      o = o.GetPhantomSkillInfoByLevel();
      if (o) {
        o = o.BattleViewIcon;
        if (!StringUtils_1.StringUtils.IsEmpty(o))
          return e.replace(t, `<texture=${o}>`);
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("LguiUtil", 8, "战斗幻象图标路径为空", [
            "phantomId",
            r,
          ]);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("LguiUtil", 8, "找不到对应战斗幻象技能", [
            "phantomId",
            r,
          ]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应战斗幻象", ["phantomId", r]);
  }
  static HGo(t, r, o) {
    var i =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetPlatformIconConfig(
        o,
      );
    if (i) {
      let e = i.IconPath;
      if (
        (Info_1.Info.IsInTouch() && (e = i.MobileIconPath),
        !StringUtils_1.StringUtils.IsEmpty(e))
      )
        return (i = `<texture=${e}>`), t.replace(r, i);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "多端图标路径为空", ["iconId", o]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应多端平台图标配置", [
          "iconId",
          o,
        ]);
  }
  static qGo(e, t) {
    e = e.match(t)[0];
    if (e) return (t = e.split("=")[1]), Number(t);
  }
  static GetActorFullPath(e) {
    var t = (0, puerts_1.$ref)("");
    return (
      UE.LGUIBPLibrary.GetFullPathOfActor(GlobalData_1.GlobalData.World, e, t),
      (0, puerts_1.$unref)(t)
    );
  }
  static ScreenShot(e, t) {
    return UE.BlueprintPathsLibrary.ProjectUserDir() + e;
  }
  static ResetShot() {}
  static ClearAttachChildren(t) {
    for (let e = t.AttachChildren.Num() - 1; 0 <= e; e--)
      UE.LGUIBPLibrary.DeleteActor(t.AttachChildren.Get(e).GetOwner());
  }
  static LoadAndSetText(o, i, a, _) {
    LguiUtil.ClearAttachChildren(o);
    const n = new Array(a.length),
      g = new Array(a.length);
    let s = 0;
    a.forEach((e, r) => {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, (e, t) => {
        (g[r] = e),
          (++s >= a.length || s >= a.length) &&
            (g.forEach((e, t) => {
              var e = UE.LGUIBPLibrary.LoadPrefabWithAsset(
                  GlobalData_1.GlobalData.World,
                  e,
                  o,
                ),
                r = e.GetComponentByClass(UE.UIItem.StaticClass());
              r && (r.SetPivot(Vector2D_1.Vector2D.ZeroVector), (n[t] = e));
            }),
            o.SetText(i),
            _) &&
            _(n);
      });
    });
  }
  static SetActorIsPermanent(e, t, r) {
    e
      ? e.IsValid()
        ? UE.KuroStaticLibrary.SetActorPermanent(e, t, r)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("LguiUtil", 11, "无缝切换传入Actor异常,Actor IsValid")
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 11, "无缝切换传入Actor异常,Actor为空");
  }
  static GetChildActorByHierarchyIndex(e, t = 0) {
    e = e.GetUIItem();
    if (e) return e.GetAttachUIChild(t)?.GetOwner();
  }
  static GetComponentsRegistry(e) {
    return e?.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
  }
}
exports.LguiUtil = LguiUtil;
//# sourceMappingURL=LguiUtil.js.map
