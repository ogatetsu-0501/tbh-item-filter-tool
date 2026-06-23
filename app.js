(() => {
  "use strict";

  /* ========================================================
     固定ラベル
     ======================================================== */
  const TYPE_LABELS = {
    GEAR: "装備",
    MATERIAL: "素材",
    STAGEBOX: "ステージボックス",
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
  };

  const MATERIAL_CATEGORY_LABELS = {
    material: "素材",
    decoration: "装飾",
    engraving: "彫刻",
    inscription: "碑文",
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
    CooldownReduction: "クールタイム短縮",
    CriticalChance: "クリティカル率",
    CriticalDamage: "クリティカルダメージ",
    DamageAbsorption: "ダメージ吸収",
    DamageReduction: "ダメージ軽減",
    DodgeChance: "回避率",
    HpLeech: "HP吸収",
    HpRegenPerSec: "毎秒HP回復",
    IncreaseExpAmount: "経験値獲得量増加",
    IncreaseProjectileDamage: "投射物ダメージ増加",
    MaxHp: "最大HP",
    MovementSpeed: "移動速度",
    Multistrike: "マルチストライク",
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
    inscription: "刻印",
  };

  const EMPTY_LABEL = "—";
  const NO_UNIQUE_MOD = "0";
  const DEFAULT_PAGE_SIZE = 50;
  const MAX_STAT_FILTERS = 5;

  /* ========================================================
     データと状態
     ======================================================== */
  const data = window.TBH_DATA;
  const items = Array.isArray(data?.items) ? data.items : [];
  const meta = data?.meta ?? {};
  const ja = data?.ja ?? {};
  const itemNamesJa = ja.item ?? {};
  const gradeLabels = ja.grade ?? {};
  const gearTypeLabels = ja.gearType ?? {};

  const state = {
    filteredItems: [],
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
    itemClass: document.querySelector("#item-class"),
    parts: document.querySelector("#parts"),
    gearType: document.querySelector("#gear-type"),
    gearGroup: document.querySelector("#gear-group"),
    variant: document.querySelector("#variant"),
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

  function getTypeLabel(type) {
    return TYPE_LABELS[type] ?? type ?? EMPTY_LABEL;
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

  /* ========================================================
     素材アイテムの分類をアイテムIDから判定します。
     DECORATION / ENGRAVING / INSCRIPTION 以外は、
     利用者向けにはまとめて「素材」として扱います。
     ======================================================== */
  function getMaterialCategory(item) {
    if (item.type !== "MATERIAL") {
      return null;
    }

    const itemKey = Number(item.key);
    const isDecoration = itemKey >= 110000 && itemKey < 120000;
    const isEngraving = itemKey >= 120000 && itemKey < 130000;
    const isInscription = itemKey >= 130000 && itemKey < 140000;

    if (isDecoration) {
      return "decoration";
    }

    if (isEngraving) {
      return "engraving";
    }

    if (isInscription) {
      return "inscription";
    }

    return "material";
  }

  function getMaterialCategoryLabel(category) {
    return MATERIAL_CATEGORY_LABELS[category] ?? category ?? EMPTY_LABEL;
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
    const stats = item.stats;
    if (!stats) {
      return [];
    }

    const result = [];
    for (const stat of stats.base ?? []) {
      result.push({
        source: "base",
        stat: stat.stat,
        mod: stat.mod,
        value: stat.value,
        disp: stat.disp,
      });
    }

    for (const stat of stats.inherent ?? []) {
      result.push({
        source: "inherent",
        stat: stat.stat,
        mod: stat.mod,
        value: stat.value,
        disp: stat.disp,
      });
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
    select.append(createOption("", allLabel));

    for (const value of values) {
      select.append(createOption(value, labelGetter(value)));
    }
  }

  function getDistinctValues(fieldName) {
    const values = new Set();
    for (const item of items) {
      const value = item[fieldName];
      if (value !== null && value !== undefined && value !== "") {
        values.add(value);
      }
    }
    return Array.from(values);
  }

  function compareNullableNumbers(leftValue, rightValue) {
    const left = leftValue ?? Number.POSITIVE_INFINITY;
    const right = rightValue ?? Number.POSITIVE_INFINITY;
    return left - right;
  }

  /* ========================================================
     初期UI構築
     ======================================================== */
  function renderSummaryCards() {
    const counts = new Map();
    for (const item of items) {
      counts.set(item.type, (counts.get(item.type) ?? 0) + 1);
    }

    const statSet = new Set();
    const uniqueModSet = new Set();
    for (const item of items) {
      for (const stat of getAllStats(item)) {
        statSet.add(stat.stat);
      }

      const hasUniqueMod = !!item.uniqueMod && item.uniqueMod !== NO_UNIQUE_MOD;
      if (hasUniqueMod) {
        uniqueModSet.add(item.uniqueMod);
      }
    }

    const cards = [
      ["全アイテム", items.length],
      ["装備", counts.get("GEAR") ?? 0],
      ["素材＋箱", (counts.get("MATERIAL") ?? 0) + (counts.get("STAGEBOX") ?? 0)],
      ["能力 / ユニーク効果", `${statSet.size} / ${uniqueModSet.size}`],
    ];

    dom.summaryCards.innerHTML = cards
      .map(([label, value]) => `
        <article class="summary-card">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(typeof value === "number" ? formatNumber(value) : value)}</strong>
        </article>
      `)
      .join("");
  }

  function renderBasicFilterOptions() {
    fillSelect(dom.itemType, meta.types ?? getDistinctValues("type"), getTypeLabel);
    fillSelect(
      dom.materialCategory,
      Object.keys(MATERIAL_CATEGORY_LABELS),
      getMaterialCategoryLabel,
    );
    fillSelect(dom.itemClass, ["All", ...(meta.classes ?? [])], getClassLabel);
    fillSelect(dom.parts, meta.parts ?? getDistinctValues("parts"), getPartLabel);
    fillSelect(dom.gearType, meta.gearTypes ?? getDistinctValues("gearType"), getGearTypeLabel);

    const gearGroups = getDistinctValues("gearGroup").sort();
    fillSelect(dom.gearGroup, gearGroups, getGearGroupLabel);

    const uniqueMods = getDistinctValues("uniqueMod")
      .filter((value) => value !== NO_UNIQUE_MOD)
      .sort((left, right) => getUniqueModLabel(left).localeCompare(getUniqueModLabel(right), "ja"));

    dom.uniqueMod.replaceChildren();
    dom.uniqueMod.append(createOption("", "すべて"));
    dom.uniqueMod.append(createOption("__has__", "ユニーク効果あり"));
    dom.uniqueMod.append(createOption("__none__", "ユニーク効果なし"));
    for (const uniqueMod of uniqueMods) {
      dom.uniqueMod.append(createOption(uniqueMod, getUniqueModLabel(uniqueMod)));
    }
  }

  function renderSortStatOptions() {
    dom.sortStat.replaceChildren();
    dom.sortStat.append(createOption("", "能力を選択"));

    for (const [stat, count] of getAvailableStats()) {
      const label = `${getStatLabel(stat)} (${count})`;
      dom.sortStat.append(createOption(stat, label));
    }
  }

  function updateStatSortControls() {
    const isStatSort = dom.sortKey.value === "stat";
    dom.statSortControls.hidden = !isStatSort;
    dom.sortStatSource.disabled = !isStatSort;
    dom.sortStat.disabled = !isStatSort;
    dom.sortStatMod.disabled = !isStatSort;
  }

  function renderGradeFilters() {
    const grades = meta.grades ?? getDistinctValues("grade");
    dom.gradeFilters.replaceChildren();

    for (const grade of grades) {
      const label = document.createElement("label");
      label.className = "chip";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = grade;
      checkbox.dataset.grade = grade;

      const text = document.createElement("span");
      text.textContent = getGradeLabel(grade);

      label.append(checkbox, text);
      dom.gradeFilters.append(label);
    }
  }

  function getAvailableStats() {
    const counts = new Map();
    for (const item of items) {
      for (const stat of getAllStats(item)) {
        counts.set(stat.stat, (counts.get(stat.stat) ?? 0) + 1);
      }
    }

    return Array.from(counts.entries()).sort((left, right) => {
      const labelCompare = getStatLabel(left[0]).localeCompare(getStatLabel(right[0]), "ja");
      return labelCompare || left[0].localeCompare(right[0]);
    });
  }

  function updateStatFilterRow(row) {
    const statSelect = row.querySelector('[data-field="stat"]');
    const previousValue = statSelect.value;

    statSelect.replaceChildren();
    statSelect.append(createOption("", "能力を選択"));

    for (const [stat, count] of getAvailableStats()) {
      const label = `${getStatLabel(stat)} (${count})`;
      statSelect.append(createOption(stat, label));
    }

    const hasPreviousValue = Array.from(statSelect.options)
      .some((option) => option.value === previousValue);
    statSelect.value = hasPreviousValue ? previousValue : "";
  }

  function addStatFilter() {
    const currentCount = dom.statFilterList.querySelectorAll(".stat-filter-row").length;
    const canAdd = currentCount < MAX_STAT_FILTERS;
    if (!canAdd) {
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
    const currentCount = dom.statFilterList.querySelectorAll(".stat-filter-row").length;
    dom.addStatFilterButton.disabled = currentCount >= MAX_STAT_FILTERS;
  }

  /* ========================================================
     フィルター値の取得
     ======================================================== */
  function getSelectedGrades() {
    const selectedGrades = new Set();
    const checkedInputs = dom.gradeFilters.querySelectorAll("input:checked");
    for (const input of checkedInputs) {
      selectedGrades.add(input.value);
    }
    return selectedGrades;
  }

  function getStatFilters() {
    const filters = [];
    const rows = dom.statFilterList.querySelectorAll(".stat-filter-row");

    for (const row of rows) {
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

  function getFilters() {
    return {
      keyword: normalizeText(dom.keyword.value),
      itemKey: normalizeText(dom.itemKey.value),
      type: dom.itemType.value,
      materialCategory: dom.materialCategory.value,
      itemClass: dom.itemClass.value,
      parts: dom.parts.value,
      gearType: dom.gearType.value,
      gearGroup: dom.gearGroup.value,
      variant: dom.variant.value,
      obtainable: dom.obtainable.value,
      tradable: dom.tradable.value,
      levelMin: parseOptionalNumber(dom.levelMin.value),
      levelMax: parseOptionalNumber(dom.levelMax.value),
      goldMin: parseOptionalNumber(dom.goldMin.value),
      goldMax: parseOptionalNumber(dom.goldMax.value),
      decorationMin: parseOptionalNumber(dom.decorationMin.value),
      engravingMin: parseOptionalNumber(dom.engravingMin.value),
      inscriptionMin: parseOptionalNumber(dom.inscriptionMin.value),
      uniqueMod: dom.uniqueMod.value,
      grades: getSelectedGrades(),
      includeAllClass: dom.includeAllClass.checked,
      statMatchMode: dom.statMatchMode.value,
      statFilters: getStatFilters(),
    };
  }

  /* ========================================================
     フィルター判定
     ======================================================== */
  function matchesKeyword(item, keyword) {
    if (!keyword) {
      return true;
    }

    const searchableValues = [
      item.key,
      getJapaneseName(item),
      item.name,
      getTypeLabel(item.type),
      getMaterialCategoryLabel(getMaterialCategory(item)),
      getGradeLabel(item.grade),
      getPartLabel(item.parts),
      getGearTypeLabel(item.gearType),
      getGearGroupLabel(item.gearGroup),
      getUniqueModLabel(item.uniqueMod),
      ...(item.classes ?? []).map(getClassLabel),
    ];

    for (const stat of getAllStats(item)) {
      searchableValues.push(getStatLabel(stat.stat));
      searchableValues.push(stat.stat);
      searchableValues.push(MOD_LABELS[stat.mod] ?? stat.mod);
      searchableValues.push(stat.disp);
    }

    return searchableValues.some((value) => normalizeText(value).includes(keyword));
  }

  function matchesBooleanFilter(actualValue, filterValue) {
    if (!filterValue) {
      return true;
    }

    const expectedValue = filterValue === "true";
    return actualValue === expectedValue;
  }

  function matchesRange(actualValue, minimum, maximum) {
    if (minimum === null && maximum === null) {
      return true;
    }

    const hasActualValue = actualValue !== null && actualValue !== undefined;
    if (!hasActualValue) {
      return false;
    }

    const isAboveMinimum = minimum === null || actualValue >= minimum;
    const isBelowMaximum = maximum === null || actualValue <= maximum;
    return isAboveMinimum && isBelowMaximum;
  }

  function matchesClass(item, itemClass, includeAllClass) {
    if (!itemClass) {
      return true;
    }

    const classes = item.classes ?? [];
    if (classes.includes(itemClass)) {
      return true;
    }

    const canMatchAllClass = includeAllClass && itemClass !== "All";
    return canMatchAllClass && classes.includes("All");
  }

  function matchesVariant(item, variant) {
    if (!variant) {
      return true;
    }

    if (variant === "none") {
      return !item.variant;
    }

    return item.variant === variant;
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

    const actualValue = item.slots?.[slotName];
    return actualValue !== null && actualValue !== undefined && actualValue >= minimum;
  }

  function matchesSingleStatFilter(item, filter) {
    const itemStats = getAllStats(item);

    return itemStats.some((stat) => {
      const matchesSource = filter.source === "any" || stat.source === filter.source;
      const matchesStat = stat.stat === filter.stat;
      const matchesMod = !filter.mod || stat.mod === filter.mod;
      const matchesValue = matchesRange(stat.value, filter.min, filter.max);

      return matchesSource && matchesStat && matchesMod && matchesValue;
    });
  }

  function matchesStatFilters(item, filters, matchMode) {
    if (!filters.length) {
      return true;
    }

    if (matchMode === "or") {
      return filters.some((filter) => matchesSingleStatFilter(item, filter));
    }

    return filters.every((filter) => matchesSingleStatFilter(item, filter));
  }

  function matchesItem(item, filters, ignoredField = "") {
    const matchesItemKey = !filters.itemKey || String(item.key).includes(filters.itemKey);
    const matchesType = ignoredField === "type" || !filters.type || item.type === filters.type;
    const matchesMaterialCategory = ignoredField === "materialCategory"
      || !filters.materialCategory
      || getMaterialCategory(item) === filters.materialCategory;
    const matchesParts = ignoredField === "parts" || !filters.parts || item.parts === filters.parts;
    const matchesGearType = ignoredField === "gearType"
      || !filters.gearType
      || item.gearType === filters.gearType;
    const matchesGearGroup = ignoredField === "gearGroup"
      || !filters.gearGroup
      || item.gearGroup === filters.gearGroup;
    const matchesGrades = !filters.grades.size || filters.grades.has(item.grade);
    const matchesItemClass = ignoredField === "itemClass"
      || matchesClass(item, filters.itemClass, filters.includeAllClass);
    const matchesItemVariant = ignoredField === "variant"
      || matchesVariant(item, filters.variant);
    const matchesObtainable = ignoredField === "obtainable"
      || matchesBooleanFilter(item.obtainable, filters.obtainable);
    const matchesTradable = ignoredField === "tradable"
      || matchesBooleanFilter(item.tradable, filters.tradable);
    const matchesItemUniqueMod = ignoredField === "uniqueMod"
      || matchesUniqueMod(item, filters.uniqueMod);

    return (
      matchesKeyword(item, filters.keyword)
      && matchesItemKey
      && matchesType
      && matchesMaterialCategory
      && matchesItemClass
      && matchesParts
      && matchesGearType
      && matchesGearGroup
      && matchesItemVariant
      && matchesObtainable
      && matchesTradable
      && matchesRange(item.level, filters.levelMin, filters.levelMax)
      && matchesRange(item.gold, filters.goldMin, filters.goldMax)
      && matchesSlotMinimum(item, "decoration", filters.decorationMin)
      && matchesSlotMinimum(item, "engraving", filters.engravingMin)
      && matchesSlotMinimum(item, "inscription", filters.inscriptionMin)
      && matchesItemUniqueMod
      && matchesGrades
      && matchesStatFilters(item, filters.statFilters, filters.statMatchMode)
    );
  }

  /* ========================================================
     現在の条件で到達できない候補を各プルダウンから除外します。
     自分自身の条件だけを外して候補を算出するため、選び直しも可能です。
     ======================================================== */
  function replaceDynamicOptions(select, optionSpecs, allLabel = "すべて") {
    const selectedValue = select.value;
    const selectedOption = Array.from(select.options)
      .find((option) => option.value === selectedValue);
    const selectedLabel = selectedOption?.textContent ?? selectedValue;

    select.replaceChildren();
    select.append(createOption("", allLabel));

    for (const optionSpec of optionSpecs) {
      select.append(createOption(optionSpec.value, optionSpec.label));
    }

    const hasSelectedValue = Array.from(select.options)
      .some((option) => option.value === selectedValue);

    if (selectedValue && !hasSelectedValue) {
      select.append(createOption(selectedValue, selectedLabel));
    }

    select.value = selectedValue;
  }

  function buildFacetOptions(targetItems, valueGetter, labelGetter) {
    const values = new Set();

    for (const item of targetItems) {
      const rawValues = valueGetter(item);
      const itemValues = Array.isArray(rawValues) ? rawValues : [rawValues];

      for (const value of itemValues) {
        const hasValue = value !== null && value !== undefined && value !== "";
        if (hasValue) {
          values.add(String(value));
        }
      }
    }

    return Array.from(values)
      .map((value) => ({ value, label: labelGetter(value) }))
      .sort((left, right) => left.label.localeCompare(right.label, "ja"));
  }

  function getFacetItems(filters, ignoredField) {
    return items.filter((item) => matchesItem(item, filters, ignoredField));
  }

  function refreshDynamicFilterOptions(filters) {
    const typeItems = getFacetItems(filters, "type");
    replaceDynamicOptions(
      dom.itemType,
      buildFacetOptions(typeItems, (item) => item.type, getTypeLabel),
    );

    const materialCategoryItems = getFacetItems(filters, "materialCategory");
    replaceDynamicOptions(
      dom.materialCategory,
      buildFacetOptions(
        materialCategoryItems,
        getMaterialCategory,
        getMaterialCategoryLabel,
      ),
    );

    const classItems = getFacetItems(filters, "itemClass");
    replaceDynamicOptions(
      dom.itemClass,
      buildFacetOptions(classItems, (item) => item.classes ?? [], getClassLabel),
    );

    const partsItems = getFacetItems(filters, "parts");
    replaceDynamicOptions(
      dom.parts,
      buildFacetOptions(partsItems, (item) => item.parts, getPartLabel),
    );

    const gearTypeItems = getFacetItems(filters, "gearType");
    replaceDynamicOptions(
      dom.gearType,
      buildFacetOptions(gearTypeItems, (item) => item.gearType, getGearTypeLabel),
    );

    const gearGroupItems = getFacetItems(filters, "gearGroup");
    replaceDynamicOptions(
      dom.gearGroup,
      buildFacetOptions(gearGroupItems, (item) => item.gearGroup, getGearGroupLabel),
    );

    const variantItems = getFacetItems(filters, "variant");
    replaceDynamicOptions(
      dom.variant,
      buildFacetOptions(
        variantItems,
        (item) => item.variant ?? "none",
        (value) => value === "none" ? "なし" : value,
      ),
    );

    const obtainableItems = getFacetItems(filters, "obtainable");
    replaceDynamicOptions(
      dom.obtainable,
      buildFacetOptions(
        obtainableItems,
        (item) => String(item.obtainable),
        (value) => value === "true" ? "入手可能" : "入手不可",
      ),
    );

    const tradableItems = getFacetItems(filters, "tradable");
    replaceDynamicOptions(
      dom.tradable,
      buildFacetOptions(
        tradableItems,
        (item) => String(item.tradable),
        (value) => value === "true" ? "取引可能" : "取引不可",
      ),
    );

    const uniqueItems = getFacetItems(filters, "uniqueMod");
    const hasUniqueItem = uniqueItems.some((item) => {
      return !!item.uniqueMod && item.uniqueMod !== NO_UNIQUE_MOD;
    });
    const hasNonUniqueItem = uniqueItems.some((item) => {
      return !item.uniqueMod || item.uniqueMod === NO_UNIQUE_MOD;
    });
    const uniqueOptions = [];

    if (hasUniqueItem) {
      uniqueOptions.push({ value: "__has__", label: "ユニーク効果あり" });
    }

    if (hasNonUniqueItem) {
      uniqueOptions.push({ value: "__none__", label: "ユニーク効果なし" });
    }

    uniqueOptions.push(...buildFacetOptions(
      uniqueItems.filter((item) => !!item.uniqueMod && item.uniqueMod !== NO_UNIQUE_MOD),
      (item) => item.uniqueMod,
      getUniqueModLabel,
    ));
    replaceDynamicOptions(dom.uniqueMod, uniqueOptions);
  }

  /* ========================================================
     並び替え
     ======================================================== */
  function getStatSortValue(item) {
    const selectedStat = dom.sortStat.value;
    if (!selectedStat) {
      return null;
    }

    const source = dom.sortStatSource.value;
    const mod = dom.sortStatMod.value;
    const values = getAllStats(item)
      .filter((stat) => {
        const matchesSource = source === "any" || stat.source === source;
        const matchesStat = stat.stat === selectedStat;
        const matchesMod = !mod || stat.mod === mod;
        return matchesSource && matchesStat && matchesMod;
      })
      .map((stat) => Number(stat.value))
      .filter((value) => Number.isFinite(value));

    if (!values.length) {
      return null;
    }

    return Math.max(...values);
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

    return (leftValue - rightValue) * directionFactor;
  }

  function sortItems(targetItems) {
    const sortKey = dom.sortKey.value;
    const directionFactor = dom.sortDirection.value === "desc" ? -1 : 1;

    targetItems.sort((left, right) => {
      let comparison = 0;

      if (sortKey === "grade") {
        comparison = compareOptionalNumbers(left.gradeRank, right.gradeRank, directionFactor);
        if (!comparison) {
          comparison = compareOptionalNumbers(left.level, right.level, directionFactor);
        }
      } else if (sortKey === "level") {
        comparison = compareOptionalNumbers(left.level, right.level, directionFactor);
        if (!comparison) {
          comparison = compareOptionalNumbers(left.gradeRank, right.gradeRank, directionFactor);
        }
      } else if (sortKey === "name") {
        comparison = getJapaneseName(left).localeCompare(getJapaneseName(right), "ja") * directionFactor;
      } else if (sortKey === "gold") {
        comparison = compareOptionalNumbers(left.gold, right.gold, directionFactor);
      } else if (sortKey === "stat") {
        const leftStatValue = getStatSortValue(left);
        const rightStatValue = getStatSortValue(right);
        comparison = compareOptionalNumbers(leftStatValue, rightStatValue, directionFactor);
      } else {
        comparison = (Number(left.key) - Number(right.key)) * directionFactor;
      }

      if (!comparison) {
        comparison = Number(left.key) - Number(right.key);
      }

      return comparison;
    });
  }

  /* ========================================================
     結果表示
     ======================================================== */
  function renderStats(item) {
    const stats = getAllStats(item);
    if (!stats.length) {
      return EMPTY_LABEL;
    }

    return `
      <div class="stat-list">
        ${stats.map((stat) => {
          const sourceLabel = stat.source === "base" ? "基本" : "固有";
          const displayValue = stat.disp || formatNumber(stat.value);
          const title = `${sourceLabel} / ${MOD_LABELS[stat.mod] ?? stat.mod} / raw: ${stat.value}`;
          return `<span class="stat-badge" title="${escapeHtml(title)}">${escapeHtml(getStatLabel(stat.stat))} ${escapeHtml(displayValue)}</span>`;
        }).join("")}
      </div>
    `;
  }

  function renderStatus(item) {
    const obtainableClass = item.obtainable ? "status-yes" : "status-no";
    const tradableClass = item.tradable ? "status-yes" : "status-no";

    return `
      <div class="badge-list">
        <span class="badge ${obtainableClass}">${item.obtainable ? "入手可" : "入手不可"}</span>
        <span class="badge ${tradableClass}">${item.tradable ? "取引可" : "取引不可"}</span>
      </div>
    `;
  }

  function renderRows(pageItems) {
    if (!pageItems.length) {
      dom.resultBody.innerHTML = `
        <tr>
          <td colspan="11">条件に一致するアイテムがありません。</td>
        </tr>
      `;
      return;
    }

    dom.resultBody.innerHTML = pageItems.map((item) => {
      const classLabels = (item.classes ?? []).map(getClassLabel).join(" / ") || EMPTY_LABEL;
      const equipmentLabels = getGearTypeLabel(item.gearType);

      return `
        <tr tabindex="0" data-item-key="${escapeHtml(item.key)}" aria-label="${escapeHtml(getJapaneseName(item))}の詳細を開く">
          <td data-column="item-key">${escapeHtml(item.key)}</td>
          <td class="name-cell" data-column="name">
            <strong>${escapeHtml(getJapaneseName(item))}</strong>
            <span>${escapeHtml(item.name ?? EMPTY_LABEL)}</span>
          </td>
          <td data-column="item-type">${escapeHtml(getTypeLabel(item.type))}</td>
          <td data-column="grade"><span class="badge grade-badge">${escapeHtml(getGradeLabel(item.grade))}</span></td>
          <td data-column="level">${escapeHtml(formatNumber(item.level))}</td>
          <td data-column="class">${escapeHtml(classLabels)}</td>
          <td data-column="equipment">${escapeHtml(equipmentLabels)}</td>
          <td data-column="stats">${renderStats(item)}</td>
          <td data-column="unique-mod">${escapeHtml(getUniqueModLabel(item.uniqueMod))}</td>
          <td data-column="gold">${escapeHtml(formatNumber(item.gold))}</td>
          <td data-column="status">${renderStatus(item)}</td>
        </tr>
      `;
    }).join("");
  }

  function renderPagination() {
    const totalPages = Math.max(1, Math.ceil(state.filteredItems.length / state.pageSize));
    if (state.currentPage > totalPages) {
      state.currentPage = totalPages;
    }

    const pageStart = (state.currentPage - 1) * state.pageSize;
    const pageEnd = pageStart + state.pageSize;
    const pageItems = state.filteredItems.slice(pageStart, pageEnd);

    renderRows(pageItems);

    dom.pageStatus.textContent = `${state.currentPage} / ${totalPages}`;
    dom.previousPageButton.disabled = state.currentPage <= 1;
    dom.nextPageButton.disabled = state.currentPage >= totalPages;

    const visibleStart = state.filteredItems.length ? pageStart + 1 : 0;
    const visibleEnd = Math.min(pageEnd, state.filteredItems.length);
    dom.resultNote.textContent = `${visibleStart}〜${visibleEnd}件を表示`;
  }

  function applyFilters(options = {}) {
    const shouldResetPage = options.resetPage !== false;
    if (shouldResetPage) {
      state.currentPage = 1;
    }

    const filters = getFilters();
    state.filteredItems = items.filter((item) => matchesItem(item, filters));
    sortItems(state.filteredItems);
    refreshDynamicFilterOptions(filters);

    dom.resultCount.textContent = `${state.filteredItems.length.toLocaleString("ja-JP")}件`;
    renderPagination();
  }

  /* ========================================================
     全件1画面モーダル
     ======================================================== */
  const ONE_SCREEN_TABLE_WIDTH = 1360;
  const ONE_SCREEN_ROW_HEIGHT = 16;
  const ONE_SCREEN_HEADER_HEIGHT = 18;
  const ONE_SCREEN_TABLE_GAP = 8;
  const ONE_SCREEN_MAX_BLOCKS = 32;

  const ONE_SCREEN_COLUMN_KEYS = [
    "name",
    "grade",
    "level",
    "item-class",
    "equipment",
    "stats",
    "unique",
  ];

  const ONE_SCREEN_COLUMN_HEADERS = {
    name: "名称",
    grade: "レアリティ",
    level: "Lv",
    "item-class": "クラス",
    equipment: "装備分類",
    stats: "能力",
    unique: "ユニーク能力",
  };

  function renderOneScreenStats(item) {
    const stats = getAllStats(item);
    if (!stats.length) {
      return EMPTY_LABEL;
    }

    return stats
      .map((stat) => `${getStatLabel(stat.stat)} ${stat.disp || formatNumber(stat.value)}`)
      .join(" / ");
  }

  function getOneScreenValues(item) {
    return {
      name: getJapaneseName(item),
      grade: getGradeLabel(item.grade),
      level: formatNumber(item.level),
      "item-class": (item.classes ?? []).map(getClassLabel).join(" / ") || EMPTY_LABEL,
      equipment: getGearTypeLabel(item.gearType),
      stats: renderOneScreenStats(item),
      unique: getUniqueModLabel(item.uniqueMod),
    };
  }

  function renderOneScreenCell(value, columnKey) {
    return `
      <span class="one-screen-cell-clip" data-one-screen-column="${escapeHtml(columnKey)}">
        <span class="one-screen-cell-content one-screen-column-${escapeHtml(columnKey)}">${escapeHtml(value)}</span>
      </span>
    `;
  }

  function renderOneScreenRow(item) {
    const values = getOneScreenValues(item);

    return `
      <tr data-item-key="${escapeHtml(item.key)}" title="${escapeHtml(getJapaneseName(item))}">
        <td>${renderOneScreenCell(values.name, "name")}</td>
        <td>${renderOneScreenCell(values.grade, "grade")}</td>
        <td>${renderOneScreenCell(values.level, "level")}</td>
        <td>${renderOneScreenCell(values["item-class"], "item-class")}</td>
        <td>${renderOneScreenCell(values.equipment, "equipment")}</td>
        <td>${renderOneScreenCell(values.stats, "stats")}</td>
        <td>${renderOneScreenCell(values.unique, "unique")}</td>
      </tr>
    `;
  }

  function calculateOneScreenBlockCount(itemCount, viewportWidth, viewportHeight) {
    if (!itemCount) {
      return 1;
    }

    const maximumBlocks = Math.min(ONE_SCREEN_MAX_BLOCKS, itemCount);
    let bestBlockCount = 1;
    let bestScale = 0;

    for (let blockCount = 1; blockCount <= maximumBlocks; blockCount += 1) {
      const rowsPerBlock = Math.ceil(itemCount / blockCount);
      const estimatedWidth = (ONE_SCREEN_TABLE_WIDTH * blockCount)
        + (ONE_SCREEN_TABLE_GAP * (blockCount - 1));
      const estimatedHeight = ONE_SCREEN_HEADER_HEIGHT
        + (ONE_SCREEN_ROW_HEIGHT * rowsPerBlock);
      const widthScale = viewportWidth / estimatedWidth;
      const heightScale = viewportHeight / estimatedHeight;
      const estimatedScale = Math.min(widthScale, heightScale);

      if (estimatedScale > bestScale) {
        bestScale = estimatedScale;
        bestBlockCount = blockCount;
      }
    }

    return bestBlockCount;
  }

  function splitItemsIntoBlocks(targetItems, blockCount) {
    const rowsPerBlock = Math.ceil(targetItems.length / blockCount);
    const blocks = [];

    for (let blockIndex = 0; blockIndex < blockCount; blockIndex += 1) {
      const startIndex = blockIndex * rowsPerBlock;
      const endIndex = startIndex + rowsPerBlock;
      const blockItems = targetItems.slice(startIndex, endIndex);

      if (blockItems.length) {
        blocks.push(blockItems);
      }
    }

    return blocks;
  }

  function renderOneScreenTable(blockItems) {
    return `
      <table class="one-screen-table">
        <colgroup>
          <col class="one-screen-name-column">
          <col class="one-screen-grade-column">
          <col class="one-screen-level-column">
          <col class="one-screen-class-column">
          <col class="one-screen-equipment-column">
          <col class="one-screen-stats-column">
          <col class="one-screen-unique-column">
        </colgroup>
        <thead>
          <tr>
            ${ONE_SCREEN_COLUMN_KEYS.map((columnKey) => {
              return `<th>${renderOneScreenCell(ONE_SCREEN_COLUMN_HEADERS[columnKey], columnKey)}</th>`;
            }).join("")}
          </tr>
        </thead>
        <tbody>
          ${blockItems.map(renderOneScreenRow).join("")}
        </tbody>
      </table>
    `;
  }

  /* ========================================================
     列ごとの最長文字列だけを基準に横圧縮率を決めます。
     4万件を超えるDOM要素を個別計測せず、Canvasで高速に算出します。
     ======================================================== */
  function fitOneScreenColumnContents() {
    const sampleContent = dom.oneScreenSheet.querySelector(".one-screen-cell-content");
    if (!sampleContent) {
      return;
    }

    const context = document.createElement("canvas").getContext("2d");
    if (!context) {
      return;
    }

    context.font = window.getComputedStyle(sampleContent).font;
    const maximumWidths = {};

    for (const columnKey of ONE_SCREEN_COLUMN_KEYS) {
      maximumWidths[columnKey] = context.measureText(ONE_SCREEN_COLUMN_HEADERS[columnKey]).width;
    }

    for (const item of state.filteredItems) {
      const values = getOneScreenValues(item);

      for (const columnKey of ONE_SCREEN_COLUMN_KEYS) {
        const measuredWidth = context.measureText(String(values[columnKey] ?? EMPTY_LABEL)).width;
        if (measuredWidth > maximumWidths[columnKey]) {
          maximumWidths[columnKey] = measuredWidth;
        }
      }
    }

    for (const columnKey of ONE_SCREEN_COLUMN_KEYS) {
      const clip = dom.oneScreenSheet.querySelector(
        `.one-screen-cell-clip[data-one-screen-column="${columnKey}"]`,
      );
      const availableWidth = clip?.clientWidth ?? 0;
      const maximumWidth = maximumWidths[columnKey] ?? 0;
      const hasDimensions = !!availableWidth && !!maximumWidth;
      const safeAvailableWidth = Math.max(0, availableWidth - 2);
      const horizontalScale = hasDimensions
        ? Math.max(0.001, Math.min(1, (safeAvailableWidth / maximumWidth) * 0.65))
        : 1;

      dom.oneScreenSheet.style.setProperty(
        `--one-screen-${columnKey}-scale`,
        String(horizontalScale),
      );
    }
  }

  function fitOneScreenSheet() {
    const viewportWidth = dom.oneScreenViewport.clientWidth;
    const viewportHeight = dom.oneScreenViewport.clientHeight;
    const sheetWidth = dom.oneScreenSheet.scrollWidth;
    const sheetHeight = dom.oneScreenSheet.scrollHeight;
    const hasDimensions = !!viewportWidth && !!viewportHeight && !!sheetWidth && !!sheetHeight;

    if (!hasDimensions) {
      return;
    }

    const widthScale = viewportWidth / sheetWidth;
    const heightScale = viewportHeight / sheetHeight;
    const scale = Math.max(0.0001, Math.min(widthScale, heightScale, 1) * 0.995);
    const scaledWidth = sheetWidth * scale;
    const scaledHeight = sheetHeight * scale;
    const left = Math.max(0, (viewportWidth - scaledWidth) / 2);
    const top = Math.max(0, (viewportHeight - scaledHeight) / 2);

    dom.oneScreenSheet.style.left = `${left}px`;
    dom.oneScreenSheet.style.top = `${top}px`;
    dom.oneScreenSheet.style.transform = `scale(${scale})`;

    const blockCount = dom.oneScreenSheet.querySelectorAll(".one-screen-table").length;
    const scalePercent = (scale * 100).toFixed(scale >= 0.1 ? 1 : 2);
    dom.oneScreenMeta.textContent = `${state.filteredItems.length.toLocaleString("ja-JP")}件 / ${blockCount}分割 / 表示倍率 ${scalePercent}%`;
  }

  function renderOneScreenResult() {
    const viewportWidth = dom.oneScreenViewport.clientWidth;
    const viewportHeight = dom.oneScreenViewport.clientHeight;
    const blockCount = calculateOneScreenBlockCount(
      state.filteredItems.length,
      viewportWidth,
      viewportHeight,
    );
    const blocks = splitItemsIntoBlocks(state.filteredItems, blockCount);

    dom.oneScreenSheet.style.left = "0";
    dom.oneScreenSheet.style.top = "0";
    dom.oneScreenSheet.style.transform = "none";

    if (!blocks.length) {
      dom.oneScreenSheet.innerHTML = '<p class="one-screen-empty">条件に一致するアイテムがありません。</p>';
      dom.oneScreenMeta.textContent = "0件";
      fitOneScreenSheet();
      return;
    }

    dom.oneScreenSheet.innerHTML = blocks.map(renderOneScreenTable).join("");
    fitOneScreenColumnContents();
    fitOneScreenSheet();
  }

  function hasOneScreenDialogElements() {
    return !!dom.oneScreenDialog
      && !!dom.oneScreenMeta
      && !!dom.oneScreenViewport
      && !!dom.oneScreenSheet
      && !!dom.closeOneScreenButton;
  }

  function openOneScreenDialog() {
    const canOpenDialog = hasOneScreenDialogElements()
      && typeof dom.oneScreenDialog.showModal === "function";

    if (!canOpenDialog) {
      console.error("1画面表示に必要なモーダル要素が見つかりません。index.htmlとapp.jsの版を揃えてください。");
      return;
    }

    dom.oneScreenDialog.showModal();

    window.requestAnimationFrame(() => {
      renderOneScreenResult();
    });
  }

  function scheduleOneScreenRefit() {
    const canRefit = hasOneScreenDialogElements() && dom.oneScreenDialog.open;
    if (!canRefit) {
      return;
    }

    if (state.oneScreenResizeFrame) {
      window.cancelAnimationFrame(state.oneScreenResizeFrame);
    }

    state.oneScreenResizeFrame = window.requestAnimationFrame(() => {
      state.oneScreenResizeFrame = null;
      renderOneScreenResult();
    });
  }

  /* ========================================================
     詳細表示
     ======================================================== */
  function createDetailItem(label, value) {
    return `
      <div class="detail-item">
        <dt>${escapeHtml(label)}</dt>
        <dd>${escapeHtml(value ?? EMPTY_LABEL)}</dd>
      </div>
    `;
  }

  function renderDetailStats(item, source) {
    const stats = item.stats?.[source] ?? [];
    if (!stats.length) {
      return `<p class="muted">なし</p>`;
    }

    return `
      <div class="stat-list">
        ${stats.map((stat) => {
          const label = `${getStatLabel(stat.stat)} ${stat.disp || formatNumber(stat.value)}`;
          const detail = `${MOD_LABELS[stat.mod] ?? stat.mod} / raw: ${stat.value}`;
          return `<span class="stat-badge" title="${escapeHtml(detail)}">${escapeHtml(label)}</span>`;
        }).join("")}
      </div>
    `;
  }

  function showItemDetail(itemKey) {
    const item = items.find((candidate) => String(candidate.key) === String(itemKey));
    if (!item) {
      return;
    }

    const classes = (item.classes ?? []).map(getClassLabel).join(" / ") || EMPTY_LABEL;
    const slots = item.slots
      ? Object.entries(item.slots)
        .map(([slotName, count]) => `${SLOT_LABELS[slotName] ?? slotName}: ${count}`)
        .join(" / ")
      : EMPTY_LABEL;

    dom.detailTitle.textContent = `${getJapaneseName(item)} (${item.key})`;
    dom.detailContent.innerHTML = `
      <dl class="detail-grid">
        ${createDetailItem("英語名", item.name)}
        ${createDetailItem("アイテム種別", getTypeLabel(item.type))}
        ${createDetailItem("素材分類", getMaterialCategoryLabel(getMaterialCategory(item)))}
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
        ${createDetailItem("ドロップキー", formatNumber(item.dropKey))}
        ${createDetailItem("アイコン", item.icon ?? EMPTY_LABEL)}
        ${createDetailItem("ユニーク効果", getUniqueModLabel(item.uniqueMod))}
      </dl>

      <section class="detail-section">
        <h3>基本能力</h3>
        ${renderDetailStats(item, "base")}
      </section>

      <section class="detail-section">
        <h3>固有能力</h3>
        ${renderDetailStats(item, "inherent")}
      </section>

      <section class="detail-section">
        <h3>元データ</h3>
        <pre class="raw-json">${escapeHtml(JSON.stringify(item, null, 2))}</pre>
      </section>
    `;

    dom.detailDialog.showModal();
  }

  /* ========================================================
     CSV出力
     ======================================================== */
  function escapeCsv(value) {
    const text = String(value ?? "");
    const escapedText = text.replace(/"/g, '""');
    return `"${escapedText}"`;
  }

  function exportCsv() {
    const header = [
      "item-key",
      "name-ja",
      "name-en",
      "item-type",
      "material-category",
      "grade",
      "level",
      "classes",
      "parts",
      "gear-type",
      "gear-group",
      "variant",
      "gold",
      "obtainable",
      "tradable",
      "decoration-slots",
      "engraving-slots",
      "inscription-slots",
      "base-stats",
      "inherent-stats",
      "unique-mod",
      "drop-key",
      "icon",
    ];

    const rows = [header.map(escapeCsv).join(",")];

    for (const item of state.filteredItems) {
      const baseStats = (item.stats?.base ?? [])
        .map((stat) => `${getStatLabel(stat.stat)} ${stat.disp || stat.value} [${MOD_LABELS[stat.mod] ?? stat.mod}]`)
        .join(" / ");
      const inherentStats = (item.stats?.inherent ?? [])
        .map((stat) => `${getStatLabel(stat.stat)} ${stat.disp || stat.value} [${MOD_LABELS[stat.mod] ?? stat.mod}]`)
        .join(" / ");

      const row = [
        item.key,
        getJapaneseName(item),
        item.name,
        getTypeLabel(item.type),
        getMaterialCategoryLabel(getMaterialCategory(item)),
        getGradeLabel(item.grade),
        item.level,
        (item.classes ?? []).map(getClassLabel).join(" / "),
        getPartLabel(item.parts),
        getGearTypeLabel(item.gearType),
        getGearGroupLabel(item.gearGroup),
        item.variant,
        item.gold,
        item.obtainable ? "true" : "false",
        item.tradable ? "true" : "false",
        item.slots?.decoration,
        item.slots?.engraving,
        item.slots?.inscription,
        baseStats,
        inherentStats,
        getUniqueModLabel(item.uniqueMod),
        item.dropKey,
        item.icon,
      ];

      rows.push(row.map(escapeCsv).join(","));
    }

    const csv = `\uFEFF${rows.join("\r\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    anchor.href = url;
    anchor.download = `tbh-items-${timestamp}.csv`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  /* ========================================================
     リセット
     ======================================================== */
  function resetFilters() {
    const inputs = dom.filterContent.querySelectorAll("input, select");
    for (const input of inputs) {
      if (input.type === "checkbox") {
        input.checked = input.id === "include-all-class";
      } else {
        input.value = "";
      }
    }

    dom.statMatchMode.value = "and";
    dom.statFilterList.replaceChildren();
    dom.pageSize.value = String(DEFAULT_PAGE_SIZE);
    dom.sortKey.value = "grade";
    dom.sortStatSource.value = "any";
    dom.sortStat.value = "";
    dom.sortStatMod.value = "";
    dom.sortDirection.value = "asc";
    state.pageSize = DEFAULT_PAGE_SIZE;
    updateStatSortControls();

    addStatFilter();
    applyFilters();
  }

  /* ========================================================
     イベント登録
     ======================================================== */
  function registerEvents() {
    let keywordTimer = null;

    dom.filterContent.addEventListener("input", (event) => {
      const isKeywordInput = event.target === dom.keyword;
      if (isKeywordInput) {
        window.clearTimeout(keywordTimer);
        keywordTimer = window.setTimeout(() => applyFilters(), 120);
        return;
      }

      applyFilters();
    });

    dom.filterContent.addEventListener("change", () => applyFilters());

    dom.addStatFilterButton.addEventListener("click", () => {
      addStatFilter();
    });

    dom.statFilterList.addEventListener("change", (event) => {
      const sourceSelect = event.target.closest('[data-field="source"]');
      if (!sourceSelect) {
        return;
      }

      const row = sourceSelect.closest(".stat-filter-row");
      updateStatFilterRow(row);
    });

    dom.statFilterList.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".stat-filter-remove");
      if (!removeButton) {
        return;
      }

      removeButton.closest(".stat-filter-row").remove();
      updateAddStatFilterButton();
      applyFilters();
    });

    dom.resetButton.addEventListener("click", resetFilters);
    dom.exportButton.addEventListener("click", exportCsv);

    if (dom.oneScreenModeButton) {
      dom.oneScreenModeButton.addEventListener("click", openOneScreenDialog);
    }

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
      if (state.currentPage <= 1) {
        return;
      }

      state.currentPage -= 1;
      renderPagination();
    });

    dom.nextPageButton.addEventListener("click", () => {
      const totalPages = Math.max(1, Math.ceil(state.filteredItems.length / state.pageSize));
      if (state.currentPage >= totalPages) {
        return;
      }

      state.currentPage += 1;
      renderPagination();
    });

    dom.resultBody.addEventListener("click", (event) => {
      const row = event.target.closest("tr[data-item-key]");
      if (row) {
        showItemDetail(row.dataset.itemKey);
      }
    });

    dom.resultBody.addEventListener("keydown", (event) => {
      const isActivationKey = event.key === "Enter" || event.key === " ";
      if (!isActivationKey) {
        return;
      }

      const row = event.target.closest("tr[data-item-key]");
      if (row) {
        event.preventDefault();
        showItemDetail(row.dataset.itemKey);
      }
    });

    if (hasOneScreenDialogElements()) {
      dom.closeOneScreenButton.addEventListener("click", () => dom.oneScreenDialog.close());
      dom.oneScreenSheet.addEventListener("click", (event) => {
        const row = event.target.closest("tr[data-item-key]");
        if (!row) {
          return;
        }

        dom.oneScreenDialog.close();
        showItemDetail(row.dataset.itemKey);
      });
      window.addEventListener("resize", scheduleOneScreenRefit);
    }

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
     起動処理
     ======================================================== */
  function initialize() {
    if (!items.length) {
      dom.resultCount.textContent = "データを読み込めませんでした";
      dom.resultNote.textContent = "data.js が同じフォルダにあるか確認してください。";
      return;
    }

    renderSummaryCards();
    renderBasicFilterOptions();
    renderSortStatOptions();
    renderGradeFilters();
    updateStatSortControls();
    addStatFilter();
    registerEvents();
    applyFilters();
  }

  initialize();
})();
