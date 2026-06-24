(() => {
  "use strict";

  /* ========================================================
     固定ラベル
     ======================================================== */
  const TYPE_LABELS = {
    GEAR: "装備",
    MATERIAL: "素材",
  };

  const CLASS_LABELS = {
    All: "全クラス",
    Knight: "ナイト",
    Ranger: "レンジャー",
    Sorcerer: "ソーサラー",
    Priest: "プリースト",
    Hunter: "ハンター",
    Slayer: "スレイヤー",
  };

  const PART_LABELS = {
    MAIN_WEAPON: "メイン武器",
    SUB_WEAPON: "サブ武器",
    HELMET: "ヘルメット",
    ARMOR: "アーマー",
    GLOVES: "グローブ",
    BOOTS: "ブーツ",
    AMULET: "アミュレット",
    EARING: "イヤリング",
    RING: "リング",
    BRACER: "ブレイサー",
  };

  const GEAR_GROUP_LABELS = {
    WEAPON: "武器",
    ARMOR: "防具",
    ACCESSORY: "アクセサリー",
    COMMON: "共通",
  };

  const MATERIAL_CATEGORY_LABELS = {
    decoration: "装飾",
    engraving: "彫刻",
    inscription: "碑文",
    material: "素材",
  };

  const MATERIAL_TYPE_LABELS = {
    DECORATION: "装飾",
    ENGRAVING: "彫刻",
    INSCRIPTION: "碑文",
    CRAFTING: "クラフト素材",
    OFFERING: "奉納素材",
    SOULSTONE: "ソウルストーン",
  };

  const MOD_LABELS = {
    FLAT: "固定値",
    ADDITIVE: "加算倍率",
    MULTIPLICATIVE: "乗算倍率",
  };

  const STAT_LABELS = {
    AddAllSkillLevel: "全スキルレベル",
    AddHpPerHit: "命中時HP回復",
    AddHpPerKill: "撃破時HP回復",
    AllElementalResistance: "全属性耐性",
    AreaOfEffect: "効果範囲",
    Armor: "防御力",
    AttackDamage: "攻撃力",
    AttackSpeed: "攻撃速度",
    BaseAttackCountReduction: "基本攻撃回数減少",
    BlockChance: "ブロック率",
    CastSpeed: "詠唱速度",
    ChaosDamagePercent: "混沌ダメージ",
    ChaosResistance: "混沌耐性",
    ColdDamagePercent: "冷気ダメージ",
    ColdResistance: "冷気耐性",
    CooldownReduction: "クールタイム短縮",
    CriticalChance: "クリティカル率",
    CriticalDamage: "クリティカルダメージ",
    DamageAbsorption: "ダメージ吸収",
    DamageReduction: "ダメージ軽減",
    DodgeChance: "回避率",
    FireDamagePercent: "火炎ダメージ",
    FireResistance: "火炎耐性",
    HpLeech: "HP吸収",
    HpRegenPerSec: "毎秒HP回復",
    IncreaseAreaOfEffectDamage: "範囲攻撃ダメージ",
    IncreaseExpAmount: "経験値獲得量増加",
    IncreaseProjectileDamage: "投射物ダメージ増加",
    IncreaseSummonDamage: "召喚ダメージ増加",
    LightningDamagePercent: "雷ダメージ",
    LightningResistance: "雷耐性",
    MaxHp: "最大HP",
    MovementSpeed: "移動速度",
    Multistrike: "マルチストライク",
    PhysicalDamagePercent: "物理ダメージ",
    PhysicalResistance: "物理耐性",
    ProjectileCount: "投射物数",
    SkillDurationIncrease: "スキル持続時間増加",
    SkillHealIncrease: "スキル回復量増加",
    SkillRangeExpansion: "スキル射程拡張",
  };

  const UNIQUE_MOD_LABELS = {
    ArrowRainCriticalCooldown: "アローレイン：クリティカル時クールダウン",
    AxeSpinBleedingChance: "アックススピン：出血確率",
    ChargeTrapExplosiveCooldown: "チャージトラップ：爆発クールダウン",
    CrossbowTurretAddAmount: "クロスボウタレット：設置数増加",
    CrossbowTurretCooldown: "クロスボウタレット：クールダウン",
    ExplosiveBoltHalf: "エクスプローシブボルト：効果半減",
    FlameHydraBerserk: "フレイムヒドラ：バーサーク",
    IceOrbFreezeToCold: "アイスオーブ：凍結を冷気へ変換",
    ShieldChargeKillCooldown: "シールドチャージ：撃破時クールダウン",
    SkillBaseAttackCountReduce: "スキル：基本攻撃回数減少",
    SkillCooldownReduce: "スキル：クールダウン短縮",
    SkillElementChange: "スキル：属性変更",
    SkillMultiStrikeCountUp: "スキル：マルチストライク回数増加",
    SkillProjectileCountUp: "スキル：投射物数増加",
    SkewerShotBleedingStrike: "スキュアショット：出血攻撃",
    SlayerLowHpAttackSpeed: "スレイヤー：低HP時攻撃速度増加",
    SnowstormEnhanceFrozenEnemy: "スノーストーム：凍結中の敵を強化",
    SorcererLightningShock: "ソーサラー：雷ショック",
    WaveMoveFastestPartyMember: "ウェーブ：最速の仲間へ移動",
    WaveMoveSlowestPartyExcludeSelf: "ウェーブ：最遅の仲間へ移動",
    WhirlwindFireIgnite: "ワールウィンド：火炎・炎上",
    WrathOfHeavenHeal: "天の怒り：回復",
  };

  const SLOT_LABELS = {
    decoration: "装飾",
    engraving: "彫刻",
    inscription: "碑文",
  };

  const EMPTY_LABEL = "—";
  const NO_UNIQUE_MOD = "0";
  const DEFAULT_PAGE_SIZE = 50;
  const MAX_STAT_FILTERS = 5;

  const GEAR_SORT_OPTIONS = [
    ["grade", "レアリティ"],
    ["level", "レベル"],
    ["name", "日本語名"],
    ["key", "アイテムID"],
    ["gold", "ゴールド"],
    ["stat", "指定能力値"],
  ];

  const MATERIAL_GENERIC_SORT_OPTIONS = [
    ["grade", "レアリティ"],
    ["name", "日本語名"],
    ["key", "アイテムID"],
    ["gold", "ゴールド"],
    ["material-type", "素材種別"],
  ];

  const MATERIAL_EFFECT_SORT_OPTIONS = [
    ...MATERIAL_GENERIC_SORT_OPTIONS,
    ["target", "対象装備分類"],
    ["material-stat", "素材能力"],
    ["tier", "Tier"],
    ["min-value", "最小値"],
    ["max-value", "最大値"],
    ["interval", "刻み"],
  ];

  /* ========================================================
     データと状態
     ======================================================== */
  const data = window.TBH_DATA;
  const items = Array.isArray(data?.items) ? data.items : [];
  const gearItems = items.filter((item) => item.type === "GEAR");
  const materialItems = items.filter((item) => item.type === "MATERIAL");
  const meta = data?.meta ?? {};
  const ja = data?.ja ?? {};
  const itemNamesJa = ja.item ?? {};
  const gradeLabels = ja.grade ?? {};
  const gearTypeLabels = ja.gearType ?? {};

  const state = {
    results: [],
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    statFilterSerial: 0,
    oneScreenResizeFrame: null,
  };

  /* ========================================================
     DOM参照
     ======================================================== */
  const dom = {
    summaryCards: document.querySelector("#summary-cards"),
    filterContent: document.querySelector("#filter-content"),
    toggleFilterButton: document.querySelector("#toggle-filter-button"),
    keyword: document.querySelector("#keyword"),
    itemKey: document.querySelector("#item-key"),
    itemType: document.querySelector("#item-type"),
    materialCategory: document.querySelector("#material-category"),
    materialCategoryField: document.querySelector("#material-category-field"),
    itemClass: document.querySelector("#item-class"),
    parts: document.querySelector("#parts"),
    gearType: document.querySelector("#gear-type"),
    gearGroup: document.querySelector("#gear-group"),
    variant: document.querySelector("#variant"),
    materialTargetGroup: document.querySelector("#material-target-group"),
    materialStat: document.querySelector("#material-stat"),
    materialMod: document.querySelector("#material-mod"),
    materialTierMin: document.querySelector("#material-tier-min"),
    materialTierMax: document.querySelector("#material-tier-max"),
    materialValueMin: document.querySelector("#material-value-min"),
    materialValueMax: document.querySelector("#material-value-max"),
    materialTypeDetail: document.querySelector("#material-type-detail"),
    obtainable: document.querySelector("#obtainable"),
    tradable: document.querySelector("#tradable"),
    levelMin: document.querySelector("#level-min"),
    levelMax: document.querySelector("#level-max"),
    goldMin: document.querySelector("#gold-min"),
    goldMax: document.querySelector("#gold-max"),
    decorationMin: document.querySelector("#decoration-min"),
    engravingMin: document.querySelector("#engraving-min"),
    inscriptionMin: document.querySelector("#inscription-min"),
    uniqueMod: document.querySelector("#unique-mod"),
    gradeFilters: document.querySelector("#grade-filters"),
    includeAllClass: document.querySelector("#include-all-class"),
    statMatchMode: document.querySelector("#stat-match-mode"),
    statFilterList: document.querySelector("#stat-filter-list"),
    statFilterTemplate: document.querySelector("#stat-filter-template"),
    addStatFilterButton: document.querySelector("#add-stat-filter-button"),
    resetButton: document.querySelector("#reset-button"),
    exportButton: document.querySelector("#export-button"),
    oneScreenModeButton: document.querySelector("#one-screen-mode-button"),
    oneScreenDialog: document.querySelector("#one-screen-dialog"),
    oneScreenMeta: document.querySelector("#one-screen-meta"),
    oneScreenViewport: document.querySelector("#one-screen-viewport"),
    oneScreenSheet: document.querySelector("#one-screen-sheet"),
    closeOneScreenButton: document.querySelector("#close-one-screen-button"),
    sortKey: document.querySelector("#sort-key"),
    statSortControls: document.querySelector("#stat-sort-controls"),
    sortStatSource: document.querySelector("#sort-stat-source"),
    sortStat: document.querySelector("#sort-stat"),
    sortStatMod: document.querySelector("#sort-stat-mod"),
    sortDirection: document.querySelector("#sort-direction"),
    pageSize: document.querySelector("#page-size"),
    resultTable: document.querySelector("#result-table"),
    resultHead: document.querySelector("#result-head"),
    resultCount: document.querySelector("#result-count"),
    resultNote: document.querySelector("#result-note"),
    resultBody: document.querySelector("#result-body"),
    previousPageButton: document.querySelector("#previous-page-button"),
    nextPageButton: document.querySelector("#next-page-button"),
    pageStatus: document.querySelector("#page-status"),
    detailDialog: document.querySelector("#detail-dialog"),
    detailTitle: document.querySelector("#detail-title"),
    detailContent: document.querySelector("#detail-content"),
    closeDialogButton: document.querySelector("#close-dialog-button"),
  };

  /* ========================================================
     汎用関数
     ======================================================== */
  function normalizeText(value) {
    return String(value ?? "").normalize("NFKC").trim().toLocaleLowerCase("ja");
  }

  function escapeHtml(value) {
    const text = String(value ?? "");
    return text.replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return entities[character];
    });
  }

  function formatNumber(value) {
    const hasValue = value !== null && value !== undefined && value !== "";
    return hasValue ? Number(value).toLocaleString("ja-JP") : EMPTY_LABEL;
  }

  function parseOptionalNumber(value) {
    const normalizedValue = String(value ?? "").trim();
    if (!normalizedValue) {
      return null;
    }

    const parsedValue = Number(normalizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  function getJapaneseName(item) {
    return itemNamesJa[String(item.key)] ?? item.name ?? `Item ${item.key}`;
  }

  function getGradeLabel(grade) {
    return gradeLabels[grade] ?? grade ?? EMPTY_LABEL;
  }

  function getClassLabel(itemClass) {
    return CLASS_LABELS[itemClass] ?? itemClass ?? EMPTY_LABEL;
  }

  function getPartLabel(parts) {
    return PART_LABELS[parts] ?? parts ?? EMPTY_LABEL;
  }

  function getGearTypeLabel(gearType) {
    return gearTypeLabels[gearType] ?? gearType ?? EMPTY_LABEL;
  }

  function getGearGroupLabel(gearGroup) {
    return GEAR_GROUP_LABELS[gearGroup] ?? gearGroup ?? EMPTY_LABEL;
  }

  function getMaterialCategoryLabel(category) {
    return MATERIAL_CATEGORY_LABELS[category] ?? category ?? EMPTY_LABEL;
  }

  function getMaterialTypeLabel(materialType) {
    return MATERIAL_TYPE_LABELS[materialType] ?? materialType ?? EMPTY_LABEL;
  }

  function getStatLabel(stat) {
    return STAT_LABELS[stat] ?? ja.stat?.[stat] ?? stat ?? EMPTY_LABEL;
  }

  function getUniqueModLabel(uniqueMod) {
    const hasUniqueMod = !!uniqueMod && uniqueMod !== NO_UNIQUE_MOD;
    return hasUniqueMod
      ? UNIQUE_MOD_LABELS[uniqueMod] ?? uniqueMod
      : EMPTY_LABEL;
  }

  function getAllStats(item) {
    if (!item.stats) {
      return [];
    }

    const result = [];
    for (const stat of item.stats.base ?? []) {
      result.push({ ...stat, source: "base" });
    }
    for (const stat of item.stats.inherent ?? []) {
      result.push({ ...stat, source: "inherent" });
    }
    return result;
  }

  function createOption(value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
  }

  function fillSelect(select, values, labelGetter, allLabel = "すべて") {
    select.replaceChildren();
    if (allLabel !== null) {
      select.append(createOption("", allLabel));
    }
    for (const value of values) {
      select.append(createOption(value, labelGetter(value)));
    }
  }

  function setHidden(elements, hidden) {
    for (const element of elements) {
      element.hidden = hidden;
    }
  }

  function isGearMode() {
    return dom.itemType.value === "GEAR";
  }

  function isGenericMaterialMode() {
    return !isGearMode() && dom.materialCategory.value === "material";
  }

  function compareOptionalNumbers(leftValue, rightValue, directionFactor) {
    const hasLeftValue = leftValue !== null && leftValue !== undefined;
    const hasRightValue = rightValue !== null && rightValue !== undefined;
    if (!hasLeftValue && !hasRightValue) {
      return 0;
    }
    if (!hasLeftValue) {
      return 1;
    }
    if (!hasRightValue) {
      return -1;
    }
    return (Number(leftValue) - Number(rightValue)) * directionFactor;
  }

  function matchesRange(actualValue, minimum, maximum) {
    if (minimum === null && maximum === null) {
      return true;
    }
    if (actualValue === null || actualValue === undefined) {
      return false;
    }
    return (minimum === null || actualValue >= minimum)
      && (maximum === null || actualValue <= maximum);
  }

  function matchesBooleanFilter(actualValue, filterValue) {
    if (!filterValue) {
      return true;
    }
    return actualValue === (filterValue === "true");
  }

  /* ========================================================
     素材データを表示行へ展開します。
     装飾・彫刻・碑文は効果のTier行ごとに1行にするため、
     MaterialInfoData / StatModGroupInfoData / StatModInfoDataの
     全パラメータを列として欠落なく表示できます。
     ======================================================== */
  function buildMaterialRows(category) {
    const rows = [];
    for (const item of materialItems) {
      const info = item.materialInfo;
      if (!info || info.category !== category) {
        continue;
      }

      if (!info.effects?.length) {
        rows.push({
          kind: "material",
          item,
          effect: null,
          tier: null,
          rowKey: `${item.key}-base`,
        });
        continue;
      }

      for (const [effectIndex, effect] of info.effects.entries()) {
        if (!effect.tiers?.length) {
          rows.push({
            kind: "material",
            item,
            effect,
            tier: null,
            rowKey: `${item.key}-${effectIndex}-base`,
          });
          continue;
        }

        for (const tier of effect.tiers) {
          rows.push({
            kind: "material",
            item,
            effect,
            tier,
            rowKey: `${item.key}-${effectIndex}-${tier.tier}`,
          });
        }
      }
    }
    return rows;
  }

  function buildGearResults() {
    return gearItems.map((item) => ({
      kind: "gear",
      item,
      rowKey: String(item.key),
    }));
  }

  /* ========================================================
     初期UI
     ======================================================== */
  function renderSummaryCards() {
    const materialCounts = new Map();
    for (const item of materialItems) {
      const category = item.materialInfo?.category ?? "unknown";
      materialCounts.set(category, (materialCounts.get(category) ?? 0) + 1);
    }

    const cards = [
      ["装備", gearItems.length],
      ["装飾", materialCounts.get("decoration") ?? 0],
      ["彫刻 / 碑文", `${materialCounts.get("engraving") ?? 0} / ${materialCounts.get("inscription") ?? 0}`],
      ["その他素材", materialCounts.get("material") ?? 0],
    ];

    dom.summaryCards.innerHTML = cards.map(([label, value]) => `
      <article class="summary-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(typeof value === "number" ? formatNumber(value) : value)}</strong>
      </article>
    `).join("");
  }

  function renderBasicFilterOptions() {
    fillSelect(dom.itemClass, ["All", ...(meta.classes ?? [])], getClassLabel);
    fillSelect(dom.parts, meta.parts ?? [], getPartLabel);
    fillSelect(dom.gearType, meta.gearTypes ?? [], getGearTypeLabel);
    fillSelect(dom.gearGroup, ["WEAPON", "ARMOR", "ACCESSORY"], getGearGroupLabel);
    fillSelect(dom.materialTargetGroup, ["WEAPON", "ARMOR", "ACCESSORY", "COMMON"], getGearGroupLabel);
    fillSelect(dom.materialMod, ["FLAT", "ADDITIVE", "MULTIPLICATIVE"], (value) => MOD_LABELS[value] ?? value);
    fillSelect(dom.materialTypeDetail, ["CRAFTING", "OFFERING", "SOULSTONE"], getMaterialTypeLabel);

    const uniqueMods = Array.from(new Set(
      gearItems
        .map((item) => item.uniqueMod)
        .filter((value) => !!value && value !== NO_UNIQUE_MOD),
    )).sort((left, right) => getUniqueModLabel(left).localeCompare(getUniqueModLabel(right), "ja"));

    dom.uniqueMod.replaceChildren();
    dom.uniqueMod.append(createOption("", "すべて"));
    dom.uniqueMod.append(createOption("__has__", "ユニーク効果あり"));
    dom.uniqueMod.append(createOption("__none__", "ユニーク効果なし"));
    for (const uniqueMod of uniqueMods) {
      dom.uniqueMod.append(createOption(uniqueMod, getUniqueModLabel(uniqueMod)));
    }

    renderMaterialStatOptions();
    renderGearSortStatOptions();
  }

  function getAllGearStatCounts() {
    const counts = new Map();
    for (const item of gearItems) {
      for (const stat of getAllStats(item)) {
        counts.set(stat.stat, (counts.get(stat.stat) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries()).sort((left, right) => {
      return getStatLabel(left[0]).localeCompare(getStatLabel(right[0]), "ja");
    });
  }

  function renderGearSortStatOptions() {
    const previousValue = dom.sortStat.value;
    dom.sortStat.replaceChildren(createOption("", "能力を選択"));
    for (const [stat, count] of getAllGearStatCounts()) {
      dom.sortStat.append(createOption(stat, `${getStatLabel(stat)} (${count})`));
    }
    if (Array.from(dom.sortStat.options).some((option) => option.value === previousValue)) {
      dom.sortStat.value = previousValue;
    }
  }

  function renderMaterialStatOptions(rows = buildMaterialRows(dom.materialCategory.value)) {
    const previousValue = dom.materialStat.value;
    const counts = new Map();
    for (const row of rows) {
      const stat = row.tier?.stat;
      if (stat) {
        counts.set(stat, (counts.get(stat) ?? 0) + 1);
      }
    }

    dom.materialStat.replaceChildren(createOption("", "すべて"));
    const entries = Array.from(counts.entries()).sort((left, right) => {
      return getStatLabel(left[0]).localeCompare(getStatLabel(right[0]), "ja");
    });
    for (const [stat, count] of entries) {
      dom.materialStat.append(createOption(stat, `${getStatLabel(stat)} (${count})`));
    }
    if (Array.from(dom.materialStat.options).some((option) => option.value === previousValue)) {
      dom.materialStat.value = previousValue;
    }
  }

  function renderGradeFilters() {
    const grades = meta.grades ?? Array.from(new Set(items.map((item) => item.grade)));
    dom.gradeFilters.replaceChildren();
    for (const grade of grades) {
      const label = document.createElement("label");
      label.className = "chip";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = grade;
      const text = document.createElement("span");
      text.textContent = getGradeLabel(grade);
      label.append(checkbox, text);
      dom.gradeFilters.append(label);
    }
  }

  function renderSortOptions() {
    const previousValue = dom.sortKey.value;
    const options = isGearMode()
      ? GEAR_SORT_OPTIONS
      : isGenericMaterialMode()
        ? MATERIAL_GENERIC_SORT_OPTIONS
        : MATERIAL_EFFECT_SORT_OPTIONS;
    dom.sortKey.replaceChildren();
    for (const [value, label] of options) {
      dom.sortKey.append(createOption(value, label));
    }
    const canRestore = options.some(([value]) => value === previousValue);
    dom.sortKey.value = canRestore ? previousValue : "grade";
    updateStatSortControls();
  }

  function updateModeVisibility() {
    const gearMode = isGearMode();
    const genericMaterialMode = isGenericMaterialMode();
    setHidden(document.querySelectorAll(".gear-only"), !gearMode);
    setHidden(document.querySelectorAll(".material-only"), gearMode);
    setHidden(document.querySelectorAll(".material-effect-only"), gearMode || genericMaterialMode);
    setHidden(document.querySelectorAll(".material-generic-only"), gearMode || !genericMaterialMode);
    dom.materialCategoryField.hidden = gearMode;
    renderSortOptions();
    renderMaterialStatOptions();
  }

  function updateStatSortControls() {
    const enabled = isGearMode() && dom.sortKey.value === "stat";
    dom.statSortControls.hidden = !enabled;
    for (const select of [dom.sortStatSource, dom.sortStat, dom.sortStatMod]) {
      select.disabled = !enabled;
    }
  }

  /* ========================================================
     装備能力条件
     ======================================================== */
  function updateStatFilterRow(row) {
    const statSelect = row.querySelector('[data-field="stat"]');
    const previousValue = statSelect.value;
    statSelect.replaceChildren(createOption("", "能力を選択"));
    for (const [stat, count] of getAllGearStatCounts()) {
      statSelect.append(createOption(stat, `${getStatLabel(stat)} (${count})`));
    }
    if (Array.from(statSelect.options).some((option) => option.value === previousValue)) {
      statSelect.value = previousValue;
    }
  }

  function addStatFilter() {
    const currentCount = dom.statFilterList.querySelectorAll(".stat-filter-row").length;
    if (currentCount >= MAX_STAT_FILTERS) {
      return;
    }
    state.statFilterSerial += 1;
    const fragment = dom.statFilterTemplate.content.cloneNode(true);
    const row = fragment.querySelector(".stat-filter-row");
    row.dataset.filterId = String(state.statFilterSerial);
    updateStatFilterRow(row);
    dom.statFilterList.append(fragment);
    updateAddStatFilterButton();
  }

  function updateAddStatFilterButton() {
    const count = dom.statFilterList.querySelectorAll(".stat-filter-row").length;
    dom.addStatFilterButton.disabled = count >= MAX_STAT_FILTERS;
  }

  function getStatFilters() {
    const filters = [];
    for (const row of dom.statFilterList.querySelectorAll(".stat-filter-row")) {
      const stat = row.querySelector('[data-field="stat"]').value;
      if (!stat) {
        continue;
      }
      filters.push({
        source: row.querySelector('[data-field="source"]').value,
        stat,
        mod: row.querySelector('[data-field="mod"]').value,
        min: parseOptionalNumber(row.querySelector('[data-field="min"]').value),
        max: parseOptionalNumber(row.querySelector('[data-field="max"]').value),
      });
    }
    return filters;
  }

  function getSelectedGrades() {
    return new Set(Array.from(dom.gradeFilters.querySelectorAll("input:checked"))
      .map((input) => input.value));
  }

  function getFilters() {
    return {
      keyword: normalizeText(dom.keyword.value),
      itemKey: normalizeText(dom.itemKey.value),
      grades: getSelectedGrades(),
      obtainable: dom.obtainable.value,
      tradable: dom.tradable.value,
      goldMin: parseOptionalNumber(dom.goldMin.value),
      goldMax: parseOptionalNumber(dom.goldMax.value),

      itemClass: dom.itemClass.value,
      parts: dom.parts.value,
      gearType: dom.gearType.value,
      gearGroup: dom.gearGroup.value,
      variant: dom.variant.value,
      levelMin: parseOptionalNumber(dom.levelMin.value),
      levelMax: parseOptionalNumber(dom.levelMax.value),
      decorationMin: parseOptionalNumber(dom.decorationMin.value),
      engravingMin: parseOptionalNumber(dom.engravingMin.value),
      inscriptionMin: parseOptionalNumber(dom.inscriptionMin.value),
      uniqueMod: dom.uniqueMod.value,
      includeAllClass: dom.includeAllClass.checked,
      statMatchMode: dom.statMatchMode.value,
      statFilters: getStatFilters(),

      materialCategory: dom.materialCategory.value,
      materialTargetGroup: dom.materialTargetGroup.value,
      materialStat: dom.materialStat.value,
      materialMod: dom.materialMod.value,
      materialTierMin: parseOptionalNumber(dom.materialTierMin.value),
      materialTierMax: parseOptionalNumber(dom.materialTierMax.value),
      materialValueMin: parseOptionalNumber(dom.materialValueMin.value),
      materialValueMax: parseOptionalNumber(dom.materialValueMax.value),
      materialTypeDetail: dom.materialTypeDetail.value,
    };
  }

  /* ========================================================
     フィルター判定
     ======================================================== */
  function matchesCommonItem(item, filters) {
    const matchesItemKey = !filters.itemKey || String(item.key).includes(filters.itemKey);
    const matchesGrades = !filters.grades.size || filters.grades.has(item.grade);
    return matchesItemKey
      && matchesGrades
      && matchesBooleanFilter(item.obtainable, filters.obtainable)
      && matchesBooleanFilter(item.tradable, filters.tradable)
      && matchesRange(item.gold, filters.goldMin, filters.goldMax);
  }

  function matchesGearKeyword(item, keyword) {
    if (!keyword) {
      return true;
    }
    const values = [
      item.key,
      getJapaneseName(item),
      item.name,
      getGradeLabel(item.grade),
      getPartLabel(item.parts),
      getGearTypeLabel(item.gearType),
      getGearGroupLabel(item.gearGroup),
      getUniqueModLabel(item.uniqueMod),
      ...(item.classes ?? []).map(getClassLabel),
    ];
    for (const stat of getAllStats(item)) {
      values.push(stat.stat, getStatLabel(stat.stat), stat.mod, MOD_LABELS[stat.mod], stat.disp, stat.value);
    }
    return values.some((value) => normalizeText(value).includes(keyword));
  }

  function matchesClass(item, itemClass, includeAllClass) {
    if (!itemClass) {
      return true;
    }
    const classes = item.classes ?? [];
    return classes.includes(itemClass)
      || (includeAllClass && itemClass !== "All" && classes.includes("All"));
  }

  function matchesUniqueMod(item, uniqueMod) {
    if (!uniqueMod) {
      return true;
    }
    const hasUniqueMod = !!item.uniqueMod && item.uniqueMod !== NO_UNIQUE_MOD;
    if (uniqueMod === "__has__") {
      return hasUniqueMod;
    }
    if (uniqueMod === "__none__") {
      return !hasUniqueMod;
    }
    return item.uniqueMod === uniqueMod;
  }

  function matchesSlotMinimum(item, slotName, minimum) {
    if (minimum === null) {
      return true;
    }
    const actual = item.slots?.[slotName];
    return actual !== null && actual !== undefined && actual >= minimum;
  }

  function matchesSingleStatFilter(item, filter) {
    return getAllStats(item).some((stat) => {
      return (filter.source === "any" || stat.source === filter.source)
        && stat.stat === filter.stat
        && (!filter.mod || stat.mod === filter.mod)
        && matchesRange(Number(stat.value), filter.min, filter.max);
    });
  }

  function matchesGearResult(result, filters, ignoredField = "") {
    const item = result.item;
    if (!matchesCommonItem(item, filters) || !matchesGearKeyword(item, filters.keyword)) {
      return false;
    }

    const variantMatches = !filters.variant
      || (filters.variant === "none" ? !item.variant : item.variant === filters.variant);
    const statMatches = !filters.statFilters.length
      || (filters.statMatchMode === "or"
        ? filters.statFilters.some((filter) => matchesSingleStatFilter(item, filter))
        : filters.statFilters.every((filter) => matchesSingleStatFilter(item, filter)));

    return (ignoredField === "itemClass" || matchesClass(item, filters.itemClass, filters.includeAllClass))
      && (ignoredField === "parts" || !filters.parts || item.parts === filters.parts)
      && (ignoredField === "gearType" || !filters.gearType || item.gearType === filters.gearType)
      && (ignoredField === "gearGroup" || !filters.gearGroup || item.gearGroup === filters.gearGroup)
      && (ignoredField === "variant" || variantMatches)
      && matchesRange(item.level, filters.levelMin, filters.levelMax)
      && matchesSlotMinimum(item, "decoration", filters.decorationMin)
      && matchesSlotMinimum(item, "engraving", filters.engravingMin)
      && matchesSlotMinimum(item, "inscription", filters.inscriptionMin)
      && (ignoredField === "uniqueMod" || matchesUniqueMod(item, filters.uniqueMod))
      && statMatches;
  }

  function matchesMaterialKeyword(result, keyword) {
    if (!keyword) {
      return true;
    }
    const item = result.item;
    const info = item.materialInfo;
    const values = [
      item.key,
      getJapaneseName(item),
      item.name,
      getGradeLabel(item.grade),
      getMaterialTypeLabel(info?.materialType),
      info?.statModGroupKey,
      result.effect?.gearGroup,
      getGearGroupLabel(result.effect?.gearGroup),
      result.effect?.statModKey,
      result.effect?.minTier,
      result.effect?.maxTier,
      result.tier?.tier,
      result.tier?.stat,
      getStatLabel(result.tier?.stat),
      result.tier?.mod,
      MOD_LABELS[result.tier?.mod],
      result.tier?.minValue,
      result.tier?.maxValue,
      result.tier?.interval,
    ];
    return values.some((value) => normalizeText(value).includes(keyword));
  }

  function matchesMaterialResult(result, filters, ignoredField = "") {
    const item = result.item;
    const info = item.materialInfo;
    if (!matchesCommonItem(item, filters) || !matchesMaterialKeyword(result, filters.keyword)) {
      return false;
    }

    const tier = result.tier;
    return (ignoredField === "materialTypeDetail"
        || !filters.materialTypeDetail
        || info?.materialType === filters.materialTypeDetail)
      && (ignoredField === "materialTargetGroup"
        || !filters.materialTargetGroup
        || result.effect?.gearGroup === filters.materialTargetGroup)
      && (ignoredField === "materialStat"
        || !filters.materialStat
        || tier?.stat === filters.materialStat)
      && (ignoredField === "materialMod"
        || !filters.materialMod
        || tier?.mod === filters.materialMod)
      && matchesRange(tier?.tier, filters.materialTierMin, filters.materialTierMax)
      && matchesRange(tier?.minValue, filters.materialValueMin, null)
      && matchesRange(tier?.maxValue, null, filters.materialValueMax);
  }

  /* ========================================================
     動的プルダウン
     ======================================================== */
  function replaceDynamicOptions(select, optionSpecs, allLabel = "すべて") {
    const selectedValue = select.value;
    select.replaceChildren(createOption("", allLabel));
    for (const optionSpec of optionSpecs) {
      select.append(createOption(optionSpec.value, optionSpec.label));
    }
    const canKeepSelection = Array.from(select.options)
      .some((option) => option.value === selectedValue);
    select.value = canKeepSelection ? selectedValue : "";
    return selectedValue !== select.value;
  }

  function buildFacetOptions(results, valueGetter, labelGetter) {
    const values = new Set();
    for (const result of results) {
      const raw = valueGetter(result);
      const array = Array.isArray(raw) ? raw : [raw];
      for (const value of array) {
        if (value !== null && value !== undefined && value !== "") {
          values.add(String(value));
        }
      }
    }
    return Array.from(values)
      .map((value) => ({ value, label: labelGetter(value) }))
      .sort((left, right) => left.label.localeCompare(right.label, "ja"));
  }

  function refreshGearOptions(filters) {
    const base = buildGearResults();
    const facet = (field) => base.filter((result) => matchesGearResult(result, filters, field));
    let changed = false;

    changed = replaceDynamicOptions(dom.itemClass, buildFacetOptions(
      facet("itemClass"),
      (result) => result.item.classes ?? [],
      getClassLabel,
    )) || changed;
    changed = replaceDynamicOptions(dom.parts, buildFacetOptions(
      facet("parts"),
      (result) => result.item.parts,
      getPartLabel,
    )) || changed;
    changed = replaceDynamicOptions(dom.gearType, buildFacetOptions(
      facet("gearType"),
      (result) => result.item.gearType,
      getGearTypeLabel,
    )) || changed;
    changed = replaceDynamicOptions(dom.gearGroup, buildFacetOptions(
      facet("gearGroup"),
      (result) => result.item.gearGroup,
      getGearGroupLabel,
    )) || changed;
    changed = replaceDynamicOptions(dom.variant, buildFacetOptions(
      facet("variant"),
      (result) => result.item.variant ?? "none",
      (value) => value === "none" ? "なし" : value,
    )) || changed;

    const uniqueResults = facet("uniqueMod");
    const options = [];
    if (uniqueResults.some((result) => !!result.item.uniqueMod && result.item.uniqueMod !== NO_UNIQUE_MOD)) {
      options.push({ value: "__has__", label: "ユニーク効果あり" });
    }
    if (uniqueResults.some((result) => !result.item.uniqueMod || result.item.uniqueMod === NO_UNIQUE_MOD)) {
      options.push({ value: "__none__", label: "ユニーク効果なし" });
    }
    options.push(...buildFacetOptions(
      uniqueResults.filter((result) => !!result.item.uniqueMod && result.item.uniqueMod !== NO_UNIQUE_MOD),
      (result) => result.item.uniqueMod,
      getUniqueModLabel,
    ));
    changed = replaceDynamicOptions(dom.uniqueMod, options) || changed;
    return changed;
  }

  function refreshMaterialOptions(filters) {
    const base = buildMaterialRows(filters.materialCategory);
    const facet = (field) => base.filter((result) => matchesMaterialResult(result, filters, field));
    let changed = false;

    changed = replaceDynamicOptions(dom.materialTargetGroup, buildFacetOptions(
      facet("materialTargetGroup"),
      (result) => result.effect?.gearGroup,
      getGearGroupLabel,
    )) || changed;
    changed = replaceDynamicOptions(dom.materialStat, buildFacetOptions(
      facet("materialStat"),
      (result) => result.tier?.stat,
      getStatLabel,
    )) || changed;
    changed = replaceDynamicOptions(dom.materialMod, buildFacetOptions(
      facet("materialMod"),
      (result) => result.tier?.mod,
      (value) => MOD_LABELS[value] ?? value,
    )) || changed;
    changed = replaceDynamicOptions(dom.materialTypeDetail, buildFacetOptions(
      facet("materialTypeDetail"),
      (result) => result.item.materialInfo?.materialType,
      getMaterialTypeLabel,
    )) || changed;
    return changed;
  }

  function refreshCommonBooleanOptions(filters, sourceResults) {
    const matching = sourceResults.filter((result) => {
      return isGearMode()
        ? matchesGearResult(result, { ...filters, obtainable: "", tradable: "" })
        : matchesMaterialResult(result, { ...filters, obtainable: "", tradable: "" });
    });
    let changed = false;
    changed = replaceDynamicOptions(dom.obtainable, buildFacetOptions(
      matching,
      (result) => String(result.item.obtainable),
      (value) => value === "true" ? "入手可能" : "入手不可",
    )) || changed;
    changed = replaceDynamicOptions(dom.tradable, buildFacetOptions(
      matching,
      (result) => String(result.item.tradable),
      (value) => value === "true" ? "取引可能" : "取引不可",
    )) || changed;
    return changed;
  }

  /* ========================================================
     並び替え
     ======================================================== */
  function getGearStatSortValue(item) {
    const selectedStat = dom.sortStat.value;
    if (!selectedStat) {
      return null;
    }
    const source = dom.sortStatSource.value;
    const mod = dom.sortStatMod.value;
    const values = getAllStats(item)
      .filter((stat) => (source === "any" || stat.source === source)
        && stat.stat === selectedStat
        && (!mod || stat.mod === mod))
      .map((stat) => Number(stat.value))
      .filter(Number.isFinite);
    return values.length ? Math.max(...values) : null;
  }

  function sortResults(results) {
    const key = dom.sortKey.value;
    const factor = dom.sortDirection.value === "desc" ? -1 : 1;
    results.sort((left, right) => {
      const leftItem = left.item;
      const rightItem = right.item;
      let comparison = 0;

      if (key === "grade") {
        comparison = compareOptionalNumbers(leftItem.gradeRank, rightItem.gradeRank, factor);
      } else if (key === "level") {
        comparison = compareOptionalNumbers(leftItem.level, rightItem.level, factor);
      } else if (key === "name") {
        comparison = getJapaneseName(leftItem).localeCompare(getJapaneseName(rightItem), "ja") * factor;
      } else if (key === "gold") {
        comparison = compareOptionalNumbers(leftItem.gold, rightItem.gold, factor);
      } else if (key === "stat") {
        comparison = compareOptionalNumbers(getGearStatSortValue(leftItem), getGearStatSortValue(rightItem), factor);
      } else if (key === "material-type") {
        comparison = getMaterialTypeLabel(leftItem.materialInfo?.materialType)
          .localeCompare(getMaterialTypeLabel(rightItem.materialInfo?.materialType), "ja") * factor;
      } else if (key === "target") {
        comparison = getGearGroupLabel(left.effect?.gearGroup)
          .localeCompare(getGearGroupLabel(right.effect?.gearGroup), "ja") * factor;
      } else if (key === "material-stat") {
        comparison = getStatLabel(left.tier?.stat)
          .localeCompare(getStatLabel(right.tier?.stat), "ja") * factor;
      } else if (key === "tier") {
        comparison = compareOptionalNumbers(left.tier?.tier, right.tier?.tier, factor);
      } else if (key === "min-value") {
        comparison = compareOptionalNumbers(left.tier?.minValue, right.tier?.minValue, factor);
      } else if (key === "max-value") {
        comparison = compareOptionalNumbers(left.tier?.maxValue, right.tier?.maxValue, factor);
      } else if (key === "interval") {
        comparison = compareOptionalNumbers(left.tier?.interval, right.tier?.interval, factor);
      } else {
        comparison = (Number(leftItem.key) - Number(rightItem.key)) * factor;
      }

      if (!comparison) {
        comparison = Number(leftItem.key) - Number(rightItem.key);
      }
      if (!comparison) {
        comparison = String(left.rowKey).localeCompare(String(right.rowKey));
      }
      return comparison;
    });
  }

  /* ========================================================
     表示列
     ======================================================== */
  function renderGearStats(item) {
    const stats = getAllStats(item);
    if (!stats.length) {
      return EMPTY_LABEL;
    }
    return `<div class="stat-list">${stats.map((stat) => {
      const sourceLabel = stat.source === "base" ? "基本" : "固有";
      const displayValue = stat.disp || formatNumber(stat.value);
      const title = `${sourceLabel} / ${MOD_LABELS[stat.mod] ?? stat.mod} / raw: ${stat.value}`;
      return `<span class="stat-badge" title="${escapeHtml(title)}">${escapeHtml(getStatLabel(stat.stat))} ${escapeHtml(displayValue)}</span>`;
    }).join("")}</div>`;
  }

  function renderStatus(item) {
    return `<div class="badge-list">
      <span class="badge ${item.obtainable ? "status-yes" : "status-no"}">${item.obtainable ? "入手可" : "入手不可"}</span>
      <span class="badge ${item.tradable ? "status-yes" : "status-no"}">${item.tradable ? "取引可" : "取引不可"}</span>
    </div>`;
  }

  function getGearColumns(oneScreen = false) {
    const columns = [
      { key: "item-key", label: "ID", text: (r) => r.item.key },
      { key: "name", label: "名称", text: (r) => getJapaneseName(r.item), html: (r) => `<div class="name-cell"><strong>${escapeHtml(getJapaneseName(r.item))}</strong><span>${escapeHtml(r.item.name ?? EMPTY_LABEL)}</span></div>` },
      { key: "grade", label: "レアリティ", text: (r) => getGradeLabel(r.item.grade), html: (r) => `<span class="badge grade-badge">${escapeHtml(getGradeLabel(r.item.grade))}</span>` },
      { key: "level", label: "Lv", text: (r) => formatNumber(r.item.level) },
      { key: "class", label: "クラス", text: (r) => (r.item.classes ?? []).map(getClassLabel).join(" / ") || EMPTY_LABEL },
      { key: "equipment", label: "装備分類", text: (r) => getGearTypeLabel(r.item.gearType) },
      { key: "stats", label: "能力", text: (r) => getAllStats(r.item).map((s) => `${getStatLabel(s.stat)} ${s.disp || formatNumber(s.value)}`).join(" / ") || EMPTY_LABEL, html: (r) => renderGearStats(r.item) },
      { key: "unique", label: "ユニーク能力", text: (r) => getUniqueModLabel(r.item.uniqueMod) },
      { key: "gold", label: "ゴールド", text: (r) => formatNumber(r.item.gold) },
      { key: "status", label: "状態", text: (r) => `${r.item.obtainable ? "入手可" : "入手不可"} / ${r.item.tradable ? "取引可" : "取引不可"}`, html: (r) => renderStatus(r.item) },
    ];
    if (!oneScreen) {
      return columns;
    }
    const allowed = new Set(["name", "grade", "level", "class", "equipment", "stats", "unique"]);
    return columns.filter((column) => allowed.has(column.key));
  }

  function getMaterialColumns(oneScreen = false) {
    const generic = isGenericMaterialMode();
    const common = [
      { key: "item-key", label: "ID", text: (r) => r.item.key },
      { key: "name", label: "名称", text: (r) => getJapaneseName(r.item), html: (r) => `<div class="name-cell"><strong>${escapeHtml(getJapaneseName(r.item))}</strong><span>${escapeHtml(r.item.name ?? EMPTY_LABEL)}</span></div>` },
      { key: "grade", label: "レアリティ", text: (r) => getGradeLabel(r.item.grade), html: (r) => `<span class="badge grade-badge">${escapeHtml(getGradeLabel(r.item.grade))}</span>` },
      { key: "material-type", label: "素材種別", text: (r) => getMaterialTypeLabel(r.item.materialInfo?.materialType) },
    ];

    if (generic) {
      const columns = [
        ...common,
        { key: "gold", label: "ゴールド", text: (r) => formatNumber(r.item.gold) },
        { key: "status", label: "状態", text: (r) => `${r.item.obtainable ? "入手可" : "入手不可"} / ${r.item.tradable ? "取引可" : "取引不可"}`, html: (r) => renderStatus(r.item) },
      ];
      return oneScreen ? columns.filter((column) => column.key !== "item-key") : columns;
    }

    const columns = [
      ...common,
      { key: "group-key", label: "StatModGroupKey", text: (r) => formatNumber(r.item.materialInfo?.statModGroupKey) },
      { key: "target", label: "対象装備分類", text: (r) => getGearGroupLabel(r.effect?.gearGroup) },
      { key: "stat-mod-key", label: "StatModKey", text: (r) => formatNumber(r.effect?.statModKey) },
      { key: "tier-range", label: "適用Tier範囲", text: (r) => r.effect ? `${r.effect.minTier}〜${r.effect.maxTier}` : EMPTY_LABEL },
      { key: "tier", label: "データTier", text: (r) => formatNumber(r.tier?.tier) },
      { key: "stat", label: "能力", text: (r) => getStatLabel(r.tier?.stat) },
      { key: "mod", label: "計算方式", text: (r) => MOD_LABELS[r.tier?.mod] ?? r.tier?.mod ?? EMPTY_LABEL },
      { key: "min-value", label: "最小値(raw)", text: (r) => formatNumber(r.tier?.minValue) },
      { key: "max-value", label: "最大値(raw)", text: (r) => formatNumber(r.tier?.maxValue) },
      { key: "interval", label: "刻み(raw)", text: (r) => formatNumber(r.tier?.interval) },
      { key: "gold", label: "ゴールド", text: (r) => formatNumber(r.item.gold) },
      { key: "status", label: "状態", text: (r) => `${r.item.obtainable ? "入手可" : "入手不可"} / ${r.item.tradable ? "取引可" : "取引不可"}`, html: (r) => renderStatus(r.item) },
    ];
    if (!oneScreen) {
      return columns;
    }
    const allowed = new Set(["name", "grade", "target", "stat", "mod", "tier", "min-value", "max-value", "interval"]);
    return columns.filter((column) => allowed.has(column.key));
  }

  function getCurrentColumns(oneScreen = false) {
    return isGearMode() ? getGearColumns(oneScreen) : getMaterialColumns(oneScreen);
  }

  function renderTableHead() {
    const columns = getCurrentColumns();
    dom.resultHead.innerHTML = `<tr>${columns.map((column) => `<th data-column="${escapeHtml(column.key)}">${escapeHtml(column.label)}</th>`).join("")}</tr>`;
    dom.resultTable.classList.toggle("material-result-table", !isGearMode());
  }

  function renderRows(pageResults) {
    const columns = getCurrentColumns();
    if (!pageResults.length) {
      dom.resultBody.innerHTML = `<tr><td colspan="${columns.length}">条件に一致するデータがありません。</td></tr>`;
      return;
    }
    dom.resultBody.innerHTML = pageResults.map((result) => `
      <tr tabindex="0" data-item-key="${escapeHtml(result.item.key)}" data-row-key="${escapeHtml(result.rowKey)}" aria-label="${escapeHtml(getJapaneseName(result.item))}の詳細を開く">
        ${columns.map((column) => {
          const content = column.html ? column.html(result) : escapeHtml(column.text(result));
          return `<td data-column="${escapeHtml(column.key)}">${content}</td>`;
        }).join("")}
      </tr>
    `).join("");
  }

  function renderPagination() {
    const totalPages = Math.max(1, Math.ceil(state.results.length / state.pageSize));
    state.currentPage = Math.min(state.currentPage, totalPages);
    const start = (state.currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;
    renderRows(state.results.slice(start, end));
    dom.pageStatus.textContent = `${state.currentPage} / ${totalPages}`;
    dom.previousPageButton.disabled = state.currentPage <= 1;
    dom.nextPageButton.disabled = state.currentPage >= totalPages;
    const visibleStart = state.results.length ? start + 1 : 0;
    const visibleEnd = Math.min(end, state.results.length);
    dom.resultNote.textContent = `${visibleStart}〜${visibleEnd}行を表示`;
  }

  function updateResultCount() {
    if (isGearMode() || isGenericMaterialMode()) {
      dom.resultCount.textContent = `${state.results.length.toLocaleString("ja-JP")}件`;
      return;
    }
    const uniqueItems = new Set(state.results.map((result) => result.item.key)).size;
    dom.resultCount.textContent = `${uniqueItems.toLocaleString("ja-JP")}アイテム / ${state.results.length.toLocaleString("ja-JP")}効果行`;
  }

  function applyFilters(options = {}) {
    if (options.resetPage !== false) {
      state.currentPage = 1;
    }
    const filters = getFilters();
    const source = isGearMode() ? buildGearResults() : buildMaterialRows(filters.materialCategory);
    state.results = source.filter((result) => {
      return isGearMode()
        ? matchesGearResult(result, filters)
        : matchesMaterialResult(result, filters);
    });
    sortResults(state.results);
    renderTableHead();
    updateResultCount();
    renderPagination();

    const modeOptionsChanged = isGearMode()
      ? refreshGearOptions(filters)
      : refreshMaterialOptions(filters);
    const commonOptionsChanged = refreshCommonBooleanOptions(filters, source);

    if (!options.optionsAdjusted && (modeOptionsChanged || commonOptionsChanged)) {
      applyFilters({ resetPage: false, optionsAdjusted: true });
    }
  }

  /* ========================================================
     全件1画面モーダル
     ======================================================== */
  const ONE_SCREEN_TABLE_WIDTH = 1360;
  const ONE_SCREEN_ROW_HEIGHT = 16;
  const ONE_SCREEN_HEADER_HEIGHT = 18;
  const ONE_SCREEN_TABLE_GAP = 8;
  const ONE_SCREEN_MAX_BLOCKS = 32;

  function getOneScreenColumnScales(columns) {
    const availableWidth = ONE_SCREEN_TABLE_WIDTH / columns.length - 7;
    const context = document.createElement("canvas").getContext("2d");
    if (context) {
      context.font = '10px Inter, "Noto Sans JP", "Yu Gothic UI", "Yu Gothic", Meiryo, sans-serif';
    }

    const scales = new Map();
    for (const column of columns) {
      let maxWidth = context?.measureText(column.label).width ?? String(column.label).length * 10;
      for (const result of state.results) {
        const text = String(column.text(result) ?? "");
        const width = context?.measureText(text).width ?? text.length * 10;
        maxWidth = Math.max(maxWidth, width);
      }
      const safeWidth = Math.max(1, maxWidth * 1.4 + 2);
      scales.set(column.key, Math.min(1, availableWidth / safeWidth));
    }
    return scales;
  }

  function renderOneScreenCell(value, columnKey, columnScales) {
    const scale = columnScales.get(columnKey) ?? 1;
    return `<span class="one-screen-cell-clip" data-one-screen-column="${escapeHtml(columnKey)}"><span class="one-screen-cell-content" style="transform:scaleX(${scale})">${escapeHtml(value)}</span></span>`;
  }

  function renderOneScreenTable(blockResults, columns, columnScales) {
    const equalWidth = 100 / columns.length;
    return `<table class="one-screen-table">
      <colgroup>${columns.map(() => `<col style="width:${equalWidth}%">`).join("")}</colgroup>
      <thead><tr>${columns.map((column) => `<th>${renderOneScreenCell(column.label, column.key, columnScales)}</th>`).join("")}</tr></thead>
      <tbody>${blockResults.map((result) => `<tr data-item-key="${escapeHtml(result.item.key)}">${columns.map((column) => `<td>${renderOneScreenCell(column.text(result), column.key, columnScales)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>`;
  }

  function chooseOneScreenLayout(resultCount, viewportWidth, viewportHeight) {
    let best = { blockCount: 1, rowsPerBlock: Math.max(1, resultCount), scale: 0 };
    const maxBlocks = Math.min(ONE_SCREEN_MAX_BLOCKS, Math.max(1, resultCount));
    for (let blockCount = 1; blockCount <= maxBlocks; blockCount += 1) {
      const rowsPerBlock = Math.ceil(resultCount / blockCount);
      const contentWidth = blockCount * ONE_SCREEN_TABLE_WIDTH + (blockCount - 1) * ONE_SCREEN_TABLE_GAP;
      const contentHeight = ONE_SCREEN_HEADER_HEIGHT + rowsPerBlock * ONE_SCREEN_ROW_HEIGHT;
      const scale = Math.min(viewportWidth / contentWidth, viewportHeight / contentHeight);
      if (scale > best.scale) {
        best = { blockCount, rowsPerBlock, scale };
      }
    }
    return best;
  }

  function fitOneScreenSheet() {
    if (!dom.oneScreenDialog.open) {
      return;
    }
    const viewportWidth = dom.oneScreenViewport.clientWidth;
    const viewportHeight = dom.oneScreenViewport.clientHeight;
    const contentWidth = dom.oneScreenSheet.scrollWidth;
    const contentHeight = dom.oneScreenSheet.scrollHeight;
    const scale = Math.min(viewportWidth / contentWidth, viewportHeight / contentHeight, 1);
    dom.oneScreenSheet.style.transform = `scale(${scale})`;
    dom.oneScreenSheet.style.left = `${Math.max(0, (viewportWidth - contentWidth * scale) / 2)}px`;
    dom.oneScreenSheet.style.top = `${Math.max(0, (viewportHeight - contentHeight * scale) / 2)}px`;
    const blockCount = dom.oneScreenSheet.querySelectorAll(".one-screen-table").length;
    dom.oneScreenMeta.textContent = `${state.results.length.toLocaleString("ja-JP")}行 / ${blockCount}分割 / 表示倍率 ${(scale * 100).toFixed(1)}%`;
  }

  function renderOneScreenResults() {
    const columns = getCurrentColumns(true);
    if (!state.results.length) {
      dom.oneScreenSheet.innerHTML = '<p class="one-screen-empty">条件に一致するデータがありません。</p>';
      return;
    }
    const layout = chooseOneScreenLayout(
      state.results.length,
      dom.oneScreenViewport.clientWidth,
      dom.oneScreenViewport.clientHeight,
    );
    const blocks = [];
    for (let start = 0; start < state.results.length; start += layout.rowsPerBlock) {
      blocks.push(state.results.slice(start, start + layout.rowsPerBlock));
    }
    const columnScales = getOneScreenColumnScales(columns);
    dom.oneScreenSheet.innerHTML = blocks
      .map((block) => renderOneScreenTable(block, columns, columnScales))
      .join("");
  }

  function openOneScreenDialog() {
    if (!dom.oneScreenDialog || typeof dom.oneScreenDialog.showModal !== "function") {
      window.alert("全件表示モーダルを開けません。index.htmlとapp.jsを同じ版へ揃えてください。");
      return;
    }
    dom.oneScreenSheet.style.transform = "none";
    dom.oneScreenSheet.style.left = "0";
    dom.oneScreenSheet.style.top = "0";
    dom.oneScreenDialog.showModal();
    renderOneScreenResults();
    requestAnimationFrame(() => requestAnimationFrame(fitOneScreenSheet));
  }

  function scheduleOneScreenRefit() {
    if (!dom.oneScreenDialog?.open) {
      return;
    }
    cancelAnimationFrame(state.oneScreenResizeFrame);
    state.oneScreenResizeFrame = requestAnimationFrame(() => {
      renderOneScreenResults();
      requestAnimationFrame(fitOneScreenSheet);
    });
  }

  /* ========================================================
     詳細表示
     ======================================================== */
  function createDetailItem(label, value) {
    return `<div class="detail-item"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value ?? EMPTY_LABEL)}</dd></div>`;
  }

  function renderDetailStats(item, source) {
    const stats = item.stats?.[source] ?? [];
    if (!stats.length) {
      return `<p class="muted">なし</p>`;
    }
    return `<div class="detail-stat-list">${stats.map((stat) => `<div class="detail-stat-row"><strong>${escapeHtml(getStatLabel(stat.stat))}</strong><span>${escapeHtml(stat.disp || formatNumber(stat.value))}</span><code>${escapeHtml(MOD_LABELS[stat.mod] ?? stat.mod)} / raw ${escapeHtml(stat.value)}</code></div>`).join("")}</div>`;
  }

  function renderMaterialEffectDetail(item) {
    const info = item.materialInfo;
    const rows = [];
    for (const effect of info?.effects ?? []) {
      for (const tier of effect.tiers ?? []) {
        rows.push({ effect, tier });
      }
    }
    if (!rows.length) {
      return '<p class="muted">この素材には能力付与パラメータがありません。</p>';
    }
    return `<div class="detail-effect-table-wrap"><table class="detail-effect-table">
      <thead><tr><th>対象</th><th>StatModKey</th><th>適用Tier</th><th>データTier</th><th>能力</th><th>方式</th><th>最小値(raw)</th><th>最大値(raw)</th><th>刻み(raw)</th></tr></thead>
      <tbody>${rows.map(({ effect, tier }) => `<tr><td>${escapeHtml(getGearGroupLabel(effect.gearGroup))}</td><td>${escapeHtml(effect.statModKey)}</td><td>${escapeHtml(`${effect.minTier}〜${effect.maxTier}`)}</td><td>${escapeHtml(tier.tier)}</td><td>${escapeHtml(getStatLabel(tier.stat))}</td><td>${escapeHtml(MOD_LABELS[tier.mod] ?? tier.mod)}</td><td>${escapeHtml(formatNumber(tier.minValue))}</td><td>${escapeHtml(formatNumber(tier.maxValue))}</td><td>${escapeHtml(formatNumber(tier.interval))}</td></tr>`).join("")}</tbody>
    </table></div>`;
  }

  function showItemDetail(itemKey) {
    const item = items.find((candidate) => String(candidate.key) === String(itemKey));
    if (!item) {
      return;
    }
    dom.detailTitle.textContent = `${getJapaneseName(item)} (${item.key})`;

    if (item.type === "MATERIAL") {
      const info = item.materialInfo;
      dom.detailContent.innerHTML = `
        <dl class="detail-grid">
          ${createDetailItem("英語名", item.name)}
          ${createDetailItem("レアリティ", getGradeLabel(item.grade))}
          ${createDetailItem("素材分類", getMaterialCategoryLabel(info?.category))}
          ${createDetailItem("素材内部種別", getMaterialTypeLabel(info?.materialType))}
          ${createDetailItem("StatModGroupKey", formatNumber(info?.statModGroupKey))}
          ${createDetailItem("ゴールド", formatNumber(item.gold))}
          ${createDetailItem("入手可能", item.obtainable ? "はい" : "いいえ")}
          ${createDetailItem("取引可能", item.tradable ? "はい" : "いいえ")}
          ${createDetailItem("アイコン", item.icon ?? EMPTY_LABEL)}
        </dl>
        <section class="detail-section"><h3>素材効果パラメータ</h3>${renderMaterialEffectDetail(item)}</section>
        <section class="detail-section"><h3>元データ</h3><pre class="raw-json">${escapeHtml(JSON.stringify(item, null, 2))}</pre></section>
      `;
    } else {
      const classes = (item.classes ?? []).map(getClassLabel).join(" / ") || EMPTY_LABEL;
      const slots = item.slots
        ? Object.entries(item.slots).map(([name, count]) => `${SLOT_LABELS[name] ?? name}: ${count}`).join(" / ")
        : EMPTY_LABEL;
      dom.detailContent.innerHTML = `
        <dl class="detail-grid">
          ${createDetailItem("英語名", item.name)}
          ${createDetailItem("レアリティ", getGradeLabel(item.grade))}
          ${createDetailItem("レベル", formatNumber(item.level))}
          ${createDetailItem("クラス", classes)}
          ${createDetailItem("装備部位", getPartLabel(item.parts))}
          ${createDetailItem("装備種", getGearTypeLabel(item.gearType))}
          ${createDetailItem("装備グループ", getGearGroupLabel(item.gearGroup))}
          ${createDetailItem("バリアント", item.variant ?? EMPTY_LABEL)}
          ${createDetailItem("ゴールド", formatNumber(item.gold))}
          ${createDetailItem("入手可能", item.obtainable ? "はい" : "いいえ")}
          ${createDetailItem("取引可能", item.tradable ? "はい" : "いいえ")}
          ${createDetailItem("スロット", slots)}
          ${createDetailItem("ユニーク効果", getUniqueModLabel(item.uniqueMod))}
          ${createDetailItem("アイコン", item.icon ?? EMPTY_LABEL)}
        </dl>
        <section class="detail-section"><h3>基本能力</h3>${renderDetailStats(item, "base")}</section>
        <section class="detail-section"><h3>固有能力</h3>${renderDetailStats(item, "inherent")}</section>
        <section class="detail-section"><h3>元データ</h3><pre class="raw-json">${escapeHtml(JSON.stringify(item, null, 2))}</pre></section>
      `;
    }
    dom.detailDialog.showModal();
  }

  /* ========================================================
     CSV出力
     ======================================================== */
  function escapeCsv(value) {
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  }

  function exportCsv() {
    let headers;
    let rows;
    if (isGearMode()) {
      headers = ["item-key", "name-ja", "name-en", "grade", "level", "classes", "parts", "gear-type", "gear-group", "variant", "gold", "obtainable", "tradable", "decoration-slots", "engraving-slots", "inscription-slots", "base-stats", "inherent-stats", "unique-mod"];
      rows = state.results.map(({ item }) => [
        item.key,
        getJapaneseName(item),
        item.name,
        item.grade,
        item.level,
        (item.classes ?? []).join(" / "),
        item.parts,
        item.gearType,
        item.gearGroup,
        item.variant,
        item.gold,
        item.obtainable,
        item.tradable,
        item.slots?.decoration,
        item.slots?.engraving,
        item.slots?.inscription,
        (item.stats?.base ?? []).map((stat) => `${stat.stat}:${stat.mod}:${stat.value}`).join(" / "),
        (item.stats?.inherent ?? []).map((stat) => `${stat.stat}:${stat.mod}:${stat.value}`).join(" / "),
        item.uniqueMod,
      ]);
    } else if (isGenericMaterialMode()) {
      headers = ["item-key", "name-ja", "name-en", "grade", "material-category", "material-type", "stat-mod-group-key", "gold", "obtainable", "tradable"];
      rows = state.results.map(({ item }) => [
        item.key,
        getJapaneseName(item),
        item.name,
        item.grade,
        item.materialInfo?.category,
        item.materialInfo?.materialType,
        item.materialInfo?.statModGroupKey,
        item.gold,
        item.obtainable,
        item.tradable,
      ]);
    } else {
      headers = ["item-key", "name-ja", "name-en", "grade", "material-category", "material-type", "stat-mod-group-key", "target-gear-group", "stat-mod-key", "min-tier", "max-tier", "tier", "stat-type", "mod-type", "min-value", "max-value", "interval", "gold", "obtainable", "tradable"];
      rows = state.results.map(({ item, effect, tier }) => [
        item.key,
        getJapaneseName(item),
        item.name,
        item.grade,
        item.materialInfo?.category,
        item.materialInfo?.materialType,
        item.materialInfo?.statModGroupKey,
        effect?.gearGroup,
        effect?.statModKey,
        effect?.minTier,
        effect?.maxTier,
        tier?.tier,
        tier?.stat,
        tier?.mod,
        tier?.minValue,
        tier?.maxValue,
        tier?.interval,
        item.gold,
        item.obtainable,
        item.tradable,
      ]);
    }

    const csvRows = [headers, ...rows].map((row) => row.map(escapeCsv).join(","));
    const blob = new Blob([`\uFEFF${csvRows.join("\r\n")}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    anchor.href = url;
    anchor.download = `tbh-${isGearMode() ? "gear" : dom.materialCategory.value}-${timestamp}.csv`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  /* ========================================================
     リセット
     ======================================================== */
  function resetFilters() {
    for (const input of dom.filterContent.querySelectorAll("input, select")) {
      if (input.type === "checkbox") {
        input.checked = input.id === "include-all-class";
      } else {
        input.value = "";
      }
    }
    dom.itemType.value = "GEAR";
    dom.materialCategory.value = "decoration";
    dom.statMatchMode.value = "and";
    dom.statFilterList.replaceChildren();
    dom.pageSize.value = String(DEFAULT_PAGE_SIZE);
    dom.sortDirection.value = "asc";
    state.pageSize = DEFAULT_PAGE_SIZE;
    addStatFilter();
    updateModeVisibility();
    applyFilters();
  }

  /* ========================================================
     イベント
     ======================================================== */
  function registerEvents() {
    let keywordTimer = null;

    dom.filterContent.addEventListener("input", (event) => {
      if (event.target === dom.keyword) {
        clearTimeout(keywordTimer);
        keywordTimer = setTimeout(() => applyFilters(), 120);
        return;
      }
      if (event.target.matches("select, input[type=checkbox]")) {
        return;
      }
      applyFilters();
    });

    dom.filterContent.addEventListener("change", (event) => {
      if (event.target === dom.itemType) {
        if (dom.itemType.value === "MATERIAL" && !dom.materialCategory.value) {
          dom.materialCategory.value = "decoration";
        }
        updateModeVisibility();
      } else if (event.target === dom.materialCategory) {
        updateModeVisibility();
      }
      applyFilters();
    });

    dom.addStatFilterButton.addEventListener("click", addStatFilter);
    dom.statFilterList.addEventListener("change", (event) => {
      const source = event.target.closest('[data-field="source"]');
      if (source) {
        updateStatFilterRow(source.closest(".stat-filter-row"));
      }
    });
    dom.statFilterList.addEventListener("click", (event) => {
      const button = event.target.closest(".stat-filter-remove");
      if (!button) {
        return;
      }
      button.closest(".stat-filter-row").remove();
      updateAddStatFilterButton();
      applyFilters();
    });

    dom.resetButton.addEventListener("click", resetFilters);
    dom.exportButton.addEventListener("click", exportCsv);
    dom.oneScreenModeButton.addEventListener("click", openOneScreenDialog);

    dom.sortKey.addEventListener("change", () => {
      updateStatSortControls();
      applyFilters();
    });
    dom.statSortControls.addEventListener("change", () => applyFilters());
    dom.sortDirection.addEventListener("change", () => applyFilters());
    dom.pageSize.addEventListener("change", () => {
      state.pageSize = Number(dom.pageSize.value) || DEFAULT_PAGE_SIZE;
      applyFilters();
    });

    dom.previousPageButton.addEventListener("click", () => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
        renderPagination();
      }
    });
    dom.nextPageButton.addEventListener("click", () => {
      const totalPages = Math.max(1, Math.ceil(state.results.length / state.pageSize));
      if (state.currentPage < totalPages) {
        state.currentPage += 1;
        renderPagination();
      }
    });

    const activateRow = (event) => {
      const row = event.target.closest("tr[data-item-key]");
      if (row) {
        showItemDetail(row.dataset.itemKey);
      }
    };
    dom.resultBody.addEventListener("click", activateRow);
    dom.resultBody.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateRow(event);
      }
    });

    dom.closeOneScreenButton.addEventListener("click", () => dom.oneScreenDialog.close());
    dom.oneScreenSheet.addEventListener("click", (event) => {
      const row = event.target.closest("tr[data-item-key]");
      if (row) {
        dom.oneScreenDialog.close();
        showItemDetail(row.dataset.itemKey);
      }
    });
    dom.oneScreenDialog.addEventListener("click", (event) => {
      if (event.target === dom.oneScreenDialog) {
        dom.oneScreenDialog.close();
      }
    });
    window.addEventListener("resize", scheduleOneScreenRefit);

    dom.closeDialogButton.addEventListener("click", () => dom.detailDialog.close());
    dom.detailDialog.addEventListener("click", (event) => {
      if (event.target === dom.detailDialog) {
        dom.detailDialog.close();
      }
    });

    dom.toggleFilterButton.addEventListener("click", () => {
      const isHidden = dom.filterContent.hidden;
      dom.filterContent.hidden = !isHidden;
      dom.toggleFilterButton.setAttribute("aria-expanded", String(isHidden));
      dom.toggleFilterButton.textContent = isHidden ? "条件を折りたたむ" : "条件を開く";
    });
  }

  /* ========================================================
     起動
     ======================================================== */
  function initialize() {
    if (!items.length) {
      dom.resultCount.textContent = "データを読み込めませんでした";
      dom.resultNote.textContent = "data.js が同じフォルダにあるか確認してください。";
      return;
    }
    renderSummaryCards();
    renderBasicFilterOptions();
    renderGradeFilters();
    addStatFilter();
    updateModeVisibility();
    registerEvents();
    applyFilters();
  }

  initialize();
})();
