export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.customer || !body.customer.name || !body.customer.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Vui lòng cung cấp đầy đủ thông tin đặt hàng (Họ tên và Số điện thoại)'
    })
  }

  // Generate order tracking ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const orderId = `CH-${dateStr}-${randomSuffix}`

  // VietQR quick transfer link if bank transfer
  const amount = body.totalAmount || 0
  const qrUrl = `https://img.vietqr.io/image/970422-0988888888-compact2.png?amount=${amount}&addInfo=${orderId}&accountName=CHUYEN%20CA%20HOI`

  return {
    success: true,
    orderId,
    message: 'Đơn hàng cá hồi của bạn đã được tiếp nhận thành công!',
    orderDetails: {
      orderId,
      productName: body.product?.name,
      quantity: body.quantity,
      customerName: body.customer?.name,
      customerPhone: body.customer?.phone,
      totalAmount: amount
    },
    qrUrl
  }
})
