"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerBuffView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  MowingTowerModel_1 = require("./MowingTowerModel");
class MowingTowerBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.aSn = void 0),
      (this.hSn = void 0),
      (this.lSn = !0),
      (this.vVt = void 0),
      (this.SPe = void 0),
      (this.Jal = !0),
      (this.I2i = () => {
        return new BuffGridItem();
      }),
      (this.sOt = () => {
        var t,
          i = [];
        let e = 1;
        for (const o of this.hSn)
          o.Selected &&
            (((t = new MowingTowerModel_1.MowingTowerBuffInfo()).BuffId =
              o.BuffId),
            (t.ChangeAble = !0),
            (t.Slot = e),
            e++,
            i.push(t));
        var s = this._Sn();
        if (s < this.aSn.GetBuffMaxCount())
          for (let t = s; t < this.aSn.GetBuffMaxCount(); t++) {
            var r = this.aSn.GetIndexPrepareSelectBuff(t),
              h = new MowingTowerModel_1.MowingTowerBuffInfo();
            (h.BuffId = 0),
              (h.ChangeAble = r.ChangeAble),
              (h.Slot = e),
              e++,
              i.push(h);
          }
        this.aSn.SetPrepareSelectBuff(i),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ChangeMowingTowerBuff,
          ),
          this.CloseMe();
      }),
      (this.kqe = (t) => {
        if (this.Jal && !t.Selected) for (const i of this.hSn) i.Selected = !1;
        (t.Selected = !t.Selected), this.Esi(), this.Jbi();
      }),
      (this.uSn = (t) => !!this.lSn || !!t.Selected || !!this.cSn());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.sOt]]);
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetTitleByTextIdAndArgNew("MowingTowerBuffViewTitle"),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(4).GetOwner(),
        this.I2i,
      )),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeShow() {
    this.ROn(),
      (this.aSn = ModelManager_1.ModelManager.MowingTowerModel.CurrentTeamInfo),
      (this.hSn = []);
    for (const i of this.aSn.GetOptionBuff()) {
      var t = new BuffScrollItemData();
      (t.BuffId = i.BuffId),
        (t.Selected =
          -1 !==
          this.aSn
            .GetPrepareSelectBuff()
            .findIndex((t) => t.BuffId === i.BuffId)),
        (t.SelectedAtStart = t.Selected),
        (t.OnClickToggle = this.kqe),
        (t.CheckClickAble = this.uSn),
        this.hSn.push(t);
    }
    this.Esi(),
      this.Jbi(),
      (this.Jal = 1 === this.aSn.LevelInfo.GetMaxBuffCount());
  }
  ROn() {
    let t = "Start";
    ModelManager_1.ModelManager.MowingTowerModel.PlayBackAnimation &&
      (t = "ShowView"),
      this.SPe?.PlaySequencePurely(t),
      (ModelManager_1.ModelManager.MowingTowerModel.PlayBackAnimation = !1);
  }
  cSn() {
    return (
      !!this.lSn ||
      !!(this.Jal || this.aSn.LevelInfo.GetMaxBuffCount() > this._Sn()) ||
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "BossRushMaxBuffText",
      ),
      !1)
    );
  }
  _Sn() {
    let t = 0;
    for (const i of this.hSn) i.Selected && t++;
    return t;
  }
  Esi() {
    if (this.vVt) {
      var i = [];
      this.lSn = !0;
      for (let t = 0; t < this.hSn.length; t += 2) {
        var e = new BuffGridItemData();
        if (((e.BuffScrollItemData1 = this.hSn[t]), t + 1 >= this.hSn.length)) {
          i.push(e);
          break;
        }
        (e.BuffScrollItemData2 = this.hSn[t + 1]), i.push(e);
      }
      this.vVt.RefreshByData(i, !1, () => {
        this.lSn = !1;
      }),
        this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(0 < i.length);
    }
  }
  OnBeforeHide() {
    this.vVt?.ClearGridProxies();
  }
  Jbi() {
    this.GetText(2)?.SetUIActive(!1);
  }
}
exports.MowingTowerBuffView = MowingTowerBuffView;
class BuffScrollItemData {
  constructor() {
    (this.BuffId = 0),
      (this.ChangeAble = !0),
      (this.Selected = !1),
      (this.SelectedAtStart = !1),
      (this.OnClickToggle = () => {}),
      (this.CheckClickAble = void 0);
  }
}
class BuffGridItemData {
  constructor() {
    (this.BuffScrollItemData1 = void 0), (this.BuffScrollItemData2 = void 0);
  }
}
class BuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.mSn = void 0),
      (this.dSn = void 0),
      (this.uat = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.sGe();
  }
  async sGe() {
    (this.uat = new CustomPromise_1.CustomPromise()),
      (this.mSn = new BuffScrollItem()),
      await this.mSn.CreateByActorAsync(this.GetItem(0).GetOwner()),
      this.mSn.SetActive(!0),
      (this.dSn = new BuffScrollItem()),
      await this.dSn.CreateByActorAsync(this.GetItem(1).GetOwner()),
      this.dSn.SetActive(!0),
      this.uat.SetResult();
  }
  Refresh(t, i, e) {
    this.CSn(t, i, e);
  }
  async CSn(t, i, e) {
    await this.uat?.Promise,
      this.mSn.Refresh(t.BuffScrollItemData1, i, e),
      this.GetItem(0).SetAlpha(1),
      this.mSn.SetToggleActiveState(!0),
      t.BuffScrollItemData2
        ? (this.GetItem(1).SetAlpha(1),
          this.dSn.SetToggleActiveState(!0),
          this.dSn.Refresh(t.BuffScrollItemData2, i, e))
        : (this.GetItem(1).SetAlpha(0),
          this.GetItem(1).SetRaycastTarget(!1),
          this.dSn.SetToggleActiveState(!1));
  }
}
class BuffScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.pHe = () => !!this.$8i && this.$8i.CheckClickAble(this.$8i)),
      (this.kqe = () => {
        this.$8i.OnClickToggle(this.$8i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind(),
      this.GetExtendToggle(0).CanExecuteChange.Bind(this.pHe),
      this.GetExtendToggle(0).SetToggleState(0);
  }
  SetToggleActiveState(t) {
    this.GetExtendToggle(0).RootUIComp.SetUIActive(t);
  }
  Refresh(t, i, e) {
    (this.$8i = t),
      this.wke(),
      this.Oqe(),
      this.P5e(),
      this.Pqe(),
      this.gSn(),
      this.gFn();
  }
  gFn() {
    this.GetItem(5).SetUIActive(this.$8i.SelectedAtStart);
  }
  Oqe() {
    var t = this.$8i.Selected ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  wke() {
    this.GetItem(4).SetUIActive(!1);
  }
  P5e() {
    var t =
      ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(
        this.$8i.BuffId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Name);
  }
  Pqe() {
    var t =
        ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(
          this.$8i.BuffId,
        ),
      i = [];
    for (const s of t.DescriptionParam) {
      var e = RegExp(/\[(.*?)\]/g).exec(s);
      e && 1 < e.length && i.push(...e[1].split(","));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Description, ...i);
  }
  gSn() {
    var t =
      ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(
        this.$8i.BuffId,
      ).Texture;
    this.SetTextureByPath(t, this.GetTexture(1));
  }
}
//# sourceMappingURL=MowingTowerBuffView.js.map
