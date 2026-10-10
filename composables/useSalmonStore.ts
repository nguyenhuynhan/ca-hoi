export interface SalmonProduct {
  id: string
  sku: string
  name: string
  shortName: string
  menuLabel: string
  unit: string
  sizeSpec: string
  packaging: string
  origin: string
  flag: string
  species: string
  price: number
  priceDisplay: string
  isPerKg: boolean
  defaultQty: number
  unitLabel: string
  portionWeight?: string
  averageWeightKg?: number
  image: string
  state: string
  badge: string
  grade: string
  culinaryUses: string[]
  accentColor: string
  tagline: string
  description: string
  recipeIds: string[]
  bestRecipeId: string
}

export interface ProcessingOption {
  id: string
  name: string
  badge: string
  description: string
  icon: string
}

export interface RecipeIngredient {
  name: string
  amount: string
  highlight?: boolean
}

export interface RecipeStep {
  step: number
  title: string
  detail: string
  time?: string
}

export interface SalmonRecipe {
  id: string
  name: string
  shortName: string
  category: string
  badge: string
  cookTime: string
  difficulty: 'Rất dễ' | 'Dễ' | 'Trung bình'
  servings: string
  calories: string
  image: string
  recommendedProductId: string
  recommendedProductName: string
  recommendedCutReason: string
  compatibleProductIds: string[]
  tagline: string
  description: string
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  chefTip: string
}

export const SALMON_CATALOG: SalmonProduct[] = [
  {
    id: 'nauy-nguyen-con',
    sku: '9035010561',
    name: 'CÁ HỒI NAUY TƯƠI NGUYÊN CON',
    shortName: 'Nauy Nguyên Con',
    menuLabel: 'Cá Hồi Nauy Tươi Nguyên Con',
    unit: 'CON',
    sizeSpec: '5-6 KG/CON',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, 1 CON/THÙNG, 3 CON/THÙNG',
    origin: 'NAUY',
    flag: '🇳🇴',
    species: 'Salmo Salar (Atlantic Salmon)',
    price: 430000,
    priceDisplay: '430.000 đ/kg',
    isPerKg: true,
    defaultQty: 1,
    unitLabel: 'con (~5.5kg)',
    averageWeightKg: 5.5,
    image: '/images/salmon/nauy-nguyen-con.jpg',
    state: 'Tươi Sống Ướp Đá 0°C – 2°C',
    badge: 'Chính Ngạch Bay 24H',
    grade: 'Sashimi Grade Thượng Hạng',
    culinaryUses: ['Ăn sống Sashimi', 'Áp chảo Steak', 'Phi lê lẩu nướng', 'Đầu & xương nấu lẩu chua'],
    accentColor: '#38bdf8',
    tagline: 'Đại dương phương Bắc — Bay thẳng từ Na Uy trong ngày',
    description: 'Cá hồi tươi nguyên con nhập khẩu chính ngạch đường hàng không từ các vịnh biển tinh khiết nhất Na Uy. Thân tròn đẫy đà, mắt trong veo, vảy bạc lấp lánh bám chặt, thịt cá đàn hồi mọng nước ngọt thanh tự nhiên.',
    bestRecipeId: 'lau-dau-ca-hoi-mang-chua',
    recipeIds: [
      'lau-dau-ca-hoi-mang-chua',
      'ca-hoi-ap-chao-bo-toi',
      'ca-hoi-nuong-pho-mai',
      'ca-hoi-sot-cam',
      'salad-ca-hoi-qua-bo',
      'chao-ca-hoi-hat-sen',
      'mi-y-ca-hoi-sot-kem'
    ]
  },
  {
    id: 'nauy-nguyen-tang',
    sku: '6035010561',
    name: 'CÁ HỒI NAUY TƯƠI NGUYÊN TẢNG',
    shortName: 'Nauy Nguyên Tảng',
    menuLabel: 'Cá Hồi Nauy Tươi Nguyên Tảng',
    unit: 'KG',
    sizeSpec: '1.6KG -UP/TẢNG',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, HÚT CHÂN KHÔNG THEO TẢNG',
    origin: 'NAUY',
    flag: '🇳🇴',
    species: 'Salmo Salar (Atlantic Salmon)',
    price: 629000,
    priceDisplay: '629.000 đ/kg',
    isPerKg: true,
    defaultQty: 1,
    unitLabel: 'kg (tảng ~1.8kg)',
    averageWeightKg: 1.8,
    image: '/images/salmon/nauy-nguyen-tang.jpg',
    state: 'Tươi Hút Chân Không 0°C – 2°C',
    badge: 'Bán Chạy Nhất',
    grade: 'Sashimi Grade Siêu Béo',
    culinaryUses: ['Sashimi / Sushi chuẩn Nhật', 'Steak bơ tỏi áp chảo', 'Nướng sốt cam / teriyaki'],
    accentColor: '#ff6b4a',
    tagline: 'Vân mỡ cẩm thạch hoàn hảo — Béo ngậy tan ngay đầu lưỡi',
    description: 'Nguyên tảng phi lê nửa thân cá hồi Na Uy tươi còn da hoặc lọc da theo yêu cầu. Đường vân mỡ trắng ngà xen kẽ thịt cam hồng tự nhiên, thịt đanh chắc không bở, ngọt đậm đà, lý tưởng nhất cho tiệc Sashimi cao cấp.',
    bestRecipeId: 'ca-hoi-ap-chao-bo-toi',
    recipeIds: [
      'ca-hoi-ap-chao-bo-toi',
      'ca-hoi-nuong-pho-mai',
      'ca-hoi-sot-cam',
      'salad-ca-hoi-qua-bo',
      'mi-y-ca-hoi-sot-kem'
    ]
  },
  {
    id: 'nauy-phi-le',
    sku: '6035010562',
    name: 'CÁ HỒI NAUY TƯƠI PHI LÊ',
    shortName: 'Nauy Tươi Phi Lê',
    menuLabel: 'Cá Hồi Nauy Tươi Phi Lê Miếng',
    unit: 'KG',
    sizeSpec: 'DƯỚI 1.6KG/ MIẾNG',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, HÚT CHÂN KHÔNG THEO KHỐI LƯỢNG KHÁCH MUA',
    origin: 'NAUY',
    flag: '🇳🇴',
    species: 'Salmo Salar (Atlantic Salmon)',
    price: 699000,
    priceDisplay: '699.000 đ/kg',
    isPerKg: true,
    defaultQty: 1,
    unitLabel: 'kg (cắt theo yêu cầu)',
    averageWeightKg: 1.0,
    image: '/images/salmon/nauy-phi-le.jpg',
    state: 'Tươi Phi Lê Sạch Xương 100%',
    badge: 'Cắt Tươi Mỗi Ngày',
    grade: 'Rút Xương 100% Cắt Miếng',
    culinaryUses: ['Ăn sống Sashimi hảo hạng', 'Steak cá hồi sốt chanh leo', 'Salad cá hồi quả bơ'],
    accentColor: '#f97316',
    tagline: 'Cắt miếng gọn gàng — Sạch xương 100%, chế biến tiện lợi',
    description: 'Được phi lê và rút xương thủ công tỉ mỉ từng thớ, cắt khẩu phần vừa vặn theo trọng lượng khách yêu cầu. Thịt cá giữ trọn hương vị tươi mát của biển sâu, giàu Omega-3, DHA tốt cho cả gia đình và bé nhỏ.',
    bestRecipeId: 'ca-hoi-ap-chao-bo-toi',
    recipeIds: [
      'ca-hoi-ap-chao-bo-toi',
      'ca-hoi-nuong-pho-mai',
      'ca-hoi-sot-cam',
      'salad-ca-hoi-qua-bo',
      'mi-y-ca-hoi-sot-kem'
    ]
  },
  {
    id: 'nauy-phi-le-200g',
    sku: '6035010567',
    name: 'CÁ HỒI NAUY TƯƠI PHI LÊ 200GR',
    shortName: 'Nauy Phi Lê 200g',
    menuLabel: 'Cá Hồi Nauy Phi Lê Khay 200g',
    unit: 'KHAY',
    sizeSpec: '200G/ KHAY',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, HÚT CHÂN KHÔNG THEO KHỐI LƯỢNG KHÁCH MUA',
    origin: 'NAUY',
    flag: '🇳🇴',
    species: 'Salmo Salar (Atlantic Salmon)',
    price: 136000,
    priceDisplay: '136.000 đ/khay',
    isPerKg: false,
    defaultQty: 1,
    unitLabel: 'khay (200g)',
    portionWeight: '200g',
    image: '/images/salmon/nauy-phi-le-200g.jpg',
    state: 'Khay Đen Skin-Pack Chân Không',
    badge: 'Khẩu Phần 1-2 Người',
    grade: 'Tiêu Chuẩn Châu Âu',
    culinaryUses: ['Bữa tối nhanh 1-2 người', 'Sashimi tiện lợi', 'Áp chảo 5 phút chuẩn vị'],
    accentColor: '#fb923c',
    tagline: 'Khay tiệt trùng tiện dụng — Giữ trọn độ tươi sống từng bữa ăn',
    description: 'Khẩu phần 200g chuẩn xác đóng gói màng hút chân không Skin-pack cao cấp. Rất thích hợp cho bữa tối gia đình nhỏ hoặc người bận rộn, chỉ cần mở khay là có thể chế biến ngay không cần sơ chế phức tạp.',
    bestRecipeId: 'ca-hoi-sot-cam',
    recipeIds: [
      'ca-hoi-sot-cam',
      'ca-hoi-ap-chao-bo-toi',
      'ca-hoi-nuong-pho-mai',
      'salad-ca-hoi-qua-bo',
      'mi-y-ca-hoi-sot-kem'
    ]
  },
  {
    id: 'nauy-cat-thoi-100g',
    sku: '6035010563',
    name: 'CÁ HỒI NAUY PHI LÊ CẮT THỎI 100GR',
    shortName: 'Nauy Thỏi 100g',
    menuLabel: 'Nauy Phi Lê Cắt Thỏi 100g',
    unit: 'KHAY',
    sizeSpec: '100G/KHAY',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, HÚT CHÂN KHÔNG THEO KHỐI LƯỢNG KHÁCH MUA',
    origin: 'NAUY',
    flag: '🇳🇴',
    species: 'Salmo Salar (Atlantic Salmon)',
    price: 66000,
    priceDisplay: '66.000 đ/khay',
    isPerKg: false,
    defaultQty: 1,
    unitLabel: 'khay (100g)',
    portionWeight: '100g',
    image: '/images/salmon/nauy-cat-thoi-100g.jpg',
    state: 'Khay Sashimi Cắt Thỏi Ăn Liền',
    badge: 'Sashimi Ăn Liền',
    grade: 'Cắt Thỏi Sashimi Dày',
    culinaryUses: ['Chấm mù tạt tương Nhật ăn ngay', 'Cuộn Sushi Nigiri', 'Poke bowl dinh dưỡng'],
    accentColor: '#fdba74',
    tagline: 'Cắt thỏi vuông vắn — Chuẩn kích thước Sashimi & Sushi Nhật',
    description: 'Thịt cá hồi Na Uy tươi được cắt thỏi vuông chuẩn từng milimet chuyên dùng cho Sashimi và Sushi. Thớ thịt chắc, vị béo ngậy ngọt đượm quyện cùng wasabi cay nồng mang lại trải nghiệm ẩm thực thăng hoa.',
    bestRecipeId: 'mi-y-ca-hoi-sot-kem',
    recipeIds: [
      'mi-y-ca-hoi-sot-kem',
      'salad-ca-hoi-qua-bo',
      'chao-ca-hoi-hat-sen'
    ]
  },
  {
    id: 'chile-nguyen-con',
    sku: '9045012001',
    name: 'CÁ HỒI CHILE NGUYÊN CON ĐÔNG LẠNH',
    shortName: 'Chile Nguyên Con',
    menuLabel: 'Cá Hồi Chile Nguyên Con Đông Lạnh',
    unit: 'KG',
    sizeSpec: '5-6KG/CON',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, NGUYÊN CON',
    origin: 'CHILE',
    flag: '🇨🇱',
    species: 'Pacific Salmon / Coho',
    price: 247000,
    priceDisplay: '247.000 đ/kg',
    isPerKg: true,
    defaultQty: 1,
    unitLabel: 'con (~5.5kg)',
    averageWeightKg: 5.5,
    image: '/images/salmon/chile-nguyen-con.jpg',
    state: 'Cấp Đông Sâu IQF -18°C',
    badge: 'Giá Sỉ Tiết Kiệm',
    grade: 'Chuẩn Xuất Khẩu Quốc Tế',
    culinaryUses: ['Làm tiệc, nhà hàng, quán ăn', 'Nướng nguyên con bơ tỏi', 'Lẩu hải sản chua cay'],
    accentColor: '#38bdf8',
    tagline: 'Cấp đông nhanh IQF -18°C — Khóa chặt độ tươi ngon từ khơi xa',
    description: 'Cá hồi Chile đánh bắt tự nhiên từ vùng biển Nam Cực trong lành, cấp đông sâu IQF ngay trên tàu biển. Thịt cá giữ nguyên hàm lượng dinh dưỡng, giá thành kinh tế tối ưu cho nhà hàng và tiệc tùng đông người.',
    bestRecipeId: 'lau-dau-ca-hoi-mang-chua',
    recipeIds: [
      'lau-dau-ca-hoi-mang-chua',
      'ca-hoi-nuong-pho-mai',
      'chao-ca-hoi-hat-sen',
      'ca-hoi-sot-cam'
    ]
  },
  {
    id: 'chile-coho-200g',
    sku: '6035012002',
    name: 'CÁ HỒI CHILE COHO PHI LÊ RĐ 200G',
    shortName: 'Chile Coho 200g',
    menuLabel: 'Chile Coho Phi Lê Rã Đông 200g',
    unit: 'KHAY',
    sizeSpec: '200G/KHAY',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, HÚT CHÂN KHÔNG THEO KHỐI LƯỢNG KHÁCH MUA',
    origin: 'CHILE COHO',
    flag: '🇨🇱',
    species: 'Oncorhynchus kisutch (Coho)',
    price: 81000,
    priceDisplay: '81.000 đ/khay',
    isPerKg: false,
    defaultQty: 1,
    unitLabel: 'khay (200g)',
    portionWeight: '200g',
    image: '/images/salmon/chile-coho-200g.jpg',
    state: 'Coho Đỏ Đậm Rã Đông Sẵn',
    badge: 'Đỏ Đậm Tự Nhiên',
    grade: 'Thịt Đanh Chắc Săn',
    culinaryUses: ['Áp chảo sốt tiêu đen', 'Nướng mỡ hành phô mai', 'Nấu cháo bồi bổ sức khỏe'],
    accentColor: '#ef4444',
    tagline: 'Sắc đỏ ruby quý hiếm — Thịt đanh chắc, hương thơm biển đậm đà',
    description: 'Dòng cá hồi Coho đặc hữu Chile với màu thịt đỏ thẫm tự nhiên độc đáo. Thớ thịt chắc nịch ít mỡ thừa, rất thích hợp cho người ăn kiêng, tập gym, gymer và các món áp chảo, nướng đậm vị.',
    bestRecipeId: 'ca-hoi-nuong-pho-mai',
    recipeIds: [
      'ca-hoi-nuong-pho-mai',
      'ca-hoi-ap-chao-bo-toi',
      'ca-hoi-sot-cam',
      'chao-ca-hoi-hat-sen',
      'mi-y-ca-hoi-sot-kem'
    ]
  },
  {
    id: 'chile-coho-thoi-100g',
    sku: '6035012003',
    name: 'CÁ HỒI CHILE COHO PHI LÊ CẮT THỎI RĐ 100G',
    shortName: 'Chile Coho Thỏi 100g',
    menuLabel: 'Chile Coho Cắt Thỏi Rã Đông 100g',
    unit: 'KHAY',
    sizeSpec: '100G/KHAY',
    packaging: 'THÙNG XỐP ƯỚP ĐÁ, HÚT CHÂN KHÔNG THEO KHỐI LƯỢNG KHÁCH MUA',
    origin: 'CHILE COHO',
    flag: '🇨🇱',
    species: 'Oncorhynchus kisutch (Coho)',
    price: 41000,
    priceDisplay: '41.000 đ/khay',
    isPerKg: false,
    defaultQty: 1,
    unitLabel: 'khay (100g)',
    portionWeight: '100g',
    image: '/images/salmon/chile-coho-thoi-100g.jpg',
    state: 'Khay Cắt Thỏi Hút Chân Không',
    badge: 'Giá Tốt Nhất',
    grade: 'Coho Đỏ Đậm Săn Chắc',
    culinaryUses: ['Mì Ý cá hồi sốt kem', 'Nấu cháo súp dinh dưỡng bé', 'Chiên giòn tẩm bột tempura'],
    accentColor: '#f43f5e',
    tagline: 'Tiết kiệm & dinh dưỡng — Sẵn sàng nấu ngay không hao hụt',
    description: 'Từng thỏi cá hồi Coho đỏ au cắt miếng chuẩn 100g, thích hợp tuyệt đối cho các món nấu sốt, làm mì Ý sốt kem nấm hoặc nấu cháo dinh dưỡng cho các bé yêu với chi phí siêu tiết kiệm chỉ 41k/khay.',
    bestRecipeId: 'chao-ca-hoi-hat-sen',
    recipeIds: [
      'chao-ca-hoi-hat-sen',
      'mi-y-ca-hoi-sot-kem',
      'salad-ca-hoi-qua-bo'
    ]
  }
]

export const PROCESSING_OPTIONS: ProcessingOption[] = [
  {
    id: 'steak',
    name: 'Cắt Khúc Steak Áp Chảo',
    badge: 'Dày 2.5 – 3cm',
    description: 'Cắt khúc dày đặn, giữ trọn độ ẩm ngọt khi áp chảo',
    icon: '🥩'
  },
  {
    id: 'whole_slab',
    name: 'Để Nguyên Tảng / Khay',
    badge: 'Hút Chân Không',
    description: 'Giữ nguyên tảng tươi hút chân không bảo quản tối ưu',
    icon: '🧊'
  },
  {
    id: 'fillet_clean',
    name: 'Rút Xương & Lọc Da Sạch',
    badge: 'Không Hao Hụt',
    description: 'Lọc sạch da, nhổ sạch xương dăm tỉ mỉ',
    icon: '🔪'
  }
]

export const SALMON_RECIPES: SalmonRecipe[] = [
  {
    id: 'ca-hoi-ap-chao-bo-toi',
    name: 'Cá Hồi Áp Chảo Sốt Bơ Tỏi Chanh Vàng',
    shortName: 'Áp Chảo Sốt Bơ Tỏi',
    category: 'Steak áp chảo',
    badge: 'Chuẩn 5 Sao',
    cookTime: '12 Phút',
    difficulty: 'Dễ',
    servings: '2 người',
    calories: '420 kcal',
    image: '/images/dishes/steak-bo-toi.jpg',
    recommendedProductId: 'nauy-phi-le',
    recommendedProductName: 'Cá Hồi Nauy Tươi Phi Lê Miếng',
    recommendedCutReason: 'Miếng phi lê dày dặn, áp chảo da giòn rụm, thịt mọng nước',
    compatibleProductIds: [
      'nauy-phi-le',
      'nauy-nguyen-tang',
      'nauy-phi-le-200g',
      'nauy-nguyen-con',
      'chile-coho-200g'
    ],
    tagline: 'Da giòn rụm rực rỡ, thịt mềm mọng thơm lừng bơ tỏi thảo mộc',
    description: 'Món Steak cá hồi kinh điển của ẩm thực phương Tây. Mặt da được chiên giòn tan tanh tách, thịt bên trong hồng đào mềm mướt ngậm nước, quyện đẫm sốt bơ tỏi béo thơm và hương thơm quý phái từ chanh vàng & lá hương thảo.',
    ingredients: [
      { name: 'Cá hồi Na Uy phi lê rút xương', amount: '300g (2 miếng)', highlight: true },
      { name: 'Bơ lạt cao cấp (Anchor hoặc Elle & Vire)', amount: '25g', highlight: true },
      { name: 'Tỏi tươi băm nhỏ', amount: '4 tép' },
      { name: 'Chanh vàng Tây (Eureka lemon)', amount: '1/2 quả vắt lấy cốt' },
      { name: 'Lá hương thảo tươi (Rosemary)', amount: '2 nhánh' },
      { name: 'Muối hồng & Tiêu đen xay', amount: 'Mỗi thứ 1/2 thìa cafe' },
      { name: 'Măng tây xanh xào kèm', amount: '6 cây non' }
    ],
    steps: [
      {
        step: 1,
        title: 'Thấm khô & Ướp nhẹ vị',
        detail: 'Khứa nhẹ 2 đường mảnh trên da cá. Thấm thật khô bề mặt, rắc đều muối hồng và tiêu xay lên hai mặt miếng cá, để ngấm vị trong 5 phút.',
        time: '3 phút'
      },
      {
        step: 2,
        title: 'Áp chảo mặt da cho giòn rụm',
        detail: 'Đun nóng chảo với 1 thìa dầu ô liu ở lửa vừa. Áp mặt da cá xuống trước trong 3.5 - 4 phút, dùng thìa ấn nhẹ cho da tiếp xúc đều đáy chảo tới khi vàng giòn.',
        time: '4 phút'
      },
      {
        step: 3,
        title: 'Lật mặt cá & Rưới bơ tỏi liên tục (Basting)',
        detail: 'Lật sang mặt thịt áp thêm 2 phút. Thả bơ lạt, tỏi băm và lá hương thảo vào chảo. Nghiêng chảo, dùng thìa múc bơ đang sôi rưới liên tục lên bề mặt cá.',
        time: '3 phút'
      },
      {
        step: 4,
        title: 'Vắt chanh tươi & Trình bày',
        detail: 'Vắt vài giọt chanh vàng thơm lừng lên trên, tắt bếp ngay. Bày cá hồi ra đĩa cùng măng tây xào bơ, rưới thêm phần sốt bơ tỏi óng ả lên trên.',
        time: '2 phút'
      }
    ],
    chefTip: 'Không nên chiên quá chín kỹ làm cá bị khô xác; lòng miếng cá chỉ cần chạm mức Medium-Well hồng hào mọng nước là thịt sẽ thơm béo ngọt lịm nhất!'
  },
  {
    id: 'ca-hoi-sot-cam',
    name: 'Cá Hồi Sốt Cam Tươi Chua Ngọt Thanh Mát',
    shortName: 'Áp Chảo Sốt Cam Tươi',
    category: 'Sốt hoa quả',
    badge: 'Chống ngấy cực đỉnh',
    cookTime: '15 Phút',
    difficulty: 'Dễ',
    servings: '2 người',
    calories: '360 kcal',
    image: '/images/dishes/sot-cam.jpg',
    recommendedProductId: 'nauy-phi-le-200g',
    recommendedProductName: 'Cá Hồi Nauy Phi Lê Khay 200g',
    recommendedCutReason: 'Khẩu phần 200g vừa vặn cho 1 đĩa sốt cam thơm ngon nhanh gọn',
    compatibleProductIds: [
      'nauy-phi-le-200g',
      'nauy-phi-le',
      'nauy-nguyen-tang',
      'nauy-nguyen-con',
      'chile-coho-200g',
      'chile-nguyen-con'
    ],
    tagline: 'Sốt cam óng ả sánh mịn, vị chua ngọt tự nhiên đưa cơm',
    description: 'Sự hòa quyện tuyệt vời giữa vị ngọt thanh béo ngậy của cá hồi đại dương và nước cốt cam tươi chua ngọt mượt mà. Món ăn giàu vitamin C, màu sắc rực rỡ bắt mắt, ăn cùng cơm nóng hay măng tây đều ngon hết nấc.',
    ingredients: [
      { name: 'Cá hồi tươi phi lê khay 200g', amount: '200g - 250g', highlight: true },
      { name: 'Nước cốt cam tươi sành hoặc cam vàng', amount: '80ml (1 quả)', highlight: true },
      { name: 'Mật ong hoa rừng nguyên chất', amount: '1 thìa canh' },
      { name: 'Bơ lạt thơm béo', amount: '15g' },
      { name: 'Tỏi băm & Hành khô băm', amount: 'Mỗi thứ 1 thìa cafe' },
      { name: 'Cà rốt baby, măng tây hoặc cơm gạo lứt', amount: 'Ăn kèm' }
    ],
    steps: [
      {
        step: 1,
        title: 'Áp chảo cá hồi chín vàng hai mặt',
        detail: 'Rắc xíu muối tiêu lên miếng cá hồi. Đun nóng chảo dầu ô liu, áp chảo mỗi mặt khoảng 2.5 - 3 phút cho chín vàng đều, gắp ra đĩa.',
        time: '5 phút'
      },
      {
        step: 2,
        title: 'Nấu nước sốt cam sánh mượt',
        detail: 'Dùng lại chảo, cho bơ lạt và tỏi băm vào phi thơm vàng. Đổ nước cốt cam tươi cùng 1 thìa mật ong vào, đun sôi liu riu ở lửa nhỏ.',
        time: '4 phút'
      },
      {
        step: 3,
        title: 'Hòa quyện & Sánh mịn sốt',
        detail: 'Nêm 1/2 thìa hạt nêm hoặc muối tiêu. Đun nhỏ lửa đến khi nước sốt cam keo lại sóng sánh bóng bẩy như gương.',
        time: '3 phút'
      },
      {
        step: 4,
        title: 'Rưới sốt cam & Bày đĩa sang trọng',
        detail: 'Rưới đều sốt cam tươi thơm ngát lên trên miếng cá hồi, trang trí lát cam vàng tươi cắt mỏng và nhánh thì là xanh mát.',
        time: '3 phút'
      }
    ],
    chefTip: 'Không nên đun sốt cam ở lửa quá lớn để tránh làm sốt bị đắng do tinh dầu cam và giữ trọn vẹn lượng vitamin C tươi mới.'
  },
  {
    id: 'mi-y-ca-hoi-sot-kem',
    name: 'Mì Ý Cá Hồi Sốt Kem Phô Mai Fettuccine',
    shortName: 'Mì Ý Cá Hồi Sốt Kem',
    category: 'Món Âu Pasta',
    badge: 'Bé & Cả Nhà Mê',
    cookTime: '15 Phút',
    difficulty: 'Dễ',
    servings: '2 - 3 người',
    calories: '510 kcal',
    image: '/images/dishes/mi-y-sot-kem.jpg',
    recommendedProductId: 'nauy-cat-thoi-100g',
    recommendedProductName: 'Nauy Phi Lê Cắt Thỏi 100g',
    recommendedCutReason: 'Thỏi cá vuông vắn sẵn, xào không bị nát, quyện sốt cực ngon',
    compatibleProductIds: [
      'nauy-cat-thoi-100g',
      'chile-coho-thoi-100g',
      'nauy-phi-le-200g',
      'chile-coho-200g',
      'nauy-phi-le',
      'nauy-nguyen-tang',
      'nauy-nguyen-con'
    ],
    tagline: 'Sợi mì dai giòn tắm đẫm sốt kem ngậy béo, từng thỏi cá thơm lừng',
    description: 'Từng sợi mì Ý dai ngon bọc lấy lớp sốt kem phô mai béo ngậy óng ánh, điểm xuyết từng thỏi cá hồi màu hồng cam rạng rỡ được xào bơ tỏi thơm nức mũi. Món ăn yêu thích số 1 của các bé và cả gia đình.',
    ingredients: [
      { name: 'Cá hồi Nauy hoặc Coho cắt thỏi vuông', amount: '150g - 200g', highlight: true },
      { name: 'Mì Ý Fettuccine hoặc Spaghetti', amount: '150g' },
      { name: 'Kem nấu Cooking Cream / Whipping Cream', amount: '120ml', highlight: true },
      { name: 'Phô mai Parmesan bào mịn', amount: '25g' },
      { name: 'Bơ lạt & Tỏi băm nhuyễn', amount: '15g bơ + 3 tép tỏi' },
      { name: 'Lá mùi tây tây (Parsley) & Tiêu xay', amount: 'Rắc hoàn thiện' }
    ],
    steps: [
      {
        step: 1,
        title: 'Luộc mì Ý chuẩn Al Dente',
        detail: 'Cho mì vào nồi nước sôi có thêm 1 nhúm muối, luộc 7-8 phút đến khi sợi mì chín tới có độ dai dẻo bên trong, vớt ra xóc chút dầu ô liu để sợi mì không dính.',
        time: '8 phút'
      },
      {
        step: 2,
        title: 'Xào thỏi cá hồi thơm lừng',
        detail: 'Đun tan chảy bơ lạt, phi thơm tỏi băm. Thả nhẹ nhàng các thỏi cá hồi vào áp chảo đảo nhẹ trong 2 phút cho thịt cá săn chín tới, gắp ra đĩa riêng.',
        time: '3 phút'
      },
      {
        step: 3,
        title: 'Nấu sốt kem phô mai béo ngậy',
        detail: 'Đổ kem nấu vào chảo, vặn lửa nhỏ, rắc phô mai Parmesan bào, nêm chút xíu muối tiêu. Khuấy đều tay đến khi sốt kem sánh mịn quyến rũ.',
        time: '2 phút'
      },
      {
        step: 4,
        title: 'Trộn mì, thỏi cá & Thưởng thức',
        detail: 'Cho mì Ý vào chảo đảo đều cho ngấm đẫm sốt kem, thêm cá hồi vào đảo nhẹ tay để giữ nguyên thỏi. Rắc mùi tây parsley và tiêu đen giã dập lên trên.',
        time: '2 phút'
      }
    ],
    chefTip: 'Dùng dòng cá cắt thỏi sẵn giúp tiết kiệm thời gian chế biến, miếng cá giữ nguyên hình khối vuông vức không bị vỡ nát khi đảo sốt.'
  },
  {
    id: 'lau-dau-ca-hoi-mang-chua',
    name: 'Lẩu Đầu Cá Hồi Nấu Măng Chua Cay Ấm Nồng',
    shortName: 'Lẩu Đầu Cá Măng Chua',
    category: 'Lẩu & Canh chua',
    badge: 'Đậm đà ấm cúng',
    cookTime: '25 Phút',
    difficulty: 'Trung bình',
    servings: '4 - 5 người',
    calories: '320 kcal',
    image: '/images/dishes/lau-dau-ca.jpg',
    recommendedProductId: 'nauy-nguyen-con',
    recommendedProductName: 'Cá Hồi Nauy Tươi Nguyên Con',
    recommendedCutReason: 'Trọn bộ đầu & xương cá béo ngậy nấu nước dùng ngọt đậm đà',
    compatibleProductIds: [
      'nauy-nguyen-con',
      'chile-nguyen-con'
    ],
    tagline: 'Vị chua cay đậm đà, nước dùng ngọt sâu từ xương cá tươi rói',
    description: 'Nồi lẩu sôi sùng sục thơm lừng mùi thì là và măng chua. Vị chua thanh thanh từ măng và cà chua hòa quyện với vị béo ngọt tự nhiên từ đầu và xương cá hồi tươi nguyên bản, làm ấm lòng cả nhà trong những bữa cơm quây quần.',
    ingredients: [
      { name: 'Đầu cá hồi tươi chặt miếng + Xương lườn', amount: '1 đầu (700g)', highlight: true },
      { name: 'Măng chua tước sợi', amount: '250g', highlight: true },
      { name: 'Cà chua chín đỏ & Dứa xanh', amount: '3 quả cà chua + 1/4 quả dứa' },
      { name: 'Thì là, ngò gai (mùi tàu), ớt cay', amount: '1 bó vừa' },
      { name: 'Rượu trắng & Gừng tươi khử tanh', amount: '1 củ gừng nhỏ' },
      { name: 'Bún tươi hoặc mì tôm, rau muống nhúng', amount: 'Ăn kèm' }
    ],
    steps: [
      {
        step: 1,
        title: 'Khử tanh & Chiên sơ đầu cá',
        detail: 'Rửa sạch đầu cá với rượu trắng và gừng đập dập. Thấm ráo nước. Rán sơ đầu cá trên chảo dầu nóng cho thịt săn lại và thơm vàng.',
        time: '6 phút'
      },
      {
        step: 2,
        title: 'Xào thơm măng chua & cà chua',
        detail: 'Phi thơm hành tỏi băm, cho cà chua thái múi cau và măng chua vào đảo đều, nêm 1 thìa nước mắm cho ngấm đậm vị.',
        time: '4 phút'
      },
      {
        step: 3,
        title: 'Ninh nước dùng lẩu đậm đà',
        detail: 'Châm 1.5 lít nước sôi vào nồi, thả đầu cá chiên và dứa thái lát vào. Đun sôi bùng, hớt sạch bọt rồi hạ lửa nhỏ ninh trong 15 phút cho ngọt nước.',
        time: '12 phút'
      },
      {
        step: 4,
        title: 'Nêm vị & Nhúng lẩu tại bàn',
        detail: 'Nêm nước mắm cốt, me chua hoặc giấm bỗng vừa miệng. Khi ăn thả thì là, ngò gai và ớt tươi lát, nhúng rau muống và chan bún tươi nóng hổi.',
        time: '3 phút'
      }
    ],
    chefTip: 'Bí quyết nước dùng không bao giờ bị tanh: Rửa sạch nhớt ở mang cá bằng rượu gừng và chiên sơ mặt ngoài trước khi thả vào nước sôi.'
  },
  {
    id: 'salad-ca-hoi-qua-bo',
    name: 'Salad Cá Hồi Quả Bơ Sốt Mè Rang Healthy',
    shortName: 'Salad Bơ Sốt Mè Rang',
    category: 'Eat Clean',
    badge: 'Healthy Giữ Dáng',
    cookTime: '8 Phút',
    difficulty: 'Rất dễ',
    servings: '2 người',
    calories: '310 kcal',
    image: '/images/dishes/salad-ca-hoi.jpg',
    recommendedProductId: 'nauy-phi-le-200g',
    recommendedProductName: 'Cá Hồi Nauy Phi Lê Khay 200g',
    recommendedCutReason: 'Khay 200g sạch da sạch xương, làm salad cực kỳ nhanh gọn',
    compatibleProductIds: [
      'nauy-phi-le-200g',
      'nauy-cat-thoi-100g',
      'nauy-phi-le',
      'nauy-nguyen-tang',
      'nauy-nguyen-con',
      'chile-coho-thoi-100g'
    ],
    tagline: 'Giàu Omega-3 & Chất xơ tinh khiết, thanh mát giữ dáng đẹp da',
    description: 'Bữa ăn Eat Clean trọn vẹn dưỡng chất cho người tập gym, ăn kiêng và yêu lối sống lành mạnh. Miếng cá hồi tươi béo bùi kết hợp cùng bơ sáp dẻo quánh, rau xà lách giòn rụm và sốt mè rang béo ngậy thơm lừng.',
    ingredients: [
      { name: 'Cá hồi tươi phi lê (áp chảo nhẹ hoặc sashimi)', amount: '150g - 200g', highlight: true },
      { name: 'Bơ sáp chín tới cắt khối vuông', amount: '1 quả', highlight: true },
      { name: 'Xà lách Romaine hoặc xà lách xoăn', amount: '100g' },
      { name: 'Cà chua bi ngọt bổ đôi', amount: '8 - 10 quả' },
      { name: 'Trứng gà luộc lòng đào', amount: '1 quả bổ đôi' },
      { name: 'Sốt mè rang Kewpie thơm bùi', amount: '3 - 4 thìa canh' }
    ],
    steps: [
      {
        step: 1,
        title: 'Sơ chế rau củ giòn ngọt',
        detail: 'Xà lách ngâm nước đá lạnh 5 phút để lá giòn rụm, để ráo nước. Cà chua bi bổ đôi, bơ sáp bóc vỏ cắt hạt lựu lớn 2cm.',
        time: '3 phút'
      },
      {
        step: 2,
        title: 'Chuẩn bị cá hồi thơm ngon',
        detail: 'Áp chảo cá hồi chín tới cắt khối vừa ăn (hoặc thái thỏi ăn sống Sashimi nếu thích vị ngọt tươi nguyên bản của biển).',
        time: '3 phút'
      },
      {
        step: 3,
        title: 'Bày đĩa & Trộn sốt mè rang',
        detail: 'Xếp rau xà lách xuống đáy đĩa sâu lòng, rải bơ sáp, cà chua bi, trứng lòng đào và từng miếng cá hồi lên trên. Rưới đẫm sốt mè rang và rắc chút hạt mè đen rang thơm.',
        time: '2 phút'
      }
    ],
    chefTip: 'Ngâm xà lách trong nước đá lạnh trước khi trộn sẽ giữ lá rau giòn tan mọng nước, ăn cùng sốt mè rang cực kỳ sảng khoái.'
  },
  {
    id: 'chao-ca-hoi-hat-sen',
    name: 'Cháo Cá Hồi Dinh Dưỡng Hạt Sen & Bí Đỏ',
    shortName: 'Cháo Hạt Sen & Bí Đỏ',
    category: 'Món Cháo Bồi Bổ',
    badge: 'Tốt Cho Bé & Cả Nhà',
    cookTime: '20 Phút',
    difficulty: 'Dễ',
    servings: '2 - 3 người',
    calories: '290 kcal',
    image: '/images/dishes/chao-ca-hoi.jpg',
    recommendedProductId: 'chile-coho-thoi-100g',
    recommendedProductName: 'Chile Coho Cắt Thỏi Rã Đông 100g',
    recommendedCutReason: 'Thịt đỏ ruby đanh chắc, chỉ 41k/khay, nấu cháo màu sắc rực rỡ',
    compatibleProductIds: [
      'chile-coho-thoi-100g',
      'nauy-cat-thoi-100g',
      'chile-coho-200g',
      'nauy-phi-le-200g',
      'chile-nguyen-con',
      'nauy-nguyen-con'
    ],
    tagline: 'Sánh mịn thơm ngon, bổ sung DHA và Omega-3 vượt trội',
    description: 'Cháo hạt sen bí đỏ sánh mịn vàng ươm, quyện cùng thịt cá hồi đỏ au ngọt lịm được phi thơm cùng hành tỏi và dầu gấc dinh dưỡng. Món ăn số 1 để bồi bổ sức khỏe cho bé yêu và người lớn tuổi.',
    ingredients: [
      { name: 'Cá hồi cắt thỏi sạch xương', amount: '100g - 150g', highlight: true },
      { name: 'Gạo tẻ thơm ngon + 1 nhúm nếp', amount: '60g' },
      { name: 'Hạt sen tươi bỏ tâm', amount: '30g', highlight: true },
      { name: 'Bí đỏ thái nhỏ', amount: '50g' },
      { name: 'Hành hoa, ngò rí, hành phi giòn', amount: 'Một ít' },
      { name: 'Dầu mè hoặc dầu gấc dinh dưỡng', amount: '1 thìa cafe' }
    ],
    steps: [
      {
        step: 1,
        title: 'Ninh cháo hạt sen & bí đỏ',
        detail: 'Gạo vo sạch, cho cùng hạt sen tươi và bí đỏ vào nồi áp suất hoặc nồi thường ninh nhừ cho sánh mịn ngọt nước.',
        time: '12 phút'
      },
      {
        step: 2,
        title: 'Hấp & Xào thơm thịt cá hồi',
        detail: 'Hấp chín cá hồi với vài lát gừng, dằm nhỏ vừa ăn. Phi thơm hành tím băm với chút dầu ăn rồi xào sơ cá hồi với 1 thìa nước mắm ngon.',
        time: '4 phút'
      },
      {
        step: 3,
        title: 'Hòa quyện nồi cháo sánh mịn',
        detail: 'Trút cá hồi đã xào vào nồi cháo đang sôi liu riu, khuấy nhẹ đều tay trong 3 phút cho các nguyên liệu hòa quyện sánh thơm.',
        time: '3 phút'
      },
      {
        step: 4,
        title: 'Múc ra bát & Hoàn thành',
        detail: 'Múc cháo ra tô, thêm chút hành ngò thái nhỏ, rắc hành phi giòn và vài giọt dầu gấc dinh dưỡng cho màu sắc thêm phần bắt mắt.',
        time: '1 phút'
      }
    ],
    chefTip: 'Khay cá hồi Coho thỏi 100g vừa túi tiền (41.000đ), thịt đỏ đậm tự nhiên, không xương, là lựa chọn số 1 của các mẹ bỉm sữa nấu cháo cho con.'
  },
  {
    id: 'ca-hoi-nuong-pho-mai',
    name: 'Cá Hồi Nướng Phô Mai Mozzarella Bỏ Lò',
    shortName: 'Nướng Phô Mai Kéo Sợi',
    category: 'Món Nướng Bỏ Lò',
    badge: 'Béo Ngậy Kéo Sợi',
    cookTime: '12 Phút',
    difficulty: 'Dễ',
    servings: '2 người',
    calories: '450 kcal',
    image: '/images/dishes/nuong-pho-mai.jpg',
    recommendedProductId: 'nauy-phi-le',
    recommendedProductName: 'Cá Hồi Nauy Tươi Phi Lê Miếng',
    recommendedCutReason: 'Miếng phi lê dày dặn chịu nhiệt tốt, phô mai phủ đều mọng nước',
    compatibleProductIds: [
      'nauy-phi-le',
      'nauy-nguyen-tang',
      'nauy-phi-le-200g',
      'nauy-nguyen-con',
      'chile-coho-200g',
      'chile-nguyen-con'
    ],
    tagline: 'Lớp phô mai vàng ruộm xém cạnh chảy tràn, thơm nức mũi',
    description: 'Chỉ cần một chiếc nồi chiên không dầu hoặc lò nướng nhỏ, bạn đã có ngay món cá hồi đẫm phô mai Mozzarella kéo sợi dẻo dai. Thịt cá bên trong ngọt mềm, bên trên béo ngậy giòn tan.',
    ingredients: [
      { name: 'Cá hồi phi lê tươi không xương', amount: '250g - 300g', highlight: true },
      { name: 'Phô mai Mozzarella bào sợi kéo màng', amount: '60g - 80g', highlight: true },
      { name: 'Sốt Mayonnaise giữ ẩm', amount: '1 thìa canh' },
      { name: 'Bột tỏi & Tiêu đen xay', amount: 'Mỗi thứ 1/2 thìa cafe' },
      { name: 'Lá kinh giới tây Oregano hoặc ngò tây', amount: '1 nhúm nhỏ' }
    ],
    steps: [
      {
        step: 1,
        title: 'Ướp cá & Quét lớp giữ ẩm',
        detail: 'Thấm khô miếng cá hồi. Quét 1 lớp mỏng sốt mayonnaise và rắc bột tỏi, tiêu xay lên bề mặt cá để giữ ẩm tối đa khi nướng.',
        time: '3 phút'
      },
      {
        step: 2,
        title: 'Phủ dày phô mai Mozzarella',
        detail: 'Phủ kín mặt cá bằng lớp phô mai Mozzarella bào sợi, rắc thêm chút lá oregano thơm lừng phong cách Ý.',
        time: '2 phút'
      },
      {
        step: 3,
        title: 'Nướng trong nồi chiên không dầu',
        detail: 'Làm nóng nồi ở 180°C trong 3 phút. Đặt cá vào nướng trong 8 - 10 phút đến khi phô mai tan chảy, sôi bọt và xém vàng đều.',
        time: '6 phút'
      },
      {
        step: 4,
        title: 'Thưởng thức nóng hổi kéo sợi',
        detail: 'Lấy cá ra đĩa dùng ngay khi còn nóng để tận hưởng cảm giác từng sợi phô mai kéo dài dẻo dai béo ngậy.',
        time: '1 phút'
      }
    ],
    chefTip: 'Nướng ở 180°C là nhiệt độ lý tưởng giúp phô mai vừa xém vàng thơm lừng mà thịt cá hồi bên dưới vẫn giữ nguyên độ ẩm ngọt không bị khô.'
  }
]

export const useSalmonStore = () => {
  const currentProductIndex = useState<number>('currentSalmonIndex', () => 1) // Default: Nauy Tươi Nguyên Tảng
  const quantity = useState<number>('salmonQuantity', () => 1)
  const selectedProcessing = useState<string>('salmonProcessing', () => 'steak')
  const isPriceTableOpen = useState<boolean>('isPriceTableOpen', () => false)
  const isOrderModalOpen = useState<boolean>('isOrderModalOpen', () => false)

  // Recipe Feature States
  const recipeFilterMode = useState<'matched' | 'all'>('salmonRecipeFilterMode', () => 'matched')
  const selectedRecipeId = useState<string>('selectedSalmonRecipeId', () => 'ca-hoi-ap-chao-bo-toi')
  const isRecipeModalOpen = useState<boolean>('isRecipeModalOpen', () => false)
  const isMobileRecipeDrawerOpen = useState<boolean>('isMobileRecipeDrawerOpen', () => false)

  const currentProduct = computed(() => {
    return SALMON_CATALOG[currentProductIndex.value] || SALMON_CATALOG[0]
  })

  // Filtered recipes suitable for currently selected product
  const currentProductRecipes = computed(() => {
    const p = currentProduct.value
    if (!p || !p.recipeIds) return SALMON_RECIPES
    return SALMON_RECIPES.filter(r => p.recipeIds.includes(r.id))
  })

  // Displayed recipes depending on filter mode
  const displayedRecipes = computed(() => {
    if (recipeFilterMode.value === 'all') {
      return SALMON_RECIPES
    }
    return currentProductRecipes.value
  })

  // Ensure active recipe is valid for current product
  const ensureValidRecipeForCurrentProduct = () => {
    const p = currentProduct.value
    if (p && p.recipeIds && !p.recipeIds.includes(selectedRecipeId.value)) {
      selectedRecipeId.value = p.bestRecipeId || p.recipeIds[0] || SALMON_RECIPES[0].id
    }
  }

  const setProductById = (id: string) => {
    const idx = SALMON_CATALOG.findIndex(p => p.id === id)
    if (idx !== -1) {
      currentProductIndex.value = idx
      ensureValidRecipeForCurrentProduct()
    }
  }

  const setProductIndex = (idx: number) => {
    if (idx >= 0 && idx < SALMON_CATALOG.length) {
      currentProductIndex.value = idx
      ensureValidRecipeForCurrentProduct()
    }
  }

  const nextProduct = () => {
    currentProductIndex.value = (currentProductIndex.value + 1) % SALMON_CATALOG.length
    ensureValidRecipeForCurrentProduct()
  }

  const prevProduct = () => {
    currentProductIndex.value = (currentProductIndex.value - 1 + SALMON_CATALOG.length) % SALMON_CATALOG.length
    ensureValidRecipeForCurrentProduct()
  }

  const currentProcessing = computed(() => {
    return PROCESSING_OPTIONS.find(opt => opt.id === selectedProcessing.value) || PROCESSING_OPTIONS[0]
  })

  // Selected Recipe computed
  const selectedRecipe = computed(() => {
    return SALMON_RECIPES.find(r => r.id === selectedRecipeId.value) || SALMON_RECIPES[0]
  })

  const openRecipe = (recipeId: string) => {
    const found = SALMON_RECIPES.find(r => r.id === recipeId)
    if (found) {
      selectedRecipeId.value = recipeId
    }
    isRecipeModalOpen.value = true
    isMobileRecipeDrawerOpen.value = false // close drawer if open
  }

  const closeRecipe = () => {
    isRecipeModalOpen.value = false
  }

  const orderRecipeSalmon = (recipe: SalmonRecipe) => {
    setProductById(recipe.recommendedProductId)
    closeRecipe()
    isOrderModalOpen.value = true
  }

  const openMobileRecipeDrawer = () => {
    isMobileRecipeDrawerOpen.value = true
  }

  const closeMobileRecipeDrawer = () => {
    isMobileRecipeDrawerOpen.value = false
  }

  // Calculate Subtotal & Total
  const subtotal = computed(() => {
    const p = currentProduct.value
    if (p.isPerKg && p.averageWeightKg && p.unit === 'CON') {
      return p.price * p.averageWeightKg * quantity.value
    }
    return p.price * quantity.value
  })

  // Freeship for orders over 500k or >= 3 units
  const isFreeship = computed(() => {
    return subtotal.value >= 500000 || quantity.value >= 3
  })

  const shippingFee = computed(() => {
    if (isFreeship.value) return 0
    return 30000
  })

  const totalPrice = computed(() => {
    return subtotal.value + shippingFee.value
  })

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(val)
  }

  const setQuantity = (q: number) => {
    if (q >= 1 && q <= 99) {
      quantity.value = q
    }
  }

  const incQuantity = () => {
    if (quantity.value < 99) quantity.value++
  }

  const decQuantity = () => {
    if (quantity.value > 1) quantity.value--
  }

  const isWholeFish = computed(() => {
    const p = currentProduct.value
    return p.unit === 'CON' || p.id.includes('nguyen-con')
  })

  return {
    catalog: SALMON_CATALOG,
    processingOptions: PROCESSING_OPTIONS,
    recipes: SALMON_RECIPES,
    currentProductRecipes,
    displayedRecipes,
    recipeFilterMode,
    currentProductIndex,
    currentProduct,
    isWholeFish,
    quantity,
    selectedProcessing,
    currentProcessing,
    selectedRecipeId,
    selectedRecipe,
    isRecipeModalOpen,
    isMobileRecipeDrawerOpen,
    isPriceTableOpen,
    isOrderModalOpen,
    isFreeship,
    shippingFee,
    subtotal,
    totalPrice,
    setProductById,
    setProductIndex,
    nextProduct,
    prevProduct,
    setQuantity,
    incQuantity,
    decQuantity,
    formatCurrency,
    openRecipe,
    closeRecipe,
    orderRecipeSalmon,
    openMobileRecipeDrawer,
    closeMobileRecipeDrawer
  }
}
