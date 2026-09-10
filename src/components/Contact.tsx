import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Add Your Voice', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const response = await fetch('https://formspree.io/f/mjyvapqj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormState('sent');
        setFormData({ name: '', email: '', subject: 'Add Your Voice', message: '' });
        setTimeout(() => setFormState('idle'), 4000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 4000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  const contacts = [
    { role: 'Head Coach', name: 'Ber Almeida', icon: 'sports', email: 'ber@dragonsquad.com' },
    { role: 'Team Manager', name: 'Megan Daggett', icon: 'assignment_ind', email: 'megan@dragonsquad.com' },
    { role: 'Team Manager', name: 'Ash Avellaneda', icon: 'groups', email: 'ash@dragonsquad.com' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-hero">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* Left Column: Contact Info & Map */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-5xl font-kids text-slate-900 mb-4 uppercase">REACH THE NEST</h2>
            <p className="text-slate-500 font-medium italic">Have a question for the Big Dragons? We're here to help!</p>
          </div>

          <div className="space-y-4">
            {contacts.map((contact, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border-2 border-slate-100 flex items-center gap-5 group hover:border-red-500/20 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#E53935] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">{contact.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#E53935] uppercase tracking-widest leading-none mb-1">{contact.role}</p>
                  <p className="font-kids text-xl text-slate-900">{contact.name}</p>
                  <p className="text-sm text-slate-400 font-medium">{contact.email}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <span className="material-symbols-outlined text-[120px]">location_on</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-kids text-2xl mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400">map</span>
                OUR GROUND
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Training & Home Games</p>
                  <p className="text-lg font-medium">360 Elm Street</p>
                  <p className="text-white/40">Penn Yan, NY 14527</p>
                </div>
                <button className="flex items-center gap-2 text-yellow-400 text-sm font-bold border-b border-yellow-400/20 pb-1 hover:gap-3 transition-all">
                  GET DIRECTIONS <span className="material-symbols-outlined text-[18px]">near_me</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[48px] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#E53935]" />
            
            <div className="mb-10">
              <h3 className="font-kids text-3xl text-slate-900">SEND A MESSAGE</h3>
              <p className="text-slate-400 text-sm mt-2">Expect a roar back within 24 hours!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Grown-up Name</label>
                  <input 
                    type="text" 
                    required
                    name="name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Parent or Guardian Name"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#E53935] transition-all font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    required
                    name="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="dragon@email.com"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#E53935] transition-all font-medium" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">What's Up?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Add Your Voice', 'Collaborate', 'Absence', 'Other'].map(sub => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setFormData({...formData, subject: sub})}
                      className={`py-3 rounded-xl border-2 text-[11px] font-black uppercase tracking-widest transition-all
                        ${formData.subject === sub 
                          ? 'bg-[#E53935] border-[#E53935] text-white shadow-lg' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-red-100'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us what you're thinking..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[32px] px-6 py-5 focus:outline-none focus:border-[#E53935] transition-all font-medium italic resize-none" 
                />
              </div>

              <button 
                type="submit"
                disabled={formState === 'sending'}
                className={`w-full py-5 rounded-[24px] font-black text-white uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95
                  ${formState === 'sent' 
                    ? 'bg-emerald-500' 
                    : formState === 'error' 
                    ? 'bg-amber-600' 
                    : 'bg-[#E53935] hover:brightness-110 disabled:opacity-60'}`}
              >
                {formState === 'idle' && (
                  <>SEND YOUR ROAR <span className="material-symbols-outlined">send</span></>
                )}
                {formState === 'sending' && (
                  <>SENDING... <span className="material-symbols-outlined animate-spin">refresh</span></>
                )}
                {formState === 'sent' && (
                  <>ROAR DELIVERED! <span className="material-symbols-outlined">check_circle</span></>
                )}
                {formState === 'error' && (
                  <>ERROR SENDING — TRY AGAIN <span className="material-symbols-outlined">error</span></>
                )}
              </button>
              
              <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em]">
                Your privacy is important to the squad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// import React, { useState } from 'react';

// export const Contact: React.FC = () => {
//   const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
//   const [formData, setFormData] = useState({ name: '', email: '', subject: 'Add Your Voice', message: '' });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormState('sending');
//     // Simulate API call
//     setTimeout(() => {
//       setFormState('sent');
//       setFormData({ name: '', email: '', subject: 'Add Your Voice', message: '' });
//       setTimeout(() => setFormState('idle'), 3000);
//     }, 1500);
//   };

//   const contacts = [
//     { role: 'Head Coach', name: 'Ber Almeida', icon: 'sports', email: 'ber@dragonsquad.com' },
//     { role: 'Team Manager', name: 'Megan Daggett', icon: 'assignment_ind', email: 'megan@dragonsquad.com' },
//     { role: 'Team Manager', name: 'Ash Avellaneda', icon: 'groups', email: 'ash@dragonsquad.com' },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-12 animate-hero">
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        
//         {/* Left Column: Contact Info & Map */}
//         <div className="lg:col-span-2 space-y-8">
//           <div>
//             <h2 className="text-5xl font-kids text-slate-900 mb-4 uppercase">REACH THE NEST</h2>
//             <p className="text-slate-500 font-medium italic">Have a question for the Big Dragons? We're here to help!</p>
//           </div>

//           <div className="space-y-4">
//             {contacts.map((contact, i) => (
//               <div key={i} className="bg-white p-6 rounded-[32px] border-2 border-slate-100 flex items-center gap-5 group hover:border-red-500/20 transition-all">
//                 <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#E53935] group-hover:scale-110 transition-transform">
//                   <span className="material-symbols-outlined text-[28px]">{contact.icon}</span>
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-[#E53935] uppercase tracking-widest leading-none mb-1">{contact.role}</p>
//                   <p className="font-kids text-xl text-slate-900">{contact.name}</p>
//                   <p className="text-sm text-slate-400 font-medium">{contact.email}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl">
//             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
//               <span className="material-symbols-outlined text-[120px]">location_on</span>
//             </div>
//             <div className="relative z-10">
//               <h3 className="font-kids text-2xl mb-6 flex items-center gap-2">
//                 <span className="material-symbols-outlined text-yellow-400">map</span>
//                 OUR GROUND
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Training & Home Games</p>
//                   <p className="text-lg font-medium">360 Elm Street</p>
//                   <p className="text-white/40">Penn Yan, NY 14527</p>
//                 </div>
//                 <button className="flex items-center gap-2 text-yellow-400 text-sm font-bold border-b border-yellow-400/20 pb-1 hover:gap-3 transition-all">
//                   GET DIRECTIONS <span className="material-symbols-outlined text-[18px]">near_me</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Inquiry Form */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-[48px] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-2 bg-[#E53935]" />
            
//             <div className="mb-10">
//               <h3 className="font-kids text-3xl text-slate-900">SEND A MESSAGE</h3>
//               <p className="text-slate-400 text-sm mt-2">Expect a roar back within 24 hours!</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Grown-up Name</label>
//                   <input 
//                     type="text" 
//                     required
//                     value={formData.name}
//                     onChange={e => setFormData({...formData, name: e.target.value})}
//                     placeholder="Parent or Guardian Name"
//                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#E53935] transition-all font-medium" 
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Email Address</label>
//                   <input 
//                     type="email" 
//                     required
//                     value={formData.email}
//                     onChange={e => setFormData({...formData, email: e.target.value})}
//                     placeholder="dragon@email.com"
//                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#E53935] transition-all font-medium" 
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">What's Up?</label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {['Add Your Voice', 'Collaborate', 'Absence', 'Other'].map(sub => (
//                     <button
//                       key={sub}
//                       type="button"
//                       onClick={() => setFormData({...formData, subject: sub})}
//                       className={`py-3 rounded-xl border-2 text-[11px] font-black uppercase tracking-widest transition-all
//                         ${formData.subject === sub 
//                           ? 'bg-[#E53935] border-[#E53935] text-white shadow-lg' 
//                           : 'bg-white border-slate-100 text-slate-400 hover:border-red-100'}`}
//                     >
//                       {sub}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase px-2 tracking-widest">Your Message</label>
//                 <textarea 
//                   required
//                   rows={5}
//                   value={formData.message}
//                   onChange={e => setFormData({...formData, message: e.target.value})}
//                   placeholder="Tell us what you're thinking..."
//                   className="w-full bg-slate-50 border-2 border-slate-100 rounded-[32px] px-6 py-5 focus:outline-none focus:border-[#E53935] transition-all font-medium italic resize-none" 
//                 />
//               </div>

//               <button 
//                 type="submit"
//                 disabled={formState !== 'idle'}
//                 className={`w-full py-5 rounded-[24px] font-black text-white uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95
//                   ${formState === 'sent' ? 'bg-emerald-500' : 'bg-[#E53935] hover:brightness-110'}`}
//               >
//                 {formState === 'idle' && (
//                   <>SEND YOUR ROAR <span className="material-symbols-outlined">send</span></>
//                 )}
//                 {formState === 'sending' && (
//                   <>SENDING... <span className="material-symbols-outlined animate-spin">refresh</span></>
//                 )}
//                 {formState === 'sent' && (
//                   <>ROAR DELIVERED! <span className="material-symbols-outlined">check_circle</span></>
//                 )}
//               </button>
              
//               <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em]">
//                 Your privacy is important to the squad.
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };