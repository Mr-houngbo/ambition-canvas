import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  onAuthenticated: () => void;
  login: (password: string) => boolean;
}

const Auth = ({ onAuthenticated, login }: AuthProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(password);
    
    if (success) {
      toast({
        title: "Bienvenue !",
        description: "Accès autorisé à vos projets.",
      });
      onAuthenticated();
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />
      
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-40"
          style={{ background: 'hsl(var(--primary) / 0.5)', top: '-20%', left: '-10%' }}
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
          style={{ background: 'hsl(var(--accent) / 0.5)', bottom: '-15%', right: '-5%' }}
          animate={{ 
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-25"
          style={{ background: 'hsl(var(--academic) / 0.5)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/60 backdrop-blur-3xl border border-border/30 rounded-[2rem] p-10 shadow-2xl shadow-primary/10">
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
            className="w-24 h-24 mx-auto mb-10 rounded-3xl flex items-center justify-center shadow-xl"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Lock className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-3">
              <span className="gradient-text">Espace Privé</span>
            </h1>
            <p className="text-muted-foreground">
              Entrez le mot de passe pour accéder à vos projets
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className={`h-14 pl-5 pr-14 text-base bg-background/50 border-border/50 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
                    error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-sm mt-3 ml-1 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                disabled={!password || isLoading}
                variant="gradient"
                className="w-full h-14 text-base font-semibold rounded-2xl shadow-xl shadow-primary/25 transition-all duration-300 group"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : (
                  <>
                    Accéder
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 text-muted-foreground/50 text-sm mt-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ambition — Gestionnaire de projets</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
