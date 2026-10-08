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
}

export interface ProcessingOption {
  id: string
  name: string
  badge: string
  description: string
  icon: string
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
    description: 'Cá hồi tươi nguyên con nhập khẩu chính ngạch đường hàng không từ các vịnh biển tinh khiết nhất Na Uy. Thân tròn đẫy đà, mắt trong veo, vảy bạc lấp lánh bám chặt, thịt cá đàn hồi mọng nước ngọt thanh tự nhiên.'
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
    description: 'Nguyên tảng phi lê nửa thân cá hồi Na Uy tươi còn da hoặc lọc da theo yêu cầu. Đường vân mỡ trắng ngà xen kẽ thịt cam hồng tự nhiên, thịt đanh chắc không bở, ngọt đậm đà, lý tưởng nhất cho tiệc Sashimi cao cấp.'
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
    description: 'Được phi lê và rút xương thủ công tỉ mỉ từng thớ, cắt khẩu phần vừa vặn theo trọng lượng khách yêu cầu. Thịt cá giữ trọn hương vị tươi mát của biển sâu, giàu Omega-3, DHA tốt cho cả gia đình và bé nhỏ.'
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
    description: 'Khẩu phần 200g chuẩn xác đóng gói màng hút chân không Skin-pack cao cấp. Rất thích hợp cho bữa tối gia đình nhỏ hoặc người bận rộn, chỉ cần mở khay là có thể chế biến ngay không cần sơ chế phức tạp.'
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
    description: 'Thịt cá hồi Na Uy tươi được cắt thỏi vuông chuẩn từng milimet chuyên dùng cho Sashimi và Sushi. Thớ thịt chắc, vị béo ngậy ngọt đượm quyện cùng wasabi cay nồng mang lại trải nghiệm ẩm thực thăng hoa.'
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
    description: 'Cá hồi Chile đánh bắt tự nhiên từ vùng biển Nam Cực trong lành, cấp đông sâu IQF ngay trên tàu biển. Thịt cá giữ nguyên hàm lượng dinh dưỡng, giá thành kinh tế tối ưu cho nhà hàng và tiệc tùng đông người.'
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
    description: 'Dòng cá hồi Coho đặc hữu Chile với màu thịt đỏ thẫm tự nhiên độc đáo. Thớ thịt chắc nịch ít mỡ thừa, rất thích hợp cho người ăn kiêng, tập gym, gymer và các món áp chảo, nướng đậm vị.'
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
    description: 'Từng thỏi cá hồi Coho đỏ au cắt miếng chuẩn 100g, thích hợp tuyệt đối cho các món nấu sốt, làm mì Ý sốt kem nấm hoặc nấu cháo dinh dưỡng cho các bé yêu với chi phí siêu tiết kiệm chỉ 41k/khay.'
  }
]

export const PROCESSING_OPTIONS: ProcessingOption[] = [
  {
    id: 'sashimi',
    name: 'Cắt Lát Sashimi Chuẩn Nhật',
    badge: 'Tặng Gừng Hồng & Wasabi',
    description: 'Thái lát 0.5cm chuẩn ăn sống, xếp khay lá tía tô',
    icon: '🍣'
  },
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

export const useSalmonStore = () => {
  const currentProductIndex = useState<number>('currentSalmonIndex', () => 1) // Default: Nauy Tươi Nguyên Tảng
  const quantity = useState<number>('salmonQuantity', () => 1)
  const selectedProcessing = useState<string>('salmonProcessing', () => 'sashimi')
  const isPriceTableOpen = useState<boolean>('isPriceTableOpen', () => false)
  const isOrderModalOpen = useState<boolean>('isOrderModalOpen', () => false)

  const currentProduct = computed(() => {
    return SALMON_CATALOG[currentProductIndex.value] || SALMON_CATALOG[0]
  })

  const setProductById = (id: string) => {
    const idx = SALMON_CATALOG.findIndex(p => p.id === id)
    if (idx !== -1) {
      currentProductIndex.value = idx
    }
  }

  const setProductIndex = (idx: number) => {
    if (idx >= 0 && idx < SALMON_CATALOG.length) {
      currentProductIndex.value = idx
    }
  }

  const nextProduct = () => {
    currentProductIndex.value = (currentProductIndex.value + 1) % SALMON_CATALOG.length
  }

  const prevProduct = () => {
    currentProductIndex.value = (currentProductIndex.value - 1 + SALMON_CATALOG.length) % SALMON_CATALOG.length
  }

  const currentProcessing = computed(() => {
    return PROCESSING_OPTIONS.find(opt => opt.id === selectedProcessing.value) || PROCESSING_OPTIONS[0]
  })

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

  return {
    catalog: SALMON_CATALOG,
    processingOptions: PROCESSING_OPTIONS,
    currentProductIndex,
    currentProduct,
    quantity,
    selectedProcessing,
    currentProcessing,
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
    formatCurrency
  }
}

