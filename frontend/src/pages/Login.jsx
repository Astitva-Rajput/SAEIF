import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaUsers, FaCrown, FaGoogle, FaLinkedin, FaMicrosoft } from 'react-icons/fa';

const API = process.env.REACT_APP_API || '';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected plan from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [location]);



  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Special handling for admin login - allow without @ symbol
      let loginEmail = email;
      if (email === 'SAEIF.MANYA' && !email.includes('@')) {
        loginEmail = 'SAEIF.MANYA'; // Keep as is for admin
      }
      
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.userId);
      
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        // Check if user has active membership
        const membershipRes = await fetch(`${API}/api/membership/user/${data.userId}`, {
          headers: { 'x-auth-token': data.token }
        });
        const membershipData = await membershipRes.json();
        
        if (membershipData.isActive) {
          navigate('/members');
        } else {
          // Redirect to payment page if they selected a plan
          if (selectedPlan) {
            navigate(`/payment?plan=${selectedPlan}`);
          } else {
            navigate('/membership');
          }
        }
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handlePlanSelection = (planType) => {
    setSelectedPlan(planType);
    // Scroll to login section
    document.getElementById('login-section').scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-darkblue to-primary">


      {/* Hero Section */}
      <section className="relative py-20 px-4 min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-darkblue/90 to-primary/90"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
          opacity: 0.3
        }}></div>
        
        <div className="relative z-10 container mx-auto text-center">
          {/* Members Only Access Button */}
          <div className="mb-8">
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-white/30 flex items-center space-x-2 mx-auto hover:bg-white/30 transition-all duration-300">
              <FaLock className="text-sm" />
              <span>Members Only Access</span>
            </button>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">Welcome</h1>
          
          {/* Description */}
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed">
            Access your personalized learning dashboard, connect with our exclusive community, and unlock premium resources designed to accelerate your skill development journey.
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Secure Access Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
                <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Secure Access</h3>
              <p className="text-white/80 text-sm leading-relaxed">Protected member-only content and resources</p>
            </div>

            {/* Exclusive Community Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-400/30">
                <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-white text-lg" />
                </div>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Exclusive Community</h3>
              <p className="text-white/80 text-sm leading-relaxed">Connect with fellow members and mentors</p>
            </div>

            {/* Premium Content Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-400/30">
                <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center">
                  <FaCrown className="text-white text-lg" />
                </div>
              </div>
              <h3 className="text-white font-semibold text-xl mb-3">Premium Content</h3>
              <p className="text-white/80 text-sm leading-relaxed">Access to advanced courses and materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your <span className="text-accent">Membership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan that matches your learning goals and unlock exclusive access to our premium resources and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 6-Month Plan */}
            <div className="relative">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full hover:border-accent transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">6-Month Plan</h3>
                  <p className="text-gray-600 mb-4">valid for 6 months</p>
                  <div className="text-4xl font-bold text-accent mb-6">₹6,000</div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Access to our Communication Skills Course (Foundational to Intermediate)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Dedicated Mentorship and Guidance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Monthly Industry-Academia Connect Sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Access to Monthly Community Meetups & progress tracking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Course Completion Certificate</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Peer Learning Circle via WhatsApp/Telegram</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Access to Select Live Events and Webinars</span>
                  </li>
                </ul>

                <button
                  onClick={() => handlePlanSelection('6-month')}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                >
                  Select Plan
                </button>
              </div>
            </div>

            {/* 1-Year Plan - Most Popular */}
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 h-full hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">1-Year Plan</h3>
                  <p className="text-gray-600 mb-4">valid for 12 months</p>
                  <div className="text-4xl font-bold text-accent mb-6">₹11,000</div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-medium">Includes Everything in the 6-Month Plan, Plus:</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Year-long access to exclusive events hosted by government and private bodies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Quarterly One-on-One Mentorship Sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Advanced Certification in Communication and Presentation Skills</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Behind-the-Scenes Access to Skill Aid Projects and Initiatives</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Extended Access to Community Forum and Digital Library</span>
                  </li>
                </ul>

                <button
                  onClick={() => handlePlanSelection('1-year')}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Select Plan
                </button>
              </div>
            </div>

            {/* Lifetime Plan */}
            <div className="relative">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full hover:border-accent transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Lifetime Plan</h3>
                  <p className="text-gray-600 mb-4">One time payment</p>
                  <div className="text-4xl font-bold text-accent mb-6">₹1,10,000</div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-medium">Includes Everything in the Yearly Plan, Plus:</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Lifetime access to all current and future courses</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Lifetime invitations to all events, workshops, and summits</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Premium networking circles and exclusive forums</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Full access to all recorded masterclasses and learning archives</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Free entry to new Skill Aid Initiatives, labs, clubs, and special projects</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Lifetime mentorship access (group and periodic 1:1)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Lifetime Communication Portfolio Development Support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Lifetime Honorary Certificate and listing on our Wall of Changemakers</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">Opportunities to co-host, volunteer or collaborate with Skill Aid teams</span>
                  </li>
                </ul>

                <button
                  onClick={() => handlePlanSelection('lifetime')}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login-section" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Member Login</h2>
              <p className="text-gray-600">Access your exclusive member dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Method Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    loginMethod === 'email' 
                      ? 'bg-white text-accent shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    loginMethod === 'phone' 
                      ? 'bg-white text-accent shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Input Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  placeholder={loginMethod === 'email' ? 'your.email@example.com' : '+91 98765 43210'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                            <button type="button" className="text-sm text-accent hover:text-accent/80 transition">
              Forgot password?
            </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent/90 transition disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Social Login */}
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <button type="button" className="flex items-center justify-center space-x-2 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition">
                    <FaGoogle className="text-red-500" />
                    <span className="text-sm">Google</span>
                  </button>
                  <button type="button" className="flex items-center justify-center space-x-2 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition">
                    <FaLinkedin className="text-blue-600" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                  <button type="button" className="flex items-center justify-center space-x-2 bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition">
                    <FaMicrosoft className="text-blue-500" />
                    <span className="text-sm">Microsoft</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <a href="/membership" className="text-accent hover:text-accent/80 font-medium">
                    Sign up for membership
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Login; 