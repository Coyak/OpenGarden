<script lang="ts">
  import { Github, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-svelte';
  import { supabase, isSupabaseConfigured } from '$lib/supabase/client';

  let email = '';
  let password = '';
  let loading = false;
  let errorMessage = '';

  async function handleLogin() {
    loading = true;
    errorMessage = '';

    // If Supabase environment variables are missing/unconfigured, safely enter app in demo mode without fetch error
    if (!isSupabaseConfigured()) {
      setTimeout(() => {
        window.location.href = '/app';
      }, 300);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      errorMessage = error.message;
    } else {
      window.location.href = '/app';
    }
    loading = false;
  }

  async function handleOAuth(provider: 'github' | 'google') {
    if (!isSupabaseConfigured()) {
      window.location.href = '/app';
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/app` }
    });
  }
</script>

<svelte:head>
  <title>Iniciar Sesión | OpenGarden</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-md p-8 rounded-3xl glass-panel border border-garden-border shadow-2xl space-y-6 relative overflow-hidden">
    <!-- Glow element -->
    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

    <!-- Header -->
    <div class="text-center">
      <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-2xl flex items-center justify-center mx-auto mb-3">
        🌱
      </div>
      <h1 class="text-2xl font-extrabold text-white">Bienvenido de nuevo</h1>
      <p class="text-xs text-garden-muted mt-1">Accede a tu Jardín Digital de Conocimiento</p>
    </div>

    {#if !isSupabaseConfigured()}
      <div class="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
        <Sparkles class="w-4 h-4 flex-shrink-0 text-emerald-400" />
        <span><strong>Modo Vista Previa:</strong> Ingresa tus datos para acceder directamente al Dashboard.</span>
      </div>
    {/if}

    {#if errorMessage}
      <div class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
        {errorMessage}
      </div>
    {/if}

    <!-- OAuth Buttons -->
    <div class="grid grid-cols-2 gap-3">
      <button
        type="button"
        on:click={() => handleOAuth('github')}
        class="py-2.5 px-4 rounded-xl glass-panel border border-garden-border hover:border-garden-accent/50 text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all hover:bg-garden-surface"
      >
        <Github class="w-4 h-4" />
        <span>GitHub</span>
      </button>

      <button
        type="button"
        on:click={() => handleOAuth('google')}
        class="py-2.5 px-4 rounded-xl glass-panel border border-garden-border hover:border-garden-accent/50 text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all hover:bg-garden-surface"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/></svg>
        <span>Google</span>
      </button>
    </div>

    <div class="relative flex items-center justify-center">
      <div class="border-t border-garden-border w-full"></div>
      <span class="bg-garden-surface px-3 text-[11px] text-garden-muted font-mono uppercase">O con Email</span>
    </div>

    <!-- Email Form -->
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div>
        <label for="login-email" class="block text-xs font-medium text-garden-muted mb-1">Correo Electrónico</label>
        <div class="relative">
          <Mail class="w-4 h-4 text-garden-muted absolute left-3.5 top-3" />
          <input
            id="login-email"
            type="email"
            bind:value={email}
            required
            placeholder="usuario@ejemplo.com"
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label for="login-password" class="block text-xs font-medium text-garden-muted mb-1">Contraseña</label>
        <div class="relative">
          <Lock class="w-4 h-4 text-garden-muted absolute left-3.5 top-3" />
          <input
            id="login-password"
            type="password"
            bind:value={password}
            required
            placeholder="••••••••"
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2"
      >
        <span>{loading ? 'Entrando...' : 'Ingresar al Jardín'}</span>
        <ArrowRight class="w-4 h-4" />
      </button>
    </form>

    <div class="text-center text-xs text-garden-muted pt-2 border-t border-garden-border/40">
      ¿No tienes cuenta? <a href="/register" class="text-emerald-400 font-semibold hover:underline">Regístrate gratis</a>
    </div>
  </div>
</div>
