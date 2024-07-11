"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaResultView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ChannelController_1 = require("../../Channel/ChannelController"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ShareRewardInfo_1 = require("../../Photograph/View/ShareRewardInfo"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView"),
  GachaMultipleResultItem_1 = require("./GachaMultipleResultItem"),
  GachaResultItemNew_1 = require("./GachaResultItemNew"),
  CameraController_1 = require("../../../Camera/CameraController");
class GachaResultView extends GachaSceneView_1.GachaSceneView {
  constructor() {
    super(...arguments),
      (this.wjt = !1),
      (this.Bjt = void 0),
      (this.bjt = void 0),
      (this.qjt = void 0),
      (this.Gjt = void 0),
      (this.Njt = void 0),
      (this.Ojt = () => {
        if (ChannelController_1.ChannelController.CouldShare()) {
          var t = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
          let e = 0;
          if (1 === t.length) {
            if (this.GetItemQuality(t[0].u5n.G3n) < 5) return;
            e =
              2 ===
              ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(
                t[0].u5n.G3n,
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
              ((a = [...t.ShareReward][0]), this.Njt?.SetItemInfo(a[0], a[1]));
        }
      }),
      (this.kjt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CloseGachaSceneView,
        );
      }),
      (this.Fjt = () => {
        ChannelController_1.ChannelController.ShareGacha(
          ModelManager_1.ModelManager.GachaModel.CurGachaResult,
        );
      }),
      (this.Vjt = (e, t) => {
        var e = e[0].ItemId,
          t = t[0].ItemId,
          a =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
              e,
            )?.QualityId,
          i =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
              t,
            )?.QualityId;
        return a === i ? e - t : i - a;
      }),
      (this.Hjt = () => new GachaResultItemNew_1.GachaResultItemNew()),
      (this.jjt = () =>
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
        [4, this.kjt],
        [6, this.Fjt],
      ]);
  }
  OnAfterInitComponentsData() {
    var e = this.OpenParam;
    this.wjt = e?.ResultViewHideExtraReward;
  }
  async OnBeforeStartAsync() {
    var e,
      t = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
    t &&
      0 !== t.length &&
      ((this.qjt = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.jjt,
      )),
      (this.Gjt = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(3),
        this.jjt,
      )),
      (this.Njt = new ShareRewardInfo_1.ShareRewardInfo()),
      (e = [this.Njt.OnlyCreateByActorAsync(this.GetItem(8).GetOwner())]),
      1 === t.length
        ? e.push(this.Wjt(t[0]))
        : e.push(this.HandleMultiGacha(t)),
      await Promise.all(e),
      this.AddChild(this.Njt),
      this.GetButton(6)?.RootUIComp.SetUIActive(!1),
      this.GetItem(7)?.SetUIActive(!1),
      CameraController_1.CameraController.ResetViewTarget());
  }
  OnBeforeShow() {
    this.Ojt();
  }
  AfterAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFirstShare,
      this.Ojt,
    );
  }
  AfterRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFirstShare,
      this.Ojt,
    );
  }
  Kjt(e) {
    e && 0 < e.length && !this.wjt
      ? (this.GetItem(0).SetUIActive(!0), this.qjt.RefreshByData(e))
      : this.GetItem(0).SetUIActive(!1);
  }
  Qjt(e) {
    e && 0 < e.length && !this.wjt
      ? (this.GetItem(2).SetUIActive(!0), this.Gjt.RefreshByData(e))
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
        ((this.bjt = new GenericLayout_1.GenericLayout(t, this.Hjt)),
        new Map()),
      i = new Map();
    for (const s of e) {
      s.p5n && this.Xjt(s.p5n, a);
      var r = s.M5n;
      r && 0 < r.G3n && 0 < r.g5n && this.$jt(r, i);
    }
    (t = this.Yjt(a)), this.Kjt(t), (t = this.Yjt(i));
    this.Qjt(t);
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
            e.u5n.G3n,
          )?.QualityId ?? 0,
        i =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            t.u5n.G3n,
          )?.QualityId ?? 0;
      return a === i
        ? ((e = n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.u5n.G3n),
          )),
          n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(t.u5n.G3n),
          ) - e)
        : i - a;
    }),
      await this.bjt.RefreshByDataAsync(t);
  }
  async Wjt(e) {
    var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
        "UiItem_SingleGacha",
        this.GetItem(5),
      ),
      t =
        ((this.Bjt = new GachaResultItemNew_1.GachaResultItemNew()),
        await this.Bjt.CreateThenShowByActorAsync(t),
        this.Bjt.Update(e),
        new Map()),
      a = new Map(),
      e = (e.p5n && this.Xjt(e.p5n, t), e.M5n),
      e = (e && 0 < e.G3n && 0 < e.g5n && this.$jt(e, a), this.Yjt(t)),
      t = (this.Kjt(e), this.Yjt(a));
    this.Qjt(t);
  }
  Xjt(e, t) {
    for (const a of e) this.$jt(a, t);
  }
  $jt(e, t) {
    t.set(e.G3n, (e.g5n ?? 0) + (t.get(e.G3n) ?? 0));
  }
  Yjt(e) {
    if (e && 0 !== e.size) {
      const a = new Array();
      return (
        e.forEach((e, t) => {
          t = [{ IncId: 0, ItemId: t }, e];
          a.push(t);
        }),
        a.sort(this.Vjt),
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
