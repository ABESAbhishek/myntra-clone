import React, { useState } from 'react';
import { QrCode, CreditCard, Landmark, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';

const banks = [
  { name: 'HDFC Bank', code: 'HDFC' },
  { name: 'State Bank of India', code: 'SBI' },
  { name: 'ICICI Bank', code: 'ICICI' },
  { name: 'Axis Bank', code: 'AXIS' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK' }
];

const PaymentSelector = ({ selectedMethod, onSelectMethod, amount }) => {
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden select-none">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <p className="text-xs font-extrabold uppercase tracking-wider text-myntra-dark">
          Choose Payment Mode
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        
        {/* Left: Payment Method Tabs */}
        <div className="bg-gray-50/50 flex flex-col text-xs font-semibold">
          <button
            type="button"
            onClick={() => onSelectMethod('UPI')}
            className={`flex items-center gap-3 p-4 text-left transition-colors ${
              selectedMethod === 'UPI'
                ? 'bg-white text-myntra-pink font-bold border-l-4 border-myntra-pink shadow-sm'
                : 'text-myntra-muted hover:bg-gray-100'
            }`}
          >
            <QrCode className="w-4 h-4 text-myntra-pink" />
            <span>UPI / QR Code</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMethod('Card')}
            className={`flex items-center gap-3 p-4 text-left transition-colors ${
              selectedMethod === 'Card'
                ? 'bg-white text-myntra-pink font-bold border-l-4 border-myntra-pink shadow-sm'
                : 'text-myntra-muted hover:bg-gray-100'
            }`}
          >
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span>Credit / Debit Card</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMethod('NetBanking')}
            className={`flex items-center gap-3 p-4 text-left transition-colors ${
              selectedMethod === 'NetBanking'
                ? 'bg-white text-myntra-pink font-bold border-l-4 border-myntra-pink shadow-sm'
                : 'text-myntra-muted hover:bg-gray-100'
            }`}
          >
            <Landmark className="w-4 h-4 text-purple-600" />
            <span>Net Banking</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMethod('COD')}
            className={`flex items-center gap-3 p-4 text-left transition-colors ${
              selectedMethod === 'COD'
                ? 'bg-white text-myntra-pink font-bold border-l-4 border-myntra-pink shadow-sm'
                : 'text-myntra-muted hover:bg-gray-100'
            }`}
          >
            <Banknote className="w-4 h-4 text-emerald-600" />
            <span>Cash On Delivery</span>
          </button>
        </div>

        {/* Right: Payment Method Content */}
        <div className="p-6 md:col-span-2 space-y-4">
          
          {/* 1. UPI Mode */}
          {selectedMethod === 'UPI' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-myntra-dark">Pay using UPI QR or ID</h4>
                  <p className="text-[11px] text-myntra-muted">Scan with Google Pay, PhonePe, Paytm or BHIM</p>
                </div>
                <span className="text-xs font-extrabold text-myntra-dark">₹{amount}</span>
              </div>

              {/* QR Code Demo Box */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="w-28 h-28 bg-white border-2 border-dashed border-gray-300 rounded flex items-center justify-center flex-shrink-0 shadow-inner relative">
                  {/* Decorative QR Pattern */}
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-myntra-dark mx-auto" />
                    <span className="text-[9px] font-mono text-gray-500">Scan & Pay</span>
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold text-myntra-dark">Instant QR Payment</p>
                  <p className="text-[11px] text-myntra-muted">
                    Open your camera or any UPI app to scan and pay directly.
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-teal-100 text-teal-800 font-bold text-[10px] rounded">
                    Zero Extra Surcharge
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-myntra-dark mb-1">
                  Or enter Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  placeholder="e.g. mobile@upi or username@okaxis"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-myntra-pink"
                />
              </div>
            </div>
          )}

          {/* 2. Card Mode */}
          {selectedMethod === 'Card' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Live Preview Card */}
              <div className="w-full max-w-sm h-40 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 text-white rounded-xl p-4 shadow-lg flex flex-col justify-between mx-auto">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-widest uppercase font-bold text-gray-400">Debit / Credit</span>
                  <span className="text-sm font-extrabold italic text-amber-300">VISA</span>
                </div>
                <div className="font-mono text-sm tracking-widest text-center">
                  {cardData.number || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between text-[11px]">
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Cardholder</span>
                    <span className="font-bold truncate">{cardData.name || 'YOUR NAME'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Expires</span>
                    <span className="font-bold">{cardData.expiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-myntra-dark mb-1">Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-myntra-dark mb-1">Valid Thru (MM/YY)</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-myntra-dark mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="•••"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-myntra-dark mb-1">Name on Card</label>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink uppercase"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. Net Banking Mode */}
          {selectedMethod === 'NetBanking' && (
            <div className="space-y-4 animate-fadeIn text-xs">
              <h4 className="font-bold text-myntra-dark">Select Your Bank</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {banks.map((b) => (
                  <button
                    key={b.code}
                    type="button"
                    onClick={() => setSelectedBank(b.code)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      selectedBank === b.code
                        ? 'border-myntra-pink bg-myntra-pinkLight font-bold text-myntra-pink'
                        : 'border-gray-200 text-myntra-dark hover:border-gray-300'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Cash On Delivery */}
          {selectedMethod === 'COD' && (
            <div className="space-y-3 animate-fadeIn text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 space-y-1">
                <p className="font-bold">Pay ₹{amount} with Cash or UPI upon delivery.</p>
                <p className="text-[11px] text-amber-800">
                  Please keep exact change ready. Delivery partner will accept cash or instant QR scan at your doorstep.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-myntra-dark mb-1">
                  Security Captcha Verification
                </label>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-gray-200 font-mono font-extrabold tracking-widest text-base rounded select-none text-gray-800">
                    {captchaCode}
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Enter code"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink font-mono"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaymentSelector;
