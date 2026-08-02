import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { M as Mail } from "../../../chunks/client.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { L as Lock } from "../../../chunks/lock.js";
import { A as Arrow_right } from "../../../chunks/arrow-right.js";
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "user" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let username = "";
  let email = "";
  let password = "";
  return `${$$result.head += `<!-- HEAD_svelte-nlus5n_START -->${$$result.title = `<title>Crear Cuenta | OpenGarden</title>`, ""}<!-- HEAD_svelte-nlus5n_END -->`, ""} <div class="min-h-[80vh] flex items-center justify-center px-4 py-12"><div class="w-full max-w-md p-8 rounded-3xl glass-panel border border-garden-border shadow-2xl space-y-6 relative overflow-hidden"> <div class="text-center" data-svelte-h="svelte-14yfmxe"><div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-2xl flex items-center justify-center mx-auto mb-3">🌿</div> <h1 class="text-2xl font-extrabold text-white">Crea tu Jardín Digital</h1> <p class="text-xs text-garden-muted mt-1">Define tu usuario y tu URL pública en segundos</p></div> ${``} <form class="space-y-4"><div><label for="reg-username" class="block text-xs font-medium text-garden-muted mb-1" data-svelte-h="svelte-1j21hw">Nombre de Usuario (@username)</label> <div class="relative">${validate_component(User, "User").$$render(
    $$result,
    {
      class: "w-4 h-4 text-garden-muted absolute left-3.5 top-3"
    },
    {},
    {}
  )} <input id="reg-username" type="text" required placeholder="mi_jardin_digital" class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors font-mono"${add_attribute("value", username, 0)}></div> ${``}</div> <div><label for="reg-email" class="block text-xs font-medium text-garden-muted mb-1" data-svelte-h="svelte-hxpidi">Correo Electrónico</label> <div class="relative">${validate_component(Mail, "Mail").$$render(
    $$result,
    {
      class: "w-4 h-4 text-garden-muted absolute left-3.5 top-3"
    },
    {},
    {}
  )} <input id="reg-email" type="email" required placeholder="tu@correo.com" class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"${add_attribute("value", email, 0)}></div></div> <div><label for="reg-password" class="block text-xs font-medium text-garden-muted mb-1" data-svelte-h="svelte-1h46k63">Contraseña</label> <div class="relative">${validate_component(Lock, "Lock").$$render(
    $$result,
    {
      class: "w-4 h-4 text-garden-muted absolute left-3.5 top-3"
    },
    {},
    {}
  )} <input id="reg-password" type="password" required minlength="6" placeholder="••••••••" class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-garden-surface border border-garden-border text-white text-xs placeholder:text-garden-muted/60 focus:outline-none focus:border-emerald-500 transition-colors"${add_attribute("value", password, 0)}></div></div> <button type="submit" ${""} class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2"><span>${escape("Comenzar Onboarding")}</span> ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></form> <div class="text-center text-xs text-garden-muted pt-2 border-t border-garden-border/40" data-svelte-h="svelte-a2u72y">¿Ya tienes cuenta? <a href="/login" class="text-emerald-400 font-semibold hover:underline">Inicia sesión</a></div></div></div>`;
});
export {
  Page as default
};
