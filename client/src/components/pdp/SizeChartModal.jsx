import React from 'react';
import { X, Ruler } from 'lucide-react';

const sizeData = [
  { size: 'S', chest: '38 in / 96 cm', length: '27 in / 69 cm', shoulder: '17 in / 43 cm', waist: '30 in / 76 cm' },
  { size: 'M', chest: '40 in / 102 cm', length: '28 in / 71 cm', shoulder: '18 in / 46 cm', waist: '32 in / 81 cm' },
  { size: 'L', chest: '42 in / 107 cm', length: '29 in / 74 cm', shoulder: '19 in / 48 cm', waist: '34 in / 86 cm' },
  { size: 'XL', chest: '44 in / 112 cm', length: '30 in / 76 cm', shoulder: '20 in / 51 cm', waist: '36 in / 91 cm' },
  { size: 'XXL', chest: '46 in / 117 cm', length: '31 in / 79 cm', shoulder: '21 in / 53 cm', waist: '38 in / 96 cm' }
];

const SizeChartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-myntra-dark"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-myntra-pinkLight text-myntra-pink flex items-center justify-center">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-myntra-dark">Size Chart & Measurements</h3>
            <p className="text-xs text-myntra-muted">Standard Garment Dimensions (Inches / CM)</p>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-myntra-dark uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest</th>
                <th className="py-2.5 px-3">Length</th>
                <th className="py-2.5 px-3">Shoulder</th>
                <th className="py-2.5 px-3">Waist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizeData.map((row) => (
                <tr key={row.size} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-3 font-bold text-myntra-dark">{row.size}</td>
                  <td className="py-2.5 px-3 text-myntra-muted">{row.chest}</td>
                  <td className="py-2.5 px-3 text-myntra-muted">{row.length}</td>
                  <td className="py-2.5 px-3 text-myntra-muted">{row.shoulder}</td>
                  <td className="py-2.5 px-3 text-myntra-muted">{row.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-[11px] text-myntra-muted">
          <p className="font-semibold text-myntra-dark mb-0.5">How to Measure:</p>
          <p>Chest: Measure under your arms around the fullest part of your chest.</p>
          <p>Length: Measure from the highest point of shoulder to the bottom hem.</p>
        </div>

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-myntra-pink text-white text-xs font-bold rounded hover:bg-myntra-pinkDark transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;
