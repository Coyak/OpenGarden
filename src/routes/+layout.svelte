<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Sparkles, Sun, Moon, BookOpen, Compass, LogIn, UserPlus, LogOut, Sprout, Network, FolderTree, LayoutDashboard, User } from 'lucide-svelte';
  import { supabase, isSupabaseConfigured } from '$lib/supabase/client';
  import { currentUserStore, clearUserSession, setUserSession } from '$lib/stores/auth';

  let currentTheme: 'obsidian' | 'parchment' = 'obsidian';

  function toggleTheme() {
    const nextTheme = currentTheme === 'obsidian' ? 'parchment' : 'obsidian';
    setTheme(nextTheme);
  }

  function setTheme(theme: 'obsidian' | 'parchment') {
    currentTheme = theme;
    if (browser) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('opengarden-theme', theme);
    }
  }

  async function handleLogout() {
    clearUserSession();
    if (browser && isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    if (browser) {
      window.location.href = '/';
    }
  }

  onMount(() => {
    if (!browser) return;

    const savedTheme = localStorage.getItem('opengarden-theme');
    if (savedTheme === 'parchment' || savedTheme === 'obsidian') {
      setTheme(savedTheme);
    } else {
      setTheme('obsidian');
    }

    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session?.user) {
          const u = data.session.user;
          setUserSession({
            email: u.email || '',
            username: u.user_metadata?.username || u.email?.split('@')[0] || 'usuario'
          });
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = session.user;
          setUserSession({
            email: u.email || '',
            username: u.user_metadata?.username || u.email?.split('@')[0] || 'usuario'
          });
        } else if (_event === 'SIGNED_OUT') {
          clearUserSession();
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    }
  });
</script>

<div class="min-h-screen flex flex-col bg-garden-main text-garden-text font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
  
  <!-- Global Top Header Navbar -->
  <header class="sticky top-0 z-50 w-full glass-panel border-b border-garden-border/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <a href="/" class="flex items-center space-x-2.5 group">
        <div class="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
          <Sprout class="w-5 h-5 text-emerald-400" />
        </div>
        <div class="flex flex-col">
          <span class="font-extrabold text-lg text-white tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">OpenGarden</span>
          <span class="text-[10px] text-garden-muted font-mono tracking-widest uppercase">Zettelkasten SaaS</span>
        </div>
      </a>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center space-x-6 text-xs font-semibold text-garden-muted">
        <a href="/#zettelkasten" class="hover:text-white transition-colors flex items-center space-x-1.5">
          <BookOpen class="w-4 h-4 text-emerald-400" />
          <span>Zettelkasten</span>
        </a>
        <a href="/#demo" class="hover:text-white transition-colors flex items-center space-x-1.5">
          <Network class="w-4 h-4 text-sky-400" />
          <span>Grafo de Nodos</span>
        </a>
        <a href="/onboarding" class="hover:text-white transition-colors flex items-center space-x-1.5">
          <FolderTree class="w-4 h-4 text-purple-400" />
          <span>Presets de Carpetas</span>
        </a>
        <a href="/app" class="hover:text-white transition-colors flex items-center space-x-1.5">
          <LayoutDashboard class="w-4 h-4 text-teal-400" />
          <span>Dashboard</span>
        </a>
      </nav>

      <!-- Right Controls: Theme Switcher & Auth Buttons -->
      <div class="flex items-center space-x-3">
        
        <!-- Sun/Moon Theme Toggle Button -->
        <button
          on:click={toggleTheme}
          class="p-2 rounded-xl glass-panel border border-garden-border text-garden-muted hover:text-white hover:border-garden-border transition-all flex items-center space-x-1.5 text-xs shadow-sm hover:scale-[1.03] active:scale-[0.97]"
          title={currentTheme === 'obsidian' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        >
          {#if currentTheme === 'obsidian'}
            <Sun class="w-4 h-4 text-amber-400" />
            <span class="hidden sm:inline">Modo Claro</span>
          {:else}
            <Moon class="w-4 h-4 text-sky-400" />
            <span class="hidden sm:inline">Modo Oscuro</span>
          {/if}
        </button>

        <!-- Auth Action Buttons: Logged In vs Logged Out -->
        {#if $currentUserStore}
          <!-- Authenticated User Menu -->
          <a
            href="/app"
            class="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-garden-surface border border-emerald-500/40 text-emerald-300 hover:bg-garden-card transition-colors shadow-sm"
          >
            <User class="w-3.5 h-3.5 text-emerald-400" />
            <span class="truncate max-w-[130px]">@{$currentUserStore.username || 'usuario'}</span>
          </a>

          <button
            on:click={handleLogout}
            class="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 transition-all"
            title="Cerrar Sesión"
          >
            <LogOut class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Salir</span>
          </button>
        {:else}
          <!-- Guest Navigation Buttons -->
          <a
            href="/login"
            class="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-garden-text hover:text-white hover:bg-garden-surface transition-colors"
          >
            <LogIn class="w-3.5 h-3.5" />
            <span>Acceder</span>
          </a>

          <a
            href="/register"
            class="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
          >
            <UserPlus class="w-3.5 h-3.5" />
            <span>Crear Jardín</span>
          </a>
        {/if}

      </div>
    </div>
  </header>

  <!-- Page Content -->
  <main class="flex-grow">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="border-t border-garden-border/60 bg-garden-surface/50 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-garden-muted">
      <div class="flex items-center space-x-2">
        <Sprout class="w-4 h-4 text-emerald-400" />
        <span class="font-semibold text-white">OpenGarden</span>
        <span>— Digital Garden & Zettelkasten SaaS</span>
      </div>
      <div>
        Estética Notion / Obsidian • SvelteKit + Supabase + D3.js
      </div>
    </div>
  </footer>

</div>
