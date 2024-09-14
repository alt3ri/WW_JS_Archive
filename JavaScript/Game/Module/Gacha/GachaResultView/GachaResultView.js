"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaResultView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  BlackScreenController_1 = require("../../BlackScreen/BlackScreenController"),
  ChannelController_1 = require("../../Channel/ChannelController"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ShareRewardInfo_1 = require("../../Photograph/View/ShareRewardInfo"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView"),
  GachaMultipleResultItem_1 = require("./GachaMultipleResultItem"),
  GachaResultItemNew_1 = require("./GachaResultItemNew");
class GachaResultView extends GachaSceneView_1.GachaSceneView {
  constructor() {
    super(...arguments),
      (this.wWt = !1),
      (this.BWt = void 0),
      (this.bWt = void 0),
      (this.qWt = void 0),
      (this.GWt = void 0),
      (this.NWt = void 0),
      (this.OWt = () => {
        if (ChannelController_1.ChannelController.CouldShare()) {
          var t = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
          let e = 0;
          if (1 === t.length) {
            if (this.GetItemQuality(t[0].e9n.L8n) < 5) return;
            e =
              2 ===
              ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
                t[0].e9n.L8n,
              )
                ? 4
                : 3;
          } else e = 5;
          this.GetButton(6).RootUIComp.SetUIActive(!0);
          var t = ShareRewardById_1.configShareRewardById.GetConfig(e),
            a = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(e);
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Gacha", 28, "刷新分享按钮", ["showShareReward", a]),
            this.GetItem(7).SetUIActive(a),
            a &&
              ((a = [...t.ShareReward][0]), this.NWt?.SetItemInfo(a[0], a[1]));
        }
      }),
      (this.kWt = () => {
        UiManager_1.UiManager.IsViewHide("GachaScanView") ||
        UiManager_1.UiManager.IsViewHide("DrawMainView")
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Gacha", 35, "点击过快，之前界面仍未关闭")
          : EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CloseGachaSceneView,
            );
      }),
      (this.FWt = () => {
        ChannelController_1.ChannelController.ShareGacha(
          ModelManager_1.ModelManager.GachaModel.CurGachaResult,
        );
      }),
      (this.VWt = (e, t) => {
        var e = e[0].ItemId,
          t = t[0].ItemId,
          a =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
              e,
            )?.QualityId,
          r =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
              t,
            )?.QualityId;
        return a === r ? e - t : r - a;
      }),
      (this.HWt = () => new GachaResultItemNew_1.GachaResultItemNew()),
      (this.jWt = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [4, UE.UIButtonComponent],
      [1, UE.UIGridLayout],
      [5, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIGridLayout],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.kWt],
        [6, this.FWt],
      ]);
  }
  OnAfterInitComponentsData() {
    var e = this.OpenParam;
    this.wWt = e?.ResultViewHideExtraReward;
  }
  async OnBeforeStartAsync() {
    var e,
      t = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
    t &&
      0 !== t.length &&
      ((this.qWt = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.jWt,
      )),
      (this.GWt = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(3),
        this.jWt,
      )),
      (this.NWt = new ShareRewardInfo_1.ShareRewardInfo()),
      (e = [this.NWt.OnlyCreateByActorAsync(this.GetItem(8).GetOwner())]),
      1 === t.length
        ? e.push(this.WWt(t[0]))
        : e.push(this.HandleMultiGacha(t)),
      await Promise.all(e),
      this.AddChild(this.NWt),
      this.GetButton(6)?.RootUIComp.SetUIActive(!1),
      this.GetItem(7)?.SetUIActive(!1),
      CameraController_1.CameraController.ResetViewTarget());
  }
  OnBeforeShow() {
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
      "Close",
      "GachaSkip",
    ),
      this.OWt();
  }
  OnAfterShow() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.TryOpenReview();
  }
  AfterAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFirstShare,
      this.OWt,
    );
  }
  AfterRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFirstShare,
      this.OWt,
    );
  }
  KWt(e) {
    e && 0 < e.length && !this.wWt
      ? (this.GetItem(0).SetUIActive(!0), this.qWt.RefreshByData(e))
      : this.GetItem(0).SetUIActive(!1);
  }
  QWt(e) {
    e && 0 < e.length && !this.wWt
      ? (this.GetItem(2).SetUIActive(!0), this.GWt.RefreshByData(e))
      : this.GetItem(2).SetUIActive(!1);
  }
  async HandleMultiGacha(e) {
    var t = new GachaMultipleResultItem_1.GachaMultipleResultItem(),
      t =
        (await t.CreateThenShowByResourceIdAsync(
          "UiItem_MultiGacha",
          this.GetItem(5),
        ),
        t.GetGachaResultItemLayout()),
      a =
        ((this.bWt = new GenericLayout_1.GenericLayout(t, this.HWt)),
        new Map()),
      r = new Map();
    for (const s of e) {
      s.a9n && this.XWt(s.a9n, a);
      var i = s.l9n;
      i && 0 < i.L8n && 0 < i.n9n && this.$Wt(i, r);
    }
    (t = this.YWt(a)), this.KWt(t), (t = this.YWt(r));
    this.QWt(t);
    const n = (e) => {
      switch (e) {
        case 1:
          return 2;
        case 2:
          return 1;
        default:
          return 0;
      }
    };
    t = [...e];
    t.sort((e, t) => {
      var a =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            e.e9n.L8n,
          )?.QualityId ?? 0,
        r =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            t.e9n.L8n,
          )?.QualityId ?? 0;
      return a === r
        ? ((e = n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.e9n.L8n),
          )),
          n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(t.e9n.L8n),
          ) - e)
        : r - a;
    }),
      await this.bWt.RefreshByDataAsync(t);
  }
  async WWt(e) {
    var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
        "UiItem_SingleGacha",
        this.GetItem(5),
      ),
      t =
        ((this.BWt = new GachaResultItemNew_1.GachaResultItemNew()),
        await this.BWt.CreateThenShowByActorAsync(t),
        this.BWt.Update(e),
        new Map()),
      a = new Map(),
      e = (e.a9n && this.XWt(e.a9n, t), e.l9n),
      e = (e && 0 < e.L8n && 0 < e.n9n && this.$Wt(e, a), this.YWt(t)),
      t = (this.KWt(e), this.YWt(a));
    this.QWt(t);
  }
  XWt(e, t) {
    for (const a of e) this.$Wt(a, t);
  }
  $Wt(e, t) {
    t.set(e.L8n, (e.n9n ?? 0) + (t.get(e.L8n) ?? 0));
  }
  YWt(e) {
    if (e && 0 !== e.size) {
      const a = new Array();
      return (
        e.forEach((e, t) => {
          t = [{ IncId: 0, ItemId: t }, e];
          a.push(t);
        }),
        a.sort(this.VWt),
        a
      );
    }
  }
  GetItemQuality(e) {
    let t = 0;
    switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e)) {
      case 1:
        t =
          ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
            e,
          ).QualityId;
        break;
      case 2:
        t =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            e,
          )?.QualityId;
    }
    return t;
  }
}
exports.GachaResultView = GachaResultView;
//# sourceMappingURL=GachaResultView.js.map
