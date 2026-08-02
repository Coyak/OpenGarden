<script lang="ts">
  import { Github, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-svelte';
  import { supabase, isSupabaseConfigured } from '$lib/supabase/client';

  let username = '';
  let email = '';
  let password = '';
  let loading = false;
  let errorMessage = '';

  async function handleRegister() {
    loading = true;
    errorMessage = '';
    const cleanUsername = username.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');

    // If Supabase environment variables are missing/unconfigured, safely enter onboarding without fetch error
    if (!isSupabaseConfigured()) {
      setTimeout(() => {
        window.location.href = '/onboarding';
      }, 300);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: cleanUsername,
          full_name: cleanUsername
        }
      }
    });

    if (error) {
      errorMessage = error.message;
      loading = false;
    } else {
      window.location.href = '/onboarding';
    }
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
  <title>Crear Cuenta | OpenGarden</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-md p-8 rounded-3xl glass-panel border border-garden-border shadow-2xl space-y-6 relative overflow-hidden">
    <!-- Header -->
    <div class="text-center">
      <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-2xl flex items-center justify-center mx-auto mb-3">
        🌿
      </div>
      <h1 class="text-2xl font-extrabold text-white">Crea tu Jardín Digital</h1>
      <p class="text-xs text-garden-muted mt-1">Define tu usuario y tu URL pública en segundos</p>
    </div>

    {#if !isSupabaseConfigured()}
      <div class="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
        <Sparkles class="w-4 h-4 flex-shrink-0 text-emerald-400" />
        <span><strong>Modo Vista Previa:</strong> Ingresa tus datos para comenzar el onboarding.</span>
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

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <label for="reg-username" class="block text-xs font-medium text-garden-muted mb-1">Nombre de Usuario (@username)</label>
        <div class="relative">
          <User class="w-4 h-4 text-garden-muted absolute left-3.5 top-3" />
          <input
            id="reg-username"
            type="text"
            bind:value={username}
            required
            placeholder="mi_jardin_digital"
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
          />
        </div>
        {#if username}
          <span class="text-[11px] text-emerald-400 mt-1 block">
            Tu URL pública será: <code class="bg-garden-surface px-1 py-0.5 rounded">opengarden/u/{username.toLowerCase().replace(/[^a-z0-9_]/g, '')}</code>
          </span>
        {/if}
      </div>

      <div>
        <label for="reg-email" class="block text-xs font-medium text-garden-muted mb-1">Correo Electrónico</label>
        <div class="relative">
          <Mail class="w-4 h-4 text-garden-muted absolute left-3.5 top-3" />
          <input
            id="reg-email"
            type="email"
            bind:value={email}
            required
            placeholder="tu@correo.com"
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label for="reg-password" class="block text-xs font-medium text-garden-muted mb-1">Contraseña</label>
        <div class="relative">
          <Lock class="w-4 h-4 text-garden-muted absolute left-3.5 top-3" />
          <input
            id="reg-password"
            type="password"
            bind:value={password}
            required
            minlength="6"
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
        <span>{loading ? 'Creando Jardín...' : 'Comenzar Onboarding'}</span>
        <ArrowRight class="w-4 h-4" />
      </button>
    </form>

    <div class="text-center text-xs text-garden-muted pt-2 border-t border-garden-border/40">
      ¿Ya tienes cuenta? <a href="/login" class="text-emerald-400 font-semibold hover:underline">Inicia sesión</a>
    </div>
  </div>
</div>
