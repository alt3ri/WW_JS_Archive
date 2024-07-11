"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LguiUtil = exports.TableTextArgNew = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../GlobalData");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PC_KEY_ID = "PcKeyId=";
const GAMEPAD_KEY_ID = "GamepadKeyId=";
const ACTION_ID_KEY = "ActionId=";
const SKILL_ID_KEY = "SkillId=";
const ROLE_ID_KEY = "RoleId=";
const EXPLORE_ID_KEY = "ExploreId=";
const PHANTOM_ID_KEY = "PhantomId=";
const ICON_ID_KEY = "IconId=";
const PC_KEY_ID_MATCH = PC_KEY_ID + "[0-9]+";
const GAMEPAD_KEY_ID_MATCH = GAMEPAD_KEY_ID + "[0-9]+";
const ACTION_ID_MATCH = ACTION_ID_KEY + "[0-9]+";
const SKILL_ID_MATCH = SKILL_ID_KEY + "[0-9]+";
const ROLE_ID_MATCH = ROLE_ID_KEY + "[0-9]+";
const EXPLORE_ID_MATCH = EXPLORE_ID_KEY + "[0-9]+";
const PHANTOM_ID_MATCH = PHANTOM_ID_KEY + "[0-9]+";
const ICON_ID_MATCH = ICON_ID_KEY + "[0-9]+";
const pcKeyFormatRegex = new RegExp(`{<${PC_KEY_ID_MATCH}>}`, "g");
const gamepadFormatRegex = new RegExp(`{<${GAMEPAD_KEY_ID_MATCH}>}`, "g");
const actionFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}>}`, "g");
const skillFormatRegex = new RegExp(
  `{<${ACTION_ID_MATCH}><${SKILL_ID_MATCH}>}`,
  "g",
);
const dtSkillFormatRegex = new RegExp(
  `{<${ACTION_ID_MATCH}><${ROLE_ID_MATCH}><${SKILL_ID_MATCH}>}`,
  "g",
);
const exploreFormatRegex = new RegExp(
  `{<${ACTION_ID_MATCH}><${EXPLORE_ID_MATCH}>}`,
  "g",
);
const phantomFormatRegex = new RegExp(
  `{<${ACTION_ID_MATCH}><${PHANTOM_ID_MATCH}>}`,
  "g",
);
const iconFormatRegex = new RegExp(`{<${ICON_ID_MATCH}>}`, "g");
const pcKeyIdFormatRegex = new RegExp("" + PC_KEY_ID_MATCH, "g");
const gamepadIdFormatRegex = new RegExp("" + GAMEPAD_KEY_ID_MATCH, "g");
const actionIdFormatRegex = new RegExp("" + ACTION_ID_MATCH, "g");
const skillIdFormatRegex = new RegExp("" + SKILL_ID_MATCH, "g");
const exploreIdFormatRegex = new RegExp("" + EXPLORE_ID_MATCH, "g");
const phantomIdFormatRegex = new RegExp("" + PHANTOM_ID_MATCH, "g");
const iconIdFormatRegex = new RegExp("" + ICON_ID_MATCH, "g");
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
        typeof e === "number"
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
    let t;
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
    const t = e.match(pcKeyFormatRegex);
    if (!t) return e;
    let r = e;
    for (const i of t) {
      const o = this.Oqo(i, pcKeyIdFormatRegex);
      r = this.kqo(r, i, o);
    }
    return r;
  }
  static ConvertToGamepadKeyIconRichText(e) {
    const t = e.match(gamepadFormatRegex);
    if (!t) return e;
    let r = e;
    for (const i of t) {
      const o = this.Oqo(i, gamepadIdFormatRegex);
      r = this.Fqo(e, i, o);
    }
    return r;
  }
  static ConvertToActionIconRichText(e) {
    const t = e.match(actionFormatRegex);
    if (!t) return e;
    let r = e;
    for (const a of t) {
      const o = this.Oqo(a, actionIdFormatRegex);
      const i = `{<${ACTION_ID_KEY}${o}>}`;
      r = this.Vqo(r, i, o);
    }
    return r;
  }
  static ConvertToDataTableSkillIconRichText(e) {
    const t = e.match(dtSkillFormatRegex);
    if (!t) return e;
    const r = ModelManager_1.ModelManager.PlatformModel.IsMobile();
    let o = e;
    for (const a of t) {
      const i = this.Oqo(a, actionIdFormatRegex);
      r || (o = this.Vqo(o, a, i));
    }
    return o;
  }
  static ConvertToSkillIconRichText(e) {
    const t = e.match(skillFormatRegex);
    if (!t) return e;
    const r = ModelManager_1.ModelManager.PlatformModel.IsMobile();
    let o = e;
    for (const _ of t) {
      const i = this.Oqo(_, actionIdFormatRegex);
      const a = this.Oqo(_, skillIdFormatRegex);
      o = r ? this.Hqo(o, _, a) : this.Vqo(o, _, i);
    }
    return o;
  }
  static ConvertToToExploreIconRichText(e) {
    const t = e.match(exploreFormatRegex);
    if (!t) return e;
    const r = ModelManager_1.ModelManager.PlatformModel.IsMobile();
    let o = e;
    for (const _ of t) {
      const i = this.Oqo(_, actionIdFormatRegex);
      const a = this.Oqo(_, exploreIdFormatRegex);
      o = r ? this.jqo(o, _, a) : this.Vqo(o, _, i);
    }
    return o;
  }
  static ConvertToToPhantomIconRichText(e) {
    const t = e.match(phantomFormatRegex);
    if (!t) return e;
    const r = ModelManager_1.ModelManager.PlatformModel.IsMobile();
    let o = e;
    for (const _ of t) {
      const i = this.Oqo(_, actionIdFormatRegex);
      const a = this.Oqo(_, phantomIdFormatRegex);
      o = r ? this.Wqo(o, _, a) : this.Vqo(o, _, i);
    }
    return o;
  }
  static ConvertToToPlatformIconRichText(e) {
    const t = e.match(iconFormatRegex);
    if (!t) return e;
    let r = e;
    for (const i of t) {
      const o = this.Oqo(i, iconIdFormatRegex);
      r = this.Kqo(r, i, o);
    }
    return r;
  }
  static kqo(e, t, r) {
    let o =
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
  static Fqo(e, t, r) {
    let o =
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
  static Hqo(e, t, r) {
    var o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(r);
    if (o) {
      var o = o.Icon;
      const i = `<texture=${o}>`;
      if (!StringUtils_1.StringUtils.IsEmpty(o)) return e.replace(t, i);
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "技能配置了空的图标路径", ["skillId", r]);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("LguiUtil", 8, "找不到对应技能", ["skillId", r]);
  }
  static Vqo(e, t, r) {
    let o =
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
  static jqo(e, t, r) {
    let o =
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
  static Wqo(e, t, r) {
    let o =
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
  static Kqo(t, r, o) {
    let i =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetPlatformIconConfig(
        o,
      );
    if (i) {
      let e = i.IconPath;
      if (
        (ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
          (e = i.MobileIconPath),
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
  static Oqo(e, t) {
    e = e.match(t)[0];
    if (e) return (t = e.split("=")[1]), Number(t);
  }
  static GetActorFullPath(e) {
    const t = (0, puerts_1.$ref)("");
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
    for (let e = t.AttachChildren.Num() - 1; e >= 0; e--)
      UE.LGUIBPLibrary.DeleteActor(t.AttachChildren.Get(e).GetOwner());
  }
  static LoadAndSetText(o, i, a, _) {
    LguiUtil.ClearAttachChildren(o);
    const g = new Array(a.length);
    const n = new Array(a.length);
    let s = 0;
    a.forEach((e, r) => {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PrefabAsset, (e, t) => {
        (n[r] = e),
          (++s >= a.length || s >= a.length) &&
            (n.forEach((e, t) => {
              var e = UE.LGUIBPLibrary.LoadPrefabWithAsset(
                GlobalData_1.GlobalData.World,
                e,
                o,
              );
              const r = e.GetComponentByClass(UE.UIItem.StaticClass());
              r && (r.SetPivot(Vector2D_1.Vector2D.ZeroVector), (g[t] = e));
            }),
            o.SetText(i),
            _) &&
            _(g);
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
// # sourceMappingURL=LguiUtil.js.map
