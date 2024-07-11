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
  UiLayerType_1 = require("./Define/UiLayerType");
var EInitState;
!(function (i) {
  (i[(i.None = 0)] = "None"),
    (i[(i.Initializing = 1)] = "Initializing"),
    (i[(i.Inited = 2)] = "Inited");
})((EInitState = exports.EInitState || (exports.EInitState = {})));
class UiLayer {
  static get UiRoot() {
    return this.pdr;
  }
  static get UiRootItem() {
    return this.vdr;
  }
  static get WorldSpaceUiRoot() {
    return this.Mdr;
  }
  static get WorldSpaceUiRootItem() {
    return this.Sdr;
  }
  static async Edr(i) {
    if (this.ydr.has(i)) {
      var t = this.ydr.get(i);
      if (0 < t.length && void 0 !== t[0]) return;
    }
    var t = [],
      e = this.GetLayerRootUiItem(i);
    await this.Idr(0, e, t), this.ydr.set(i, t);
  }
  static async Idr(i, t, e) {
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
    r !== UiLayerType_1.TIP_LAYER_UNIT_COUNT && (await this.Idr(r, t, e));
  }
  static GetFloatUnit(i, t) {
    i = this.ydr.get(i);
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
    var t = this.Tdr.get(i);
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
    return this.Ldr[i];
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
      await Promise.all([this.Ddr(), this.Rdr()]),
      await this.Udr(),
      await Promise.all([
        this.Adr(),
        this.Edr(UiLayerType_1.ELayerType.BattleFloat),
        this.Edr(UiLayerType_1.ELayerType.Float),
      ]));
  }
  static async Ddr() {
    this.pdr
      ? Log_1.Log.CheckInfo() && Log_1.Log.Info("UiCore", 1, "界面根节点已存在")
      : ((this.pdr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_Root_Prefab",
          void 0,
        )),
        this.pdr &&
        ((this.vdr = this.pdr.GetComponentByClass(UE.UIItem.StaticClass())),
        this.vdr)
          ? (this.pdr.OnDestroyed.Add(() => {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 1, "UiRoot被销毁"),
                this.Tdr.clear(),
                (this.pdr = void 0),
                (this.vdr = void 0);
            }),
            LguiUtil_1.LguiUtil.SetActorIsPermanent(this.UiRoot, !0, !1))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("UiCore", 1, "界面根节点创建失败", [
              "UI_ROOT_PATH",
              "UiItem_Root_Prefab",
            ]));
  }
  static async Udr() {
    var i = [];
    for (const t of UiLayerType_1.LayerTypeEnumValues) i.push(this.Pdr(t));
    await Promise.all(i).then(() => {
      let i = 0;
      for (const t of UiLayerType_1.LayerTypeEnumValues)
        (UE.KuroStaticLibrary.IsBuildShipping() &&
          t === UiLayerType_1.ELayerType.Debug) ||
          this.GetLayerRootUiItem(t).SetHierarchyIndex(++i);
    });
  }
  static async Pdr(t) {
    if (this.Tdr.has(t))
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
      var e = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          i,
          this.vdr,
        ),
        a =
          (LguiUtil_1.LguiUtil.SetActorIsPermanent(e, !0, !1),
          this.Tdr.set(t, e.RootComponent),
          t === UiLayerType_1.ELayerType.Pool &&
            e.RootComponent.SetUIActive(!1),
          UiLayerType_1.ELayerType[t]),
        e = e.RootComponent;
      e.SetDisplayName(a),
        t === UiLayerType_1.ELayerType.Debug &&
          UE.LGUIManagerActor.SetDebugRootLayer(
            GlobalData_1.GlobalData.World,
            e,
          );
    }
  }
  static async Adr() {
    if (!this.Ldr) {
      var e = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD),
        a = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_BattleViewUnitNode_Prefab",
          e,
        );
      let t = a;
      this.Ldr = [];
      for (let i = 0; i < UiLayerType_1.BATTLE_VIEW_UNIT_COUNT; i++) {
        (t = t || LguiUtil_1.LguiUtil.DuplicateActor(a, e)),
          LguiUtil_1.LguiUtil.SetActorIsPermanent(t, !0, !1);
        var r,
          o = t.RootComponent;
        Info_1.Info.IsPlayInEditor &&
          ((r = "Unit_" + i), t.SetActorLabel(r), o.SetDisplayName(r)),
          this.Ldr.push(o),
          (t = void 0);
      }
    }
  }
  static async Rdr() {
    this.Mdr
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 1, "空间界面根节点已存在")
      : ((this.Mdr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_WorldSpace_Prefab",
          void 0,
        )),
        this.Mdr &&
        ((this.Sdr = this.Mdr.GetComponentByClass(UE.UIItem.StaticClass())),
        this.Mdr)
          ? (this.Mdr.OnDestroyed.Add(() => {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 1, "WorldSpaceUiRoot被销毁"),
                (this.Mdr = void 0),
                (this.Sdr = void 0);
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
      ((t = UiLayer.vdr) &&
        UE.KismetSystemLibrary.IsValid(t) &&
        (t.SetUIActive(i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
          i,
        )));
  }
  static IsUiActive() {
    var i = UiLayer.vdr;
    return (
      !(!i || !UE.KismetSystemLibrary.IsValid(i)) && i.IsUIActiveInHierarchy()
    );
  }
  static ForceHideUi() {
    ModelManager_1.ModelManager.SundryModel.GmBlueprintGmIsOpen &&
      (this.SetUiRootActive(!1), this.SetWorldUiActive(!1), (this.xdr = !0));
  }
  static ForceShowUi() {
    this.IsForceHideUi() &&
      ((this.xdr = !1), this.SetUiRootActive(!0), this.SetWorldUiActive(!0));
  }
  static IsForceHideUi() {
    return this.xdr;
  }
  static SetForceHideUiState(i) {
    this.xdr = !i;
  }
  static SetWorldUiActive(i) {
    var t;
    this.IsForceHideUi() ||
      ((t = UiLayer.Sdr) &&
        UE.KismetSystemLibrary.IsValid(t) &&
        t.SetUIActive(i));
  }
  static SetShowMaskLayer(i, t) {
    var e,
      a = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
    a &&
      (t ? UiLayer.wdr.add(i) : UiLayer.wdr.delete(i),
      (e = UiLayer.wdr.size),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
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
    (StringUtils_1.StringUtils.IsEmpty(this.Bdr) || (this.Bdr === t && !i)) &&
      (e = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.NormalMask)) &&
      (e?.SetRaycastTarget(i),
      i && StringUtils_1.StringUtils.IsEmpty(this.Bdr) && t
        ? (this.Bdr = t)
        : i || t !== this.Bdr || (this.Bdr = ""),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "UiCore",
        17,
        "设置Normal层点击遮罩",
        ["是否显示", i],
        ["上次来源", this.Bdr],
        ["当前来源", t],
      );
  }
}
((exports.UiLayer = UiLayer).ZCe = !1),
  (UiLayer.Bdr = ""),
  (UiLayer.pdr = void 0),
  (UiLayer.vdr = void 0),
  (UiLayer.Mdr = void 0),
  (UiLayer.Sdr = void 0),
  (UiLayer.Ldr = void 0),
  (UiLayer.Tdr = new Map()),
  (UiLayer.wdr = new Set()),
  (UiLayer.ydr = new Map());
//# sourceMappingURL=UiLayer.js.map
