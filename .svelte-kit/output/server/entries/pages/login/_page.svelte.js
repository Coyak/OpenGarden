import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { M as Mail } from "../../../chunks/client.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { L as Lock } from "../../../chunks/lock.js";
import { A as Arrow_right } from "../../../chunks/arrow-right.js";
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }
    ],
    ["path", { "d": "M9 18c-4.51 2-5-2-7-2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "github" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `${$$result.head += `<!-- HEAD_svelte-123dune_START -->${$$result.title = `<title>Iniciar Sesión | OpenGarden</title>`, ""}<!-- HEAD_svelte-123dune_END -->`, ""} <div class="min-h-[80vh] flex items-center justify-center px-4 py-12"><div class="w-full max-w-md p-8 rounded-3xl glass-panel border border-garden-border shadow-2xl space-y-6 relative overflow-hidden"> <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>  <div class="text-center" data-svelte-h="svelte-tu51w3"><div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-2xl flex items-center justify-center mx-auto mb-3">🌱</div> <h1 class="text-2xl font-extrabold text-white">Bienvenido de nuevo</h1> <p class="text-xs text-garden-muted mt-1">Accede a tu Jardín Digital de Conocimiento</p></div> ${``}  <div class="grid grid-cols-2 gap-3"><button type="button" class="py-2.5 px-4 rounded-xl glass-panel border border-garden-border hover:border-garden-accent/50 text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all hover:bg-garden-surface">${validate_component(Github, "Github").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-1l01zul">GitHub</span></button> <button type="button" class="py-2.5 px-4 rounded-xl glass-panel border border-garden-border hover:border-garden-accent/50 text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all hover:bg-garden-surface" data-svelte-h="svelte-1co899"><svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"></path></svg> <span>Google</span></button></div> <div class="relative flex items-center justify-center" data-svelte-h="svelte-t0a905"><div class="border-t border-garden-border w-full"></div> <span class="bg-garden-surface px-3 text-[11px] text-garden-muted font-mono uppercase">O con Email</span></div>  <form class="space-y-4"><div><label for="login-email" class="block text-xs font-medium text-garden-muted mb-1" data-svelte-h="svelte-rfrl47">Correo Electrónico</label> <div class="relative">${validate_component(Mail, "Mail").$$render(
    $$result,
    {
      class: "w-4 h-4 text-garden-muted absolute left-3.5 top-3"
    },
    {},
    {}
  )} <input id="login-email" type="email" required placeholder="usuario@ejemplo.com" class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"${add_attribute("value", email, 0)}></div></div> <div><label for="login-password" class="block text-xs font-medium text-garden-muted mb-1" data-svelte-h="svelte-1jvsdxu">Contraseña</label> <div class="relative">${validate_component(Lock, "Lock").$$render(
    $$result,
    {
      class: "w-4 h-4 text-garden-muted absolute left-3.5 top-3"
    },
    {},
    {}
  )} <input id="login-password" type="password" required placeholder="••••••••" class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"${add_attribute("value", password, 0)}></div></div> <button type="submit" ${""} class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2"><span>${escape("Ingresar al Jardín")}</span> ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></form> <div class="text-center text-xs text-garden-muted pt-2 border-t border-garden-border/40" data-svelte-h="svelte-1kl595p">¿No tienes cuenta? <a href="/register" class="text-emerald-400 font-semibold hover:underline">Regístrate gratis</a></div></div></div>`;
});
export {
  Page as default
};
