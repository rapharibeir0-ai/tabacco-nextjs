'use client';

import { intensityLevel } from '@/lib/data';

export default function IntensityBar({ flavor, size = 'lg' }) {
  const level = intensityLevel[flavor] ?? 1;
  const w = size === 'lg' ? 26 : 20;
  const h = size === 'lg' ? 6  : 5;
  const labelCls = `ilabel${flavor === 'Médio' ? ' medio' : flavor === 'Forte' ? ' forte' : ''}${size === 'sm' ? ' sm' : ''}`;
  return (
    <div className="ibar-row">
      <span className={`ibar ibar-1${level >= 1 ? ' on' : ''}`} style={{ width: w, height: h, borderRadius: 100, display:'inline-block' }} />
      <span className={`ibar ibar-2${level >= 2 ? ' on' : ''}`} style={{ width: w, height: h, borderRadius: 100, display:'inline-block' }} />
      <span className={`ibar ibar-3${level >= 3 ? ' on' : ''}`} style={{ width: w, height: h, borderRadius: 100, display:'inline-block' }} />
      <span className={labelCls}>{flavor}</span>
    </div>
  );
}
