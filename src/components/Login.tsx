import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, Building2, Users, Shield, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'employee' | 'admin' | 'superadmin') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'employee' | 'admin' | 'superadmin'>('employee');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(selectedRole);
      setIsLoading(false);
    }, 1000);
  };

  const roles = [
    { 
      id: 'employee' as const, 
      label: 'Employee Portal',
      icon: Users,
      description: 'Access your personal dashboard'
    },
    { 
      id: 'admin' as const, 
      label: 'Admin Portal',
      icon: Shield,
      description: 'Manage department operations'
    },
    {
      id: 'superadmin' as const,
      label: 'Super Admin',
      icon: Building2,
      description: 'Company-wide settings & analytics'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-sky-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Branding */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-5xl tracking-wider text-black">SMG Scooters Pvt Ltd</h1>
            </div>
            <motion.p
              className="text-gray-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome back! Please login to continue
            </motion.p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role, index) => {
                const extraLayout = role.id === 'superadmin' ? 'col-span-2 justify-self-center w-2/3' : '';
                return (
                  <motion.button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedRole === role.id
                        ? 'border-[#0B4DA2] bg-[#0B4DA2] text-white shadow-lg shadow-blue-200'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-[#87CEEB]'
                    } ${extraLayout}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-sm text-center">{role.label}</div>
                    <div className={`text-xs mt-1 text-center ${
                      selectedRole === role.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {role.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black transition-colors z-10" />
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white/80 backdrop-blur-sm relative"
                  placeholder="Enter your email"
                  required
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black transition-colors z-10" />
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#0B4DA2] focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white/80 backdrop-blur-sm relative"
                  placeholder="Enter your password"
                  required
                  whileFocus={{ scale: 1.01 }}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black transition-colors z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password */}
            <motion.div
              className="flex items-center justify-between text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#0B4DA2] focus:ring-[#0B4DA2] cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
              </label>
              <motion.a
                href="#"
                className="text-[#0B4DA2] hover:text-[#042A5B] transition-colors"
                whileHover={{ x: 5 }}
              >
                Forgot password?
              </motion.a>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white py-4 rounded-xl hover:shadow-xl hover:shadow-blue-200/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </span>
              {!isLoading && (
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 relative z-10" />
                </motion.div>
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div
            className="mt-8 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>Don't have an account? <a href="#" className="text-[#0B4DA2] hover:underline">Contact HR</a></p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <motion.div
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B4DA2]/90 via-[#042A5B]/80 to-[#0B4DA2]/90 z-10" />
        
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
          alt="Modern Office"
          className="w-full h-full object-cover"
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-16">
          <div className="text-white space-y-8 max-w-3xl">
            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {selectedRole === 'employee' ? (
                <>
                  <h2 className="text-7xl mb-8 leading-tight tracking-tight drop-shadow-lg">
                    Welcome to SMG Employee Portal
                  </h2>
                  <p className="text-3xl text-white/95 leading-relaxed drop-shadow-md px-8">
                    {(() => {
                      const hour = new Date().getHours();
                      if (hour < 12) return 'Good Morning! ';
                      if (hour < 18) return 'Good Afternoon! ';
                      return 'Good Evening! ';
                    })()}
                    Access your dashboard, submit requests, view documents, and manage your HR tasks seamlessly
                  </p>
                </>
              ) : selectedRole === 'admin' ? (
                <>
                  <h2 className="text-7xl mb-8 leading-tight tracking-tight drop-shadow-lg">
                    Admin Portal Access
                  </h2>
                  <p className="text-3xl text-white/95 leading-relaxed drop-shadow-md px-8">
                    {(() => {
                      const hour = new Date().getHours();
                      if (hour < 12) return 'Good Morning! ';
                      if (hour < 18) return 'Good Afternoon! ';
                      return 'Good Evening! ';
                    })()}
                    Manage employees, review requests, oversee operations, and maintain organizational excellence
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-7xl mb-8 leading-tight tracking-tight drop-shadow-lg">
                    Super Admin Portal
                  </h2>
                  <p className="text-3xl text-white/95 leading-relaxed drop-shadow-md px-8">
                    {(() => {
                      const hour = new Date().getHours();
                      if (hour < 12) return 'Good Morning! ';
                      if (hour < 18) return 'Good Afternoon! ';
                      return 'Good Evening! ';
                    })()}
                    Configure workflows, manage departments, and view company-wide analytics
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}