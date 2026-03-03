import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';

export default function PaymentPage(){
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const registrationId = params.get('registrationId');
  const initialAmount = params.get('amount');
  const initialQr = params.get('qrUrl');

  const [amount, setAmount] = useState(initialAmount);
  const [qrUrl, setQrUrl] = useState(initialQr);
  const [status, setStatus] = useState('Awaiting Payment');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  // if not passed via query, we could fetch details from server
  useEffect(()=>{
    if(!registrationId) return;
    if(!amount || !qrUrl){
      // fetch registration information
      fetch(`${API_BASE}/api/admin/registrations`)
        .then(r=>r.json())
        .then(list=>{
          const reg = list.find(r=>r.registrationId===registrationId);
          if(reg){
            setAmount(reg.payment.amount);
            setQrUrl(`${API_BASE}/${reg.payment.qrCodePath}`);
          }
        });
    }
  },[registrationId]);

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0]; if (f) setFile(f);
  };

  const upload = async () => {
    if (!file) return alert('Select screenshot');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('screenshot', file);
      fd.append('registrationId', registrationId);
      const res = await fetch(`${API_BASE}/api/upload-payment`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setStatus('Pending Verification');
      alert('Uploaded. Await verification');
      navigate(`/wip`);
    } catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };

  if(!registrationId) return <div className="p-8 text-center text-white">Invalid registration.</div>;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-6">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Complete Payment</h2>
          <p className="text-gray-400">Scan QR to pay ₹{amount} then upload screenshot for verification.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-6 rounded-xl bg-white/3 flex flex-col items-center border border-white/5">
            <div className="mb-3 text-sm text-gray-300">Registration ID</div>
            <div className="font-mono text-lg">{registrationId}</div>
            <div className="my-4">
              {qrUrl ? <img src={qrUrl} alt="qr" className="w-56 h-56 rounded-lg shadow-lg"/> : <div className="w-56 h-56 rounded-lg bg-gray-800"/>}
            </div>
            <div className="text-gray-300">Amount: <span className="font-semibold">₹{amount}</span></div>
            <div className="text-gray-400 text-sm mt-2">UPI ID: <span className="font-medium">{import.meta.env.VITE_UPI_ID || 'infinity@upi'}</span></div>
          </div>

          <div className="p-6 rounded-xl bg-white/3 border border-white/5">
            <div className="text-sm text-gray-300 mb-2">Upload Payment Screenshot</div>
            <div onDrop={onDrop} onDragOver={(e)=>e.preventDefault()} className="h-40 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center flex-col">
              {file ? (
                <div className="text-center">
                  <div className="font-medium">{file.name}</div>
                  <div className="text-sm text-gray-400 mt-2">{(file.size/1024/1024).toFixed(2)} MB</div>
                </div>
              ) : (
                <div className="text-center text-gray-400">Drag & drop screenshot here or <button className="text-blue-300 underline" onClick={()=>inputRef.current.click()}>browse</button></div>
              )}
              <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={e=>setFile(e.target.files[0])} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">Status: <span className="font-medium">{status}</span></div>
              <div>
                <button onClick={upload} disabled={uploading} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">{uploading ? 'Uploading...' : 'Upload & Notify'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}