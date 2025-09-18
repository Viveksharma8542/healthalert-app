import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';


const LoginRegisterPage = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => { setError(''); }, [isLogin]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const stored = localStorage.getItem('appUser');
    const savedUser = stored ? JSON.parse(stored) : null;

    if (isLogin) {
      if (!savedUser) {
        setError('No account found. Please create one.');
        return;
      }
      if (savedUser.email !== formData.email || savedUser.password !== formData.password) {
        setError('Invalid email or password');
        return;
      }
      onAuth({ name: savedUser.name, email: savedUser.email });
    } else {
      if (!formData.name.trim()) {
        setError('Name is required');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const newUser = { name: formData.name.trim(), email: formData.email.trim(), password: formData.password };
      localStorage.setItem('appUser', JSON.stringify(newUser));
      onAuth({ name: newUser.name, email: newUser.email });
    }
  };

  // styles object omitted (inline styles used directly below)

  return (
    <>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.1); } }
        .pulse-1 { animation: pulse 4s ease-in-out infinite; }
        .pulse-2 { animation: pulse 4s ease-in-out infinite; animation-delay: 2s; }
        .pulse-3 { animation: pulse 4s ease-in-out infinite; animation-delay: 1s; }  
        .input::placeholder { color: #9ca3af; }
        .input:focus { box-shadow: 0 0 0 2px #a855f7; border-color: transparent; }
        .submit-btn:hover { background: linear-gradient(135deg, #9333ea, #1d4ed8) !important; transform: scale(1.05); box-shadow: 0 10px 25px -5px rgba(147,51,234,.25);} 
        .social-btn:hover { background: rgba(255,255,255,0.2) !important; }
        .password-toggle:hover { color: #fff !important; }
        .forgot-link:hover, .toggle-btn:hover, .terms-link:hover { color: #e9d5ff !important; text-decoration-color: #e9d5ff !important; }
        .logo:hover { transform: rotate(0deg) !important; }
        .card:hover { box-shadow: 0 25px 50px -12px rgba(147,51,234,0.25) !important; }
        .auth-error { background: rgba(255,0,0,0.15); color: #fecaca; border: 1px solid rgba(255,0,0,0.3); padding: .75rem 1rem; border-radius: .75rem; font-size: .85rem; }
      `}</style>
      <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#581c87 0%,#1e3a8a 50%,#312e81 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', position:'relative', overflow:'hidden'}}>
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none'}}>
          <div className="pulse-1" style={{ position:'absolute', width:'20rem', height:'20rem', borderRadius:'50%', filter:'blur(60px)', opacity:0.2, top:'-10rem', left:'-10rem', background:'#a855f7'}} />
          <div className="pulse-2" style={{ position:'absolute', width:'20rem', height:'20rem', borderRadius:'50%', filter:'blur(60px)', opacity:0.2, bottom:'-10rem', right:'-10rem', background:'#3b82f6'}} />
          <div className="pulse-3" style={{ position:'absolute', width:'20rem', height:'20rem', borderRadius:'50%', filter:'blur(60px)', opacity:0.2, top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'#6366f1'}} />
        </div>
        <div style={{ position:'relative', width:'100%', maxWidth:'28rem'}}>
          <div className="card" style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(16px)', borderRadius:'1rem', boxShadow:'0 25px 50px -12px rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.2)', padding:'2rem'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
              <div className="logo" style={{ width:'4rem', height:'4rem', background:'linear-gradient(135deg,#a855f7,#3b82f6)', borderRadius:'1rem', margin:'0 auto 1rem', display:'flex', alignItems:'center', justifyContent:'center', transform:'rotate(12deg)', transition:'transform .3s ease', cursor:'pointer'}}>
                <User style={{ width:'2rem', height:'2rem', color:'#fff'}} />
              </div>
              <h1 style={{ fontSize:'1.875rem', fontWeight:'bold', color:'#fff', marginBottom:'.5rem'}}>{isLogin ? 'Welcome to Health Care App' : 'Create Account'}</h1>
              <p style={{ color:'#d1d5db'}}>{isLogin ? 'Sign in to your account' : 'Join us today'}</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem'}}>
              {!isLogin && (
                <div style={{ display:'flex', flexDirection:'column'}}>
                  <label style={{ fontSize:'.875rem', fontWeight:500, color:'#d1d5db', marginBottom:'.5rem'}}>Full Name</label>
                  <div style={{ position:'relative'}}>
                    <User style={{ position:'absolute', left:'.75rem', top:'50%', transform:'translateY(-50%)', color:'#9ca3af', width:'1.25rem', height:'1.25rem'}} />
                    <input className="input" type='text'  pattern="^[A-Za-z ]+$"  name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required={!isLogin} style={inputStyle()} />
                  </div>
                </div>
              )}
              <div style={{ display:'flex', flexDirection:'column'}}>
                <label style={{ fontSize:'.875rem', fontWeight:500, color:'#d1d5db', marginBottom:'.5rem'}}>Email Address</label>
                <div style={{ position:'relative'}}>
                  <Mail style={{ position:'absolute', left:'.75rem', top:'50%', transform:'translateY(-50%)', color:'#9ca3af', width:'1.25rem', height:'1.25rem'}} />
                  <input className="input" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required style={inputStyle()} />
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column'}}>
                <label style={{ fontSize:'.875rem', fontWeight:500, color:'#d1d5db', marginBottom:'.5rem'}}>Password</label>
                <div style={{ position:'relative'}}>
                  <Lock style={{ position:'absolute', left:'.75rem', top:'50%', transform:'translateY(-50%)', color:'#9ca3af', width:'1.25rem', height:'1.25rem'}} />
                  <input className="input" type={showPassword ? 'text':'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required style={{...inputStyle(), paddingRight:'3rem'}} />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(p=>!p)} style={toggleStyle()}>{showPassword ? <EyeOff style={eyeIconStyle()} /> : <Eye style={eyeIconStyle()} />}</button>
                </div>
              </div>
              {!isLogin && (
                <div style={{ display:'flex', flexDirection:'column'}}>
                  <label style={{ fontSize:'.875rem', fontWeight:500, color:'#d1d5db', marginBottom:'.5rem'}}>Confirm Password</label>
                  <div style={{ position:'relative'}}>
                    <Lock style={{ position:'absolute', left:'.75rem', top:'50%', transform:'translateY(-50%)', color:'#9ca3af', width:'1.25rem', height:'1.25rem'}} />
                    <input className="input" type={showConfirmPassword ? 'text':'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" required={!isLogin} style={{...inputStyle(), paddingRight:'3rem'}} />
                    <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(p=>!p)} style={toggleStyle()}>{showConfirmPassword ? <EyeOff style={eyeIconStyle()} /> : <Eye style={eyeIconStyle()} />}</button>
                  </div>
                </div>
              )}
              {/* {isLogin && (
                <div style={{ textAlign:'right'}}>
                  <button type="button" className="forgot-link" style={{ fontSize:'.75rem', color:'#d8b4fe', background:'none', border:'none', cursor:'pointer', textDecoration:'underline'}}>Forgot password?</button>
                </div>
              )} */}                   
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="submit-btn" style={{ width:'100%', background:'linear-gradient(135deg,#a855f7,#2563eb)', color:'#fff', padding:'.75rem 1.5rem', borderRadius:'.75rem', fontWeight:600, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem', transition:'all .3s ease', boxShadow:'0 10px 25px -5px rgba(0,0,0,0.3)'}}>
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight style={{ width:'1.25rem', height:'1.25rem'}} />
              </button>
            </form>
            <div style={{ margin:'1.75rem 0', display:'flex', alignItems:'center'}}>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)'}} />
              <span style={{ padding:'0 1rem', color:'#9ca3af', fontSize:'.75rem'}}>or</span>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.2)'}} />
            </div>
            <div style={{ marginTop:'1.75rem', textAlign:'center', color:'#d1d5db', fontSize:'.85rem'}}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button type="button" className="toggle-btn" onClick={() => setIsLogin(p=>!p)} style={{ marginLeft:'.5rem', color:'#d8b4fe', background:'none', border:'none', fontWeight:600, cursor:'pointer', textDecoration:'underline'}}>
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
            {!isLogin && (
              <div style={{ marginTop:'1.25rem', textAlign:'center'}}>
                <p style={{ fontSize:'.65rem', color:'#9ca3af'}}>
                  By creating an account, you agree to our{' '}
                  <button className="terms-link" style={linkStyle()}>Terms of Service</button>{' '}and{' '}
                  <button className="terms-link" style={linkStyle()}>Privacy Policy</button>
                </p>
              </div>
            )}
          </div>
          <div style={{ position:'absolute', zIndex:-1, top:0, left:'50%', transform:'translate(-50%,-50%)'}}>
            <div style={{ width:'8rem', height:'8rem', background:'linear-gradient(135deg,#a855f7,#3b82f6)', borderRadius:'50%', filter:'blur(48px)', opacity:.3 }} />
          </div>
        </div>
      </div>
    </>
  );
};

function inputStyle(){ return { width:'100%', padding:'.75rem 1rem .75rem 3rem', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:'.75rem', color:'#fff', fontSize:'1rem', outline:'none', transition:'all .3s ease'}; }
function toggleStyle(){ return { position:'absolute', right:'.75rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#9ca3af', cursor:'pointer'}; }
function eyeIconStyle(){ return { width:'1.25rem', height:'1.25rem'}; }
function linkStyle(){ return { color:'#d8b4fe', background:'none', border:'none', cursor:'pointer', textDecoration:'underline'}; }

export default LoginRegisterPage;
