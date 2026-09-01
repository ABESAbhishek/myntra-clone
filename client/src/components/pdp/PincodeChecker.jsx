import React, { useState } from 'react';
import { Truck, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const PincodeChecker = () => {
  const [pincode, setPincode] = useState('560034');
  const [status, setStatus] = useState({ checked: true, valid: true });
  const [loading, setLoading] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setStatus({ checked: true, valid: false });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({ checked: true, valid: true });
    }, 400);
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-myntra-dark">
        <Truck className="w-4 h-4 text-myntra-pink" />
        Delivery Options & Pincode Check
      </div>

      <form onSubmit={handleCheck} className="flex gap-2 max-w-xs">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ''));
            setStatus({ checked: false, valid: false });
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-xs text-myntra-dark focus:outline-none focus:border-myntra-pink"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded hover:bg-black transition-colors flex items-center gap-1"
        >
          {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Check'}
        </button>
      </form>

      {status.checked && (
        <div className="text-xs space-y-1.5 animate-fadeIn">
          {status.valid ? (
            <>
              <div className="flex items-center gap-1.5 text-teal-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Delivery by <span className="font-bold">{formattedDate}</span>
              </div>
              <p className="text-[11px] text-myntra-muted">
                ✔ Cash on Delivery available &bull; Free Shipping for orders above ₹799
              </p>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-red-600">
              <AlertCircle className="w-3.5 h-3.5" />
              Please enter a valid 6-digit Indian PIN code.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PincodeChecker;
