"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushBuffSelectView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
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
      (this.Jal = !1),
      (this.I2i = () => {
        return new BuffGridItem();
      }),
      (this.sOt = () => {
        var t,
          e = [];
        let i = 1;
        for (const h of this.hSn)
          h.Selected &&
            (((t = new BossRushModel_1.BossRushBuffInfo()).BuffId = h.BuffId),
            (t.ChangeAble = !0),
            (t.State = h.State),
            (t.Slot = i),
            i++,
            e.push(t));
        var s = this._Sn();
        if (s < this.aSn.GetBuffMaxCount())
          for (let t = s; t < this.aSn.GetBuffMaxCount(); t++) {
            var r =
                0 ===
                ModelManager_1.ModelManager.BossRushModel
                  .CurrentSelectBuffTabName
                  ? this.aSn.GetIndexPrepareSelectBuff(t)
                  : this.aSn.GetIndexPrepareSelectScoreBuff(t),
              o = new BossRushModel_1.BossRushBuffInfo();
            (o.BuffId = 0),
              (o.ChangeAble = r.ChangeAble),
              (o.State =
                0 === o.BuffId &&
                r.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffSelected
                  ? Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty
                  : r.State),
              (o.Slot = i),
              i++,
              e.push(o);
          }
        0 === ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName
          ? this.aSn.SetPrepareSelectBuff(e)
          : 1 ===
              ModelManager_1.ModelManager.BossRushModel
                .CurrentSelectBuffTabName &&
            this.aSn.SetPrepareSelectScoreBuff(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnChangeBossRushBuff,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RequestChangeBossRushView,
            "BossRushLevelDetailView",
          );
      }),
      (this.kqe = (t) => {
        if (this.Jal && !t.Selected) for (const e of this.hSn) e.Selected = !1;
        (t.Selected = !t.Selected), this.Esi(), this.Jbi();
      }),
      (this.uSn = (t) => {
        if (this.lSn) return !0;
        if (t.State !== Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked) {
          if (t.Selected) return !0;
          if (this.cSn()) return !0;
        }
        return !1;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.sOt]]);
  }
  OnStart() {
    (this.vVt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.I2i,
    )),
      this.GetItem(1).SetUIActive(!1),
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
          (0 ===
          ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName
            ? this.aSn
                .GetPrepareSelectBuff()
                .findIndex((t) => t.BuffId === e.BuffId)
            : this.aSn
                .GetPrepareSelectScoreBuff()
                .findIndex((t) => t.BuffId === e.BuffId))),
        (t.SelectedAtStart = t.Selected),
        (t.OnClickToggle = this.kqe),
        (t.CheckClickAble = this.uSn),
        this.hSn.push(t);
    }
    this.Esi(!0),
      this.Jbi(),
      (this.Jal = 1 === this.aSn.LevelInfo.GetMaxBuffCount());
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
      !!(this.Jal || this.aSn.LevelInfo.GetMaxBuffCount() > this._Sn()) ||
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
  Esi(t = !1) {
    if (this.vVt) {
      var e = [],
        i = ((this.lSn = !0), this.hSn.length);
      for (let t = 0; t < i; t++) {
        var s = new BuffGridItemData();
        (s.BuffScrollItemData1 = this.hSn[t]), e.push(s);
      }
      this.vVt.RefreshByData(
        e,
        !1,
        () => {
          this.lSn = !1;
        },
        t,
      ),
        this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(0 < e.length);
    }
  }
  OnBeforeHide() {
    this.vVt?.ClearGridProxies();
  }
  Jbi() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
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
      (this.State = Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty),
      (this.Selected = !1),
      (this.SelectedAtStart = !1),
      (this.OnClickToggle = () => {}),
      (this.CheckClickAble = void 0);
  }
}
class BuffGridItemData {
  constructor() {
    this.BuffScrollItemData1 = void 0;
  }
}
class BuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.pHe = () => {
        if (!this.$8i) return !1;
        if (
          this.$8i.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked &&
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
    (this.$8i = t.BuffScrollItemData1),
      t.BuffScrollItemData1.State !==
        Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive &&
        ((t = t.BuffScrollItemData1?.Selected ? 1 : 0),
        this.GetExtendToggle(0).SetToggleState(t),
        this.P5e(),
        this.Pqe(),
        this.gSn(),
        this.gFn());
  }
  gFn() {
    this.GetItem(4).SetUIActive(this.$8i.SelectedAtStart);
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
