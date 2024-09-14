"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsShopView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem"),
  TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  CharacterItemWithAdd_1 = require("../Common/Character/CharacterItemWithAdd"),
  CharacterListModule_1 = require("../Common/Character/CharacterListModule"),
  BusinessShopRoleItem_1 = require("./BusinessShopRoleItem"),
  SHOP_TWEEN_TIME = 1,
  VALUE_TIME = 0.5,
  SHOPPING_TIME = 2e3;
class BusinessTipsShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CharacterListModule = void 0),
      (this.HelperRoleItem = void 0),
      (this.PlayerRoleItem = void 0),
      (this.RoleIdList = []),
      (this.e2e = []),
      (this.ExpTweener = void 0),
      (this.Delegate = void 0),
      (this.ValueDelegate = void 0),
      (this.TimeHandle = void 0),
      (this.k1a = !1),
      (this.OAn = (i) => {
        for (const t of this.CharacterListModule.GetItemList())
          t.RefreshProgressAdd(i),
            1 === i && (t.RefreshProgress(i), t.SetLightProgressWidth());
      }),
      (this.Mke = () => {
        this.CloseMe();
      }),
      (this.t2e = () => {
        this.RemoveTimerHandle() && this.r2e();
      }),
      (this.i2e = () => new CharacterItemWithAdd_1.CharacterItemWithAdd()),
      (this.q1a = () => {
        this.Ypa(), this.Jpa();
      }),
      (this.Kpa = (i) => {
        for (const t of this.CharacterListModule.GetItemList())
          t.RefreshCurrentValue(i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [11, UE.UIItem],
      [10, UE.UIItem],
      [12, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [7, this.Mke],
        [12, this.t2e],
      ]);
  }
  async PAr() {
    (this.CharacterListModule = new CharacterListModule_1.CharacterListModule(
      this.i2e,
    )),
      await this.CharacterListModule.CreateByActorAsync(
        this.GetItem(1).GetOwner(),
      );
    var i = this.OpenParam,
      t =
        ((this.e2e = i.LastData.GetCharacterDataList()),
        await this.CharacterListModule.RefreshByDataAsync(this.e2e),
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          i.RoleId,
        ));
    i.LastData.SetCharacterDataByEditTeamData(t);
  }
  get N1a() {
    return this.OpenParam.IsMoreSuccessful;
  }
  async H1a() {
    var i = this.OpenParam;
    (this.HelperRoleItem = new BusinessShopRoleItem_1.BusinessShopRoleItem()),
      this.HelperRoleItem.Refresh(i.RoleId),
      await this.HelperRoleItem.CreateThenShowByActorAsync(
        this.GetItem(11).GetOwner(),
      ),
      await this.HelperRoleItem.RefreshAsync(),
      this.HelperRoleItem.SwitchRoleSpineAnim("working", 0.1);
  }
  async F1a() {
    this.PlayerRoleItem = new BusinessShopRoleItem_1.BusinessShopRoleItem();
    var i =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPlayerRoleId();
    this.PlayerRoleItem.Refresh(i),
      await this.PlayerRoleItem.CreateThenShowByActorAsync(
        this.GetItem(10).GetOwner(),
      ),
      await this.PlayerRoleItem.RefreshAsync(),
      this.PlayerRoleItem.SwitchRoleSpineAnim("working", 0.1);
  }
  j1a() {
    var i = this.OpenParam,
      t = i.RoleId,
      t =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          t,
        );
    (this.k1a = t.Level > i.LastData.Level),
      (this.k1a
        ? (this.GetText(5)?.SetText(i.LastData.Level.toString()),
          this.GetText(6))
        : this.GetText(3)
      )?.SetText(t.Level.toString());
  }
  async mJs() {
    await Promise.all([this.H1a(), this.F1a()]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(2)?.SetUIActive(!1),
      this.GetItem(4)?.SetUIActive(!1),
      this.GetButton(7)?.RootUIComp.SetUIActive(!1),
      this.GetItem(8)?.SetUIActive(!1),
      this.GetItem(9)?.SetUIActive(!1),
      (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn)),
      (this.ValueDelegate = (0, puerts_1.toManualReleaseDelegate)(this.Kpa)),
      this.j1a(),
      await Promise.all([this.PAr(), this.mJs()]),
      AudioSystem_1.AudioSystem.PostEvent("play_ui_zuiyuejie_loading");
  }
  OnBeforeShow() {
    this.GetItem(9)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "Moonfiesta_PartnerTip5",
      ),
      (this.TimeHandle = TimerSystem_1.TimerSystem.Delay(() => {
        (this.TimeHandle = void 0), this.r2e();
      }, SHOPPING_TIME));
  }
  OnBeforeDestroy() {
    this.Delegate &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.OAn),
      (this.Delegate = void 0)),
      this.ValueDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.Kpa),
        (this.ValueDelegate = void 0)),
      this.gzi();
  }
  r2e() {
    (this.k1a
      ? (this.UiViewSequence?.PlaySequencePurely("Success"), this.GetItem(4))
      : (this.UiViewSequence?.PlaySequencePurely("Fail"), this.GetItem(2))
    )?.SetUIActive(!0),
      this.N1a
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(0),
            "Moonfiesta_TravelGreatSuccess",
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(0),
            "Moonfiesta_PartnerTip4",
          );
    var i = this.OpenParam,
      i =
        (this.CharacterListModule?.SetActive(!0),
        this.qAn(),
        this.GetButton(7)?.RootUIComp.SetUIActive(!0),
        ConfigManager_1.ConfigManager.BusinessConfig.GetTrainRoleDialogByIdAndType(
          i.RoleId,
          i.TrainType,
        ));
    this.HelperRoleItem?.ShowDialog(i.Dialog),
      this.HelperRoleItem?.SwitchRoleSpineAnim("happy", 0),
      this.PlayerRoleItem?.SwitchRoleSpineAnim("happy", 0),
      AudioSystem_1.AudioSystem.ExecuteAction("play_ui_zuiyuejie_loading", 0),
      this.Xpa();
  }
  RemoveTimerHandle() {
    return !(
      !this.TimeHandle ||
      (TimerSystem_1.TimerSystem.Remove(this.TimeHandle),
      (this.TimeHandle = void 0))
    );
  }
  qAn() {
    for (const i of this.CharacterListModule.GetItemList()) i.RefreshAddText();
  }
  gzi() {
    this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
  }
  Xpa() {
    for (const i of this.CharacterListModule.GetItemList())
      i.SetLightProgressWidth(), i.PlayAddAction(), i.RefreshAddText();
    (this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
      GlobalData_1.GlobalData.World,
      this.Delegate,
      0,
      1,
      SHOP_TWEEN_TIME,
    )),
      this.ExpTweener?.OnCompleteCallBack.Bind(this.q1a),
      AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_favorability");
  }
  Ypa() {
    for (const i of this.CharacterListModule.GetItemList()) i.PlayEndAction();
  }
  Jpa() {
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
      GlobalData_1.GlobalData.World,
      this.ValueDelegate,
      0,
      1,
      VALUE_TIME,
    );
  }
}
exports.BusinessTipsShopView = BusinessTipsShopView;
//# sourceMappingURL=BusinessTipsShopView.js.map
