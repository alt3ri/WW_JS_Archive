"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiLayer = exports.EInitState = void 0);
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  LguiUtil_1 = require("../../Game/Module/Util/LguiUtil"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  UiLayerType_1 = require("./Define/UiLayerType"),
  Macro_1 = require("../../Core/Preprocessor/Macro");
var EInitState;
!(function (i) {
  (i[(i.None = 0)] = "None"),
    (i[(i.Initializing = 1)] = "Initializing"),
    (i[(i.Inited = 2)] = "Inited");
})((EInitState = exports.EInitState || (exports.EInitState = {})));
class UiLayer {
  static get UiRoot() {
    return this.CCr;
  }
  static get UiRootItem() {
    return this.gCr;
  }
  static get WorldSpaceUiRoot() {
    return this.fCr;
  }
  static get WorldSpaceUiRootItem() {
    return this.pCr;
  }
  static async vCr(i) {
    if (this.MCr.has(i)) {
      var t = this.MCr.get(i);
      if (0 < t.length && void 0 !== t[0]) return;
    }
    var t = [],
      e = this.GetLayerRootUiItem(i);
    await this.ECr(0, e, t), this.MCr.set(i, t);
  }
  static async ECr(i, t, e) {
    var a = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
        "UiItem_BattleViewUnitNode_Prefab",
        t,
      ),
      r = (LguiUtil_1.LguiUtil.SetActorIsPermanent(a, !0, !1), a.RootComponent),
      r =
        (e.push(r),
        Info_1.Info.IsPlayInEditor &&
          (a.SetActorLabel((a = "Unit_" + i)), r.SetDisplayName(a)),
        i + 1);
    r !== UiLayerType_1.TIP_LAYER_UNIT_COUNT && (await this.ECr(r, t, e));
  }
  static GetFloatUnit(i, t) {
    i = this.MCr.get(i);
    if (i)
      return t >= i.length
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              11,
              "索引大于生成单元节点列表,返回当前最大值节点",
            ),
          i[i.length])
        : i[t];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "UiCore",
        11,
        "索引大于生成单元节点列表,返回当前最大值节点",
      );
  }
  static GetLayerRootUiItem(i) {
    var t = this.SCr.get(i);
    if (t) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "UiCore",
        11,
        "找不到对应的UiLayer, 此时UiLayer可能还未初始化",
        ["层级名称", UiLayerType_1.ELayerType[i]],
      );
  }
  static GetBattleViewUnit(i) {
    return this.yCr[i];
  }
  static SetLayerActive(i, t) {
    var e = this.GetLayerRootUiItem(i);
    e
      ? (e.SetUIActive(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiLayer",
            11,
            "有操作设置层级的显隐状态",
            ["层级类型", i],
            ["显示状态", t],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiLayer", 11, "找不到对应的uiLayer：", ["type", i]);
  }
  static async Initialize() {
    UiLayer.ZCe ||
      ((UiLayer.ZCe = !0),
      await Promise.all([this.ICr(), this.TCr()]),
      await this.LCr(),
      await Promise.all([
        this.DCr(),
        this.vCr(UiLayerType_1.ELayerType.BattleFloat),
        this.vCr(UiLayerType_1.ELayerType.Float),
      ]));
  }
  static async ICr() {
    this.CCr
      ? Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 1, "界面根节点已存在")
      : ((this.CCr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_Root_Prefab",
          void 0,
        )),
        this.CCr &&
        ((this.gCr = this.CCr.GetComponentByClass(UE.UIItem.StaticClass())),
        this.gCr)
          ? (this.CCr.OnDestroyed.Add(() => {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 1, "UiRoot被销毁"),
                this.SCr.clear(),
                (this.CCr = void 0),
                (this.gCr = void 0);
            }),
            LguiUtil_1.LguiUtil.SetActorIsPermanent(this.UiRoot, !0, !1))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiCore", 1, "界面根节点创建失败", [
              "UI_ROOT_PATH",
              "UiItem_Root_Prefab",
            ]));
  }
  static async LCr() {
    var i = [];
    for (const t of UiLayerType_1.LayerTypeEnumValues) i.push(this.RCr(t));
    await Promise.all(i).then(() => {
      let i = 0;
      for (const t of UiLayerType_1.LayerTypeEnumValues)
        (UE.KuroStaticLibrary.IsBuildShipping() &&
          t === UiLayerType_1.ELayerType.Debug) ||
          this.GetLayerRootUiItem(t).SetHierarchyIndex(++i);
    });
  }
  static async RCr(t) {
    if (this.SCr.has(t))
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiLayer", 17, "重复加载UI层级", [
          "层级类型",
          UiLayerType_1.ELayerType[t],
        ]);
    else if (
      !UE.KuroStaticLibrary.IsBuildShipping() ||
      t !== UiLayerType_1.ELayerType.Debug
    ) {
      let i = "UiItem_Layer_Prefab";
      switch (t) {
        case UiLayerType_1.ELayerType.HUD:
          i = "UiItem_LayerHud_Prefab";
          break;
        case UiLayerType_1.ELayerType.Mask:
        case UiLayerType_1.ELayerType.NormalMask:
          i = "UiItem_LayerMask_Prefab";
      }
      var e,
        a = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(i, this.gCr);
      LguiUtil_1.LguiUtil.SetActorIsPermanent(a, !0, !1),
        this.SCr.set(t, a.RootComponent),
        t === UiLayerType_1.ELayerType.Pool && a.RootComponent.SetUIActive(!1),
        Macro_1.NOT_SHIPPING_ENVIRONMENT &&
          ((e = UiLayerType_1.ELayerType[t]),
          (a = a.RootComponent).SetDisplayName(e),
          t === UiLayerType_1.ELayerType.Debug) &&
          UE.LGUIManagerActor.SetDebugRootLayer(
            GlobalData_1.GlobalData.World,
            a,
          );
    }
  }
  static async DCr() {
    if (!this.yCr) {
      var e,
        a = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD),
        r = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_BattleViewUnitNode_Prefab",
          a,
        );
      let t = r;
      this.yCr = [];
      for (let i = 0; i < UiLayerType_1.BATTLE_VIEW_UNIT_COUNT; i++) {
        (t = t || LguiUtil_1.LguiUtil.DuplicateActor(r, a)),
          LguiUtil_1.LguiUtil.SetActorIsPermanent(t, !0, !1);
        const o = t.RootComponent;
        Info_1.Info.IsPlayInEditor &&
          ((e = "Unit_" + i), t.SetActorLabel(e), o.SetDisplayName(e)),
          this.yCr.push(o),
          (t = void 0);
      }
      var i = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
        "UiItem_SafeZoneUnitNode_Prefab",
        a,
      );
      LguiUtil_1.LguiUtil.SetActorIsPermanent(i, !0, !1);
      const o = i.RootComponent;
      this.yCr.push(o);
    }
  }
  static async TCr() {
    this.fCr
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 1, "空间界面根节点已存在")
      : ((this.fCr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_WorldSpace_Prefab",
          void 0,
        )),
        this.fCr &&
        ((this.pCr = this.fCr.GetComponentByClass(UE.UIItem.StaticClass())),
        this.fCr)
          ? (this.fCr.OnDestroyed.Add(() => {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 1, "WorldSpaceUiRoot被销毁"),
                (this.fCr = void 0),
                (this.pCr = void 0);
            }),
            LguiUtil_1.LguiUtil.SetActorIsPermanent(
              this.WorldSpaceUiRoot,
              !0,
              !1,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiCore", 1, "空间界面根节点创建失败", [
              "WORLD_SPACE_UI_ROOT",
              "UiItem_WorldSpace_Prefab",
            ]));
  }
  static SetUiRootActive(i) {
    var t;
    this.IsForceHideUi() ||
      ((t = UiLayer.gCr) &&
        UE.KismetSystemLibrary.IsValid(t) &&
        (t.SetUIActive(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
          i,
        )));
  }
  static IsUiActive() {
    var i = UiLayer.gCr;
    return (
      !(!i || !UE.KismetSystemLibrary.IsValid(i)) && i.IsUIActiveInHierarchy()
    );
  }
  static ForceHideUi() {
    ModelManager_1.ModelManager.SundryModel.GmBlueprintGmIsOpen &&
      (this.SetUiRootActive(!1), this.SetWorldUiActive(!1), (this.UCr = !0));
  }
  static ForceShowUi() {
    this.IsForceHideUi() &&
      ((this.UCr = !1), this.SetUiRootActive(!0), this.SetWorldUiActive(!0));
  }
  static IsForceHideUi() {
    return this.UCr;
  }
  static SetForceHideUiState(i) {
    this.UCr = !i;
  }
  static SetWorldUiActive(i) {
    var t;
    this.IsForceHideUi() ||
      ((t = UiLayer.pCr) &&
        UE.KismetSystemLibrary.IsValid(t) &&
        t.SetUIActive(i));
  }
  static SetShowMaskLayer(i, t) {
    var e,
      a = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
    a &&
      (t ? UiLayer.ACr.add(i) : UiLayer.ACr.delete(i),
      (e = UiLayer.ACr.size),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiCore",
          17,
          "Mask遮罩",
          ["tag", i],
          ["show", t],
          ["size", e],
        ),
      a?.SetRaycastTarget(0 < e));
  }
  static IsInMask() {
    var i = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
    return !!i && i.IsRaycastTarget();
  }
  static SetShowNormalMaskLayer(i, t = "") {
    var e;
    (StringUtils_1.StringUtils.IsEmpty(this.PCr) || (this.PCr === t && !i)) &&
      (e = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.NormalMask)) &&
      (e?.SetRaycastTarget(i),
      i && StringUtils_1.StringUtils.IsEmpty(this.PCr) && t
        ? (this.PCr = t)
        : i || t !== this.PCr || (this.PCr = ""),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "UiCore",
        17,
        "设置Normal层点击遮罩",
        ["是否显示", i],
        ["上次来源", this.PCr],
        ["当前来源", t],
      );
  }
}
((exports.UiLayer = UiLayer).ZCe = !1),
  (UiLayer.PCr = ""),
  (UiLayer.CCr = void 0),
  (UiLayer.gCr = void 0),
  (UiLayer.fCr = void 0),
  (UiLayer.pCr = void 0),
  (UiLayer.yCr = void 0),
  (UiLayer.SCr = new Map()),
  (UiLayer.ACr = new Set()),
  (UiLayer.MCr = new Map());
//# sourceMappingURL=UiLayer.js.map
