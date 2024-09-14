"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushBuffSelectView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  BossRushModel_1 = require("./BossRushModel");
class BossRushBuffSelectView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.aSn = void 0),
      (this.hSn = void 0),
      (this.vVt = void 0),
      (this.lSn = !0),
      (this.SPe = void 0),
      (this.I2i = () => {
        return new BuffGridItem();
      }),
      (this.sOt = () => {
        var t,
          e = [];
        let i = 1;
        for (const o of this.hSn)
          o.Selected &&
            (((t = new BossRushModel_1.BossRushBuffInfo()).BuffId = o.BuffId),
            (t.ChangeAble = !0),
            (t.State = o.State),
            (t.Slot = i),
            i++,
            e.push(t));
        var s = this._Sn();
        if (s < this.aSn.GetBuffMaxCount())
          for (let t = s; t < this.aSn.GetBuffMaxCount(); t++) {
            var r = this.aSn.GetIndexPrepareSelectBuff(t),
              h = new BossRushModel_1.BossRushBuffInfo();
            (h.BuffId = 0),
              (h.ChangeAble = r.ChangeAble),
              (h.State =
                0 === h.BuffId &&
                r.State === Protocol_1.Aki.Protocol.Iks.Proto_Selected
                  ? Protocol_1.Aki.Protocol.Iks.Proto_Empty
                  : r.State),
              (h.Slot = i),
              i++,
              e.push(h);
          }
        this.aSn.SetPrepareSelectBuff(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnChangeBossRushBuff,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RequestChangeBossRushView,
            "BossRushLevelDetailView",
          );
      }),
      (this.kqe = (t) => {
        (t.Selected = !t.Selected), this.Esi(), this.Jbi();
      }),
      (this.uSn = (t) => {
        if (this.lSn) return !0;
        if (t.State !== Protocol_1.Aki.Protocol.Iks.pBs) {
          if (t.Selected) return !0;
          if (this.cSn()) return !0;
        }
        return !1;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.sOt]]);
  }
  OnStart() {
    (this.vVt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(3).GetOwner(),
      this.I2i,
    )),
      this.GetItem(3).SetUIActive(!1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBossRushBuffViewOpened,
      );
  }
  OnBeforeShow() {
    this.ROn(),
      (this.aSn = ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo),
      (this.hSn = []);
    for (const e of this.aSn.GetOptionBuff()) {
      var t = new BuffScrollItemData();
      (t.BuffId = e.BuffId),
        (t.State = e.State),
        (t.Selected =
          -1 !==
          this.aSn
            .GetPrepareSelectBuff()
            .findIndex((t) => t.BuffId === e.BuffId)),
        (t.SelectedAtStart = t.Selected),
        (t.OnClickToggle = this.kqe),
        (t.CheckClickAble = this.uSn),
        this.hSn.push(t);
    }
    this.Esi(), this.Jbi();
  }
  ROn() {
    let t = "Start";
    ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation &&
      (t = "ShowView"),
      this.SPe?.PlaySequencePurely(t),
      (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !1);
  }
  cSn() {
    return (
      !!this.lSn ||
      this.aSn.LevelInfo.GetMaxBuffCount() > this._Sn() ||
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "BossRushMaxBuffText",
      ),
      !1)
    );
  }
  _Sn() {
    let t = 0;
    for (const e of this.hSn) e.Selected && t++;
    return t;
  }
  Esi() {
    if (this.vVt) {
      var e = [];
      this.lSn = !0;
      for (let t = 0; t < this.hSn.length; t += 2) {
        var i = new BuffGridItemData();
        if (((i.BuffScrollItemData1 = this.hSn[t]), t + 1 >= this.hSn.length)) {
          e.push(i);
          break;
        }
        (i.BuffScrollItemData2 = this.hSn[t + 1]), e.push(i);
      }
      this.vVt.RefreshByData(e, !1, () => {
        this.lSn = !1;
      }),
        this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(0 < e.length);
    }
  }
  OnBeforeHide() {
    this.vVt?.ClearGridProxies();
  }
  Jbi() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "BossRushSelectBuffText",
      this._Sn().toString(),
      this.aSn.LevelInfo.GetMaxBuffCount().toString(),
    );
  }
}
exports.BossRushBuffSelectView = BossRushBuffSelectView;
class BuffScrollItemData {
  constructor() {
    (this.BuffId = 0),
      (this.ChangeAble = !0),
      (this.State = Protocol_1.Aki.Protocol.Iks.Proto_Empty),
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
  Refresh(t, e, i) {
    this.CSn(t, e, i);
  }
  async CSn(t, e, i) {
    await this.uat?.Promise,
      this.mSn.Refresh(t.BuffScrollItemData1, e, i),
      this.GetItem(0).SetAlpha(1),
      this.mSn.SetToggleActiveState(!0),
      t.BuffScrollItemData2
        ? (this.GetItem(1).SetAlpha(1),
          this.dSn.SetToggleActiveState(!0),
          this.dSn.Refresh(t.BuffScrollItemData2, e, i))
        : (this.GetItem(1).SetAlpha(0),
          this.GetItem(1).SetRaycastTarget(!1),
          this.dSn.SetToggleActiveState(!1));
  }
}
class BuffScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.pHe = () => {
        if (!this.$8i) return !1;
        if (
          this.$8i.State === Protocol_1.Aki.Protocol.Iks.pBs &&
          0 === this.GetExtendToggle(0).GetToggleState()
        )
          return !0;
        return this.$8i.CheckClickAble(this.$8i);
      }),
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
  Refresh(t, e, i) {
    (this.$8i = t).State !== Protocol_1.Aki.Protocol.Iks.Proto_Inactive &&
      (this.wke(), this.Oqe(), this.P5e(), this.Pqe(), this.gSn(), this.gFn());
  }
  gFn() {
    this.GetItem(5).SetUIActive(this.$8i.SelectedAtStart);
  }
  Oqe() {
    var t = this.$8i.Selected ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  wke() {
    this.GetItem(4).SetUIActive(
      this.$8i.State === Protocol_1.Aki.Protocol.Iks.pBs,
    );
  }
  P5e() {
    var t =
      ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
        this.$8i.BuffId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Name);
  }
  Pqe() {
    var t =
        ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
          this.$8i.BuffId,
        ),
      e = [];
    for (const s of t.DescriptionParam) {
      var i = RegExp(/\[(.*?)\]/g).exec(s);
      i && 1 < i.length && e.push(...i[1].split(","));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Description, ...e);
  }
  gSn() {
    var t =
      ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
        this.$8i.BuffId,
      ).Texture;
    this.SetTextureByPath(t, this.GetTexture(1));
  }
}
//# sourceMappingURL=BossRushBuffSelectView.js.map
