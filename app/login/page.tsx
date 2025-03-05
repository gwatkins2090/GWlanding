"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Howl } from 'howler';
import { Joystick, Power, Trophy, Volume2, Palette } from 'lucide-react';

// Sound effects
const sounds = {
  hover: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'] }),
  click: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/1563/1563-preview.mp3'] }),
  success: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'] }),
  error: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'] })
};

type FormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [powerLevel, setPowerLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [theme, setTheme] = useState<'purple' | 'green'>('purple');
  const { register, handleSubmit, watch } = useForm<FormData>();

  const password = watch('password', '');

  useEffect(() => {
    // Calculate password strength
    const strength = calculatePasswordStrength(password);
    setPowerLevel(strength);
  }, [password]);

  useEffect(() => {
    // Update theme on document root
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length > 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const onSubmit = async (data: FormData) => {
    if (!isMuted) sounds.click.play();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!isMuted) sounds.success.play();
      // Handle successful login
    } catch (error) {
      if (!isMuted) sounds.error.play();
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSoundToggle = () => {
    if (!isMuted) sounds.click.play();
    setIsMuted(!isMuted);
  };

  const handleThemeToggle = () => {
    if (!isMuted) sounds.click.play();
    setTheme(theme === 'purple' ? 'green' : 'purple');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleThemeToggle}
            className="text-neon-secondary hover:text-neon-primary transition-colors p-2 bg-black/50 rounded-full"
            aria-label="Toggle theme"
          >
            <Palette size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSoundToggle}
            className="text-neon-secondary hover:text-neon-primary transition-colors p-2 bg-black/50 rounded-full"
            aria-label="Toggle sound"
          >
            <Volume2 size={24} />
          </motion.button>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="arcade-screen w-full p-8"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="neon-text text-2xl mb-8"
          >
            George Watkins
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="neon-text text-sm mb-2 block">PLAYER 1</label>
                <input
                  {...register('username')}
                  className="input-field"
                  placeholder="ENTER USERNAME"
                  onFocus={() => !isMuted && sounds.hover.play()}
                />
              </div>

              <div>
                <label className="neon-text text-sm mb-2 block">PASSWORD</label>
                <input
                  {...register('password')}
                  type="password"
                  className="input-field"
                  placeholder="ENTER PASSWORD"
                  onFocus={() => !isMuted && sounds.hover.play()}
                />
              </div>

              <div className="power-level">
                <motion.div
                  className="power-level-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: `${powerLevel}%` }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="submit-button w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Power size={24} />
                  </motion.div>
                ) : (
                  'INSERT COIN TO CONTINUE'
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-between items-center text-neon-secondary"
          >
            <div className="flex items-center gap-2">
              <Joystick size={16} />
              <span className="text-xs">USE ARROW KEYS</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={16} />
              <span className="text-xs">HIGH SCORES</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;