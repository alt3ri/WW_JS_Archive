"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageUiManager = exports.DamageInfo = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const BattleUiDefine_1 = require("../BattleUi/BattleUiDefine");
const DamageUiSequencePool_1 = require("./DamageUiSequencePool");
const DamageViewData_1 = require("./DamageViewData");
const DamageView_1 = require("./View/DamageView");
const PRELOAD_DAMAGE_VIEW_COUNT = 21;
const MAX_DAMAGE_PER_FRAME = 1;
class DamageInfo {
  constructor() {
    (this.Damage = 0),
      (this.ElementId = 0),
      (this.DamagePosition = void 0),
      (this.IsOwnPlayer = !1),
      (this.IsCritical = !1),
      (this.IsCure = !1),
      (this.DamageTextId = 0),
      (this.DamageText = "");
  }
}
exports.DamageInfo = DamageInfo;
class DamageUiManager {
  static Initialize() {
    (this.MinDamageOffsetScale =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MinDamageOffsetScale",
      ) / 100),
      (this.MaxDamageOffsetScale =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MaxDamageOffsetScale",
        ) / 100),
      (this.MinDamageOffsetDistance =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MinDamageOffsetDistance",
        )),
      (this.MaxDamageOffsetDistance =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MaxDamageOffsetDistance",
        )),
      (this.DamagePositionCache = Vector_1.Vector.Create()),
      (this.Okt =
        ConfigManager_1.ConfigManager.DamageUiConfig.GetAllDamageTextConfig()),
      this.InitializeDamageViewData();
  }
  static InitializeDamageViewData() {
    for (const e of this.Okt) {
      const a = new DamageViewData_1.DamageViewData();
      a.Initialize(e), this.kkt.set(e.Id, a);
    }
  }
  static ClearDamageViewData() {
    this.kkt.clear();
  }
  static GetDamageViewData(a) {
    return this.kkt.get(a);
  }
  static PreloadDamageView() {
    for (let a = this.Fkt.length; a < PRELOAD_DAMAGE_VIEW_COUNT; a++) {
      const e = new DamageView_1.DamageView();
      e.Init(), this.TotalDamageViewNum++, this.Fkt.push(e);
    }
  }
  static PreloadSequence() {}
  static ApplyDamage(e, i, t, r, g, n, o = -1, s = "") {
    if (
      DamageUiManager.Vkt &&
      r.Active &&
      !(o < 0 || (o === 1 && n && e === 0))
    ) {
      let m = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (m) {
        m = m.Id === r.Id;
        let a = void 0;
        ((a = this.Hkt.length > 0 ? this.Hkt.pop() : new DamageInfo()).Damage =
          e),
          (a.ElementId = i),
          (a.DamagePosition = t),
          (a.IsOwnPlayer = m),
          (a.IsCritical = g),
          (a.IsCure = n),
          (a.DamageTextId = o),
          (a.DamageText = s),
          this.jkt.Push(a);
      }
    }
  }
  static Wkt(a) {
    let e, i, t, r;
    DamageUiManager.Vkt &&
      ((e = Math.floor(Math.abs(a.Damage))),
      (i = DamageUiManager.Kkt(
        a.ElementId,
        a.IsCure,
        a.Damage,
        a.DamageTextId,
      )) < 0
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            8,
            "[DamageText]产生伤害飘字时，伤害飘字Id无效",
            ["textId", i],
            ["elementId", a.ElementId],
            ["bCure", a.IsCure],
            ["damageTextId", a.DamageTextId],
          )
        : (this.DamagePositionCache.DeepCopy(a.DamagePosition),
          (t = this.GetDamageViewData(i))
            ? (r = this.ProjectWorldLocationToScreenPosition(
                a.DamagePosition,
              )) &&
              DamageUiManager.Qkt(
                e,
                this.DamagePositionCache,
                r,
                t,
                a.IsCritical,
                a.IsCure,
                a.IsOwnPlayer,
                a.DamageText,
              )
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Battle", 8, "找不到对应的伤害飘字配置", [
                "伤害飘字Id",
                i,
              ])));
  }
  static Tick(a) {
    for (const i of DamageUiManager.Xkt) i.Tick(a);
    for (let a = 0; a < MAX_DAMAGE_PER_FRAME && !this.jkt.Empty; a++) {
      const e = this.jkt.Pop();
      this.Wkt(e), this.Hkt.push(e);
    }
  }
  static Kkt(a, e, i, t = -1) {
    let r = -1;
    return (r =
      t && t !== -1
        ? t
        : i === 0
          ? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT_ID
          : a > 0
            ? a
            : e
              ? BattleUiDefine_1.CURE_DAMAGE_TEXT
              : BattleUiDefine_1.ATK_DAMAGE_TEXT);
  }
  static ProjectWorldLocationToScreenPosition(a) {
    let e = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.ProjectWorldToScreen(e, a, this.$kt, !1)) {
      e = (0, puerts_1.$unref)(this.$kt);
      if (e) {
        var a = e.X;
        const i = e.Y;
        if (!isNaN(a) && !isNaN(i) && isFinite(a) && isFinite(i)) return e;
      }
    }
  }
  static ScreenPositionToLguiPosition(a) {
    return UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
      a,
    );
  }
  static Qkt(a, e, i, t, r = !1, g = !1, n = !1, o = "") {
    let s = void 0;
    return (
      this.Fkt.length > 0
        ? (s = this.Fkt.pop())
        : ((s = new DamageView_1.DamageView()).Init(),
          this.TotalDamageViewNum++),
      this.Xkt.add(s),
      s.InitializeData(a, e, i, t, r, g, n, o),
      s
    );
  }
  static RemoveDamageView(a) {
    this.Xkt.has(a) && (a.ClearData(), this.Xkt.delete(a), this.Fkt.push(a));
  }
  static OnEditorPlatformChanged() {
    for (const a of DamageUiManager.Xkt) a.RefreshFontSize();
    for (const e of DamageUiManager.Fkt) e.RefreshFontSize();
  }
  static OnLeaveLevel() {
    for (const a of DamageUiManager.Xkt) a.ClearData(), a.Destroy();
    DamageUiManager.Xkt.clear();
    for (const e of DamageUiManager.Fkt) e.Destroy();
    (DamageUiManager.Fkt.length = 0),
      (DamageUiManager.TotalDamageViewNum = 0),
      DamageUiSequencePool_1.DamageUiSequencePool.Clear(),
      DamageUiManager.jkt.Clear(),
      (DamageUiManager.Hkt.length = 0);
  }
  static Clear() {}
}
((exports.DamageUiManager = DamageUiManager).jkt = new Queue_1.Queue()),
  (DamageUiManager.Hkt = []),
  (DamageUiManager.TotalDamageViewNum = 0),
  (DamageUiManager.Xkt = new Set()),
  (DamageUiManager.Fkt = new Array()),
  (DamageUiManager.kkt = new Map()),
  (DamageUiManager.Vkt = !0),
  (DamageUiManager.MinDamageOffsetScale = 0),
  (DamageUiManager.MaxDamageOffsetScale = 0),
  (DamageUiManager.MinDamageOffsetDistance = 0),
  (DamageUiManager.MaxDamageOffsetDistance = 0),
  (DamageUiManager.DamagePositionCache = void 0),
  (DamageUiManager.Okt = void 0),
  (DamageUiManager.$kt = (0, puerts_1.$ref)(void 0));
// # sourceMappingURL=DamageUiManager.js.map
