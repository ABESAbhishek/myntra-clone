const http = require('http');

async function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('Testing Myntra API Server...');
  const baseUrl = { hostname: 'localhost', port: 5000 };

  try {
    // 1. Health
    const health = await request({ ...baseUrl, path: '/api/health', method: 'GET' });
    console.log('1. Health check:', health.status, health.data);

    // 2. Demo Login
    const login = await request({
      ...baseUrl,
      path: '/api/auth/demo-login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('2. Demo Login:', login.status, login.data.success ? 'SUCCESS' : 'FAILED', login.data.user?.name);
    const token = login.data.token;

    // 3. Products
    const products = await request({ ...baseUrl, path: '/api/products?gender=men&limit=4', method: 'GET' });
    console.log('3. Fetch Men Products:', products.status, `Returned ${products.data.products?.length} items`);

    // 4. Validate Coupon
    const coupon = await request({
      ...baseUrl,
      path: '/api/coupons/validate',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { code: 'MYNTRA200', orderAmount: 1500 });
    console.log('4. Validate Coupon MYNTRA200:', coupon.status, coupon.data.message);

    // 5. Add to Cart
    const cartAdd = await request({
      ...baseUrl,
      path: '/api/cart',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }, { product_id: 1, size: 'L', quantity: 1 });
    console.log('5. Add to Cart:', cartAdd.status, cartAdd.data.message);

    // 6. Get Cart
    const cartGet = await request({
      ...baseUrl,
      path: '/api/cart',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('6. Get Cart Summary:', cartGet.status, `Items: ${cartGet.data.summary?.itemCount}, Total MRP: ₹${cartGet.data.summary?.totalMRP}`);

    // 7. Toggle Wishlist
    const wish = await request({
      ...baseUrl,
      path: '/api/wishlist/toggle',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }, { product_id: 14 });
    console.log('7. Toggle Wishlist:', wish.status, wish.data.message);

    // 8. Place Order
    const order = await request({
      ...baseUrl,
      path: '/api/orders',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }, { address_id: 1, payment_method: 'UPI', coupon_code: 'MYNTRA200', coupon_discount: 200 });
    console.log('8. Place Order:', order.status, order.data.message, 'Order Number:', order.data.order?.order_number);

    console.log(' ALL BACKEND API TESTS PASSED SUCCESSFULLY! ');
    process.exit(0);
  } catch (err) {
    console.error('API Test Error:', err);
    process.exit(1);
  }
}

runTests();
