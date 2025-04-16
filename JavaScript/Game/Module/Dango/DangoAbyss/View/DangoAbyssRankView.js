"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssRankView = exports.DangoAbyssRankData = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DangoAbyssRankItem_1 = require("./DangoAbyssRankItem"),
  CD = 1e3;
class DangoAbyssRankData {
  constructor() {
    (this.OpenChallengeId = 0), (this.DangoAbyssData = []);
  }
}
exports.DangoAbyssRankData = DangoAbyssRankData;
class DangoAbyssRankView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TDc = void 0),
      (this.bDc = void 0),
      (this.bj_ = 0),
      (this.LDc = 0),
      (this.wDc = 0),
      (this.Yyc = void 0),
      (this.zyc = void 0),
      (this.rt1 = 0),
      (this.f4_ = void 0),
      (this.g4_ = void 0),
      (this.A5e = () => (
        Date.now() - this.rt1 < CD || ((this.rt1 = Date.now()), this.ot1()), !1
      )),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.Jyc = () => {
        return new DangoAbyssRankItem_1.DangoAbyssRankItem(!1);
      }),
      (this.RDc = (t) => {
        (this.bj_ = 0), this.ADc(), this.rSc(!1);
      }),
      (this.PDc = (t) => {
        (this.bj_ = 1), this.ADc(), this.rSc(1 === this.bj_);
      }),
      (this.xDc = () => {
        (this.LDc = Math.max(this.LDc - 1, 0)),
          this.Svt(),
          this.Olt(),
          this.rSc(1 === this.bj_, () => {
            this.g4_?.Play();
          }),
          this.oSc();
      }),
      (this.DDc = () => {
        (this.LDc = Math.min(this.LDc + 1, this.wDc)),
          this.Svt(),
          this.Olt(),
          this.rSc(1 === this.bj_, () => {
            this.f4_?.Play();
          }),
          this.oSc();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
      [2, UE.UIText],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIExtendToggle],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.RDc],
        [1, this.PDc],
        [5, this.xDc],
        [6, this.DDc],
        [7, this.AMo],
      ]);
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    var t =
        ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData()
          ?.Id ?? 0,
      s =
        (0 < t &&
          (await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestAbyssRankList(
            t,
          ),
          await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestAbyssSelfRank(
            t,
          )),
        await this.Zyc(),
        this.tSc(),
        this.GetExtendToggle(9)?.CanExecuteChange.Bind(this.A5e),
        this.GetItem(10)
          ?.GetOwner()
          ?.K2_GetComponentsByClass(UE.UIInturnAnimController.StaticClass()));
    if (s)
      for (let t = 0; t < s.Num(); t++) {
        var i = s.Get(t);
        "PreRight" === i.AnimName &&
          ((this.f4_ = i), (this.f4_.PlayFromIndex = 1)),
          "PreLeft" === i.AnimName &&
            ((this.g4_ = i), (this.g4_.PlayFromIndex = 1));
      }
  }
  async ot1() {
    var t = this.TDc.DangoAbyssData[this.LDc].GetConfig().Id,
      s =
        ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeAnonymousNameState(
          t,
        );
    (await ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestSetAbyssShowName(
      t,
      !s,
    )) && (this.oSc(), this.rSc(1 === this.bj_));
  }
  async Zyc() {
    (this.zyc = new DangoAbyssRankItem_1.DangoAbyssRankItem(!0)),
      await this.zyc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  tSc() {
    this.Yyc = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(3),
      this.GetItem(4).GetOwner(),
      this.Jyc,
    );
  }
  ADc() {
    var t = 0 === this.bj_ ? 1 : 0,
      t = (this.GetExtendToggle(0)?.SetToggleState(t), 1 === this.bj_ ? 1 : 0);
    this.GetExtendToggle(1)?.SetToggleState(t);
  }
  Svt() {
    var t = 0 < this.LDc,
      t = (this.GetButton(5)?.RootUIComp.SetUIActive(t), this.LDc < this.wDc);
    this.GetButton(6)?.RootUIComp.SetUIActive(t);
  }
  OnBeforeShow() {
    (this.TDc = this.OpenParam),
      (this.bDc =
        ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeRankInfo()),
      (this.wDc = this.TDc.DangoAbyssData.length - 1);
    var s = this.TDc.DangoAbyssData.length;
    for (let t = 0; t < s; t++)
      if (
        this.TDc.DangoAbyssData[t].GetConfig()?.Id === this.TDc.OpenChallengeId
      ) {
        this.LDc = t;
        break;
      }
    this.UDc(), this.rSc(1 === this.bj_), this.Olt(), this.Svt(), this.oSc();
  }
  oSc() {
    var t = this.GetExtendToggle(9),
      s = this.TDc.DangoAbyssData[this.LDc].GetConfig().Id,
      s =
        ModelManager_1.ModelManager.DangoAbyssModel.GetChallengeAnonymousNameState(
          s,
        );
    t.SetToggleStateForce(s ? 0 : 1);
  }
  UDc() {
    var t = this.TDc.DangoAbyssData[this.LDc].GetConfig().Id,
      t =
        (this.bDc?.RefreshAllPassDataRank(t), this.bDc.IsOwnSingleBestScore(t));
    (this.bj_ = t ? 0 : 1), this.ADc();
  }
  Olt() {
    var t = this.TDc.DangoAbyssData[this.LDc].GetConfig().Difficulty;
    this.GetText(2).SetText(t.toString());
  }
  async rSc(t, s = void 0) {
    var i = this.TDc.DangoAbyssData[this.LDc].GetConfig().Id,
      i =
        (this.bDc?.RefreshAllPassDataRank(i),
        this.bDc.GetRankDataListByOnlineType(t)),
      e = 0 < i.length;
    if ((this.Yyc.SetTargetRootComponentActive(e), 0 < i.length)) {
      var h = new Array();
      for (const r of i) {
        const a = new DangoAbyssRankItem_1.DangoRankItemData();
        (a.AbyssChallengeInfo = r), h.push(a);
      }
      await this.Yyc.RefreshByDataAsync(h), s?.();
    }
    e = this.bDc.GetSelfRankDataByTabType(t);
    const a = new DangoAbyssRankItem_1.DangoRankItemData();
    (a.AbyssChallengeInfo = e), this.zyc.Refresh(a, !1, 0, !1);
  }
}
exports.DangoAbyssRankView = DangoAbyssRankView;
//# sourceMappingURL=DangoAbyssRankView.js.map
